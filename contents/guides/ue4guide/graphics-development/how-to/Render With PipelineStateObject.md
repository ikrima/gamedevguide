---
sortIndex: 3
---

# Render With PipelineStateObject

```cpp
static const FName RendererModuleName( "Renderer" );
  // @todo: JIRA UE-41879 and UE-43829 - added defensive guards against memory trampling on this render command to try and ascertain why it occasionally crashes
  uint32 MemoryGuard1 = 0xaffec7ed;

  // Load the renderermodule on the main thread, as the module manager is not thread-safe, and copy the ptr into the render command, along with 'this' (which is protected by BlockUntilAvailable in ~FViewportSurfaceReader())
  IRendererModule* RendererModule = &FModuleManager::GetModuleChecked<IRendererModule>(RendererModuleName);

  uint32 MemoryGuard2 = 0xaffec7ed;
  IRendererModule* RendererModuleDebug = RendererModule;

  auto RenderCommand = [=](FRHICommandListImmediate& RHICmdList){

    // @todo: JIRA UE-41879 and UE-43829. If any of these ensures go off, something has overwritten the memory for this render command (buffer underflow/overflow?)
    bool bMemoryTrample = !ensureMsgf(RendererModule, TEXT("RendererModule has become null. This indicates a memory trample.")) ||
      !ensureMsgf(RendererModule == RendererModuleDebug, TEXT("RendererModule and RendererModuleDebug are not equal (0x%016x != 0x%016x). This indicates a memory trample."), (void*)RendererModule, (void*)RendererModuleDebug) ||
      !ensureMsgf(MemoryGuard1 == 0xaffec7ed, TEXT("Memory guard 1 is now 0x%08x, expected 0xaffec7ed."), MemoryGuard1) ||
      !ensureMsgf(MemoryGuard2 == 0xaffec7ed, TEXT("Memory guard 2 is now 0x%08x, expected 0xaffec7ed."), MemoryGuard2);

    if (bMemoryTrample)
    {
      // In the hope that 'this' is still ok, triggering the event will prevent a deadlock. If it's not ok, this may crash, but it was going to crash anyway
      AvailableEvent->Trigger();
      return;
    }

    const FIntPoint TargetSize(ReadbackTexture->GetSizeX(), ReadbackTexture->GetSizeY());

    FPooledRenderTargetDesc OutputDesc = FPooledRenderTargetDesc::Create2DDesc(
      TargetSize,
      ReadbackTexture->GetFormat(),
      FClearValueBinding::None,
      TexCreate_None,
      TexCreate_RenderTargetable,
      false);

    // @todo: JIRA UE-41879 and UE-43829. If any of these ensures go off, something has overwritten the memory for this render command (buffer underflow/overflow?)
    bMemoryTrample = !ensureMsgf(RendererModule, TEXT("RendererModule has become null. This indicates a memory trample.")) ||
      !ensureMsgf(RendererModule == RendererModuleDebug, TEXT("RendererModule and RendererModuleDebug are not equal (0x%16x != 0x%16x). This indicates a memory trample."), (void*)RendererModule, (void*)RendererModuleDebug) ||
      !ensureMsgf(MemoryGuard1 == 0xaffec7ed, TEXT("Memory guard 1 is now 0x%08x, expected 0xaffec7ed."), MemoryGuard1) ||
      !ensureMsgf(MemoryGuard2 == 0xaffec7ed, TEXT("Memory guard 2 is now 0x%08x, expected 0xaffec7ed."), MemoryGuard2);

    if (bMemoryTrample)
    {
      // In the hope that 'this' is still ok, triggering the event will prevent a deadlock. If it's not ok, this may crash, but it was going to crash anyway
      AvailableEvent->Trigger();
      return;
    }

    TRefCountPtr<IPooledRenderTarget> ResampleTexturePooledRenderTarget;
    RendererModule->RenderTargetPoolFindFreeElement(RHICmdList, OutputDesc, ResampleTexturePooledRenderTarget, TEXT("ResampleTexture"));
    check(ResampleTexturePooledRenderTarget);

    const FSceneRenderTargetItem& DestRenderTarget = ResampleTexturePooledRenderTarget->GetRenderTargetItem();

    SetRenderTarget(RHICmdList, DestRenderTarget.TargetableTexture, FTextureRHIRef());
    RHICmdList.SetViewport(0, 0, 0.0f, TargetSize.X, TargetSize.Y, 1.0f);

    FGraphicsPipelineStateInitializer GraphicsPSOInit;
    RHICmdList.ApplyCachedRenderTargets(GraphicsPSOInit);
    GraphicsPSOInit.BlendState = TStaticBlendState<>::GetRHI();
    GraphicsPSOInit.RasterizerState = TStaticRasterizerState<>::GetRHI();
    GraphicsPSOInit.DepthStencilState = TStaticDepthStencilState<false,CF_Always>::GetRHI();

    const ERHIFeatureLevel::Type FeatureLevel = GMaxRHIFeatureLevel;

    TShaderMap<FGlobalShaderType>* ShaderMap = GetGlobalShaderMap(FeatureLevel);
    TShaderMapRef<FScreenVS> VertexShader(ShaderMap);
    TShaderMapRef<FScreenPS> PixelShader(ShaderMap);

    GraphicsPSOInit.BoundShaderState.VertexDeclarationRHI = RendererModule->GetFilterVertexDeclaration().VertexDeclarationRHI;
    GraphicsPSOInit.BoundShaderState.VertexShaderRHI = GETSAFERHISHADER_VERTEX(*VertexShader);
    GraphicsPSOInit.BoundShaderState.PixelShaderRHI = GETSAFERHISHADER_PIXEL(*PixelShader);
    GraphicsPSOInit.PrimitiveType = PT_TriangleList;

    SetGraphicsPipelineState(RHICmdList, GraphicsPSOInit);

    FTexture2DRHIRef SourceBackBuffer = RHICmdList.GetViewportBackBuffer(ViewportRHI);

    if (TargetSize.X != SourceBackBuffer->GetSizeX() || TargetSize.Y != SourceBackBuffer->GetSizeY())
    {
      PixelShader->SetParameters(RHICmdList, TStaticSamplerState<SF_Bilinear>::GetRHI(), SourceBackBuffer);
    }
    else
    {
      PixelShader->SetParameters(RHICmdList, TStaticSamplerState<SF_Point>::GetRHI(), SourceBackBuffer);
    }

    float U = float(CaptureRect.Min.X) / float(SourceBackBuffer->GetSizeX());
    float V = float(CaptureRect.Min.Y) / float(SourceBackBuffer->GetSizeY());
    float SizeU = float(CaptureRect.Max.X) / float(SourceBackBuffer->GetSizeX()) - U;
    float SizeV = float(CaptureRect.Max.Y) / float(SourceBackBuffer->GetSizeY()) - V;

    RendererModule->DrawRectangle(
      RHICmdList,
      0, 0,									// Dest X, Y
      TargetSize.X,							// Dest Width
      TargetSize.Y,							// Dest Height
      U, V,									// Source U, V
      1, 1,									// Source USize, VSize
      CaptureRect.Max - CaptureRect.Min,		// Target buffer size
      FIntPoint(1, 1),						// Source texture size
      *VertexShader,
      EDRF_Default);

    // Asynchronously copy render target from GPU to CPU
    const bool bKeepOriginalSurface = false;
    RHICmdList.CopyToResolveTarget(
      DestRenderTarget.TargetableTexture,
      ReadbackTexture,
      bKeepOriginalSurface,
      FResolveParams());

    void* ColorDataBuffer = nullptr;

    int32 Width = 0, Height = 0;
    RHICmdList.MapStagingSurface(ReadbackTexture, ColorDataBuffer, Width, Height);

    Callback((FColor*)ColorDataBuffer, Width, Height);

    RHICmdList.UnmapStagingSurface(ReadbackTexture);
    AvailableEvent->Trigger();
  };

  ENQUEUE_UNIQUE_RENDER_COMMAND_ONEPARAMETER(
    ResolveCaptureFrameTexture,
    TFunction<void(FRHICommandListImmediate&)>, InRenderCommand, RenderCommand,
  {
    InRenderCommand(RHICmdList);
  });

```
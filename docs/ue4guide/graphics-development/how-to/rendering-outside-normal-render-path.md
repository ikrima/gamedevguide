---
sortIndex: 2
sidebar: ue4guide
---

# Rendering Outside Normal Render Path

**Also take a look at SceneCaptureRenderer:** which creates a separate renderer to do captures

```cpp
RHICreateTargetableShaderResource3D

DrawWindow_RenderThread
FTexture2DRHIRef ViewportRT = bRenderedStereo ? nullptr : ViewportInfo.GetRenderTargetTexture();
FTexture2DRHIRef BackBuffer = (ViewportRT) ? ViewportRT : RHICmdList.GetViewportBackBuffer(ViewportInfo.ViewportRHI);

FResolveParams ResolveParams;
                bClear = true; // Force a clear of the UI buffer to black

                // Grab HDR backbuffer
                RHICmdList.CopyToResolveTarget(FinalBuffer, ViewportInfo.HDRSourceRT, false, ResolveParams);

                // UI backbuffer is temp target
                BackBuffer = ViewportInfo.UITargetRT;

// Reset the backbuffer as our color render target and also set a depth stencil buffer
FRHIRenderTargetView ColorView(BackBuffer, 0, -1, bClear ? ERenderTargetLoadAction::EClear : ERenderTargetLoadAction::ELoad, ERenderTargetStoreAction::EStore);
    FRHIDepthRenderTargetView DepthStencilView(ViewportInfo.DepthStencil, ERenderTargetLoadAction::ENoAction, ERenderTargetStoreAction::ENoAction, ERenderTargetLoadAction::ENoAction, ERenderTargetStoreAction::EStore);
    FRHISetRenderTargetsInfo Info(1, &ColorView, DepthStencilView);

// Clear the stencil buffer
RHICmdList.SetRenderTargetsAndClear(Info);


SCOPED_DRAW_EVENT(RHICmdList, SlateUI_Composition);

static const FName RendererModuleName("Renderer");
IRendererModule& RendererModule = FModuleManager::GetModuleChecked<IRendererModule>(RendererModuleName);

const auto FeatureLevel = GMaxRHIFeatureLevel;
auto ShaderMap = GetGlobalShaderMap(FeatureLevel);

// Generate composition LUT
if (bLUTStale)
{
    SetRenderTarget(RHICmdList, ViewportInfo.ColorSpaceLUTRT, FTextureRHIRef());

    FGraphicsPipelineStateInitializer GraphicsPSOInit;
    RHICmdList.ApplyCachedRenderTargets(GraphicsPSOInit);
    GraphicsPSOInit.BlendState = TStaticBlendState<>::GetRHI();
    GraphicsPSOInit.RasterizerState = TStaticRasterizerState<>::GetRHI();
    GraphicsPSOInit.DepthStencilState = TStaticDepthStencilState<false, CF_Always>::GetRHI();

    TShaderMapRef<FWriteToSliceVS> VertexShader(ShaderMap);
    TOptionalShaderMapRef<FWriteToSliceGS> GeometryShader(ShaderMap);
    TShaderMapRef<FCompositeLUTGenerationPS> PixelShader(ShaderMap);
    const FVolumeBounds VolumeBounds(CompositionLUTSize);

    GraphicsPSOInit.BoundShaderState.VertexDeclarationRHI = GScreenVertexDeclaration.VertexDeclarationRHI;
    GraphicsPSOInit.BoundShaderState.VertexShaderRHI = GETSAFERHISHADER_VERTEX(*VertexShader);
    GraphicsPSOInit.BoundShaderState.GeometryShaderRHI = GETSAFERHISHADER_GEOMETRY(*GeometryShader);
    GraphicsPSOInit.BoundShaderState.PixelShaderRHI = GETSAFERHISHADER_PIXEL(*PixelShader);
    GraphicsPSOInit.PrimitiveType = PT_TriangleStrip;
    SetGraphicsPipelineState(RHICmdList, GraphicsPSOInit);

    VertexShader->SetParameters(RHICmdList, VolumeBounds, FIntVector(VolumeBounds.MaxX - VolumeBounds.MinX));
    if(GeometryShader.IsValid())
    {
        GeometryShader->SetParameters(RHICmdList, VolumeBounds.MinZ);
    }
    PixelShader->SetParameters(RHICmdList);

    RasterizeToVolumeTexture(RHICmdList, VolumeBounds);

    FResolveParams ResolveParams;
    RHICmdList.CopyToResolveTarget(ViewportInfo.ColorSpaceLUTRT, ViewportInfo.ColorSpaceLUTSRV, false, ResolveParams);
}

// Composition pass
{
    FResolveParams ResolveParams;
    RHICmdList.CopyToResolveTarget(ViewportInfo.UITargetRT, ViewportInfo.UITargetSRV, false, ResolveParams);

    SetRenderTarget(RHICmdList, FinalBuffer, FTextureRHIRef());

    FGraphicsPipelineStateInitializer GraphicsPSOInit;
    RHICmdList.ApplyCachedRenderTargets(GraphicsPSOInit);
    GraphicsPSOInit.BlendState = TStaticBlendState<>::GetRHI();
    GraphicsPSOInit.RasterizerState = TStaticRasterizerState<>::GetRHI();
    GraphicsPSOInit.DepthStencilState = TStaticDepthStencilState<false, CF_Always>::GetRHI();

    TShaderMapRef<FScreenVS> VertexShader(ShaderMap);

    if (HDROutputDevice == 5 || HDROutputDevice == 6)
    {
        // ScRGB encoding
        TShaderMapRef<FCompositePS<1>> PixelShader(ShaderMap);

        GraphicsPSOInit.BoundShaderState.VertexDeclarationRHI = RendererModule.GetFilterVertexDeclaration().VertexDeclarationRHI;
        GraphicsPSOInit.BoundShaderState.VertexShaderRHI = GETSAFERHISHADER_VERTEX(*VertexShader);
        GraphicsPSOInit.BoundShaderState.PixelShaderRHI = GETSAFERHISHADER_PIXEL(*PixelShader);
        GraphicsPSOInit.PrimitiveType = PT_TriangleList;

        SetGraphicsPipelineState(RHICmdList, GraphicsPSOInit);

        PixelShader->SetParameters(RHICmdList, ViewportInfo.UITargetSRV, ViewportInfo.HDRSourceSRV, ViewportInfo.ColorSpaceLUTSRV);
    }
    else
    {
        // ST2084 (PQ) encoding
        TShaderMapRef<FCompositePS<0>> PixelShader(ShaderMap);

        GraphicsPSOInit.BoundShaderState.VertexDeclarationRHI = RendererModule.GetFilterVertexDeclaration().VertexDeclarationRHI;
        GraphicsPSOInit.BoundShaderState.VertexShaderRHI = GETSAFERHISHADER_VERTEX(*VertexShader);
        GraphicsPSOInit.BoundShaderState.PixelShaderRHI = GETSAFERHISHADER_PIXEL(*PixelShader);
        GraphicsPSOInit.PrimitiveType = PT_TriangleList;

        SetGraphicsPipelineState(RHICmdList, GraphicsPSOInit);

        PixelShader->SetParameters(RHICmdList, ViewportInfo.UITargetSRV, ViewportInfo.HDRSourceSRV, ViewportInfo.ColorSpaceLUTSRV);
    }

    RendererModule.DrawRectangle(
        RHICmdList,
        0, 0,
        ViewportWidth, ViewportHeight,
        0, 0,
        ViewportWidth, ViewportHeight,
        FIntPoint(ViewportWidth, ViewportHeight),
        FIntPoint(ViewportWidth, ViewportHeight),
        *VertexShader,
        EDRF_UseTriangleOptimization);
}

RHICmdList.TransitionResource(EResourceTransitionAccess::EReadable, BackBuffer);
```

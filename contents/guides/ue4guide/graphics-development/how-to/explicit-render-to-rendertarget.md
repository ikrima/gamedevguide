---
sortIndex: 1
---

# Explicit RenderTarget Operations

## Gamethread Update & Upload To GPU

Look at **UCanvasRenderTarget2D** & **UCanvas**

```cpp
void UCanvasRenderTarget2D::RepaintCanvas()
{
  // Create or find the canvas object to use to render onto the texture.  Multiple canvas render target textures can share the same canvas.
  static const FName CanvasName(TEXT("CanvasRenderTarget2DCanvas"));
  UCanvas* Canvas = (UCanvas*)StaticFindObjectFast(UCanvas::StaticClass(), GetTransientPackage(), CanvasName);
  if (Canvas == nullptr)
  {
    Canvas = NewObject<UCanvas>(GetTransientPackage(), CanvasName);
    Canvas->AddToRoot();
  }

  // Create the FCanvas which does the actual rendering.
  const UWorld* WorldPtr = World.Get();
  const ERHIFeatureLevel::Type FeatureLevel = WorldPtr != nullptr ? World->FeatureLevel : GMaxRHIFeatureLevel;
  FCanvas RenderCanvas(GameThread_GetRenderTargetResource(), nullptr, FApp::GetCurrentTime() - GStartTime, FApp::GetDeltaTime(), FApp::GetCurrentTime() - GStartTime, FeatureLevel);

  Canvas->Init(GetSurfaceWidth(), GetSurfaceHeight(), nullptr, &RenderCanvas);
  Canvas->Update();

  // Update the resource immediately to remove it from the deferred resource update list. This prevents the texture
  // from being cleared each frame.
  UpdateResourceImmediate(bShouldClearRenderTargetOnReceiveUpdate);

  // Enqueue the rendering command to set up the rendering canvas.
  ENQUEUE_UNIQUE_RENDER_COMMAND_ONEPARAMETER
    (
      CanvasRenderTargetMakeCurrentCommand,
      FTextureRenderTarget2DResource*,
      TextureRenderTarget,
      (FTextureRenderTarget2DResource*)GameThread_GetRenderTargetResource(),
      {
        SetRenderTarget(RHICmdList, TextureRenderTarget->GetRenderTargetTexture(), FTexture2DRHIRef(), true);
        RHICmdList.SetViewport(0, 0, 0.0f, TextureRenderTarget->GetSizeXY().X, TextureRenderTarget->GetSizeXY().Y, 1.0f);
      }
  );


  if (!IsPendingKill() && OnCanvasRenderTargetUpdate.IsBound())
  {
    OnCanvasRenderTargetUpdate.Broadcast(Canvas, GetSurfaceWidth(), GetSurfaceHeight());
  }

  ReceiveUpdate(Canvas, GetSurfaceWidth(), GetSurfaceHeight());

  // Clean up and flush the rendering canvas.
  Canvas->Canvas = nullptr;
  RenderCanvas.Flush_GameThread();

  // Enqueue the rendering command to copy the freshly rendering texture resource back to the render target RHI
  // so that the texture is updated and available for rendering.
  ENQUEUE_UNIQUE_RENDER_COMMAND_ONEPARAMETER
    (
      CanvasRenderTargetResolveCommand,
      FTextureRenderTargetResource*,
      RenderTargetResource,
      GameThread_GetRenderTargetResource(),
      {
        RHICmdList.CopyToResolveTarget(RenderTargetResource->GetRenderTargetTexture(), RenderTargetResource->TextureRHI, true, FResolveParams());
      }
  );
}
```

## Render from Game Thread:

```cpp
bool FCanvasTriangleRendererItem::Render_GameThread(const FCanvas* Canvas)
{
  float CurrentRealTime = 0.f;
  float CurrentWorldTime = 0.f;
  float DeltaWorldTime = 0.f;

  if (!bFreezeTime)
  {
    CurrentRealTime = Canvas->GetCurrentRealTime();
    CurrentWorldTime = Canvas->GetCurrentWorldTime();
    DeltaWorldTime = Canvas->GetCurrentDeltaWorldTime();
  }

  checkSlow(Data);
  // current render target set for the canvas
  const FRenderTarget* CanvasRenderTarget = Canvas->GetRenderTarget();
  FSceneViewFamily* ViewFamily = new FSceneViewFamily(FSceneViewFamily::ConstructionValues(
    CanvasRenderTarget,
    Canvas->GetScene(),
    FEngineShowFlags(ESFIM_Game))
    .SetWorldTimes(CurrentWorldTime, DeltaWorldTime, CurrentRealTime)
    .SetGammaCorrection(CanvasRenderTarget->GetDisplayGamma()));

  FIntRect ViewRect(FIntPoint(0, 0), CanvasRenderTarget->GetSizeXY());

  // make a temporary view
  FSceneViewInitOptions ViewInitOptions;
  ViewInitOptions.ViewFamily = ViewFamily;
  ViewInitOptions.SetViewRectangle(ViewRect);
  ViewInitOptions.ViewOrigin = FVector::ZeroVector;
  ViewInitOptions.ViewRotationMatrix = FMatrix::Identity;
  ViewInitOptions.ProjectionMatrix = Data->Transform.GetMatrix();
  ViewInitOptions.BackgroundColor = FLinearColor::Black;
  ViewInitOptions.OverlayColor = FLinearColor::White;

  FSceneView* View = new FSceneView(ViewInitOptions);

  bool bNeedsToSwitchVerticalAxis = RHINeedsToSwitchVerticalAxis(Canvas->GetShaderPlatform()) && XOR(IsMobileHDR(),Canvas->GetAllowSwitchVerticalAxis());

  struct FDrawTriangleParameters
  {
    FSceneView* View;
    FRenderData* RenderData;
    uint32 bIsHitTesting : 1;
    uint32 AllowedCanvasModes;
  };
  FDrawTriangleParameters DrawTriangleParameters =
  {
    View,
    Data,
    (uint32)Canvas->IsHitTesting(),
    Canvas->GetAllowedModes()
  };

  InitTriangleBuffers(&Data->VertexFactory, Data->Triangles, *View, bNeedsToSwitchVerticalAxis);

  FDrawTriangleParameters Parameters = DrawTriangleParameters;
  ENQUEUE_RENDER_COMMAND(DrawTriangleCommand)(
    [Parameters](FRHICommandListImmediate& RHICmdList)
    {
      FDrawingPolicyRenderState DrawRenderState(*Parameters.View);

      // disable depth test & writes
      DrawRenderState.SetDepthStencilState(TStaticDepthStencilState<false, CF_Always>::GetRHI());

      SCOPED_DRAW_EVENT(RHICmdList, CanvasDrawTriangle);
      for (int32 TriIdx = 0; TriIdx < Parameters.RenderData->Triangles.Num(); TriIdx++)
      {
        const FRenderData::FTriangleInst& Tri = Parameters.RenderData->Triangles[TriIdx];
        // update the FMeshBatch
        FMeshBatch& TriMesh = Parameters.RenderData->TriMesh.TriMeshElement;
        TriMesh.VertexFactory = &Parameters.RenderData->VertexFactory;
        TriMesh.MaterialRenderProxy = Parameters.RenderData->MaterialRenderProxy;
        TriMesh.Elements[0].BaseVertexIndex = 3 * TriIdx;

        GetRendererModule().DrawTileMesh(RHICmdList, DrawRenderState, *Parameters.View, TriMesh, Parameters.bIsHitTesting, Tri.HitProxyId);
      }

      Parameters.RenderData->StaticMeshVertexBuffers.PositionVertexBuffer.ReleaseResource();
      Parameters.RenderData->StaticMeshVertexBuffers.StaticMeshVertexBuffer.ReleaseResource();
      Parameters.RenderData->StaticMeshVertexBuffers.ColorVertexBuffer.ReleaseResource();
      Parameters.RenderData->TriMesh.ReleaseResource();
      Parameters.RenderData->VertexFactory.ReleaseResource();

      delete Parameters.View->Family;
      delete Parameters.View;
      if (Parameters.AllowedCanvasModes & FCanvas::Allow_DeleteOnRender)
      {
        delete Parameters.RenderData;
      }
    });

  if (Canvas->GetAllowedModes() & FCanvas::Allow_DeleteOnRender)
  {
    Data = nullptr;
  }
  return true;
}
```
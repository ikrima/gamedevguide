Look at **UCanvasRenderTarget2D** & **UCanvas**:

 

**Update/set rendertarget from Gamethread & send texture to GPU:**

void UCanvasRenderTarget2D::RepaintCanvas()

{

// Create or find the canvas object to use to render onto the texture. Multiple canvas render target textures can share the same canvas.

static const FName CanvasName(TEXT("CanvasRenderTarget2DCanvas"));

UCanvas\* Canvas = (UCanvas\*)StaticFindObjectFast(UCanvas::StaticClass(), GetTransientPackage(), CanvasName);

if (Canvas == nullptr)

{

Canvas = NewObject&lt;UCanvas&gt;(GetTransientPackage(), CanvasName);

Canvas-&gt;AddToRoot();

}

 

// Create the FCanvas which does the actual rendering.

const UWorld\* WorldPtr = World.Get();

const ERHIFeatureLevel::Type FeatureLevel = WorldPtr != nullptr ? World-&gt;FeatureLevel : GMaxRHIFeatureLevel;

FCanvas RenderCanvas(GameThread\_GetRenderTargetResource(), nullptr, FApp::GetCurrentTime() - GStartTime, FApp::GetDeltaTime(), FApp::GetCurrentTime() - GStartTime, FeatureLevel);

 

Canvas-&gt;Init(GetSurfaceWidth(), GetSurfaceHeight(), nullptr, &RenderCanvas);

Canvas-&gt;Update();

 

// Update the resource immediately to remove it from the deferred resource update list. This prevents the texture

// from being cleared each frame.

UpdateResourceImmediate(bShouldClearRenderTargetOnReceiveUpdate);

 

// Enqueue the rendering command to set up the rendering canvas.

ENQUEUE\_UNIQUE\_RENDER\_COMMAND\_ONEPARAMETER

(

CanvasRenderTargetMakeCurrentCommand,

FTextureRenderTarget2DResource\*,

TextureRenderTarget,

(FTextureRenderTarget2DResource\*)GameThread\_GetRenderTargetResource(),

{

SetRenderTarget(RHICmdList, TextureRenderTarget-&gt;GetRenderTargetTexture(), FTexture2DRHIRef(), true);

RHICmdList.SetViewport(0, 0, 0.0f, TextureRenderTarget-&gt;GetSizeXY().X, TextureRenderTarget-&gt;GetSizeXY().Y, 1.0f);

}

);

 

 

if (!IsPendingKill() && OnCanvasRenderTargetUpdate.IsBound())

{

OnCanvasRenderTargetUpdate.Broadcast(Canvas, GetSurfaceWidth(), GetSurfaceHeight());

}

 

ReceiveUpdate(Canvas, GetSurfaceWidth(), GetSurfaceHeight());

 

// Clean up and flush the rendering canvas.

Canvas-&gt;Canvas = nullptr;

RenderCanvas.Flush\_GameThread();

 

// Enqueue the rendering command to copy the freshly rendering texture resource back to the render target RHI

// so that the texture is updated and available for rendering.

ENQUEUE\_UNIQUE\_RENDER\_COMMAND\_ONEPARAMETER

(

CanvasRenderTargetResolveCommand,

FTextureRenderTargetResource\*,

RenderTargetResource,

GameThread\_GetRenderTargetResource(),

{

RHICmdList.CopyToResolveTarget(RenderTargetResource-&gt;GetRenderTargetTexture(), RenderTargetResource-&gt;TextureRHI, true, FResolveParams());

​				}

​	);

}

 

 

**Render from Game Thread:**

 

bool FCanvasTriangleRendererItem::Render\_GameThread(const FCanvas\* Canvas)

{

​	float CurrentRealTime = 0.f;

​	float CurrentWorldTime = 0.f;

​	float DeltaWorldTime = 0.f;

 

​	if (!bFreezeTime)

​	{

​		CurrentRealTime = Canvas-&gt;GetCurrentRealTime();

​		CurrentWorldTime = Canvas-&gt;GetCurrentWorldTime();

​		DeltaWorldTime = Canvas-&gt;GetCurrentDeltaWorldTime();

}

 

​	checkSlow(Data);

​	// current render target set for the canvas

​	const FRenderTarget\* CanvasRenderTarget = Canvas-&gt;GetRenderTarget();

​	FSceneViewFamily\* ViewFamily = new FSceneViewFamily(FSceneViewFamily::ConstructionValues(

​	CanvasRenderTarget,

​	Canvas-&gt;GetScene(),

​	FEngineShowFlags(ESFIM\_Game))

​	.SetWorldTimes(CurrentWorldTime, DeltaWorldTime, CurrentRealTime)

​	.SetGammaCorrection(CanvasRenderTarget-&gt;GetDisplayGamma()));

 

​	FIntRect ViewRect(FIntPoint(0, 0), CanvasRenderTarget-&gt;GetSizeXY());

 

// make a temporary view

FSceneViewInitOptions ViewInitOptions;

ViewInitOptions.ViewFamily = ViewFamily;

ViewInitOptions.SetViewRectangle(ViewRect);

ViewInitOptions.ViewOrigin = FVector::ZeroVector;

ViewInitOptions.ViewRotationMatrix = FMatrix::Identity;

ViewInitOptions.ProjectionMatrix = Data-&gt;Transform.GetMatrix();

ViewInitOptions.BackgroundColor = FLinearColor::Black;

ViewInitOptions.OverlayColor = FLinearColor::White;

 

FSceneView\* View = new FSceneView(ViewInitOptions);

 

bool bNeedsToSwitchVerticalAxis = RHINeedsToSwitchVerticalAxis(Canvas-&gt;GetShaderPlatform()) && XOR(IsMobileHDR(),Canvas-&gt;GetAllowSwitchVerticalAxis());

 

struct FDrawTriangleParameters

{

​		FSceneView\* View;

​		FRenderData\* RenderData;

​		uint32 bIsHitTesting : 1;

​		uint32 AllowedCanvasModes;

};

​		FDrawTriangleParameters DrawTriangleParameters =

{

​		View,

​		Data,

​		(uint32)Canvas-&gt;IsHitTesting(),

​		Canvas-&gt;GetAllowedModes()

};

 

​	InitTriangleBuffers(&Data-&gt;VertexFactory, Data-&gt;Triangles, \*View, bNeedsToSwitchVerticalAxis);

 

​	FDrawTriangleParameters Parameters = DrawTriangleParameters;

​	ENQUEUE\_RENDER\_COMMAND(DrawTriangleCommand)(

​	[Parameters\](FRHICommandListImmediate& RHICmdList)        

​	{

​	FDrawingPolicyRenderState DrawRenderState(\*Parameters.View);

 

// disable depth test & writes

DrawRenderState.SetDepthStencilState(TStaticDepthStencilState&lt;false, CF\_Always&gt;::GetRHI());

 

​	SCOPED\_DRAW\_EVENT(RHICmdList, CanvasDrawTriangle);

​	for (int32 TriIdx = 0; TriIdx &lt; Parameters.RenderData-&gt;Triangles.Num(); TriIdx++)

​	{

​	const FRenderData::FTriangleInst& Tri = Parameters.RenderData-&gt;Triangles\[TriIdx\];

​	// update the FMeshBatch

​	FMeshBatch& TriMesh = Parameters.RenderData-&gt;TriMesh.TriMeshElement;

​	TriMesh.VertexFactory = &Parameters.RenderData-&gt;VertexFactory;

​	TriMesh.MaterialRenderProxy = Parameters.RenderData-&gt;MaterialRenderProxy;

​	TriMesh.Elements\[0\].BaseVertexIndex = 3 \* TriIdx;

 

GetRendererModule().DrawTileMesh(RHICmdList, DrawRenderState, \*Parameters.View, TriMesh, Parameters.bIsHitTesting, Tri.HitProxyId);

​	}

 

​	Parameters.RenderData-&gt;StaticMeshVertexBuffers.PositionVertexBuffer.ReleaseResource();

​	Parameters.RenderData-&gt;StaticMeshVertexBuffers.StaticMeshVertexBuffer.ReleaseResource();

​	Parameters.RenderData-&gt;StaticMeshVertexBuffers.ColorVertexBuffer.ReleaseResource();

​	Parameters.RenderData-&gt;TriMesh.ReleaseResource();

​	Parameters.RenderData-&gt;VertexFactory.ReleaseResource();

 

​	delete Parameters.View-&gt;Family;

​	delete Parameters.View;

​	if (Parameters.AllowedCanvasModes & FCanvas::Allow\_DeleteOnRender)

​	{

​			delete Parameters.RenderData;

​		}

});

 

if (Canvas-&gt;GetAllowedModes() & FCanvas::Allow\_DeleteOnRender)

​	{

​	Data = nullptr;

}

return true;

}

---
sortIndex: 4
sidebar: ue4guide
---

# Brain Dump of Useful Functions

```cpp
/** 
      * Called during the visibility and shadow setup for each primitives with either static or dynamic relevancy, so we can store custom data for the frame that can be reused later. 
      * Keep in mind this can be called in multihread as it's called during the InitViews()
      * This will only be called if bUseCustomViewData is true in the GetViewRelevance()
      * @param InView - Current View
      * @param InViewLODScale - View LOD scale
      * @param InCustomDataMemStack - MemStack to allocate the custom data
      * @param InIsStaticRelevant - Tell us if it was called in a static of dynamic relevancy context
      * @param InVisiblePrimitiveLODMask - Calculated LODMask for visibile primitive in static relevancy
      * @param InMeshScreenSizeSquared - Computed mesh batch screen size, passed to prevent recalculation
      */
     ENGINE_API virtual void* InitViewCustomData(const FSceneView& InView, float InViewLODScale, FMemStackBase& InCustomDataMemStack, bool InIsStaticRelevant = false, const struct FLODMask* InVisiblePrimitiveLODMask = nullptr, float InMeshScreenSizeSquared = -1.0f) { return nullptr; }

/**
      * Called during post visibility and shadow setup, just before the frame is rendered. It can be used to update custom data that had a dependency between them.
      * Keep in mind this can be called in multihread.
      * This will only be called on primitive that added view custom data during the InitViewCustomData.
      * @param InView - Current View
      * @param InViewCustomData - Custom data to update
      */
     ENGINE_API virtual void PostInitViewCustomData(const FSceneView& InView, void* InViewCustomData) { }

```

## Uniform expressions

```cpp
int32 UMaterialExpressionConstant::Compile(class FMaterialCompiler* Compiler, int32 OutputIndex)
{
     return Compiler->Constant(R);

     virtual int32 FHLSLMaterialTranslator::Constant(float X) override
          {
               return AddUniformExpression(new FMaterialUniformExpressionConstant(FLinearColor(X,X,X,X),MCT_Float),MCT_Float,TEXT("%0.8f"),X);
          }


int32 UMaterialExpressionTime::Compile(class FMaterialCompiler* Compiler, int32 OutputIndex)
     return bIgnorePause ? Compiler->RealTime(bOverride_Period, Period) : Compiler->GameTime(bOverride_Period, Period);

     virtual int32 FHLSLMaterialTranslator::GameTime(bool bPeriodic, float Period) override
     return AddUniformExpression(
                    new FMaterialUniformExpressionFmod(
                         new FMaterialUniformExpressionTime(),
                         new FMaterialUniformExpressionConstant(FLinearColor(Period, Period, Period, Period), MCT_Float)
                         ),
                    MCT_Float, TEXT("")
                    );
```

## Implement them as

```cpp
**
 * Represents an expression which only varies with uniform inputs.
 */
class FMaterialUniformExpression : public FRefCountedObject
{
public:

     virtual ~FMaterialUniformExpression() {}

     virtual FMaterialUniformExpressionType* GetType() const = 0;
     virtual void Serialize(FArchive& Ar) = 0;
     virtual void GetNumberValue(const struct FMaterialRenderContext& Context,FLinearColor& OutValue) const {}
     virtual class FMaterialUniformExpressionTexture* GetTextureUniformExpression() { return nullptr; }
     virtual class FMaterialUniformExpressionExternalTexture* GetExternalTextureUniformExpression() { return nullptr; }
     virtual bool IsConstant() const { return false; }
     virtual bool IsChangingPerFrame() const { return false; }
     virtual bool IsIdentical(const FMaterialUniformExpression* OtherExpression) const { return false; }
};

 */
class FMaterialUniformExpressionRealTime: public FMaterialUniformExpression
{
     DECLARE_MATERIALUNIFORMEXPRESSION_TYPE(FMaterialUniformExpressionRealTime);
public:

     // FMaterialUniformExpression interface.
     virtual void Serialize(FArchive& Ar)
     {
     }
     virtual void GetNumberValue(const FMaterialRenderContext& Context,FLinearColor& OutValue) const
     {
          OutValue.R = Context.RealTime;
          OutValue.G = Context.RealTime;
          OutValue.B = Context.RealTime;
          OutValue.A = Context.RealTime;
     }
     virtual bool IsConstant() const
     {
          return false;
     }
     virtual bool IsChangingPerFrame() const { return true; }
     virtual bool IsIdentical(const FMaterialUniformExpression* OtherExpression) const
     {
          return GetType() == OtherExpression->GetType();
     }
};




/**
 */
class FMaterialUniformExpressionLength: public FMaterialUniformExpression
{
     DECLARE_MATERIALUNIFORMEXPRESSION_TYPE(FMaterialUniformExpressionLength);
public:

     FMaterialUniformExpressionLength() : ValueType(MCT_Float) {}
     FMaterialUniformExpressionLength(FMaterialUniformExpression* InX, uint32 InValueType = MCT_Float):
          X(InX),
          ValueType(InValueType)
     {}

     // FMaterialUniformExpression interface.
     virtual void Serialize(FArchive& Ar)
     {
          Ar.UsingCustomVersion(FRenderingObjectVersion::GUID);
          Ar << X;

          if (Ar.CustomVer(FRenderingObjectVersion::GUID) >= FRenderingObjectVersion::TypeHandlingForMaterialSqrtNodes)
          {
               Ar << ValueType;
          }
     }
     virtual void GetNumberValue(const FMaterialRenderContext& Context,FLinearColor& OutValue) const
     {
          FLinearColor ValueX = FLinearColor::Black;
          X->GetNumberValue(Context,ValueX);

          check(ValueType & MCT_Float);
          float LengthSq = ValueX.R * ValueX.R;
          LengthSq += (ValueType >= MCT_Float2) ? ValueX.G * ValueX.G : 0;
          LengthSq += (ValueType >= MCT_Float3) ? ValueX.B * ValueX.B : 0;
          LengthSq += (ValueType >= MCT_Float4) ? ValueX.A * ValueX.A : 0;

          OutValue.R = OutValue.G = OutValue.B = OutValue.A = FMath::Sqrt(LengthSq);
     }
     virtual bool IsConstant() const
     {
          return X->IsConstant();
     }
     virtual bool IsChangingPerFrame() const
     {
          return X->IsChangingPerFrame();
     }
     virtual bool IsIdentical(const FMaterialUniformExpression* OtherExpression) const
     {
          if (GetType() != OtherExpression->GetType())
          {
               return false;
          }
          FMaterialUniformExpressionLength* OtherSqrt = (FMaterialUniformExpressionLength*)OtherExpression;
          return X->IsIdentical(OtherSqrt->X) && ValueType == OtherSqrt->ValueType;
     }

private:
     TRefCountPtr<FMaterialUniformExpression> X;
     uint32 ValueType;
};


class FMaterialUniformExpressionScalarParameter: public FMaterialUniformExpression
```

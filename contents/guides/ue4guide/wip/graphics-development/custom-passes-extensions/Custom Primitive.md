**Add Custom InitView data (used by Landscape Component):**

 

/\*\*   
         \* Called during the visibility and shadow setup for each primitives with either static or dynamic relevancy, so we can store custom data for the frame that can be reused later.   
         \* Keep in mind this can be called in multihread as it's called during the InitViews()  
         \* This will only be called if bUseCustomViewData is true in the GetViewRelevance()  
         \* @param InView - Current View  
          \* @param InViewLODScale - View LOD scale  
           \* @param InCustomDataMemStack - MemStack to allocate the custom data  
            \* @param InIsStaticRelevant - Tell us if it was called in a static of dynamic relevancy context  
            \* @param InVisiblePrimitiveLODMask - Calculated LODMask for visibile primitive in static relevancy  
            \* @param InMeshScreenSizeSquared - Computed mesh batch screen size, passed to prevent recalculation  
         \*/  
        ENGINE\_API virtual void\* InitViewCustomData(const FSceneView& InView, float InViewLODScale, FMemStackBase& InCustomDataMemStack, bool InIsStaticRelevant = false, const struct FLODMask\* InVisiblePrimitiveLODMask = nullptr, float InMeshScreenSizeSquared = -1.0f) { return nullptr; }

 

 

 

/\*\*  
         \* Called during post visibility and shadow setup, just before the frame is rendered. It can be used to update custom data that had a dependency between them.  
         \* Keep in mind this can be called in multihread.  
         \* This will only be called on primitive that added view custom data during the InitViewCustomData.  
         \* @param InView - Current View  
          \* @param InViewCustomData - Custom data to update  
         \*/          
        ENGINE\_API virtual void PostInitViewCustomData(const FSceneView& InView, void\* InViewCustomData) { }

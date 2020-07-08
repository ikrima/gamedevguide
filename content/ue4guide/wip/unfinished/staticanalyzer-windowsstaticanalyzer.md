---
sidebar: ue4guide
---
public WindowsStaticAnalyzer StaticAnalyzer = WindowsStaticAnalyzer.None;

StencilingGeometry::DrawSphere

\-nothreadtimeout

r.RHIThread.Enable

r.BasePassWriteDepthEvenWithFullPrepass

Search for GetMaterialDomain() and MD_Surface & MD_Volume

GetShadingModel()

bool bOcclusionBeforeBasePass = bIsOcclusionTesting && (((CVarOcclusionQueryLocation.GetValueOnRenderThread() == 1) && bNeedsPrePass) || (!GBBIsSkipPrepassInFwd && IsForwardShadingEnabled(FeatureLevel)));

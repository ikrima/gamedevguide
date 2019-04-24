If you declare a property in a class inside a WITH\_EDITORONLY\_DATA only block, then the cooker will detect that and not cook it, UNLESS you override the Serialize function, in which case you are taking serialization into your own hands.

 

If you specifically serialize content which is WITH\_EDITORONLY\_DATA though then it will get put in the package. You would need to handle the FArchive.IsFilterEditorOnly() case to have the custom serialize code handle this case.

 

*From &lt;<https://udn.unrealengine.com/questions/337026/does-with-editoronly-data-get-cooked.html>&gt;*

 

They are both similar but not identical. In some cases they overlap but they actually mean different things: WITH\_EDITORONLY\_DATA means that the current build supports editor-only data, i.e can load it. WITH\_EDITOR means that the current build has editor functionality. Obviously in some cases one can not exist without the other, but you can have a non-editor builds that can load editor-only data (some of the programs in Engine/Source/Programs work like that) but not the other way around.

 

*From &lt;<https://udn.unrealengine.com/questions/204595/with-editoronly-data-vs-with-editor-and-serializat.html>&gt;*

 

 

WITH\_EDITOR means we are going to compile editor code.

WITH\_EDITORONLY\_DATA means we want to compile the metadata describing the compiled editor code. In general, only the editor cares about this metadata.

A program that needs editor metadata could define WITH\_EDITORONLY\_DATA, such as an editor plugin. Of course as the names suggest, run time code shouldn't use either of these.

If you would like to investigate further:

CoreMiscDefines.h will set WITH\_EDITORONLY\_DATA to true if it is able (not already defined, platform supports it, isnt a server and isnt IOS).

UEBuildTarget.cs does most of the decision making regarding these defines.Notice that WITH\_EDITORONLY\_DATA is conditionally defined here GlobalCompileEnvironment.Config.Definitions.Add("WITH\_EDITORONLY\_DATA=0"); which short circuits the definition in CoreMiscDefines.h.

 

*From &lt;<https://udn.unrealengine.com/questions/304659/the-difference-between-with-editoronly-data-and-wi.html>&gt;*

 

 

 

To exclude from dedicated server:

Implement NeedsLoadForServer() and return false

 

*From &lt;<https://udn.unrealengine.com/questions/365330/determining-references-in-the-cooking-time-for-ded.html>&gt;*

 

To exclude stuff from dedicated client:

\[CookerSettings\]DedicatedClientExclusion

 

*From &lt;<https://udn.unrealengine.com/questions/355061/is-there-existing-functionality-to-remove-server-b.html>&gt;*

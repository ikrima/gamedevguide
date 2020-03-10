---
sortIndex: 3
sidebar: ue4guide
---

Check out these classes:

<https://docs.unrealengine.com/latest/INT/API/Editor/Blutility/index.html>

<https://forums.unrealengine.com/showthread.php?1954-TUTORIAL-Blutility-Running-Blueprint-functions-inside-Editor>

Derive from APlacedEditorUtilityBase to have access to the current selection set in a Blutility

Allow script execution in editor / Enable blueprint function script execution in the editor:

- Execute in Editor: CallInEditor

- Can also set GAllowActorScriptExecutionInEditor = true or TGuardValue&lt;bool AutoRestore(GAllowActorScriptExecutionInEditor, true);

- Also override ShouldTickIfViewportsOnly() const override { return !IsRunningCommandlet() && bVisualizeInEditor; }

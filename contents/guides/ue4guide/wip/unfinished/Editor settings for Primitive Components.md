bUseEditorCompositing = true;

bIsEditorOnly = true;

this-&gt;bTickInEditor

this-&gt;bSelectable

this-&gt;GetHiddenEditorViews()

this-&gt;IsSelectedInEditor()

this-&gt;IsVisibleInEditor()

// Supplies the editor with a view specific to this component (think a view

// from a camera components POV, etc.). Used for PIP preview windows.

// @return True if the component overrides this, and fills out the view info output.

virtual bool GetEditorPreviewInfo(float DeltaTime, FMinimalViewInfo& ViewOut) override { return false; }

 

///\*\* Override delegate used for checking the selection state of a component \*/

DECLARE\_DELEGATE\_RetVal\_OneParam(bool, FSelectionOverride, const UPrimitiveComponent\*);

FSelectionOverride SelectionOverrideDelegate;

---
sidebar: ue4guide
---
bUseEditorCompositing = true;

bIsEditorOnly = true;

this->bTickInEditor

this->bSelectable

this->GetHiddenEditorViews()

this->IsSelectedInEditor()

this->IsVisibleInEditor()

// Supplies the editor with a view specific to this component (think a view

// from a camera components POV, etc.). Used for PIP preview windows.

// @return True if the component overrides this, and fills out the view info output.

virtual bool GetEditorPreviewInfo(float DeltaTime, FMinimalViewInfo& ViewOut) override { return false; }

///\*\* Override delegate used for checking the selection state of a component \*/

DECLARE_DELEGATE_RetVal_OneParam(bool, FSelectionOverride, const UPrimitiveComponent\*);

FSelectionOverride SelectionOverrideDelegate;

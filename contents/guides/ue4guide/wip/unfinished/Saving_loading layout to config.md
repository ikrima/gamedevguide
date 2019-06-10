Saving/loading layout to config

void FMainFrameModule::CreateDefaultMainFrame( const bool bStartImmersive, const bool bStartPIE )::

TSharedRef&lt;FTabManager::FLayout> LoadedLayout = FLayoutSaveRestore::LoadFromConfig(GEditorLayoutIni,

// We persist the positioning of the level editor and the content browser.

// The asset editors currently do not get saved.

FTabManager::NewLayout( "UnrealEd_Layout_v1.4" )

\->AddArea

(

// level editor window

FTabManager::NewPrimaryArea()

\->Split

(

FTabManager::NewStack()

\->SetSizeCoefficient(2.0f)

\->AddTab("LevelEditor", ETabState::OpenedTab)

\->AddTab("DockedToolkit", ETabState::ClosedTab)

)

)

\->AddArea

(

// content browser window

FTabManager::NewArea(WindowSize)

\->Split

(

FTabManager::NewStack()

\->SetSizeCoefficient(1.0f)

\->AddTab("ContentBrowser1Tab", ETabState::ClosedTab)

)

)

\->AddArea

(

// toolkits window

FTabManager::NewArea(WindowSize)

\->SetOrientation(Orient_Vertical)

\->Split

(

FTabManager::NewStack()

\->SetSizeCoefficient(1.0f)

\->AddTab("StandaloneToolkit", ETabState::ClosedTab)

)

\->Split

(

FTabManager::NewStack()

\->SetSizeCoefficient(0.35f)

\->AddTab("MergeTool", ETabState::ClosedTab)

)

)

\->AddArea

(

// settings window

FTabManager::NewArea(WindowSize)

\->Split

(

FTabManager::NewStack()

\->SetSizeCoefficient(1.0f)

\->AddTab("EditorSettings", ETabState::ClosedTab)

\->AddTab("ProjectSettings", ETabState::ClosedTab)

\->AddTab("PluginsEditor", ETabState::ClosedTab)

)

)

);

MainFrameContent = FGlobalTabmanager::Get()->RestoreFrom( LoadedLayout, RootWindow, bEmbedTitleAreaContent );

bLevelEditorIsMainTab = true;

}

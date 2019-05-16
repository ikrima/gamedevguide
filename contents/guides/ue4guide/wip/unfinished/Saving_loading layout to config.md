Saving/loading layout to config

void FMainFrameModule::CreateDefaultMainFrame( const bool bStartImmersive, const bool bStartPIE )::

TSharedRef&lt;FTabManager::FLayout&gt; LoadedLayout = FLayoutSaveRestore::LoadFromConfig(GEditorLayoutIni,

// We persist the positioning of the level editor and the content browser.

// The asset editors currently do not get saved.

FTabManager::NewLayout( "UnrealEd_Layout_v1.4" )

-&gt;AddArea

(

// level editor window

FTabManager::NewPrimaryArea()

-&gt;Split

(

FTabManager::NewStack()

-&gt;SetSizeCoefficient(2.0f)

-&gt;AddTab("LevelEditor", ETabState::OpenedTab)

-&gt;AddTab("DockedToolkit", ETabState::ClosedTab)

)

)

-&gt;AddArea

(

// content browser window

FTabManager::NewArea(WindowSize)

-&gt;Split

(

FTabManager::NewStack()

-&gt;SetSizeCoefficient(1.0f)

-&gt;AddTab("ContentBrowser1Tab", ETabState::ClosedTab)

)

)

-&gt;AddArea

(

// toolkits window

FTabManager::NewArea(WindowSize)

-&gt;SetOrientation(Orient_Vertical)

-&gt;Split

(

FTabManager::NewStack()

-&gt;SetSizeCoefficient(1.0f)

-&gt;AddTab("StandaloneToolkit", ETabState::ClosedTab)

)

-&gt;Split

(

FTabManager::NewStack()

-&gt;SetSizeCoefficient(0.35f)

-&gt;AddTab("MergeTool", ETabState::ClosedTab)

)

)

-&gt;AddArea

(

// settings window

FTabManager::NewArea(WindowSize)

-&gt;Split

(

FTabManager::NewStack()

-&gt;SetSizeCoefficient(1.0f)

-&gt;AddTab("EditorSettings", ETabState::ClosedTab)

-&gt;AddTab("ProjectSettings", ETabState::ClosedTab)

-&gt;AddTab("PluginsEditor", ETabState::ClosedTab)

)

)

);

MainFrameContent = FGlobalTabmanager::Get()-&gt;RestoreFrom( LoadedLayout, RootWindow, bEmbedTitleAreaContent );

bLevelEditorIsMainTab = true;

}

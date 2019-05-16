> **Call property setter in sequencer:**
>
> There's a bit of a trick in Sequencer that works both in C++ and Blueprints where if a function exists called Set\[varname\] then the function will be called with the new value as an argument instead of directly setting the variable. For example, if you have a float variable called 'myFloat' and expose it to cinematics, you can also add a function called 'SetMyFloat' with a float input and that function will be called whenever the value is changed. This way, you can react to the variable changing and update whatever you need to on the actor. It sounds like that's the functionality you're looking for, but let me know if I've misunderstood.
>
> _From &lt;<https://udn.unrealengine.com/questions/419570/sequencer-not-rerunning-construction-script-at-run.html?childToView=420115#answer-420115>&gt;_
>
> **Check if sequencer is active:**
>
> BB::IsSequencerModeActive() which does GLevelEditorModeTools().IsModeActive(EM_SequencerMode)
>
> **Editor Sequencer Utilities:**

- General class for sequencer integration with editor

> class SEQUENCER_API FLevelEditorSequencerIntegration

- How sequencer extends the detail view in the level editor to add keyframe icons

> void FLevelEditorSequencerIntegration::ActivateDetailHandler()
>
> **Get open Sequencer Editor references:**
>
> FLevelSequenceEditorToolkit::IterateOpenToolkits()
>
> FLevelSequenceEditorToolkit::GetSequencer()
>
> /\*\* Called when the tab manager is changed \*/
>
> DECLARE_EVENT_OneParam(FLevelSequenceEditorToolkit, FLevelSequenceEditorToolkitOpened, FLevelSequenceEditorToolkit&);
>
> static FLevelSequenceEditorToolkitOpened& OnOpened();
>
> /\*\* Called when the tab manager is changed \*/
>
> DECLARE_EVENT(FLevelSequenceEditorToolkit, FLevelSequenceEditorToolkitClosed);
>
> FLevelSequenceEditorToolkitClosed& OnClosed() { return OnClosedEvent; }
>
> /\*\* A delegate that is executed when menu object is clicked. Unlike FExtender delegates we pass in the FGuid which exists even for deleted objects. \*/
>
> DECLARE_DELEGATE_TwoParams(FOnBuildCustomContextMenuForGuid, FMenuBuilder&, FGuid);
>
> /\*\* Gets a multicast delegate which is executed whenever the movie scene data is changed. \*/
>
> virtual FOnMovieSceneDataChanged& OnMovieSceneDataChanged() = 0;
>
> /\*\* Gets a multicast delegate which is executed whenever the movie scene bindings are changed. \*/
>
> virtual FOnMovieSceneBindingsChanged& OnMovieSceneBindingsChanged() = 0;
>
> /\*\* Gets a multicast delegate with an array of FGuid of bound objects which is called when the outliner node selection changes. \*/
>
> virtual FOnSelectionChangedObjectGuids& GetSelectionChangedObjectGuids() = 0;
>
> /\*\* Gets a multicast delegate with an array of UMovieSceneTracks which is called when the outliner node selection changes. \*/
>
> virtual FOnSelectionChangedTracks& GetSelectionChangedTracks() = 0;
>
> DECLARE_EVENT_OneParam(ISequencer, FOnPostSave, ISequencer&)
>
> virtual FOnPostSave& OnPostSave() = 0;
>
> AssetEditorOpenedHandle = FAssetEditorManager::Get().OnAssetEditorOpened().AddRaw(this, &FControlRigEditorModule::HandleAssetEditorOpened);
>
> /\*\* Selects an object by GUID \*/
>
> virtual void SelectObject(FGuid ObjectBinding) = 0;
>
> /\*\* Selects property tracks by property path \*/
>
> virtual void SelectByPropertyPaths(const TArray&lt;FString&gt;& InPropertyPaths) = 0;
>
> /\*\* Gets a multicast delegate which is executed whenever the global time changes. \*/
>
> virtual FOnGlobalTimeChanged& OnGlobalTimeChanged() = 0;
>
> /\*\* Gets a multicast delegate which is executed whenever the user begins scrubbing. \*/
>
> virtual FOnBeginScrubbingEvent& OnBeginScrubbingEvent() = 0;
>
> /\*\* Gets a multicast delegate which is executed whenever the user stops scrubbing. \*/
>
> virtual FOnEndScrubbingEvent& OnEndScrubbingEvent() = 0;
>
> **Responding to actors being added to sequencer**
>
> We don't currently have any callbacks related to adding actors to sequencer, but there is a callback when any sequence data changes ISequencer::OnMovieSceneDataChanged which you could use. This can end up getting called quite frequently when doing a drag operation, so you may need to defer handling it to one a frame to avoid performance issues. Another option would be to monitor the level editor selection because any time an actor is added it is selected in the level editor.
>
> _From &lt;<https://udn.unrealengine.com/questions/314123/working-with-sequencer-from-code-in-editor-plugin.html>&gt;_
>
> **Creating/Deleting/Modifying tracks and keys from code**
>
> We have a config based solution for adding tracks automatically when an actor it added to sequencer. You can find the config information under: Engine\\Config\\BaseEditorPerProjectUserSettings.ini
>
> \[/Script/LevelSequenceEditor.LevelSequenceEditorSettings\]
>
> An example is: +TrackSettings=(MatchingActorClass=/Script/Engine.CameraActor,DefaultTracks=(/Script/MovieSceneTracks.MovieScene3DTransformTrack),DefaultPropertyTracks=((ComponentPath="CameraComponent",PropertyPath="FieldOfView")))
>
> This says, when an actor with class /Script/Engine.CameraActor is added, add a track with class /Script/MovieSceneTracks.MovieScene3DTransformTrack, and then add a property track to FieldOfView property on the CameraComponent.
>
> You can then use the ISequencerTrackEditor::AddTrack() method in your track editor class to set up appropriate default key frames for the track.
>
> _From &lt;<https://udn.unrealengine.com/questions/314123/working-with-sequencer-from-code-in-editor-plugin.html>&gt;_
>
> \* \*
>
> **How to set parameter values on struct parameter to event in sequence from c++?**
>
> _From &lt;<https://udn.unrealengine.com/questions/418282/how-to-set-parameter-values-on-struct-parameter-to.html>&gt;_

- FEventPayload Event(\*TrackName);

-

* UObject\* Object = LoadObject&lt;UObject&gt;(NULL, TEXT("/Game/Sequences/MyStruct1.MyStruct1"));

* UScriptStruct\* Struct = nullptr;

* if (Object)

* {

* Struct = Cast&lt;UScriptStruct&gt;(Object);

* }

*

- if (Struct)

- {

- FMovieSceneEventParameters Params(\*Struct);

- Event.Parameters = Params;

- }

> You need to also set the payload for the event by calling FMovieSceneEventParameters::OverwriteWith, passing in a valid pointer to the correct struct type. For instance:

- FMyStruct1 Payload;

- Payload.VectorVelocity - FVector(.5f, .5f, .0f);

- Event.OverwriteWith(static_cast&lt;uint8\*&gt;(&Payload));

-

> _From &lt;<https://udn.unrealengine.com/questions/418282/how-to-set-parameter-values-on-struct-parameter-to.html>&gt;_
>
> &gt;

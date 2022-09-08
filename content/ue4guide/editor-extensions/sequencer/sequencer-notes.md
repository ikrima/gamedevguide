---
sortIndex: 1
sidebar: ue4guide
---

# Overview

## Reference

<https://udn.unrealengine.com/questions/348861/creating-custom-sequencer-tracks-sub-sequence-star.html>

## Evaluation, Execution Tokens, & Pre-Animated State

Details on how Pre-Animated State, Caching Execute & Produce Tokens, Evaluation, Initialize & TearDown work

- <https://udn.unrealengine.com/questions/356242/sequencer-custom-track-414-415.html>
- <https://udn.unrealengine.com/questions/399357/shouldnt-teardown-be-called-on-moviesceneevaltempl.html>
- <https://udn.unrealengine.com/questions/404800/sequencer-template-interrogate.html>

# Data

- UMovieSceneTrack - The track (e.g. Transform, Path, attach) that contains sections. Can have multiple rows. This is a container for you custom sections, and it also defines which runtime classes are created for your custom track.
- UMovieSceneSection - Actual little segments in the track. Contains the data specific to you use case. If you new track will include keyed data, and not just a start time and an end time, this is where the keys and curves are stored as well.
  - UMovieSceneColorSection
  - UMovieSceneBoolSection
    - UMovieSceneSpawnSection

# Runtime

- FMovieSceneEvalTemplate - Core runtime class which implements runtime behavior of custom sections. This is what actually handles evaluating the section and generates the tracks interpolation values as Execution Tokens (i.e. the color value in a color property track)
- IMovieSceneExecutionToken - Actually ends up applying the interpolated values to your object (e.g. apply animation or updating properties)

# UI

- ISequencerSection - UI for rendering the sections. Defines the editor behavior for your custom section.
- FMovieSceneTrackEditor - Creates sequencer sections for your custom section data, and exposes extension points for sequencer track and object menus. Handles injecting buttons/ui/actions into the sequencer UI to create your custom tracks or add keys to your tracks. Defined for each track s.t. Transform, CameraAnim, Single Property types
  - Needs to be registered with the sequencer system module.
  - Ex: ISequencerModule& SequencerModule = FModuleManager::Get().LoadModuleChecked<ISequencerModule>("Sequencer");
    - TrackEditorHandle = SequencerModule.RegisterTrackEditor_Handle(FOnCreateTrackEditor::CreateStatic(&FFaceFXAnimationTrackEditor::CreateTrackEditor));
  - Some useful TrackEditor functionality: Register a track editor's custom property types for animation:
  - ProcAnimTrackEditorHandle = SequencerModule.RegisterPropertyTrackEditor<FBBProcAnimTrackEditor>();

# Misc

- FMovieSceneAnimTypeID: uniquely defines animation type that sequencer is applying (eg spawn, changing transform, property, etc)
  - Need to save preanimation/postanimation state tokens
- Blending happens through accumulations, templating, etc. Must specify that you support it in UMovieSceneNameableTrack() constructor
  - Grep for GetBlendingDataType<>() & TBlendableTokenTraits<>, MultiChannelFromData, ResolveChannelsToData

Spawning: happens through a struct called
- **FMovieSceneSpawnRegister:** This is a base class that manages destroying/spawning and keeping track of objects.

  - Not very extensible yet

  - **FLevelSequenceSpawnRegister & FLevelSequenceSpawnRegisterEditor** are the level sequence specific ones

  - **ULevelSequencePlayer** is what's responsible for actually setting it for its sequences

  - **FLevelSequenceEditorToolkit::Initialize** is what set **FLevelSequecneSpawnRegisterEditor** when in the editor

    - You can initialize the editor sequencer (e.g. actor sequencers) with other spawnregisters/parameters by

      ```cpp
      Sequencer = FModuleManager::LoadModuleChecked<ISequencerModule>("Sequencer").CreateSequencer(SequencerInitParams);
      ```

- **ISequencerEditorObjectBinding:** Extensible mechanism that the editor uses to add bindable objects to a sequence

  - **FLevelSequenceEditorActorBinding:** The main level one for adding bindable actors. Calls Sequencer->AddActors(actorToBind)

  - **FControlRigEditorObjectBinding** is a good example of adding custom spawnables. Calls Sequencer->MakeNewSpawnable()

- **IMovieSceneObjectSpawner:** This is what actually handles UObject creation e.g. NewObject<>/DestroyObject<> calls to the engine.

  - Can override and has extensibility for managing your own cache of objects

  - **FLevelSequenceActorSpawner** is the default for actors. **FControlRigObjectSpawner** is a great example to study

- **SpawnExecutionTokens:**

  - do the actual spawn request creation/destructionby directly calling the GetSpawnRegister()'s functions

  - Also manage override binding

# Custom Blending

- Implementation of custom blend logic should be as follows (using doubles as an example)
- Specializing TBlendableTokenTraits for a particular input data type causes WorkingDataType to be used during the blending operation
- Where WorkingDataType belongs to a namespace, ADL will be employed to discover any relevant overloads for BlendValue that match the necessary types
- This allows blending of any arbitrary type into the WorkingDataType.

```cpp
/**
* Implementation of custom blend logic should be as follows (using doubles as an example).
* Specializing TBlendableTokenTraits for a particular input data type causes WorkingDataType to be used during the blending operation.
* Where WorkingDataType belongs to a namespace, ADL will be employed to discover any relevant overloads for BlendValue that match the necessary types.
* This allows blending of any arbitrary type into the WorkingDataType.

namespace MovieScene
{
  // Define a custom namespaced type that will be used to calculate blends between doubles
  struct FBlendableDouble
  {
    FBlendableDouble()
      : AbsoluteTotal(0.0), AdditiveTotal(0.0)
    {}

    double AbsoluteTotal;
    double AdditiveTotal;

    TOptional<float> TotalWeight;

    double Resolve(TMovieSceneInitialValueStore<int32>& InitialValueStore)
    {
      if (TotalWeight.IsSet())
      {
        if (TotalWeight.GetValue() == 0.f)
        {
          AbsoluteTotal = InitialValueStore.GetInitialValue();
        }
        else
        {
          AbsoluteTotal /= TotalWeight.GetValue();
        }
      }

      return AbsoluteTotal + AdditiveTotal;
    }
  };

  void BlendValue(FBlendableDouble& OutBlend, double InValue, float Weight, EMovieSceneBlendType BlendType, TMovieSceneInitialValueStore<double>& InitialValueStore)
  {
    if (BlendType == EMovieSceneBlendType::Absolute || BlendType == EMovieSceneBlendType::Relative)
    {
      if (BlendType == EMovieSceneBlendType::Relative)
      {
        OutBlend.AbsoluteTotal += (InitialValueStore.GetInitialValue() + InValue) * Weight;
      }
      else
      {
        OutBlend.AbsoluteTotal += InValue * Weight;
      }

      OutBlend.TotalWeight = OutBlend.TotalWeight.Get(0.f) + Weight;
    }
    else if (BlendType == EMovieSceneBlendType::Additive)
    {
      OutBlend.AdditiveTotal += InValue * Weight;
    }
  }
}
template<> struct TBlendableTokenTraits<double> { typedef MovieScene::FBlendableDouble WorkingDataType; };
*/
```

# Useful Sequencer Functions

- Useful Tip: Can call PerformanceCapture event on sequencer to log perf capture events

## Get Sequence Instance ID

  ```cpp
  FMovieSceneRootEvaluationTemplateInstance& rootEvalTemplate = ((IMovieScenePlayer*)InLevelSequencePlayer)->GetEvaluationTemplate();
  FMovieSceneSequenceID sequenceID                            = rootEvalTemplate.GetInstance(MovieSceneSequenceID::Root)->SequenceID;
  for (TSubclassOf<UBBProcAnimComponent> animatorClass : ProcAnimators)
  {
      UBBProcAnimSequenceContext* animatorSeqContext = GetSequenceContextForAnimator(sequenceID, animatorClass);
      UBBProcAnimComponent*       animatorCDO        = animatorClass.GetDefaultObject();
      //TODO: ikrimae: #ProcAnim: Add asserts
      if (animatorSeqContext != nullptr)
      {
          animatorCDO->CaptureSequenceContext(animatorSeqContext);
      }
  }
  ```

## Iterate over object bindings in a sequence

  ```cpp
  UMovieSceneSequence* levelSequence = InLevelSequencePlayer->GetSequence();
  const TArray<FMovieSceneBinding>& objectBindings = levelSequence->GetMovieScene()->GetBindings();
  for (const FMovieSceneBinding& binding : objectBindings)
  {
      for (UMovieSceneTrack* track : binding.GetTracks())
      {
          if (UBBProcAnimTrack* procAnimTrack = Cast<UBBProcAnimTrack>(track))
          {
              TArray<UMovieSceneSection*> sequenceSections = procAnimTrack->GetAllSections();
              for (UMovieSceneSection* section : sequenceSections)
              {
                  if (UBBProcAnimSection* procAnimSection = Cast<UBBProcAnimSection>(section))
                  {
                      ProcAnimators.Add(procAnimSection->ProcAnimCompClass);
                  }
              }
          }
      }
  }
  ```

## Possessables/Spawnables

  ```cpp
  // Add all spawnables first (since possessables can be children of spawnables)
  int32 spawnableCount = MovieScene->GetSpawnableCount();
  for (int32 Index = 0; Index < spawnableCount; ++Index)
  {
      const FMovieSceneSpawnable& spawnable = MovieScene->GetSpawnable(Index);
      //TODO: ikrimae: #Perf: Find a better unique identifier for runtime bindable sequence actors
      if (spawnable.GetName().StartsWith(runtimeBindableActorID, ESearchCase::IgnoreCase))
      {
          return FMovieSceneObjectBindingID(spawnable.GetGuid(), MovieSceneSequenceID::Root);
      }
  }

  // Add all possessables
  const int32 possessableCount = MovieScene->GetPossessableCount();
  for (int32 Index = 0; Index < possessableCount; ++Index)
  {
      const FMovieScenePossessable& possessable = MovieScene->GetPossessable(Index);
      if (InSequence->CanRebindPossessable(possessable))
      {
          if (possessable.GetName().StartsWith(runtimeBindableActorID, ESearchCase::IgnoreCase))
          {
              return FMovieSceneObjectBindingID(possessable.GetGuid(), MovieSceneSequenceID::Root);
          }
      }
  }
  ```

## Resolve object binding ID

  ```cpp
  // Resolve event contexts to trigger the event on
  //TArray<UObject*> EventContexts;
  //
  //// If we have specified event receivers, use those
  //if (EventReceivers.Num())
  //{
  //  EventContexts.Reserve(EventReceivers.Num());
  //  for (FMovieSceneObjectBindingID ID : EventReceivers)
  //  {
  //      // Ensure that this ID is resolvable from the root, based on the current local sequence ID
  //      ID = ID.ResolveLocalToRoot(Operand.SequenceID, Player.GetEvaluationTemplate().GetHierarchy());
  //
  //      // Lookup the object(s) specified by ID in the player
  //      for (TWeakObjectPtr<> WeakEventContext : Player.FindBoundObjects(ID.GetGuid(), ID.GetSequenceID()))
  //      {
  //          if (UObject* EventContext = WeakEventContext.Get())
  //          {
  //              EventContexts.Add(EventContext);
  //          }
  //      }
  //  }
  //}
  ```

## Generate Property Path

  ```cpp
  auto GeneratePropertyPath = [this](UImagePlateComponent* ImagePlateComponent)
    {
      check(ImagePlateComponent);

      UStructProperty* ImagePlateProperty = ImagePlateComponent->GetImagePlateProperty();
      UProperty* RenderTargetProperty = FindField<UProperty>(FImagePlateParameters::StaticStruct(), GET_MEMBER_NAME_CHECKED(FImagePlateParameters, RenderTexture));

      check(ImagePlateProperty);
      check(RenderTargetProperty);

      TSharedRef<FPropertyPath> Path = FPropertyPath::CreateEmpty();
      Path->AddProperty(FPropertyInfo(ImagePlateProperty));
      Path->AddProperty(FPropertyInfo(RenderTargetProperty));

      return Path;
    };
  ```

## Stateless Token Producer

  ```cpp
  /** Stateless pre-animated state token producer that simply calls a static function as the token */
  struct FStatelessPreAnimatedTokenProducer : IMovieScenePreAnimatedTokenProducer
  {
    typedef void (*StaticFunction)(UObject&, IMovieScenePlayer&);

    FStatelessPreAnimatedTokenProducer(StaticFunction InFunction) : Function(InFunction) {}

    virtual IMovieScenePreAnimatedTokenPtr CacheExistingState(UObject& Object) const override
    {
      return FToken(Function);
    }

    struct FToken : IMovieScenePreAnimatedToken
    {
      FToken(StaticFunction InFunctionPtr) : FunctionPtr(InFunctionPtr) {}

      virtual void RestoreState(UObject& Object, IMovieScenePlayer& Player) override
      {
        (*FunctionPtr)(Object, Player);
      }

      StaticFunction FunctionPtr;
    };
    StaticFunction Function;
  };
  ```

## Editor Related Functions

- Check if sequencer is active: BB::IsSequencerModeActive() which does GLevelEditorModeTools().IsModeActive(EM_SequencerMode)

- Blend/accumulator sample: `FMovieSceneSkeletalAnimationSectionTemplate::Evaluate()` for plugging into the blending/accumulater code to support interpolation section overlap

- Integral Discrete keyframe curve

  ```cpp
  UPROPERTY()
  FIntegralCurve ActorGuidIndexCurve;
  ```

- Sequencer:

  ```cpp
  void DrawTransformTrack(const FSceneView* View, FPrimitiveDrawInterface* PDI, UMovieScene3DTransformTrack* TransformTrack, const TArray<TWeakObjectPtr<UObject>>& BoundObjects, const bool& bIsSelected)

  Player.GetPlaybackStatus() != EMovieScenePlayerStatus::Playing;
  ```

- Sequencer Scale/Dilate parameters:

  ```cpp
  KeyFrameAlgorithms::Scale(CurveInterface.GetValue(), Origin, DilationFactor, KeyHandles);
  KeyFrameAlgorithms::Translate(CurveInterface.GetValue(), DeltaPosition, KeyHandles);
  Params.BlendWeight.ShiftCurve(DeltaTime, KeyHandles);
  Params.BlendWeight.ScaleCurve(Origin, DilationFactor, KeyHandles);
  ```

- Track Editor Helpers:

  ```cpp
  virtual UMovieSceneSequence* GetRootMovieSceneSequence() const = 0;
  virtual UMovieSceneSequence* GetFocusedMovieSceneSequence() const = 0;
  virtual FMovieSceneSequenceIDRef GetRootTemplateID() const = 0;
  virtual FMovieSceneSequenceIDRef GetFocusedTemplateID() const = 0;
  TArrayView<TWeakObjectPtr<>> FindObjectsInCurrentSequence(const FGuid& InObjectBinding)
  UMovieScene* FocusedMovieScene = GetFocusedMovieScene();
  ```

- TrackEditor Find Objects In Current Sequence/Add new ones to it:

  ```cpp
  TArray<TWeakObjectPtr<>> OutObjects;
  for (TWeakObjectPtr<> Object : GetSequencer()->FindObjectsInCurrentSequence(ObjectGuid))
  {
    OutObjects.Add(Object);
  }
  ```

- Extend the actor reference binding submenu/add custom object bind types:

  ```cpp
  class FControlRigEditorObjectBinding : public ISequencerEditorObjectBinding
  {
  public:
    FControlRigEditorObjectBinding(TSharedRef<ISequencer> InSequencer);
    static TSharedRef<ISequencerEditorObjectBinding> CreateEditorObjectBinding(TSharedRef<ISequencer> InSequencer);
    // ISequencerEditorObjectBinding interface
    virtual void BuildSequencerAddMenu(FMenuBuilder& MenuBuilder) override;

  ```

- Look at TransformTrackEditor/MovieScene3DTransformSection for how to do a lot of more complicated things in the sequencer UI

- Add custom UI to cross-reference other objects in the same sequence for cross track communication

  ```cpp
  void FEventTrackEditor::BuildTrackContextMenu(FMenuBuilder& MenuBuilder, UMovieSceneTrack* Track)
  ```

  - For anything with cross reference tracks, probably need to implement: virtual void OnBindingsUpdated(const TMap<FGuid, FGuid>& OldGuidToNewGuidMap) { }
  - Look F3DAttachSection for better example. Creates a separate UMovieScene3DConstraintSection on add of an attach track so it can track updates to guids
  - FActorPickerTrackEditor::ShowActorSubMenu creates an actor picker for picking other objects in the scene including potentially ones that are spawned from sequence
  - Useful functions:
    - FSequencer::OnMovieSceneBindingsChangedDelegate
    - NotifyBindingUpdate()
    - NotifyBindingsChanged()

      ```cpp
        /**
          * Called whenever an object binding has been resolved to give the player a chance to interact with the objects before they are animated
          *
          * @param InGuid		The guid of the object binding that has been resolved
          * @param InSequenceID	The ID of the sequence in which the object binding resides
          * @param Objects		The array of objects that were resolved
          */
        virtual void NotifyBindingUpdate(const FGuid& InGuid, FMovieSceneSequenceIDRef InSequenceID, TArrayView<TWeakObjectPtr<>> Objects) { NotifyBindingsChanged(); }
      ```

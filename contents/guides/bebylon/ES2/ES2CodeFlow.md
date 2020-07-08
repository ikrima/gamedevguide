<!-- markdownlint-disable -->

# Engine Bookkeeping

- Generate Cmd Frame
- Predict
- SampleGamepad State


# Game Sim

- FES2PrepECSForSimulationSysGroup
  - FES2SysEnableEntitiesSpawnedLastFrame
  - <FES2SyncXfmWithUE4Comp,FES2ActorReference>[]{
      Copy Xfm to ECS
    }


- FES2GameSimulationSysGroup

# VisualSim

- Visual Sequences
- Ability Sequences

# Cleanup
- ReturnSequenceActorToPool

# Reconcile



==============================================================================================================
# Migrate

- SimStateManager.ProcessDeferredSimTickActions
  - FESNextSimTickDeferredActn_StateTransition
  - FESNextSimTickDeferredActn_MarkCinematicEventEndedForClient
  - FESNextSimTickDeferredActn_MarkTransitionToZoneForClientEnded
  - FESNextSimTickDeferredActn_PumpGameSimEvent
  - FESNextSimTickDeferredActn_ApplyDmg


- MatchStateManager.ProcessMatchStateTransition

- LegendSMManager.ProcessLegendNodeEnterActns(uefsTickParmBlk);


==============================================================================================================
# RollbackRollforth

class FNetworkGUID
struct FNetGuidCacheObject;
struct FNetGUIDCache;
class UPackageMap;

AGameplayCueNotify_Actor for recycling

ENGINE_API FNetworkObjectList& GetNetworkObjectList() { return *NetworkObjects; }
/** Returns the existing FNetworkGUID of InActor, if it has one. */
virtual FNetworkGUID GetGUIDForActor(const AActor* InActor) const { return FNetworkGUID(); }

/** Returns the actor that corresponds to InGUID, if one can be found. */
virtual AActor* GetActorForGUID(FNetworkGUID InGUID) const { return nullptr; }


UMovieSceneCinematicShotTrack* ShotTrack = Sequence->GetMovieScene()->FindMasterTrack<UMovieSceneCinematicShotTrack>();
  if (ShotTrack)
  {
    UMovieSceneCinematicShotSection* ActiveShot = nullptr;
    for (UMovieSceneSection* Section : ShotTrack->GetAllSections())
    {
      if (!ensure(Section))
      {
        continue;
      }

      // It's unfortunate that we have to copy the logic of UMovieSceneCinematicShotTrack::GetRowCompilerRules() to some degree here, but there's no better way atm
      bool bThisShotIsActive = Section->IsActive();

      TRange<FFrameNumber> SectionRange = Section->GetRange();
      bThisShotIsActive = bThisShotIsActive && SectionRange.Contains(CurrentSequenceTime.FrameNumber);

      if (bThisShotIsActive && ActiveShot)
      {
        if (Section->GetRowIndex() < ActiveShot->GetRowIndex())
        {
          bThisShotIsActive = true;
        }
        else if (Section->GetRowIndex() == ActiveShot->GetRowIndex())
        {
          // On the same row - latest start wins
          bThisShotIsActive = TRangeBound<FFrameNumber>::MaxLower(SectionRange.GetLowerBound(), ActiveShot->GetRange().GetLowerBound()) == SectionRange.GetLowerBound();
        }
        else
        {
          bThisShotIsActive = false;
        }
      }

      if (bThisShotIsActive)
      {
        ActiveShot = Cast<UMovieSceneCinematicShotSection>(Section);
      }
    }



UFunction* UAbilitySystemGlobals::GetGameplayCueFunction(const FGameplayTag& ChildTag, UClass* Class, FName &MatchedTag)
{
	SCOPE_CYCLE_COUNTER(STAT_GetGameplayCueFunction);

	// A global cached map to lookup these functions might be a good idea. Keep in mind though that FindFunctionByName
	// is fast and already gives us a reliable map lookup.
	//
	// We would get some speed by caching off the 'fully qualified name' to 'best match' lookup. E.g. we can directly map
	// 'GameplayCue.X.Y' to the function 'GameplayCue.X' without having to look for GameplayCue.X.Y first.
	//
	// The native remapping (Gameplay.X.Y to Gameplay_X_Y) is also annoying and slow and could be fixed by this as well.
	//
	// Keep in mind that any UFunction* cacheing is pretty unsafe. Classes can be loaded (and unloaded) during runtime
	// and will be regenerated all the time in the editor. Just doing a single pass at startup won't be enough,
	// we'll need a mechanism for registering classes when they are loaded on demand.

	FGameplayTagContainer TagAndParentsContainer = ChildTag.GetGameplayTagParents();

	for (auto InnerTagIt = TagAndParentsContainer.CreateConstIterator(); InnerTagIt; ++InnerTagIt)
	{
		FName CueName = InnerTagIt->GetTagName();
		if (UFunction* Func = Class->FindFunctionByName(CueName, EIncludeSuperFlag::IncludeSuper))
		{
			MatchedTag = CueName;
			return Func;
		}

		// Native functions cant be named with ".", so look for them with _.
		FName NativeCueFuncName = *CueName.ToString().Replace(TEXT("."), TEXT("_"));
		if (UFunction* Func = Class->FindFunctionByName(NativeCueFuncName, EIncludeSuperFlag::IncludeSuper))
		{
			MatchedTag = CueName; // purposefully returning the . qualified name.
			return Func;
		}
	}

	return nullptr;
}

// --------------------------------------------------------------------

void UAbilitySystemGlobals::InitGameplayCueParameters(FGameplayCueParameters& CueParameters, const FGameplayEffectSpecForRPC& Spec)
{
	CueParameters.AggregatedSourceTags = Spec.AggregatedSourceTags;
	CueParameters.AggregatedTargetTags = Spec.AggregatedTargetTags;
	CueParameters.GameplayEffectLevel = Spec.GetLevel();
	CueParameters.AbilityLevel = Spec.GetAbilityLevel();
	InitGameplayCueParameters(CueParameters, Spec.GetContext());
}

SkeletalMeshComponent.cpp:

TAutoConsoleVariable&lt;int32> CVarUseParallelAnimationEvaluation(TEXT("a.ParallelAnimEvaluation"), 1, TEXT("If 1, animation evaluation will be run across the task graph system. If 0, evaluation will run purely on the game thread"));  
TAutoConsoleVariable&lt;int32> CVarUseParallelAnimUpdate(TEXT("a.ParallelAnimUpdate"), 1, TEXT("If != 0, then we update animation blend tree, native update, asset players and montages (is possible) on worker threads."));  
TAutoConsoleVariable&lt;int32> CVarForceUseParallelAnimUpdate(TEXT("a.ForceParallelAnimUpdate"), 1, TEXT("If != 0, then we update animations on worker threads regardless of the setting on the anim blueprint."));

void USkinnedMeshComponent::TickComponent(float **DeltaTime**, enum ELevelTick TickType, FActorComponentTickFunction \***ThisTickFunction**)

bool UAnimInstance::NeedsImmediateUpdate(float **DeltaSeconds**) const

void UAnimInstance::UpdateAnimation(float **DeltaSeconds**, bool **bNeedsValidRootMotion**)

void USkeletalMeshComponent::RefreshBoneTransforms(FActorComponentTickFunction\* **TickFunction**)

USkeletalMeshComponent::TickPose(float **DeltaTime**, bool **bNeedsValidRootMotion**)

void USkeletalMeshComponent::TickAnimation(float **DeltaTime**, bool **bNeedsValidRootMotion**)

For evaluating animation sequence:

<https://answers.unrealengine.com/questions/349862/bone-transform-at-certain-timekey.html>

<https://wiki.unrealengine.com/Animation_Node,_Translate_With_Complete_Source_Code_and_Instructions>

<https://forums.unrealengine.com/showthread.php?56356-How-to-get-a-bone-location-for-the-first-frame-of-an-AnimMontage>

FAnimInstanceProxy::SlotEvaluatePose(FName **SlotNodeName**, const FCompactPose& **SourcePose**, const FBlendedCurve& **SourceCurve**, float **InSourceWeight**, FCompactPose& **BlendedPose**, FBlendedCurve& **BlendedCurve**, float **InBlendWeight**, float **InTotalNodeWeight**)

FTransform UAnimSequence::ExtractRootMotion(float StartTime, float DeltaTime, bool bAllowLooping) const

virtual void GetAnimationPose(FCompactPose& **OutPose**, FBlendedCurve& **OutCurve**, const FAnimExtractContext& **ExtractionContext**) const override;

void GetBonePose(FCompactPose& **OutPose**, FBlendedCurve& **OutCurve**, const FAnimExtractContext& **ExtractionContext**, bool **bForceUseRawData**=false) const;

void UAnimSequence::GetBonePose(FTransformArrayA2& OutAtoms, const FBoneContainer& RequiredBones, const FAnimExtractContext& ExtractionContext) const

void GetBoneTransform(FTransform& **OutAtom**, int32 **TrackIndex**, float **Time**, bool **bUseRawData**) const;

int32 USkinnedMeshComponent::GetBoneIndex( FName **BoneName**) const

USkinnedMeshComponent::GetSocketTransform(FName **InSocketName**, ERelativeTransformSpace **TransformSpace**) const

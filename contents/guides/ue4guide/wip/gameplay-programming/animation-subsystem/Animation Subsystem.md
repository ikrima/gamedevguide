Animation Subsystem

 

AnimInstance is the runtime animation class that maintains runtime data & plays shit

-   This is the parent class of the animation blueprint

-   Get Bone Transforms from a specific time t:

    -   Sequence-&gt;GetAnimationPose(Output.Pose, Output.Curve, FAnimExtractContext(CurrentTime, Sequence-&gt;bEnableRootMotion));





UAnimationAsset is the classes that contain the actual data and also calculates bones & curves

-   UAnimSequence

-   UAnimComposite

    -   UAnimMontage

 

Two classes for each Anim Node; separated for optimization b/c node construction is expensive

-   UAnimGraphNode\_Base: Anim Graph Node that's shown in editor

    -   Only exist in editor

    -   One way relationship with corresponding FAnimNode\_Base counterpart

-   FAnimNode\_Base: Anim Behavior node that is run time

    -   Initialize: Called whenever need to initialize/reinitialize (e.g. changing mesh instance)

    -   Update: Called to update current state (such as advancing playtime or updating blend weights)

        -   Takes FAnimationUpdateContext that knows the delta time for the update & the current nodes blend weight

        -   Might be where we hook in to do the forward time projection intersection

    -   Evaluate/EvaluateComponentSpace: Generates a 'pose' i.e. list of bone transforms

-   FAnimationRuntime has lots of good functions to look at and utility/helper functions

 

Sequence:

Update Functions:

*\[Should be called before RefreshBoneTransforms\]*USkinnedMeshComponent::TickPose()

*\[Should be atomic & not rely on Tick()\]* USkinnedMeshComponent::RefreshBoneTransforms()

USkinnedMeshComponent::FinalizeBoneTransform()

 

 

USkeletalMeshComponent::InitAnim: Called when component needs to initialize or reinitialize eg InitializeComponent() or SetSkeletalMesh()

-   USkeletalMeshComponent::InitializeAnimScriptInstance

    -   AnimInstance::InitializeAnimation

        -   AnimInstance::NativeInitializeAnimation()

        -   AnimInstance::BlueprintInitializeAnimation()

 

 

 

USkinnedMeshComponent::TickComponent()

-   USkinnedMeshComponent::TickPose()

    -   USkeletalMeshComponent::TickAnimation

        -   AnimInstance::UpdateAnimation

            -   *\[Default does nothing\]* NativeUpdateAnimation: Only does something for UAnimSingleNodeInstance

            -   BlueprintUpdateAnimation: Main AnimBP entry point

            -   FAnimNode\_Base::Update()

            -   UAnimInstance::Montage\_Advance()

            -   UAnimInstance::TriggerAnimNotifies

            -   UAnimInstance::TriggerQueuedMontageEvents

>  

-   USkinnedMeshComponent::RefreshBoneTransforms()

    -   USkinnedMeshComponent::PerformAnimationEvaluation()

        -   *\[Evaluate Animation System\]* USkeletalMeshComponent::EvaluateAnimation()

            -   AnimInstance::EvaluateAnimation()

                -   *\[Default does nothing\]* UAnimInstance::NativeEvaluateAnimation() AnimInstance can override animgraph evaluation completely. Ex: AnimSingleNodeInstance() doesn't eval the animgraph

                -   FAnimNode\_Base::Evaluate(): This is the root of the anim graph. Called if NativeEvaluateAnimation returns false

 

-   USkeletalMeshComponent::PostAnimEvaluation

    -   AnimInstance::UpdateCurves

    -   USkinnedMeshComponent::FinalizeBoneTransform()

        -   AnimInstance::PostEvaluateAnimation

            -   *\[Does nothing by default but virtual\]* AnimInstance::NativePostEvaluateAnimation

            -   BlueprintPostEvaluateAnimation

    -   UpdateComponentToWorld()

    -   UpdateOverlaps()



-   *\[If RefreshBoneTransforms() not called from Tick()\]* USkinnedMeshComponent::FinalizeBoneTransform

 



 



Useful CPU Skinning stuff:

bool USkinnedMeshComponent::ShouldCPUSkin()

USkinnedMeshComponent::ComputeSkinnedPositions

USkinnedMeshComponent::GetSkinnedVertexPosition

GetBoneNames

GetBoneTransform

 

Function to update physics data from animated data

USkeletalMeshComponent::UpdateKinematicBonesToAnim(const TArray&lt;FTransform&gt;& **InSpaceBases**, ETeleportType **Teleport**, bool **bNeedsSkinning**)

 

USkeletalMeshComponent::PerformBlendPhysicsBones(const TArray&lt;FBoneIndexType&gt;& **InRequiredBones**, TArray&lt;FTransform&gt;& **InLocalAtoms**)

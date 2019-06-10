---
sortIndex: 4
---

#### 1. Master Pose Component

- This is Blueprint callable action that you set ***Child->SetMasterPoseComponent(Body)***, then **Body** becomes the master of **Child**, which means **Child** will follow whatever **Body** does.

- Behind of scene, **Child** does not have any bone transform buffer and it doesn't run any animation system even if you set AnimBP on the **Child**, and it just uses **Body's** bone transform buffer when rendered. This makes very light weight attachment system. Only component that has to run animation is **Body**, and all attachment will just use **Body's** bone transform.

- This does not reduce render cost. You still render # of components separate (and more drawcalls if you have more sections for each), but this reduces game thread cost.

- Limitation

- **Child** has to have SUBSET of exact matching structure. You can't have any other extra joint or skip the joint. Since there is no bone buffer for that extra joint, that will render in the origin of the mesh.

- You can't run any other animation or physics on the **Child**.

#### 2. Copy Pose From Mesh

- This is anim graph node that you can use on AnimBP of the **Child**.

- It allows you to copy from any SkeletalMeshComponent. You also want to make sure the SkeletalMeshComponent (I'll call this **Body**) you copy from ALREADY has ticked. Otherwise you're going to copy last frame's animation. To ensure this, you can just attach **Child** to the **Body**. Once you attach, it will ensure parent ticks first before child.

![MasterPosevsCopyvsMesh_Chart](/......\assets\MasterPosevsCopyvsMesh_Chart.jpg)

- This only copies the bones that matching, and everything else will stay on reference pose.

- Or you can choose to play animation on top of the copied transform as illustrated above.

- Limitation

- If **Body** has physics on them, you'd like to make sure to run this AFTER your parent blends physics with it, which means it has to tick in Post Physics, but that means you can't have any physics on the **Child**. I did not test this but in theory, you can have the **Child** to have physics, but not both of them at the same time.

- Of course more expensive than Master Pose because this runs animation on each Child.

#### 3. Mesh merge. 

- Mesh merge allows you to create SkeletalMesh from multiple meshes

- It has high initial cost of creating the SkeletalMesh

- Rendering cost is cheap since you can only render one mesh as opposed to multiple meshes

- Main **Body** has to contain all the animations because the merged mesh will only use the skeleton that's set, and it will has to contain all the joints you'd need to animate. Say you have extra joints for certain body parts, you still have to have all animations on the **Body**.

- Morphtarget is not supported

- You only run one animation on the merged mesh.

*Reference From <https://iluvanimation.blogspot.com/2017/04/master-pose-vs-copy-pose-vs-mesh-merge.html>*

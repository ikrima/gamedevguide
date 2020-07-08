---
sidebar: ue4guide
---
void UCameraComponent::GetCameraView(float DeltaTime, FMinimalViewInfo& DesiredView)

\[5:52]

in there

\[5:53]

force the scale to 1, or the inverse of your actor's scale

\[5:53]

usually that case is handle through world to meters scale

\[5:53]

are you modifying that at all?

\[5:53]

because that would be the other path

\[5:54]

modifying w2m with the scale of the actor

\[5:54]

which is easier

\[5:54]

that would scale the IPD

\[5:54]

and the camera's motion

\[5:54]

so if you're scaling up your actor 2x, scale the world to meters scale 2x as well

so is GetCameraView() where the actual viewmatrix gets calculated?

###### epicnick \[6:07 PM]

don't have the code open at the moment, but it grabs the view matrices twice

\[6:07]

the head pose is used to update the cameracomponent in the function i pasted above, that gets the gross movement

\[6:07]

and then CalculateStereoViewOffset gets the offsets per eye

\[6:08]

and the view matrices are updated again in PreRenderViewFamily_RenderThread

\[6:08]

and updated per eye in PreRenderView_RenderThread

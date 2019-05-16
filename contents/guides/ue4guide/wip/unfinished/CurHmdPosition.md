CurHmdPosition

W2M=

Set updateRT = false

CalculateStereoViewOffset -> Calculates stereo camera position based on ipd offset + hmd position

ApplyHmdRotation/UpdatePlayerCameraRotation

​ Used by Engine to update the camera. If bFollowHMDOrientation == true, then UpdatePlayerCameraRotation handles applying the HMD pose. Otherwise, PlayerCameraManager does it with ApplyHmdRotation

GetCurrentOrientationAndPosition->Blueprint function Call to Get Current HMD Orientation + Position

​ GetCurrentPose -> Gets Current HMD Orientation + Position. Used by RT & GT

​ PoseToOrientationAndPosition -> Converts from HMD Pose to Orientation + Position

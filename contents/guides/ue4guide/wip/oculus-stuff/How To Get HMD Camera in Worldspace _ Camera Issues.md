Lots of Camera Issues in VR in 4.8:

<https://forums.oculus.com/viewtopic.php?f=60&t=24683>



![OculusStuff_HMDCamera](C:\devguide\conversion\FINISHED\assets\OculusStuff_HMDCamera.png)

<https://answers.unrealengine.com/questions/243325/how-to-get-real-camera-position-in-vr-mode.html>

 

Oculus Rift Coordinate System:

-   Device Position is in the reference frame of the rift defined by the recalibration. So wherever you are looking IRL when you reset the HMD, that will be +X, right of that will be +Y, above that will be +Z.

-   Device Rotation will be relative to the recalibration although only Yaw gets reset during recalibration


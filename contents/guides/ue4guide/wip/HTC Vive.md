---
sortIndex: 26
---

UE4 Setup: <https://forums.unrealengine.com/showthread.php?73239-Unreal-Setup-for-HTC-Vive>

Motion Controller Setup: <https://docs.unrealengine.com/latest/INT/Platforms/VR/MotionController/index.html>

SteamVR Controller: <https://forums.unrealengine.com/showthread.php?74817-Steam-VR-Controllers>

Controller Trigger Inputs in UE4: <http://steamcommunity.com/app/358720/discussions/0/521643320352268286>

#### Debug Key Commands

I mentioned the existence of Aaron's SteamVR debug keys to a few folks and no one knew what I was talking about but were very interested in getting the info, so I'm pasting Aaron's notes below for posterity.

**Note:** The compositor window needs to have focus first before these shortcuts will work.

**Shift+M:** Brings up a mirror window of what the user is actually seeing. This will include hardbounds, all overlays, controllers, white grid, and anything else extra that the compositor draws on top of the scene.

**B: **Toggle hardbounds always visible

**Shift+S:** Take a screenshot (or rather dump all the textures that the compositor knows about to your runtime/screenshots folder).

**Z:** Reset your seated zero pose.

**Shift+period:** Toggle single step mode. This will lock you on the current frame, and subsequent presses of period will advance a frame at a time. This is super useful for flushing out any extra frames of latency you might have in your system. Look one direction, then step and ensure that the view has been updated to face that new direction. If it takes two or more steps before the view gets there, then you've got some latency in your pipeline to sort out. This is particularly fun when you discover one eye updating before the other!

**Other useful notes:** Left click will regain fullscreen exclusive status in the event Windows kicks it out (usually due to another window overlapping onto its part of the desktop).

*Reference From <http://steamcommunity.com/app/358720/discussions/0/520518053451174524>*

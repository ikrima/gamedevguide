---
sortIndex: 11
---

What does HiddenIngame - Hidden In Game will hide the object from the rendering system entirely. The renderthread proxies will not exist. If this value is toggled they will either be created/destroyed according to the new setting. When Hidden there will be no calculations of any time. There will be a cost for hiding/showing lots of things dynamically.

bOwnerNoSee and bOnlyOwnerSee work as you would expect. An object marked 'bOwnerNoSee' will not render in the 'owning' view. 'Ownership' is determined by walking up the Ownership chain from the actor when creating the scene proxy. You can see this in the FPrimitiveSceneProxy constructor.

*Reference From <https://udn.unrealengine.com/questions/349480/mesh-visibility-parameters-explanation.html>*

Print debugging:

- PrintScientific/PrintFixed()

- PrintCharacter()

- PrintFloat/PrintSmallFloat()


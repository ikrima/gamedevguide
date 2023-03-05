---
sortIndex: 2
sidebar: ue4guide
---

# Custom Blueprint Nodes

## How To Guide

<https://sandordaemen.nl/blog/unreal-engine-4-how-to-create-k2-nodes/>

## Notes

The key thing you'll need to understand is that a blueprint clones its graph and mutates it as part of the compilation process, that is when your expand node logic will run. There are two tools that I use when writing a new blueprint node:

Blueprint Editor->File->Developer->Save Intermediate Build Products - this enables you to inspect the result of the expanded graph

The clipboard - use ctrl+c and paste into a text editor to view the complete state of a node, this will give you an idea of how you need to set up your intermediate nodes

Reference <https://udn.unrealengine.com/questions/500542/custom-bp-node-development.html>

## Hiding Blueprint Functions From Editor

```ini
[BlueprintEditor.Menu]
+BlueprintHiddenFields="/Script/Engine.PlayerController:ClientPlayCameraShake"
```

*Reference From <https://udn.unrealengine.com/questions/409862/gameplaystatics-and-custom-damageevents.html>*

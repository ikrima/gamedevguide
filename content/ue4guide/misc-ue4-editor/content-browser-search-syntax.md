---
sortIndex: 1
sidebar: ue4guide
---

# Content Browser Advanced Search Syntax

<https://docs.unrealengine.com/en-US/Engine/Content/Browser/AdvancedSearchSyntax/index.html>

## Examples

- `ParentClass=='foo'` which is often what you want (so it doesn't matter how nested the BP is).  You can see what tags are available in column/detail view (when filtered to a specific type) or in the tooltip of an asset

- `NativeParentClass=`

- `Triangles >=10500 && Type == Skeletal && CollisionPrims != 0`
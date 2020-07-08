---
sortIndex: 4
sidebar: houdini
---

# Redshift Rendering

- Parameters:
  - Scatter => color/diffuse
  - Absorption => transparency
  - Emission => heat
- First turn off "smoke" aka scatter/absorption by putting it to zero
- Lookdev heat/flame then go back and add smoke
  - <https://vimeo.com/311277986>
  - Change emission remap source range: 0 to max(heat) in vdb
  - Keep remap target to 0 to 1
  - Use ramp to do color changing
  - Notes:
    - Hottest part of flame is dark
    - Sharp Edge

![](../../assets/pyro_flame_ref.png)

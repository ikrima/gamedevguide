---
sortIndex: 1
---

# Environment Variables

- **hconfig:** for listing houdini config and environment variables
  - *-a:* dump all the environment vars
  - *-ap:* dump all the seach paths
- **hgpuinfo:** dump GPU info
  - *-c/-l:* dump OpenCL info for active/all devices
  - *-g:* dump OpenGL info
  - \-o: dump OptiX info
- Special characters:
  - "@" => expands to directories in HOUDINI_PATH. 
    if the HOUDINI_PATH is `$HIP$HFS/houdini $HOME/houdini`
    then the value `"@/vex"` would expand to `$HIP/vex $HFS/houdini/vex$HOME/houdini/vex`
  - = => Equiv to `$HIP`
  - & => default path for given envar
  - ^ => For VEX-related variables, expands to the shader type
    For example, if `HOUDINI_VEX_PATH="$HOME/vex/^"`, when loading Surface shaders it will expand to `"$HOME/vex/Surface"`

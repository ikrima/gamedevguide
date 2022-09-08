# Registering HLSL File Types

To enable HLSL syntax highlighting for .usf files:

You can save the below text as .reg files and run them, alternatively you can navigate to the path specified and add them manually. With regard to the extension GUID, this should be the same on all installs as it is consistent on mine, however it might be worth checking yours out just in case. You can find it by looking here in your registryHKEY_CURRENT_USER\Software\Microsoft\VisualStudio\12.0_Config\Languages\File Extensions.hlsl or for 2012 hereHKEY_CURRENT_USER\Software\Microsoft\VisualStudio\11.0_Config\Languages\File Extensions.hlsl

It is also worth noting that you can associate other types to hlsl here also buy just changing .shader to whatever you want.

Spoiler: VS2013ShaderCginc.reg

```reg
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\12.0_Config\Languages\File Extensions\.shader]
@="{B2F072B0-ABC1-11D0-9D62-00C04FD9DFD9}"
"HLSLFile"=dword:00000001

[HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\12.0_Config\Languages\File Extensions\.cginc]
@="{B2F072B0-ABC1-11D0-9D62-00C04FD9DFD9}"
"HLSLFile"=dword:00000001
```

From <http://forum.unity3d.com/threads/vs-2012-and-2013-cg-syntax-highlighting-no-plugins-required.255209/>

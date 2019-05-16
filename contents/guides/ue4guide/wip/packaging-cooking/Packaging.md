UE4 packages everything in the project folder by default.

Specify only the maps you care about in DefaultEditior.ini

- UE will then package everything referenced within those files

- **Note:** Unused references are included (default texutres referenced in Materials or isolated blueprint nodes referencing assets). Be sure to clean up your graphs to minimize package size

To build for 64-bit release:

Change this in the source code:

Unfortunately there's no way of switching from the editor UI in the 4.2 build. If you want to change it manually,you can go to FMainFrameActionCallbacks::PackageProject() in Engine\\Source\\Editor\\MainFrame\\Private\\Frame\\MainFrameActions.cpp, and change this bit of code:

if (PlatformName == "WindowsNoEditor")  
{  
if (PackagingSettings-&gt;BuildConfiguration == PPBC_Shipping)  
{  
OptionalParams += TEXT(" -targetplatform=Win32");  
}  
else  
{  
OptionalParams += TEXT(" -targetplatform=Win64");  
}  
}

If you get rid of the check for the shipping configuration, it should work.

_From &lt;<https://answers.unrealengine.com/questions/32490/ue4-editor-64-bit-vs-32-bit-why-does-the-editor-ru.html>&gt;_

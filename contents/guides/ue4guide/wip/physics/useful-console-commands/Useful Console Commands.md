---
sortIndex: 1
---

# Console Tips & Tricks

Useful list from UE3: <https://docs.unrealengine.com/udk/Three/ConsoleCommands.html>

- **GET [class][property]** - returns the default value of a class property

- **GETALL [class][property]** - returns the value property for all instantiated classes

- **DISPLAYALL / DISPLAYALLSTATE** - Identical to "getall", but displays output on the screen in realtime, similarly to stats.

- **DISPLAY [object][property]** - Displays only the specified property for the specified single object. Only enough of the outer chain is required to make the object uniquely identifiable.

- **DISPLAYCLEAR** - Clears all display\* output.

- **SET** - this one is the most powerful of them all. It takes as the first parameter string a class name, the second string a variable name, and the third string, a value. All objects of the given class (including subclasses) will have the given variable set to the given value. For example "set Pawn CollisionRadius 200" will make all pawns have a collision radius of 200. (See PawnTricksAndTips<sup>?</sup> for more details). In v3323 the set command has limited functionality when using online, this is to limit cheating.

- **EDITACTOR [parameter]** – Will bring up property detail view & edit the properties of first found actor according to the parameter.

- **CLASS=** - Class to look for.

- **NAME=** - Name to look for

- **TRACE** – Trace player view for first hit actor.

- **EDITDEFAULT [CLASS=class]** – Open property editor for default properties of specified class. Only allowed in standalone.

- **EDITOBJECT [parameter]** – Edit the properties of the first found object of the specified class or with the given name.

- **CLASS=** - Class to look for.

- **NAME=** - Name to look for.

- **LISTPROPS**

- **LISTFUNCS**

- **CHEATSCRIPT**

- **LISTFUNC &lt;classname> &lt;functionname>: Parse the function and display details**


- **Calling events from the console:**

  - Invoke a level blueprint event:

    ce EventName OptionalParamValue

- Invoke an actor event:

  ke ActorName EventName ParamValue

- Invoke an actor event with wildcards to invoke on every actor in the world:

  ke \* TestConsoleEvent 25

*Reference From <https://docs.unrealengine.com/udk/Three/ConsoleCommands.html>*

- How to find problem actors for lightmapping/baking or fixing "Lighting Needs to be rebuilt" error message

  - Console command **DumpUnbuiltLightInteractions**

*Reference From <https://wiki.unrealengine.com/LightingTroubleshootingGuide>*

- How to improve light build times, look at the Lightmass statistics window

The **Lighting Build Info** dialog is a very important tool for improving lighting build times. First, build lighting in the level that you want to see stats for. Then, open the dialog under *Build->Lighting Info->Light\`\`ing StaticMesh Info*. Change the drop down to *Lighting Build Info*. This will show a sorted list of meshes and how long they took to compute lighting for.

*Reference From <https://docs.unrealengine.com/latest/INT/Engine/Rendering/LightingAndShadows/Lightmass/#gettingthebestlightingbuildtimes>*

How To Execute Multiple/Chain Console Commands /string console commands. Use the pipe as a console command separator

- stat unit | stat scenerendering

Dump all console commands:

dumpconsolecommands: dump all console commands to output

help: Generate html file of all console commands

<https://docs.unrealengine.com/udk/Three/ConsoleCommands.html#Editor-Specific%20Commands>

## Unreal Engine 3 Console Commands

- [\[Unreal Engine 3 Console Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Unreal%20Engine%203%20Console%20Commands)

- [\[Overview\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Overview)

- [\[Command List\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Command%20List)

  - [\[General Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#General%20Commands)

  - [\[Debugging Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Debugging%20Commands)

  - [\[Statistics Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Statistics%20Commands)

  - [\[Memory and Performance Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Memory%20and%20Performance%20Commands)

  - [\[Display Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Display%20Commands)

  - [\[Rendering Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Rendering%20Commands)

  - [\[Texture Mip-Map Fading Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Texture%20Mip-Map%20Fading%20Commands)

  - [\[Physics Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Physics%20Commands)

  - [\[Audio Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Audio%20Commands)

  - [\[Networking Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Networking%20Commands)

  - [\[Still Captures and Demo Recording Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Still%20Captures%20and%20Demo%20Recording%20Commands)

  - [\[Movie Capture\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Movie%20Capture)

  - [\[Gameplay Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Gameplay%20Commands)

  - [\[Navigation and Pathfinding Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Navigation%20and%20Pathfinding%20Commands)

  - [\[User Interface Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#User%20Interface%20Commands)

  - [\[Miscellaneous Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Miscellaneous%20Commands)

  - [\[System Settings Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#System%20Settings%20Commands)

  - [\[Mobile Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Mobile%20Commands)

  - [\[Editor-Specific Commands\]](https://api.unrealengine.com/udk/Three/ConsoleCommands.html#Editor-Specific%20Commands)

## Overview

Console commands are string-based commands that you can run in the game or in the editor. They are also known as *exec commands*.

To use console commands, bring up the console by pressing Tab or Tilde (~), type them in, and press Enter. Console commands may be executed from within the game, from within the editor, or if the game has been started using the -server switch, from the server's console. They can do various things from resetting the engine to setting particular actor's variables.

Lists of commands can also be stored in text files in the system directory and executed by typing exec \_filename\_ at the console.

## **Command List** 

The following is a list of engine supported console commands...

### **General Commands**

- **CANCEL** - tells the engine to cancel an in progress connection attempt

- **DISCONNECT** - disconnects the client from the current game/server

- **EXIT** - tells the engine to shutdown and close the application.

- **MAP** - alias for START

- **OPEN \[url]** - tells the engine to open a map by the name of the string that comes immediately after, including any additional URL Parameters (via [\[command-line arguments\]](https://api.unrealengine.com/udk/Three/CommandLineArguments.html)); uses TRAVEL_Partial

- **QUIT** - same as EXIT

- **RECONNECT** - reconnects the client to the current game/server

- **SERVERTRAVEL** - travels the client to the server by the name/address of the string that comes immediately after

- **START \[url]** - similar to OPEN, difference is it does a TRAVEL_Absolute instead of TRAVEL_Partial.

- **STREAMMAP \[url]** – Does a prepare and commit map change on the URL.

### **Debugging Commands**

- **ANALYZEOCTREE \[option]** – Outputs information about the octree.

  - **VERBOSE** – Outputs detailed information.

- **CANCELMATINEE \[param]** – Skips current matinee; parameter is the number of seconds into the matinee the player must be before the command will work.

- **CLOSEEDITORVIEWPORT** – Closes the PIE viewport.

- **COLLAPSEOCTREE** – Collapses tree children in the octree.

- **CONFIGHASH** - Displays configuration information

- **CONFIGMEM** – Displays memory usage

- **COUNTDISBALEDPARTICLEITEMS** – Outputs the number of disabled particle systems, lod levels, and modules.

- **CUSTOMLODDATA \[LOD=lod]** – Set a custom level of detail to use for static meshes.

- **DEBUG** - Is used to simulate various errors with the following parameters identifying which

  - **ASSERT** – Tells the engine to simulate an Assert being triggered.

  - **BUFFEROVERRUN** – Tells the engine to performa stack overflow test.

  - **CRASH** - Tells the engine to simulate a fatal crash

  - **EATMEM** - Tells the engine to simulate eating up all available system memory

  - **GPF** - tells the engine to simulate a general protection fault

  - **HITCH** – Tells the engine to simulate a hitch in the game by sleeping for one second.

  - **LONGLOG** – Outputs a long log message to test the buffer resize code used for the log.

  - **RECURSE** - tells the engine to simulate a runaway recursion or loop

  - **RENDERCRASH** - tells the engine to simulate a fatal crash on the render thread

  - **SLEEP** - sleep for a couple seconds

- **DEBUGPREFAB \[object] \[command]** – Output info about the specified prefab. Command can be one of the following:

  - **GRAPH** – Show sub-object graph for prefab.

  - **SHOWMAP** - Show archetype mappings for prefab.

- **DIR** - displays all used directories and files

- **DISABLEALLSCREENMESSAGES** – Disables al onscreen message or warnings.

- **DISTFACTORSTATS** – Outputs information on DistanceFactor used for rendering SkeletalMeshComponents during the game.

- **DN \[comment]** – Creates a note actor with the specified comment at the current location. Only in PIE game.

- **DUMPDYNAMICLIGHTSHADOWINTERACTONS** – Outputs dynamic lighting and shadow interactions for the scene to the log; only includes shadow casting interactions.

- **DUMPLINECHECKS** – Output results of line checks since last reset if LINE_CHECK_TRACING is defined.

- **DUMPMATERIALSTATS \[platform]** – Outputs material statistics for the specified platform.

- **DUMPNATIVES** - displays all native functions.

- **DUMPSHADERSTATS \[platform]** – Outputs shader statistics for the specified platform.

- **EDITACTOR \[parameter]** – Edit the properties of first found actor according to the parameter.

  - **CLASS=** - Class to look for.

  - **NAME=** - Name to look for

  - **TRACE** – Trace player view for first hit actor.

- **EDITDEFAULT \[CLASS=class]** – Open property editor for default properties of specified class. Only allowed in standalone.

- **EDITOBJECT \[parameter]** – Edit the properties of the first found object of the specified class or with the given name.

  - **CLASS=** - Class to look for.

  - **NAME=** - Name to look for.

- **ENABLEALLSCREENMESSAGES** – Enables all onscreen messages or warnings.

- **EXEC \[filename]** – Executes the contents (other console commands) of the specified file.

- **FORCESKELLOD \[option]** – Force a specific level of detail for skeletal meshes. Option is:

  - **LOD=** - LOD to force.

- **GAMEVER / GAMEVERSION** – Outputs the engine version and changelist to the log.

- **GETMAXTICKRATE** – Outputs the max tick rate to the log.

- **FLUSH** - tells the engine to flush all engine caches

- **FLUSHLOG** – Tells the engine to flush the logs.

- **FLUSHPERSISTENTDEBUGLINES** – Clears all persistent debug line draws.

- **FRAMECOMPUPDATES** – Outputs a list of all component updates over one frame.

- **HIDELOGDETAILEDTICKSTATS** – Turns off output of all detailed statistics.

- **KILLPARTICLES** – Deactivate particle systems and destroy all particles.

- **KISMETLOG** – Enables Kismet logging and forces all sequences to output logs.

- **LISTAWAKEBODIES** – Outputs a list of all rigid bodies that are currently awake.

- **LISTDYNAMICLEVELS** – Outputs a list of all dynamic streaming levels in the world.

- **LISTLOADEDPACKAGES** – Outputs a list of loaded packages.

- **LISTPAWNCOMPONENTS** – Outputs a list of all components for all Pawns in the world.

- **LISTPRECACHEMAPPACKAGES** – Outputs a list of the packages in the precache list which have not been “loaded” out.

- **LISTSKELMESHES** – Outputs a list of mappings from skeletal meshes to instances for all skeletal meshes.

- **LISTSPAWNEDACTORS** - lists all dynamic actors in persistent level with some info; also implicitly called by MEMLEAKCHECK.

- **LISTTHREADS** - gives a lot of info about what thread is running on which core.

- **LOGACTORCOUNTS** – Outputs counts for all actors, dynamic actors, and ticked actors.

- **LOGOUTSTATLEVELS** – Outputs information about streaming levels.

- **MERGEMESH \[meshes]** – Merges the specified skeletal meshes (space delimited list) using the mesh merge utility.

- **MOVEACTORTIMES** – Outputs all actor move times over one frame.

- **NAMEHASH** – Displays information about the name table.

- **OBJ** - is used in conjunction with the following parameters

  - **BULK** -

  - **CLASSES** - displays a list of all loaded classes

  - **COMPONENTS** -

  - **DEPENDENCIES** - displays a list of dependencies upon a specific package as passed by a string parameter

    - **PACKAGE=** - The package to inspect.

  - **DUMP** - Dump all variable values for the specified object, supports specifying categories to hide or show (hide=movement,collision)

    - **\[class]** - plain name or CLASS= or NAME=

    - **HIDE=** - Comma separated list of categories to exclude.

    - **SHOW=** - Comma separated list of categories to include.

  - **FLAGS** -

  - **GARBAGE** - Forces a garbage collection sweep.

  - **GC** - Forces a garbage collection sweep.

  - **HASH** - Displays a count of how many objects have hashes.

  - **INSTRINISICCLASSES** -

  - **LINKERS** - iterates through GObjLoaders and displays info about their linkers

  - **LIST** - displays a list of objects of a class, from a package, or inside a package.

    - **CLASS=** - the string value is the class of object to find

    - **INSIDE=** - the string value is the name of the package to look in for objects

    - **PACKAGE=** - the string value is the name of the package to list objects which have an outer of that package

      - **COUNT** - number of instances

      - **NUMBYTES** - size determined by serialization and class size

      - **MAXBYTES** - same as above but also taking into account TArray slack

      - **RESBYTES** - max size of resource (textures, sound, animation, etc.)

  - **MARK** - tells the engine to iterate through all objects and set their marked flag

  - **MARKCHECK** - displays a list of objects that aren't marked

  - **REFS** - takes two parameters which identify a class and name of an object, then displays all objects that reference it (**NOTE**: OBJ REFS uses a lot of stack, so, if you get strange crashes while trying to use it, try greatly increasing your stack size - for PC this is in the Linker->System section of the Visual Studio project compiler settings<sup>?</sup>.)

    - **CLASS=** - Class to chekc.

    - **NAME=** - Name of the object to check.

- **PARANOIDDEVICELOSTCHECKING** – Toggles checking for device lost every draw call.

- **PARTICLETICKSTATS** – Track particle tick statistics

  - **DUMP** – Output particle tick stats in CSV format to log file.

  - **RESET** – Empty tracked particle tick stats.

  - **START** – Begin tracking particle tick stats.

  - **STOP** – End tracking particle tick stats.

- **PHYSASSETBOUNDS** – Outputs a list of all physics assets bounds updates over one frame.

- **PUSHVIEW \[command]** – Command for controlling object propagation from editor.

  - **START** – Start propagation.

  - **STOP** – Stop propagation.

  - **SYNC** – If propagation is enabled, sync the player’s location and rotation.

  - **\[X] \[Y] \[Z] \[PITCH] \[YAW] \[ROLL]** – Directly set the location and rotation of the player.

- **REATTACHCOMPONENTS \[CLASS=class]** – Force all components of the specified class to be reattached.

- **RELOADCFG \[class/object]** – Reloads the config for the specified class or object.

- **RELOADCONFIG \[class/object]** – Reloads the config for the specified class or object.

- **RELOADLOC \[class/object]** – Reloads the localization data for the specified class or object.

- **RESETLINECHECKS** – Clears line check results if LINE_CHECK_TRACING is defined.

- **SAVESHADERS** – Saves local shader caches.

- **SHOWEXTENTLINECHECK** – Draw debug lines for non-zero extent line checks and debug boxes at end of checks.

- **SHOWFACEFXBONES** – Verifies that the FaceFX bone indices match the skeletal mesh bone indices.

- **SHOW FACEFXDEBUG** – Traces FaceFX bone list to see if more than one mesh is referencing or re-linking the master bone list.

- **SHOWISOVERLAPPING** – Outputs a list of all IsOverlapping calls over one frame.

- **SHOWLIGHTENVS** – Outputs a list of all light environments that were ticked over one frame.

- **SHOWLINECHECK** – Draw debug lines for zero extent line checks.

- **SHOWLOG** – Toggles display of the console log window.

- **SHOWOCTREE** – Toggles display of the octree.

- **SHOWPOINTCHECK** – Draw boxes at extent of point checks.

- **SHOWSKELCOMPLODS** – Outputs all skeletal component LODs over one frame.

- **SHOWSKELCOMPTICKTIME** – Outputs a list of all skeletal mesh components that were ticked over one frame.

- **SHOWSKELMESHLODS** – Outputs all skeletal mesh LODs over one frame.

- **SHRINKOCTREE** – Removes any slack in the octree.

- **STRUCTPERFDATA** – Enables tracking of serialization performance. Requires TRACK_SERIALIZATION_PERFORMANCE or LOOKING_FOR_PERF_ISSUES to be defined.

  - **DUMP** – Outputs serialization performance data.

  - **RESET** – Clears serialization performance data.

- **SUPPRESS \[tag]** - suppress log messages.

- **TICKFREQ** – Toggles use of decreased tick frequency if required.

- **TOGGLEALLSCREENMESSAGES** – Toggles the display of all onscreen messages or warnings.

- **TOGGLECROWDS** – Toggle all crowds on or off.

- **TOGGLEDEBUGGER** – Toggles the use of the script debugger.

- **TOGGLEDRAWEVENTS** – Toggles display of draw events.

- **TOGGLEFLUIDS** – Toggles all fluid surfaces on or off.

- **TOGGLELINECHECKS** – Toggles line check stack tracing on or off.

- **TOGGLELINECHECKSPIKES \[value]** – Sets the number of line checks which will cause line checks to be dumped for the current frame if exceeded.

- **TOGGLELOGDETAILEDACTORUPDATESTATS** – Toggles the output of detailed actor update statistics on or off.

- **TOGGLELOGDETAILEDCOMPONENTSTATS** – Toggles the output of detailed component statistics on or off.

- **TOGGLELOGDETAILEDTICKSTATS** – Toggles the output of detailed tick statistics on or off.

- **TOGGLEMOBILEEMULATION** – Toggles the use of mobile emulation on the PC (game or editor).

- **TOGGLEONSCREENDEBUGMESSAGESYSTEM** - toggles the display of all on-screen debug messages

- **TOGGLEONSCREENDEBUGMESSAGEDISPLAY** - toggle on-screen debug messages

- **TOGGLERENDERINGTHREAD** – Starts/Stops the rendering thread.

- **TOGGLESTREAMINGVOLUMES \[ON/OFF]** – Turns streaming volumes on or off according to the parameter specified. If none is specified, a toggle is performed.

- **TRACEFACEFX** - Traces FaceFX bone list to see if more than one mesh is referencing or re-linking the master bone list.

- **UNSUPPRESS \[tag]** – Tells the engine to unsuppress log messages.

- **USENEWMOUSEINPUT** – Toggles use of new DirectInput mouse input method.

- **VIEWNAMES \[Number]** – Displays the last Number of names added to the name table.

### **Statistics Commands**

The STAT command is responsible for enabling the display of statistical data on the screen during runtime as well as controlling how and what data is shown. It can be used in conjunction with the following parameters to toggle on/off the display of statistics for the specified group of data (see [\[Stats Descriptions\]](https://api.unrealengine.com/udk/Three/StatsDescriptions.html) for more details):

- **ANIM** – Toggles display of animation system statistics.

- **ASYNCIO** – Toggles asynchronous loading statistics.

- **AUDIO** – Toggles display of audio system statistics.

- **CANVAS** – Toggles display of canvas drawing statistics.

- **CHART \[command] \[parameters]** – Command for controlling the stat chart. Command and parameters can be the following:

  - **Command**

    - **KEY** – Toggles display of the chart key.

    - **LOCKSCALE** – Locks scaling of the chart.

    - **RESCALE** – Rescales the chart to fit all data.

    - **RESET** – Removes all chart lines.

    - **SHOW** – Toggles rendering of the stat chart.

  - **Parameters**

    - **XRANGE=** - Sets the range of the chart in the x axis.

    - **XSIZE=** - Sets the chart size in the x axis.

    - **YSIZE=** - Sets the chart size in the y axis.

    - **XPOS=** - Sets the chart origin in the x axis.

    - **YPOS=** - Sets the chart origin in the y axis.

    - **ALPHA=** - Sets the chart’s background alpha.

    - **FILTER=** - Sets the filter string for the chart.

- **COLLISION** – Toggles display of collision statistics.

- **CROWD** – Toggles display of crowd system statistics.

- **D3D10RHI** – Toggles display of DirectX 10 statistics.

- **D3D9RHI** – Toggles display of DirectX 9 statistics.

- **DECALS** – Toggles display of decal rendering statistics.

- **DLE** – Toggles display of dynamic light environment rendering statistics.

- **ENGINE** – Toggles display of general engine statistics.

- **FACEFX** – Toggles display of FaceFX animation statistics.

- **FLUIDS** – Toggles display of fluid simulation statistics (i.e., fluidsurfaces).

- **FPS** – Toggles display of frames per second (fps) statistics.

- **FPSCHART** – Toggles display of the fps chart statistics.

- **GAME** – Toggles display of game statistics. (tick times, etc.)

- **INSTANCING** – Toggles display of instancing statistics.

- **MEMORY** – Toggles display of general memory statistics.

- **MEMORYCHURN** – Toggles display of statistics dealing with memory allocation.

- **NAVMESH** – Toggles display of navigation mesh statistics.

- **NET** - toggles on/off (inter)net(work) statistics display

- **NONE** - toggles off all statistics display

- **OCTREE** – Toggles display of octree-related statistics.

- **PARTICLES** – Toggle display of general particle statistics.

  - **BEAMPARTICLES** – Toggles display of statistics dealing with beam emitters.

  - **MESHPARTICLES** – Toggles display of statistics dealing with mesh emitters.

  - **TRAILPARTICLES** – Toggles display of statistics dealing with trail emitters.

- **PATHFINDING** – Toggles display of general pathfinding statistics.

- **PHYSICS** – Toggles display of general physics statistics.

  - **PHYSICSCLOTH** – Toggles display of statistics dealing with cloth simulation.

  - **PHYSICSFIELDS** – Toggles display of statistics dealing with physics fields.

  - **PHYSICSFLUIDS** – Toggles display of statistics dealing with PhysX fluid simulations.

- **SCENRENDERING** – Toggles display of scene rendering statistics.

- **SCENEUPDATE** – Toggles display of general scene updating statistics.

- **SCRIPT** – No stats associated with this command.

- **SHADERCOMPILING** – Toggles display of shader compiling statistics.

- **SHADERCOMPRESSION** – Toggles display of shader compression statistics.

- **STREAMING** – Toggles display of streaming levels statistics.

- **THREADING** – Toggles display of statistics for the various threads running in the engine.

- **UI** – Toggles display of general UIScene statistics.

STAT can also be used with the following parameters to modify settings about how and what data is displayed:

- **COLOR** – Unimplemented

- **COUNTERS** – Toggles rendering of counters and accumulators.

- **CYCLES** - Toggles rendering of cycle counters.

- **EXCLUSIVE** – Toggles display of all exclusive data.

- **FONTSCALE \[scale]** - Scales the size of the font that's used for drawing the stats.

- **GROUPED** – Sets the stat rendering mode to grouped.

- **HIER / HIERARCHY** – Sets the rendering mode to hierarchical.

- **INCLUSIVE** – Toggles display of all inclusive data.

- **LIST** – Displays the names of stat groups in the console according to the following

  - **GROUPS** – Display the names of all available groups

  - **SETS** – Displays the names of any saved sets in the CustomStats section of the .ini file

  - **Group \[name]** – Displays the stats contained within the specified group.

- **NAME \[name]** – Enables or disables a stat specified by name.

- **NAV \[index]** – Navigates the stats tree when in the hierarchical rendering mode. The index is the number of the stat to navigate to.

- **NONE** – Toggle display of all currently visible stats.

- **SAVE \[name]** – Output to the \*Engine.ini file in the CustomStats section all currently visible stats using the specified name as the group name.

- **SLOW \[threshold] \[duration]** – Sets rendering mode to only display slow cycle stats. Threshold defaults to 0.01f and duration defaults to 10.0f.

- **STARTFILE** – Begin capturing stats file for use with the StatsViewer

- **STOPFILE** – Finish capturing stats file

### **Memory and Performance Commands**

- **BEGINTRACKINGTHREAD** – Begins tracking the current thread.

- **DEFERRED_STOPMEMTRACKING_AND_DUMP** - Executes the SNAPSHOTMEMORY, STOPTRACKING and DUMPALLOCSTOFILE commands in a deferred manner.

- **DUMPFPSCHART** – Outputs FPS chart information.

- **DUMPMEMCHART** – Outputs memory chart information.

- **DUMPPARTICLECOUNTS** – Outputs information about particle counts

- **DUMPSLACKTRACES** – Outputs the traces of the array slack tracking; only valid if TRACK_ARRAY_SLACK is defined.

- **ENDTRACKINGTHREAD** – Stops tracking the current thread.

- **MEM** - displays allocated memory information.

- **MEMFRAGCHECK** – Performs a memory fragmentation check. Defers the actual execution until after the next garbage collection to get an accurate reading.

- **MEMLEAKCHECK** – Performs a check for memory leaks. Defers actual execution until after next garbage collection to get an accurate reading.

- **MEMORYSPLIT** – Outputs information about how memory is split between various resources.

- **MEMREPORT \[option]** – Executes a conglomerate of commands to output various info as well as memory stats. The only option is:

  - **FRAG** – Causes MEMFRAGCHECK to be executed as well.

- **MEMTAG_UPDATE** – Force an update to the MemTagging system.

- **MESHESWITHCOLLISION** – Outputs list of all loaded static meshes and whether they have collision meshes.

- **PARTICLEMEMORY** – Outputs information about how memory is used for particles.

- **PARTICLEMESHUSAGE** – Outputs info about the amount of static meshes used with particles systems.

- **PROFILESCRIPT / SCRIPTPROFILER** - for profiling script execution;

  - \* START\* - begin script profiling

    - **TIME=** - captures data for a given duration (in seconds)

  - **STOP** - end script profiling

  - **RESET** – reset script profiling

- **QUERYPERFDB** – Outputs aggregated duration of tasks on this machine; grouped by task, sorted by duration.

- **RENDERTARGET_MEM_USAGE** – Outputs memory usage info for render targets to the log.

- **RESETFPSCHART** – Resets the FPS chart information.

- **RESTEMEMCHART** – Resets the memory chart information.

- **RESETSLACKTRACKING** – Resets the array slack tracking; only valid if TRACK_ARRAY_SLACK is defined.

- **SNAPSHOTMEMORY** -

- **TOGGLESLACKTRACKING** – Turns array slack tracking on or off; only valid if TRACK_ARRAY_SLACK is defined.

- **TRIMMEMORY** – Attempts to return memory back to the OS from unused segments.

### **Display Commands**

- **GAMMA \[value]** – Modifies the display gamma level.
- **SETRES \[height]x\[width]\[w|f]** - changes the resolution (w = windowed; f = fullscreen) for example: 800x600f

### **Rendering Commands**

- **AVAILABLETEXMEM** – Outputs the amount of available texture memory.

- **CAPTUREMODE** - Toggles the display of all onscreen messages or warnings.

- **COLORGRADING** – Toggles the use of color grading.

- **DUMPAVAILABLERESOLUTIONS** – Outputs all available display resolutions.

- **FREEZEALL** – Freezes rendering and streaming.

- **FREEZERENDERING** – Forces rendering to freeze or resume. Allows viewing of the scene as it was rendered from the point the command was entered.

- **FREEZESTREAMING** – Forces streaming to freeze or resume.

- **FULLMOTIONBLUR \[value]** – A value of -1 uses default engine setting for FullMotionBlur. A value of 0 forces Full MotionBlur off. A value of 1 forces FullmotionBlur on.

- **LIGHTMAPSTREAMINGFACTOR \[value]** – Sets how aggressively lightmaps are streamed out. Smaller values (default 0.03f) mean more aggressive.

- **LISTMISSINGPHYSICALMATRIALS** – Outputs a list of all material instances without a physical material association.

- **LISTTEXTURES** – Output a list of textures.

  - **ALPHASORT** – Force list to be sorted alphabetically instead of by size.

  - **NONSTREAMING** – List non-streaming textures.

  - **STREAMING** – list streaming textures.

- **LOWRESTRANSLUCENCY** – Toggles the use of the down sampled translucency buffer.

- **MOVIE \[command]** – Controls all movies. Command can be one of the following.

  - **PAUSE** – Pauses all movies.

  - **PLAY** – Starts playing all movies.

  - **STOP** – Stops playing all movies.

- **MOVIEHIDE** – Sets current movie hidden.

- **MOVIESHOW** – Sets current movie visible.

- **MOVIETEST \[movie]** – Plays the specified movie for testing purposes, waits for it to finish, and then stops the movie.

- **NEXTVIEWMODE** – Switches to the next viewmode.

- **NUMSTREAMEDMIPS \[lodgroup] \[mips]** – Sets the number of mips to use for the specified texture group.

- **PREVVIEWMODE** – switches to the previous viewmode.

- **RECOMPILESHADERS** – Forces shaders to be recompiled according to one of the following:

  - **ALL** – Recompiles all shaders.

  - **BPCF** – Recompiles only SRG_GLOBAL_BPCF_SHADOW_LOW shaders.

  - **CHANGED** – Recompiles only changes shaders.

  - **GLOBAL** – Recompiles global shaders.

  - **GLOBALMISC** – Recompiles only SRG_GLOBAL_MISC shaders

  - **MATERIAL \[name]** – Recompiles the specified material.

  - **MATERIALSHADERTYPE \[type]** – Recompiles materials of the specified shader type.

  - **SHADOW** – Recompiles only SRG_GLOBAL_MISC_SHADOW shaders.

  - **VF \[name]** - Recompiles the specified vertex factory.

- **RECOMPILEGLOBALSHADERS** – Recompiles global shaders. Same as RECOMPILESHADERS GLOBAL.

- **SETMAXMIPLEVEL \[max]** – Sets the largest mip level to use for lightmaps.

- **SHADERCOMPLEXITY \[max]** – Sets the maximum complexity value for use with the SHADERCOMPLEXITY viewmode.

- **SHADOWMAPSTREAMINGFACTOR** – Sets how aggressively shadow maps are streamed out. Smaller values (default 0.09f) mean more aggressive.

- **SHOW** - toggle display of various items (only for clients)

  - **BOUNDS** – Toggle display of actor bounds.

  - **BSP** – Toggle display of BSP geometry.

  - **BSPSPLIT** – Toggle display of BSP splits. Colors BSP based on model component association.

  - **CAMFRUSTUMS** – Toggle display of camera frustums.

  - **COLLISION** – Toggle display of collision primitives.

  - **CONSTRAINTS** – Toggle display of physical constraints.

  - **COVER** – Toggle display of cover locations.

  - **DECALINFO** – Toggle display of debug dev information for decals (frustums, tangent axes, etc.)

  - **DECAL** – Toggle display of decal actors.

  - **DYNAMICSHADOWS** – Toggle display of dynamic shadows.

  - **FOG** – Toggle display of fog actors.

  - **FOLIAGE** – Toggle display of foliage.

  - **HITPROXIES** – Toggle display of hit proxies. Draws each hit proxy with a different color.

  - **INSTANCEDSTATICMESHES** – Toggle display of instanced static meshes.

  - **LENSFLARES** – Toggle display of lens flares.

  - **LEVELCOLORATION** – Toggle rendering all objects within the same level using the same color.

  - **MESHEDGES** – Toggle display of mesh edges in filled view modes.

  - **MISSINGCOLLISION** – Toggle highlighting of static meshes with collsion turned on but no collision mesh.

  - **NAVNODES** – Toggles display of actors associated pathing.

  - **NONZEROEXTENT**

  - **PARTICLES** – Toggles display of particle geometry.

  - **PATHS** – Toggles display of paths or navigation meshes.

  - **POSTPROCESS** – Toggle display of post process effects.

  - **RIGIDBODY**

  - **SCENCAPTURE** – Toggles updating of scene capture probes.

  - **SHADOWFRUSTUMS** – Toggle display of un-occluded shadow frustums.

  - **SKELETALMESHES** - Toggle display of skeletal mesh geometry.

  - **SKELMESHES** – Toggle display of skeletal mesh geometry.

  - **SPEEDTREES** – Toggle display of speedtree geometry.

  - **SPLINES** – Toggles display of splines.

  - **SPRITES** – Toggle display of sprite components.

  - **STATICMESHES** – Toggle display of static mesh geometry.

  - **TERRAIN** – Toggle display of terrain geometry.

  - **TERRAINPATCHES** – Toggle display of terrain patches. Draws an outline around each patch.

  - **TRANSLUCENCYDOF** – Toggle display of translucency blur factor.

  - **UNLITTRANSLUCENCY** – Toggle display of unlit translucency.

  - **VOLUMES** – Toggles display of volumes.

  - **ZEROEXTENT**

- **SHOWMATERIALDRAWEVENTS** – Toggles draw events emission.

- **SHOWMIPLEVELS** – Toggles the use of solid colors in place of lightmaps to visualize mip levels.

- **TEXTUREDEFRAG** – Defragments the texture pool.

- **TEXTUREDENSITY \[min] \[ideal] \[max]** – Sets the minimum, ideal, and maximum texture density values for use with the TEXTUREDNEISTY viewmode.

- **SHOWSELECTEDLIGHTMAP** – Toggles whether to visualize the lightmap selected by the debug camera.

- **TOGGLEAO** – Toggles ambient occlusion post process.

- **TOGGLECOLLISIONOVERLAY** – Toggles rendering of the collision mesh overlay for terrain.

- **TOGGLEMINDISTORTION** – Toggles whether distortion s applied to minimal screen extents or entire screen.

- **TOGGLEMINTRNSLUCENCY** – Toggles whether translucent resolve to the raw format or not.

- **TOGGLEOCCLUSION** – Toggles use of occlusion.

- **TOGGLESCENE** – Toggle scene color post process.

- **TOGGLEUI** – Toggles updating and display of the UI.

- **TRACKTEXTURE \[name]** – Adds the texture name into the streaming system to track all textures containing that name.

- **UNTRACKTEXTURE \[name]** – Removes the texture name from texture tracking.

- **VIEWMODE \[value]** - set the render mode

  - **BRUSHWIREFRAME** – Renders scene in a wireframe view showing brush edges.

- **LIGHTCOMPLEXITY** – Renders scene using a special shader that displays the complexity of the lighting on (number of dynamic lights affecting) each surface using specific colors to denote the number of lights.
  - **LIGHTINGONLY** – Renders scene using only the lighting information on the geometry.

- **DETAILLIGHTING** - Renders scene using a neutral material affected by lighting with normals.
  - **LIGHTMAPDENSITY** – Renders scene using a special shader that displays the density of texels for the lightmap on each surface.

- **LITLIGHTMAPDENSITY** - Renders scene fully lit using a special shader that displays the density of texels for the lightmap on each surface. This is essentially a combination of the LIGHTMAPDENSITY and LIGHTINGONLY viewmodes.
  - **SHADERCOMPLEXITY** – Renders scene using a special shader that displays the complexity of the material being used by each surface using specific colors to denote ranges of shader instructions.

- **TEXTUREDENSITY** – Renders scene using a special shader that displays the density of texels for the diffuse channel on each surface using specific colors to indicate the density.
  - **UNLIT** – Renders scene with flat shading, i.e., no lighting.

- **WIREFRAME** – Renders scene in a wireframe view.

### **Texture Mip-Map Fading Commands**

- **TOGGLEMIPFADE** - Toggles all texture fading on/off.
- **PAUSERENDERCLOCK** - Pauses/unpauses the renderthread clock that's used by texture fading. Pausing it will freeze the fading. Any new textures that are streamed in will then be low-res (not fading in). Then you can togglemipfade or unpause the clock to see the difference (and measure performance).

### **Physics Commands**

- **DUMPAWAKE** – Output list of all awake physical bodies.

- **MESHSCALES** – Outputs scale values of all static meshes to the log file.

- **NXDUMP** – Output all physics information to an XML file.

- **NXDUMPMEM** – Output all PhysX memory allocations to the log.

- **NXSTATS** – Enables output of all physics statistics.

- **NXVIS** – Enable visualization of physics simulation.

  - **PHYSX_CLEAR_ALL** – Clear all currently enabled visualization flags.

  - **ACTOR_AXES** – Toggle vis of actor axes.

  - **BODYAXES** – Toggle vis of bodies’ axes

  - **BODY_ANGULAR_VELOCITY** – Toggle vis of angular velocities of physical bodies.

  - **BODY_JOINT_GROUPS** – Toggle vis of joint groups.

  - **BODY_LINEAR_VELOCITY** – Toggle vis of linear velocities of physical bodies.

  - **CCD** – Toggle vis of CCD skeletons.

  - **CCDTESTS** – Toggle vis of CCD tests.

  - **CLOTH_ATTACHMENT** – Toggle vis of cloth attachments.

  - **CLOTH_COLLISIONS** – Toggle vis of cloth collisions.

  - **CLOTH_MESH** – Toggle vis of cloth mesh wireframe.

  - **CLOTH_SELFCOLLISIONS** – Toggle vis of cloth self collisions.

  - **CLOTH_SLEEP** – Toggle vis of overall cloth sleeping.

  - **CLOTH_SLEEPVERTEX** – Toggle vis of vertex sleeping.

  - **CLOTH_TEARABLE_VERTICES** – Toggle vis of tearable vertices.

  - **CLOTH_TEARING** – Toggle vis of cloth tearing.

  - **CLOTH_VALIDBOUNDS** – Toggle vis of valid bounds for cloth.

  - **CLOTH_WORKPACKETS** – Toggle vis of clustering for the PPU simulation.

  - **COLLISION** – Toggle vis of physics simplified collision geometry.

  - **COLLISION_AABBS** – Toggle vis of axis-aligned bounds in world space.

  - **COLLISION_AXES** – Toggle vis of collision geometry axes.

  - **COLLISION_COMPOUNDS** – Toggle vis of compound bounds.

  - **COLLISION_DYNAMIC** – Toggle vis of dynamic pruning structures.

  - **COLLISION_EDGES** – Toggle vis of collision mesh active edges.

  - **COLLISION_FNORMALS** – Toggle vis of collision mesh and face normals.

  - **COLLISION_FREE** – Toggle vis of “free” pruning structures.

  - **COLLISION_SPHERES** – Toggle vis of bounding spheres.

  - **COLLISION_STATIC** – Toggle vis of static pruning structures.

  - **COLLISON_VNORMALS** – Toggle vis of collision mesh and vertex normals.

  - **CONTACTERROR** – Toggle vis of contact errors.

  - **CONTACTFORCE** – Toggle vis of contact forces.

  - **CONTACTPOINT** – Toggle vis of contact points.

  - **CONTACTS** – Toggle vis of contact normals.

  - **FLUID_BOUNDS** – Toggle vis of fluid emitter AABB bounds.

  - **FLUID_DRAINS** – Toggle vis of fluid emitter drain shapes.

  - **FLUID_DYN_COLLISION** – Toggle vis of fluid emitter dynamic collisions.

  - **FLUID_EMITTERS** – Toggle vis of fluid emitters.

  - **FLUID_KERNEL_RADIUS** – Toggle vis of fluid emitter kernel radius.

  - **FLUID_MESH_PACKETS** – Toggle vis of fluid emitter available mesh packets.

  - **FLUID_MOTION_LIMIT** – Toggle vis of fluid emitter motion limits.

  - **FLUID_PACKET_DATA** – Toggle vis of fluid emitter packet data.

  - **FLUID_PACKETS** – Toggle vis of fluid emitter packets.

  - **FLUID_POSITION** - -Toggle vis of fluid emitter particle positions.

  - **FLUID_STC_COLLISION** – Toggle vis of fluid emitter static collisions.

  - **FLUID_VELOCITY** – Toggle vis of fluid emitter particle velocities.

  - **FORCEFIELDS** – Toggle vis of force fields.

  - **JOINTLIMITS** – Toggle vis of joint limits.

  - **JOINTLOCALAXES** – Toggle vis of joint local axes.

  - **JOINTWORLDAXES** – Toggle viz of joint world axes.

  - **MASSAXES** – Toggle vis of bodies’ mass axes. Draws sleeping bodies in black, awake bodies in white, and sleeping bodies that are also part of a sleeping group in red.

  - **SOFTBODY_ATTACHMENTS** – Toggle vis of soft body attachments.

  - **SOFTBODY_COLLISIONS** – Toggle vis of soft body rigid body collisions.

  - **SOFTBODY_MESH** – Toggle vis of soft body meshes.

  - **SOFTBODY_SLEEP** – Toggle vis of soft body overall sleeping.

  - **SOFTBODY_SLEEP_VERTEX** – Toggle vis of soft body per vertex sleeping.

  - **SOFTBODY_TEARABLE_VERTICES** – Toggle vis of soft body tearable vertices.

  - **SOFTBODY_TEARING** – Toggle vis of soft body tearing.

  - **SOFTBODY_VALIDBOUNDS** – Toggle vis of soft body valid bounds.

  - **SOFTBODY_WORKPACKETS** – Toggle vis of soft body clustering for the PPU simulation.

  - **WORLDAXES** – Toggle vis of world axes

- **NXVRD** – Use remote debugger

  - **CONNECT \[ip]** – Connect to the remote debugger using specified ip address or localhost if none.

- **DISCONNECT** – Disconnect from the remote debugger.

### **Audio Commands**

- **AUDIO FLUSH TRUE** - flush all sound buffers
- **DISABLELPF** – Disables the low pass filter on all sources for testing.
- **ISOLATEDRYAUDIO** – Removes reverb to isolate the dry audio.
- **ISOLATEREVERB** – Removes the dry audio to isolate the reverb.
- **LISTAUDIOCOMPONENTS** – Outputs a list of all audio components.
- **LISTSOUNDCLASSES** – Outputs a list of loaded sounds collated by class.
- **LISTSOUNDCLASSVOLUMES** – Outputs a list of all the volume and pitch for each sound class.
- **LISTSOUNDDURATIONS** – Outputs a list of all sounds waves and their durations.
- **LISTSOUNDMODES** – Outputs a list of all sound modes.
- **LISTSOUNDS** – Outputs a list of all loaded sounds and their memory footprints.
- **LISTWAVES** – Outputs a list of wave instances and whether they have a source.
- **MODIFYSOUNDCLASS \[soundclass] \[VOL=volume]** – Modifies the specified sound class with the given volume.
- **PLAYSOUNDCUE** – Plays an arbitrary sound cue.
- **PLAYSOUNDWAVE** – Plays an arbitrary sound wave.
- **RESETSOUNDSTATE** – Resets all volumes to their default values and removes all test filters.
- **SETSOUNDMODE \[mode]** – Sets the sound mode to the specified mode.
- **SOUNDTEMPLATEINFO** – Outputs info about each unique sound.
- **TESTFEBLEED** – Sets the low frequency effect bleed to maximum on all audio sources for testing.
- **TESTLPF** – Sets the low pass filter to maximum on all audio sources for testing.
- **TESTSTEREOBLEED** – Sets stereo bleed to maximum on all audio sources for testing.

### **Networking Commands**

- **CRACKURL** - breaks down passed URL and parameters<sup>?</sup> to the engine for the map/game and displays all parameters
- **PACKAGEMAP** – Outputs the packagemap for all open network connections to the log fil.
- **SOCKETS** – Outputs a list of all open network connections to the log file.

### **Still Captures and Demo Recording Commands**

More information about this can be found in the [DemoRecording] document.

- **BUGSCREENSHOT** – Takes a screenshot of a bug.
- **DEMOPLAY** - Play a previously recorded demo.
- **DEMOREC** - Record a demo for later playback.
- **DEMOSTOP** - Stop demo playback\\recording.
- **SHOT / SCREENSHOT** – Takes a screenshot at the current screen resolution.
- **TILEDSHOT \[factor]** – Takes a screenshot with the current resolution multiplied by the specified factor.

### **Movie Capture**

More information about this can be found in the [MovieCapture] document.

- **STARTMOVIECAPTURE** – Start in-game movie capture.
- **STOPMOVIECAPTURE** - Stop in-game movie capture.

### **Gameplay Commands**

- **SAVEGAME** - tells the engine to save the current game state. See SavingAndLoadingGames<sup>?</sup> for more info.
- **SAY** - GUI server only

### **Navigation and Pathfinding Commands**

- **ADDLONGREACHSPECS \[option]** – Add long range reach specs. Option is:

  - **NUMPATHS=** - Number of paths to add.

- **BUILDCOVER \[option]** – Generates fire links and special move flags after reach specs have been added. Option is:

  - **FROMDEFINEPATHS=** - Whether to use defined paths or not.

- **BUILDNETWORKIDS** – Builds the network IDs for the navigation points.

- **DEFINEPATHS \[options]** – Clears all paths and then rebuilds them. Options are:

  - **REVIEWPATHS=** - Causes paths to be reviewed if any were created.

  - **SHOWMAPCHECK=** - Causes the Map Check dialog to be shown after the paths have been built.

  - **UNDEFINEPATHS=** - Causes paths to be undefined before building.

- **FINISHPATHBUILD** – Performs finalization and cleanup for path building process.

- **GENERATENAVMESH** – Rebuilds the navigation mesh.

- **NAVOCTREE \[options]** – Takes one of the following options:

  - **STATS** – Outputs stats about the navigation octree.

  - **FIND** – Finds the specified node in the octree.

    - **NAME=** - Name of the node to find.

- **POSTDEFINEPATHS** – Calls PostPathBuild on all Kismet sequence objects.

- **PREDEFINEPATHS** – Calls PrePathbuild on all Kismet sequence objects.

- **SETPATHCOLLISION \[option]** – Enables or disables path collision. Option is:

  - **ENABLED=** - Whether to enable or disable path collsiions.

### **User Interface Commands**

- **DEBUGUIPREFAB \[object]** – Output information about the specified UI prefab object.

- **SHOWINPUTHANDLERS** – Output input handlers for a specific key in a specific UIScene.

  - **SCENE=** - Specifies a UIScene to search within.

  - **KEY=** - Specifies a key to look for subscribers for.

- **SHOWUNRESOLVEDPOSITIONS** – Output any objects with outdated positions within a specific UIScene.

  - **SCENE=** - Specifies a UIScene to search within.

- **TOGGLEDEBUGINPUT \[true/false]** - display debug info then (CTRL-ALT-D to toggle displaying the info; then CTRL-F to toggle displaying the focused widget).

### **Miscellaneous Commands**

- **GET \[class] \[property]** - returns the default value of a class property

- **GETALL \[class] \[property]** - returns the value property for all instantiated classes

- **DISPLAYALL / DISPLAYALLSTATE** - Identical to "getall", but displays output on the screen in realtime, similarly to stats.

- **DISPLAY \[object] \[property]** - Displays only the specified property for the specified single object. Only enough of the outer chain is required to make the object uniquely identifiable.

- **DISPLAYCLEAR** - Clears all display\* output.

- **DLE** – Outputs a list of all disabled dynamic light environments.

- **VERIFYCOMPONENTS** – Iterates through all components to verify integrity.

- **LISTANIMSETS** – Output a list of animation sets

  - **ALPHASORT** – Sort list alphabetically.

- **ANIMSEQSTATS** – Outputs animation sequence statistics.

- **LISTANIMSETS** – Output a list of animation sets.

  - **ALPHASORT** – Sort list alphabetically.

- **LISTANIMTREES** – Outputs a list of animation trees

  - **ALPHASORT** – Sort list alphabetically.

- **LISTMATINEEANIMSETS** – Output a list of animation sets used by Matinee in the current level.

  - **ALPHASORT** – Sort list alphabetically.

- **SET** - this one is the most powerful of them all. It takes as the first parameter string a class name, the second string a variable name, and the third string, a value. All objects of the given class (including subclasses) will have the given variable set to the given value. For example "set Pawn CollisionRadius 200" will make all pawns have a collision radius of 200. (See PawnTricksAndTips<sup>?</sup> for more details). In v3323 the set command has limited functionality when using online, this is to limit cheating.

- **SETNOPEC** – Same as SET command but does not fire off Pre/Post Edit Change notifications.

- **SHOWHOTKISMET** – Outputs the top 10 most used Kismet sequence ops.

### **System Settings Commands**

The System Settings commands allow you to change the settings as described by the [SystemSettings] document, which are normally set by the [Application Compatibility] system.

- **SCALE \[scale command]** - where \[scale command] is one of:

  - **ADJUST** - enable/disable using the Xbox "shoulder" buttons to bind to SCALE DECR and SCALE INCR

- **DECR** - decrement the ScreenPercentage setting
  - **DUMP** - dump current system settings to the log

- **DUMPINI** - dump the INI system settings to the log
  - **INCR** - increment the ScreenPercentage setting

- **LEVEL \[0-5]** - set one of the Application Compatibility levels, from 0 to 5.
  - **LOWEND** - assume a very low end list of settings

- **HIGHEND** - assume a very high end list of settings
  - **RESET** - reload the system settings from the INI file

- **SET \[setting] \[value]** - set a specific setting (listed in the [SystemSettings] document) to a certain value

  - **TOGGLE \[setting]** - toggle a boolean setting

### **Mobile Commands**

These commands only work on mobile platforms (specifically iOS)

- **CALIBRATETILT** - Recalibrates the device's tilt based on the current orientation of the device.

- **MOBILE/IPHONE \[command]** - where **command** is one of:

  - **DISABLEROTATION** - Disables the view autorotation when the user rotates the view.

- **ENABLEROTATION** - Enables the view autorotation when the user rotates the view.
  - **DISABLESLEEP** - Keeps the screen of the device from going to sleep.

- **ENABLESLEEP** - Lets the screen of the device to go to sleep.
  - **ABOUT \[url]** - Loads a web page in the platform's web browser. Uses the **AboutURL** config setting in MobileEngine.ini and replaces the **\`~** with the **url** specified int he command.

- **SAVESETTING \[key] \[value]** - Saves a key/value string pair to the user's settings.
  - **LOADSETTING \[key]** - Loads a value from the user's settings for the given **key**.

- **PLAYSONG \[song]** - Plays the given mp3 **song** (file name without path or extension) in hardware.
  - **STOPSONG** - Stops the mp3 song currently playing in hardware.

- **APPEXIT** - Exits the app on the device.

### **Editor-Specific Commands**

See the [\[Editor Console Commands\]](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html) page for more commands that are used only in the editor.

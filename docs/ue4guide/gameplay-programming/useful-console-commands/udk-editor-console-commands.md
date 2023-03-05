---
sortIndex: 3
sidebar: ue4guide
---

<https://docs.unrealengine.com/udk/Three/EditorConsoleCommands.html>

## Unreal Editor Console Commands

- [Unreal Editor Console Commands](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html#Unreal%20Editor%20Console%20Commands)

- [Overview](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html#Overview)

- [Command List](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html#Command%20List)

  - [General Commands](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html#General%20Commands)

  - [Actor Commands](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html#Actor%20Commands)

  - [Editor Mode Commands](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html#Editor%20Mode%20Commands)

  - [Map Commands](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html#Map%20Commands)

  - [CSG Brush Commands](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html#CSG%20Brush%20Commands)

  - [Static Mesh Commands](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html#Static%20Mesh%20Commands)

  - [CSG Surface Commands](https://api.unrealengine.com/udk/Three/EditorConsoleCommands.html#CSG%20Surface%20Commands)

### Overview

Console commands are string-based commands that you can run in the game or in the editor. They are also known as *exec commands*.

To use the editor console commands, type them into the editor command line input box or the command line of the editor log window, and press Enter. They can perform most of the common functions used when editing maps in the editor.

Lists of commands can also be stored in text files in the system directory and executed by typing exec \[filename] at the console.

## Command List

In addition to the general engine [console commands](https://api.unrealengine.com/udk/Three/ConsoleCommands.html), the following is a list of engine supported editor console commands...

### General Commands

- **BAKEANIMSETS** – Iterates over all animation sets used in the level, creates copies of them, removes all unused animation sequences in the duplicates, and assigns the duplicates in place of the originals.

- **BUGITGO \[location] \[rotation]** – Moves all viewport cameras to the given location with the given rotation.

- **BUILDLIGHTING** – Rebuilds the lighting for the current map.

- **CAMERA** – General Camera commands

  - **ALIGN** – Focuses all of the viewport cameras on selected actors

    - **NAME=** - Focuses all of the viewport cameras on the actor with the given name.

    - **ACTIVEVIEWPORTONLY** – Only focuses the active viewport.

  - **SNAP** – Snaps the perspective viewport camera to the first selected actor.

- **CHECKSOUNDS** – Outputs information about all soundwaves marked by using the TAGSOUNDS command.

- **CLASS SPEW \[PACKAGE=package]** – Exports all the scripts in the given package to the ExportedScript directory.

- **CLEANBSPMATERIALS** – Clears null BSP materials.

- **CLEANUPOLDBUILDINGS** – Rebuild all ProcBuildings in the map.

- **CLEANUPOLDBUILDINGTEXTURES** – Fixes up textures and materials associated with ProcBuildings with the wrong flags set.

- **CTRLTAB** – Brings up the Ctrl + Tab menu.

- **DELETE** – Deletes the selected actors.

- **DETLIGHT** - Toggles deterministic lighting mode for Lightmass builds.

- **DUMPMODELGUIDS** – Outputs the GUID of all models.

- **DUMPPRIMITIVESTATS** – Outputs a CSV file containing stats about primitives used in the level.

- **DUMPSELECTION** – Outputs lists of all selected actors and all selected objects.

- **DUMPTHUMBNAILSTATS \[option]** – Outputs number of thumbnails in each package. Option can be:

  - **SHOWIMAGEDATA** – Include data about thumbnail images.

- **DUPLICATE** – Duplicates the selected actors.

- **EDCALLBACK** – General editor callbacks

  - **FITTEXTURETOSURFACE** – Adjusts the UVs of the selected surface(s) so that the material applied fits the surface(s).

  - **SELECTEDPROPS** – Opens the Properties Window for the selected actor(s).

  - **SURFPROPS** – Opens the Surface Properties Window for the selected surface(s).

- **EDIT** – General editing commands

  - **COPY** – Copy the selection to the clipboard.

  - **CUT** – Cut the selection to the clipboard.

  - **PASTE \[TO=location]** – Paste clipboard contents into the map. The location can be:

    - **HERE** – Pastes the clipboard contents to the mouse location.

    - **ORIGIN** – Pastes the clipboard contents to the world origin.

- **EXEFILE \[filename]** – Execute a file containing a list of commands.

- **EXPORTLOC \[package]** – Exports and generates the localization file for the given package.

- **FARPLANE \[DIST=dist]** – Sets the far plane for rendering to the given distance.

- **FIXBUILDINGLODS \[building]** – Fixes the LODs for the given ProcBuilding.

- **FIXUPPROCBUILDINGLODQUADSAFTERSAVE** – Fixes material pointers on ProcBuildings after saving the map.

- **FORCEREALTIMECOMPRESSION \[Package=package]** – Forces the use of real-time compression on all sound waves within the given package.

- **INSTCOMPOUNT** – Outputs list of all InstancedStaticMeshComponents and how many instances of each are used.

- **JUMPTO \[location]** – Moves all viewport cameras to the given location.

- **LIGHTMASSDEBUG** – Toggles whether Lightmass is launched automatically or must be launched manually.

- **LIGHTMASSSTATS** – Toggles whether participating Lightmass agents report detailed stats to the log.

- **LMDEBUGMAT** – Toggles whether Lightmass will output BMP images for each generated material property sample to the Screenshots\\Materials directory.

- **LMDEBUGPAD** – Toggles debug padding of lightmaps by Lightmass.

- **LMIMM** - Toggles whether mappings are imported, but not processed, immediately as they complete.

- **LMIMMEDIATE** – Toggles whether mappings are imported, but not processed, immediately as they complete.

- **LMIMP** – Toggles whether mappings are processed as they are imported. Requires immediate mode to be enabled.

- **LMPADDING** – Toggles padding of mappings by Lightmass.

- **LMSORT** – Toggles whether mappings are sorted by texel cost.

- **OBJ** – General object commands

  - **EXPORT \[PACKAGE=package] \[TYPE=type] \[FILE=file] \[NAME=name]** – Export the object of the given type with the given name to the specified file.

  - **RENAME \[OLDPACKAGE=oldpackage] \[OLDGROUP=oldgroup] \[OLDNAME=oldname] \[NEWPACKAGE=newpackage] \[NEWGROUP=newgroup] \[NEWNAME=newname]** – Renames the object matching the old package, old group, and old name to the new package, new group, and new name.

  - **SAVEPACKAGE \[FILE=file] \[PACKAGE=package]** – Save the given package to the specified file.

- **PARTICLE** – General particle commands

  - **RESET** – Restarts a particle system or particle systems in the level.

    - **ALL** – Resets all particle systems.

    - **SELECTED** – Resets only the selected particle system.

- **PIVOT** – General pivot commands

  - **CENTERSELECTION** – Moves pivot of the selection to the center point of all selected actors.

  - **HERE** – Moves the pivot of the selection to mouse location.

  - **SNAPPED** – Moves the pivot of the selection to the mouse location, but snapped to the grid.

- **PREFAB SELECTACTORSINPREFAB** – Selects all the actors that make up the selected prefab instance.

- **PROCBUILDINGUPDATE \[building]** – Updates the given ProcBuilding.

- **PRUNEANIMSETS** – Iterates over all used animation sets and trims sequences off of the beginning or ending which are not used. Should only be used after running BAKEANIMSETS.

- **QUIT_EDITOR** – Exits the editor.

- **REMOVECOOKEDPS3AUDIO \[PACKAGE=package]** – Removes all cooked PS3 audio data for sound waves in the given package.

- **SAVEBRUSHASCOLLISION** – Saves the builder brush geometry as the currently selected static mesh’s collision geometry.

- **SELECT** – General selection commands

  - **BUILDERBRUSH** – Selects the builder brush.

  - **NONE** – Deselects all actors.

- **SELECTDYNAMIC** – Selects all actors which have terrain, static mesh, or skeletal mesh components and are not set up to use static or pre-computed lighting and are visible in-game.

- **SELECTNAME \[NAME=name]** – Select actors with names matching the given name.

- **SETDETAILMODE \[MODE=mode]** – Sets the detail mode to be used for the selected actors.

- **SETDETAILMODEVIEW \[MODE=mode]** – Set the detail mode to be used for rending.

- **SETREPLACEMENT \[COMPONENT=component] \[CLASS=class]** – Replaces the components of the selected actors with the specified component (mandatory). If a class is specified, only components matching that class are replaced.

- **SETSHADOWPARENT** – Forcibly sets the first selected dynamic actor as the shadow parent of all remaining selected dynamic actors. Requires at least 2 dynamic actors to be selected.

- **SKELETALMESH** – General skeletal mesh commands

  - **CHARBITS \[OFFSET=offset] \[ORIENTATION=orientation]** – Sets the offset and orientation for all skeletal meshes in the currently selected packages. (Only works with Generic Browser)

- **SWARMDISTRIBUTION** – Toggles whether to enable Swarm distribution for jobs.

- **TAGSOUNDS** – Marks all sound waves for debugging purposes/

- **TOGGLEDETERMINISTICLIGHTING** – Toggles deterministic lighting mode for Lightmass builds.

- **TRANSACTION** – Undo and redo commands

  - **REDO** – Performs the last undone operation.

  - **UNDO** – Undoes the last performed operation.

- **UNMOUNTALLFACEFX** – Unmounts all FaceFX assets unless currently open in the FaceFX editor.

### Actor Commands

- **ACTOR** – General actor commands

  - **ADD \[CLASS=class] \[SNAP=snap]** – Adds a new actor of the given class to the map with optional snapping.

- **ALIGN** – Snaps all vertices to the grid.

  - **MOVETOGRID** – Snaps all selected actors to the nearest grid point.

  - **ORIGIN** – Moves selected actors to the world origin.

  - **SNAPTOFLOOR** – Snaps the selected actors to the nearest surface directly below them.

  - **BAKEPREPIVOT** – Sets the current pivot location as the PrePivot of all selected actors.

- **CREATE_BV_BOUNDINGBOX \[SNAPTOGRID=snap]** – Creates a blocking volume from the bounding box of the selected static meshes with optional snapping.
  - **CREATE_BV_CONVEXVOLUME \[SNAPTOGRID=snap] \[NORMALTOLERANCE=tolerance] \[NLIMITTX=limitx] \[NLIMITY=limity] \[NLIMITZ=limitz]** – Creates a blocking volume from a convex volume containing the selected static meshes using the given normal tolerance and limits with optional snapping.

- **DELETE** – Deletes selected actors.
  - **DESELECT** – Deselects everything in the world.

- **DUPLICATE** – Creates copies of all selected actors.
  - **FIND KISMET** – Find the selected actors in Kismet.

- **HIDE** – Hides actors in the editor.

  - **SELECTED** – Only hides selected actors.

    - **STARTUP** – Hides selected actors at startup.

  - **UNSELECTED** – Only hides the unselected actors.

  - **LEVELCURRENT** – Makes the level containing the selected actors the current level.

- **LEVELGRIDVOLUMECURRENT** – Sets the level grid volume of the selected actors as the current level grid volume if all selected actors belong to the same level grid volume.
  - **LINKSELECTED** – Links the selected actors if they implement the LinkSelection interface.

- **MIRROR \[scaleVector]** – Mirror the selected actors applying the given scale.
  - **MOVETOCURRENT** - Moves the selected actors to the current level.

- **REPLACE** – Replaces selection.

  - **BRUSH** – Replace the selected brushes with the default brush.

  - **CLASS=** - Replaces the selected actors with an instance of the given class.

  - **RESET** – Resets certain properties of selected actors.

    - **ALL** - Resets location, pivot, rotation, and scale of selected actors.

    - **LOCATION** – Resets the location of the selected actors.

    - **PIVOT** – Resets the pivot of the selected actors.

    - **ROTATION** – Resets the rotation of the selected actors.

    - **SCALE** – Resets the scale of the selected actors.

- **SELECT** – Actor selection commands.

  - **ALL** – Selects all actors.

    - **FROMOBJ** – Selects all actors of the same class, or with matching static mesh, or with matching speedtree as the current selection.

  - **BASED** – Selects all actors based on the current selection.

  - **BYPROPERTY** – Select actors with matching property values.

  - **DELETED** – Select all actors in the map marked for deletion.

  - **INVERT** – Inverts the current selection.

  - **KISMETREF \[referenced]** – Selects actors referenced or not referenced by Kismet depending on the value of referenced. A value of 1 means select referenced.

  - **MATCHINGEMITTER** - Select all actors of the same class and with a particle system matching that used by the current selection.

  - **MATCHINGPROCBUILDINGRULESETS** - Select all actors of the same class and with a ProcBuilding rule set matching that used by the current selection.

  - **MATCHINGSKELETALMESH** - Select all actors of the same class and with a skeletal mesh matching that used by the current selection.

    - **ALLCLASSES** – Removes the same class restriction.

  - **MATCHINGSTATICMESH** – Select all actors of the same class and with a static mesh matching that used by the current selection.

    - **ALLCLASSES** – Removes the same class restriction.

  - **NAME=** - Select the actor with the given name.

  - **NONE** – Deselects all actors.

  - **OFCLASS \[CLASS=class]** – Selects all actors of the same class as the current selection.

  - **OFSUBCLASS \[Class=class]** – Selects all actors of the same class as the current selection or a subclass thereof.

  - **RELEVANTLIGHTS** – Selects the relevant lights for all of the currently selected actors.

  - **SYNCBROWSER** – Finds the asset used by the selected actor(s) in the browser if possible.

- **TOGGLE LOCKMOVEMENT** – Toggles whether the selected actors can be transformed with the transform widget.
  - **UNBAKEPREPIVOT** – Resets the PrePivot of all selected actors to (0,0,0).

- **UNHIDE** – Unhides actors in the editor.

  - **ALL** – Unhides all actors.

    - **STARTUP** – Unhides all actors at startup.

  - **SELECTED** – Only unhides the selected actors.

    - **STARTUP** - Unhides selected actors at startup.

  - **UNLINKSELECTED** – Unlinks the selected actors if they implement the LinkSelection interface.

- **UPDATE** – Updates the selected actors.

### Editor Mode Commands

- **MODE** – General mode commands
- **ALWAYSSHOWTERRAIN=** - Enables or disables always rendering terrain in the overhead 2D view.
  - **CAMERAMOVE** – Sets the editor into camera mode (the default mode).
- **COVEREDIT** – Sets the editor into cover editing mode.
  - **GEOMETRY** – Sets the editor into geometry mode.
- **GRID=** - Enables or disables the snapping grid.
  - **MESHPAINT** – Sets the editor into mesh painting mode.
- **ROTGRID=** - Enables or disables the rotation grid.
  - **SELECTIONLOCK=** - Enables or disables selecting or deselecting of actors.
- **SHOWBRUSHMARKERPOLYS=** - Enables or disables display of marker polygons on the builder brush and volumes.
  - **SNAPDIST=** - Sets the snapping distance tolerance.
- **SNAPVERTEX=** - Enables or disables snapping to vertices.
  - **SPEED=** - Sets the camera movement speed.
- **STATICMESH** – Sets the editor into static mesh placement mode.
  - **TERRAINEDIT** – Sets the editor into terrain editing mode.
- **TEXTURE** – Sets the editor into texture alignment mode.
  - **USEACTORROTATIONGIZMO=** - Enables or disables the actor rotation gizmo (Deprecated?)
- **USESIZINGBOX=** - Enables or disables the display of sizing information in the top left corner of the viewports.
  - **WIDGETCOORDSYSTEMCYCLE** –Cycles through the available coordinate systems, i.e. Local and World.
- **WIDGETMODECYCLE** - Cycles the transform widget through the available options.

### Map Commands

- **MAP** – General map commands

  - **BRUSH** - Brush commands

    - **GET** – Replaces the builder brush shape with the first selected brush shape.

    - **PUT** – Replaces all selected brushes with the current builder brush shape.

- **CHECK** – Perform a map check for errors.

  - **DONTCLEARMESSAGES** – Does not clear the map check dialog.

  - **DONTDISPLAYDIALOG** – Does not display the map check dialog after the check.

  - **CHECKDEP** - Perform a map check for deprecated references only.

    - **DONTCLEARMESSAGES** – Does not clear the map check dialog.

    - **DONTDISPLAYDIALOG** – Does not display the map check dialog after the check.

- **EXPORT**
  - **IMPORT \[FILE=file]** – Imports the given file into a new map.

- **IMPORTADD \[FILE=file]** – Imports the given file into the current map additively.
  - **LOAD \[FILE=file] \[STREAMVL=streamvl]** – Load the specified map file. Semicolon separated list of streaming maps to load.

- **REBUILD** – Map rebuilding commands

  - **ALLDIRTYFORLIGHTING** – Rebuilds only the CSG geometry that is out of date.

  - **ALLVISIBLE** – Rebuilds all visible CSG geometry.

  - **ROTGRID \[PITCH=pitch] \[YAW=yaw] \[ROLL=roll]** – Sets the rotation grid snap setting to the specified pitch value.

- **SCALE \[FACTOR=factor] \[ADJUSTLIGHTS=adjustlights] \[SCALESPRITES=scalesprites] \[SCALELOCATIONS=scalelocations] \[SCALECOLLISION=scalecollision]** – Scales the map by the given factor using the given parameters.

  - **SELECT** – Selection commands

    - **ADDS** – Selects all additive brushes.

    - **NONSOLIDS** – Selects all non-solid brushes.

    - **SEMISOLIDS** – Selects all semi-solid brushes.

    - **SUBTRACTS** – Selects all subtractive brushes.

- **SENDTO** – Brush order commands

  - **FIRST** – Sends all selected brushes to the front of the hierarchy.

  - **LAST** – Sends all selected brushes to the back of the hierarchy.

  - **SWAP** – Swaps the first two selected brushes’ positions in the hierarchy.

  - **SETBRUSH**

### CSG Brush Commands

- **BRUSH** - General CSG brush commands

  - **ADD \[FLAGS=flags]** – Create a new additive brush with the given flags.

- **ADDVOLUME\[CLASS=class]** – Create a new volume of the given class.
  - **EXPORT \[FILE=file]** - Export the selected brush to the given file.

- **FROM**

  - **DEINTERSECTION** – Create new brush from de-intersection of contained brushes.

  - **INTERSECTION** – Create new brush from intersection of contained brushes.

  - **IMPORT \[FILE=file]** - Import a brush from the given file.

- **LOAD \[FILE=file]** - Load a new brush from the given file.
  - **MERGEPOLYS** – Merges the selected faces of the current brush.

- **MOVEREL \[vector]** – Move the selected brush the given amount in each axis.
  - **MOVETO \[vector]** – Move the selected brush to the given location.

- **NEW** – Create a new empty builder brush.
  - **RESET** – Resets the builder brush to initial state.

- **SAVE \[FILE=file]** - Save the selected brush to the given file.
  - **SCALE \[vector]** – Scales the selected brush with the given scale.

- **SEPARATEPOLYS** – Separates the selected faces from the current brush.
  - **SUBTRACT** – Create a new subtractive brush.

### Static Mesh Commands

- **STATICMESH** – General static mesh commands

  - **FROM SELECTION \[PACKAGE=package] \[NAME=name]** – Creates a new static mesh from the selected brush in the given package with the given name

- **REBUILD** – Forces a rebuild of the selected static mesh.
  - **SMOOTH** – Sets smoothing mask of all triangles in selected static mesh to 1.

- **TO BRUSH** – Uses first selected static mesh to create a new builder brush shape.
  - **UNSMOOTH** – Sets the smoothing mask of all triangles in the selected static mesh to 0.

### CSG Surface Commands

- **POLY** – CSG surface commands

  - **SELECT** – Surface selection commands

    - **ADJACENT** – Adjacent surface selection commands

      - **ALL** – Selects all adjacent surfaces to the currently selected surfaces.

      - **CEILINGS** – Selects all adjacent ceiling surfaces (surfaces with normals pointing down) to the currently selected surfaces.

      - **COPLANAR** – Selects all adjacent surfaces to the currently selected surfaces which share the same plane.

      - **FLOORS** - Selects all adjacent floor surfaces (surfaces with normals pointing up) to the currently selected surfaces.

      - **SLANTS** - Selects all adjacent slant surfaces (surfaces that are not walls or floors or ceilings according to their normals) to the currently selected surfaces.

      - **WALLS** – Select all adjacent upright surfaces, i.e. like walls.

    - **ALL** – Selects all surfaces.

    - **MATCHING** – Select surfaces with specific matching criteria.

      - **BRUSH** – Selects all surfaces belonging to the same brush as the currently selected surfaces.

      - **GROUPS** – Selects all surfaces belonging to any brush contained within the same group as the brush which contains the currently selected surfaces.

      - **RESOLUTION** – Selects surfaces whose lightmap resolution matches that of any surface currently selected.

        - **CURRENT** – Only selects surfaces contained in the same level as the currently selected surfaces.

      - **TEXTURE** – Selects surfaces with the same material applied.

    - **MEMORY**

      - **INTERSECT** – Replace the current selection with only the surfaces which are both currently selected and contained within the saved selection in memory.

      - **RECALL** – Replace the current selection with the selection saved in memory.

      - **SET** – Save the current selection to memory.

      - **UNION** – Add the selection of surfaces saved in memory to the current selection.

      - **XOR** – Replace the current selection with only the surfaces that are not in both the current selection and the selection saved in memory.

    - **NONE** – Deselect all surfaces.

    - **REVERSE** – Invert the current selection.

    - **ZONE** – Select surfaces contained within the same zone as any currently selected surface.

  - **SET** – Sets surface properties.

    - **CLEARFLAGS=** - Unsets the given flags on the currently selected surfaces.

    - **SETFLAGS=** - Sets the given flags on the currently selected surfaces.

    - **TEXTURE=** - Applies the given material to the selected surfaces.

  - **SETMATERIAL** – Set the material applied to the currently selected surfaces using the first selected material in the Content Browser.

  - **TEXMULT \[UU=uu] \[UV=uv] \[VU=vu] \[VV=vv]** – Sets the scaling of the material on the currently selected surfaces relative to the current values.

  - **TEXPAN \[U=u] \[V=v]** – Pans the material on the currently selected surfaces by the given amounts.

    - **RESET** – Resets the panning on the surfaces before applying the new values.

  - **TEXSCALE \[UU=uu] \[UV=uv] \[VU=vu] \[VV=vv]** – Sets the scaling of the material on the currently selected surfaces.

    - **RELATIVE** – Scales relative to current values.

So if you've been living underneath a rock, Epic decided to open source their entire toolset and engine while offering it for the low price of $20 a user/month + 5% gross fee. Our reaction? That's UNREAL :)

 

I'm spending the next week doing a self-directed crash course. Here are all my notes as we switch over from Unity to Unreal.

 

General Resource Links:

<https://docs.unrealengine.com/latest/INT/>

<https://wiki.unrealengine.com/Main_Page>

<https://answers.unrealengine.com/>

<https://forums.unrealengine.com/>

All video tutorials: <https://www.youtube.com/playlist?list=PLZlv_N0_O1gaCL2XjKluO7N2Pmmw9pvhE>

<https://www.unrealengine.com/blog?category=Tutorials&offset=5&max=5>

<https://wiki.unrealengine.com/Category:Tutorials>

<https://wiki.unrealengine.com/Category:Code>

 

Oculus Rift:

<https://wiki.unrealengine.com/Oculus_Rift>

<https://wiki.unrealengine.com/Oculus_Rift_Blueprint>

<https://wiki.unrealengine.com/Oculus_Rift_Separate_View>

 

 

Compiling the source code of the engine. This 10 minute video will walk you through everything:

<https://www.youtube.com/watch?v=usjlNHPn-jo&feature=youtu.be>

<https://forums.unrealengine.com/showthread.php?1870-Unreal-Engine-4-Community-Tutorial-Youtube-Catalog>

 

Projects = Self-contained Game.

Levels = Scenes

Actors = Any object that is placable in a scene (it's a base class that has an xform on it)

 

Editor:

LMB: fly cam

RMB: Rotate

LMB+RMB: Pan

Ctrl+Alt+Left Drag: Selection Marquee in viewports

Ctrl+number: bookmark view

Ctrl+alt: tooltip

RMB+ WASD: WASD style controls

-   C,V: Increase/Decrease Zoom

Alt+Mouse: Maya control scheme

ALT+MMB + Drag (on Pivot): Move Pivot around

F: Focus on object

\`: Switch between local & world coordinates

Ctrl+P: Open an asset picker from anywhere

Ctrl+E: Edit a selected asset

Ctrl+B: Select asset in content browser

ALT+Number: Different viewmodes

1.  Lightmap Density: Green is ideal

>  

1.  Wireframe

2.  Unlit

3.  Lit

4.  Detail Lighting - Scene rendered with neutral material using normal maps of original material. Used to show interaction between normal maps + lighting

5.  Lighting Only (same as Detail but w/o normal maps)

6.  Light Complexity - Number of non-static lights affecting an object. **Note: Only up to 4 lights will cast dynamic shadows**

7.  Shader Complexity - Pink & White are extremely expensive

-   Menu Only - Stationary Light Overlap

-   Menu Only - Reflections

-   Menu Only - Base Color

-   Menu Only - Diffuse (Base + AO)

-   Menu Only - Lighting Model

-   Menu Only - Material AO

-   Menu Only - Metallic

-   Menu Only - Opacity

-   Menu Only - Roughness

-   Menu Only - Scene Color

-   Menu Only - Scene Depth

-   Menu Only - Specular Color (combination of Base Color + Metallicness)

-   Menu Only - Specular (remember, this mainly relates to IOR for materials)

-   Menu Only - Subsurface Color

-   Menu Only - World Normal

-   Menu Only - Ambient Occlusion

>  

 

F11: Immersive Mode

Ctrl+R: Toggle Real Time Playback

G: Game mode, render only what you can see in game

 

V (while using transform tools): Enables vertex snapping

ALT+V+MMB: Enables vertex snapping on pivot adjustment

End: Drops selected actor to nearest object below it

Ctrl+End: Aligns selected object to grid

MMB while in WASD mode: Affect Camera multiplier speed

Drag, then Shift: Move the camera in the direction of the object you're dragging

Lock Actor To Viewport: Can use camera to position and orient objects through camera controls

Viewport has default Eye-adaptation.

 

Material Editor:

Hold L + Drag: In Material editor, moves the light around

Drag Select Nodes + C: Create Comment box

 

Source Control:
---------------

Assets are stored in .uasset files which should contain a single asset. Each asset reference uses directory styled path to uniquely identify any asset in the game

 

FBX Workflow:

<https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/BestPractices/index.html>

 

Can layer different materials together

 

Shading Model:
--------------

(source: <http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf>)

 

-   Diffuse is energy conserving lambert

-   Micro-facet Cook-Torrence for specular

-   GGX for Normal Distribution Function

    -   <img src="process_markdown/assets/media/image1.png" alt="C:\A7226A45\C3DB749A-F181-48EA-AB4C-C6F56D120C91_files\image001.png" style="width:4.16667in;height:0.20833in" />

-   Specular - IOR used to determine incident specular (combined with Fresnel). Leave at default of 0.5. Not used for metallic surfaces

    -   If you really want to tweak or mute the Specular, it's generally because of small-scale microshadowing from cracks. Use a cavity map (AO with short trace distance). Modify shader as following:

> BaseColor = Cavity\*OldBaseColor, Specular = Cavity\*oldSpecular.

 

<table><thead><tr class="header"><th><strong>Material</strong></th><th><strong>BaseColor Intensity</strong></th></tr></thead><tbody><tr class="odd"><td>Charcoal</td><td>0.02</td></tr><tr class="even"><td>Fresh asphalt</td><td>0.02</td></tr><tr class="odd"><td>Worn asphalt</td><td>0.08</td></tr><tr class="even"><td>Bare soil</td><td>0.13</td></tr><tr class="odd"><td>Green grass</td><td>0.21</td></tr><tr class="even"><td>Desert sand</td><td>0.36</td></tr><tr class="odd"><td>Fresh concrete</td><td>0.51</td></tr><tr class="even"><td>Ocean Ice</td><td>0.56</td></tr><tr class="odd"><td>Fresh snow</td><td>0.81</td></tr></tbody></table>

**Measured BaseColors for metals:**

<table><thead><tr class="header"><th><strong>Material</strong></th><th><strong>BaseColor (R, G, B)</strong></th></tr></thead><tbody><tr class="odd"><td>Iron</td><td>(0.560, 0.570, 0.580)</td></tr><tr class="even"><td>Silver</td><td>(0.972, 0.960, 0.915)</td></tr><tr class="odd"><td>Aluminum</td><td>(0.913, 0.921, 0.925)</td></tr><tr class="even"><td>Gold</td><td>(1.000, 0.766, 0.336)</td></tr><tr class="odd"><td>Copper</td><td>(0.955, 0.637, 0.538)</td></tr><tr class="even"><td>Chromium</td><td>(0.550, 0.556, 0.554)</td></tr><tr class="odd"><td>Nickel</td><td>(0.660, 0.609, 0.526)</td></tr><tr class="even"><td>Titanium</td><td>(0.542, 0.497, 0.449)</td></tr><tr class="odd"><td>Cobalt</td><td>(0.662, 0.655, 0.634)</td></tr><tr class="even"><td>Platinum</td><td>(0.672, 0.637, 0.585)</td></tr></tbody></table>

 

**Measured Specular Values:**

<table><thead><tr class="header"><th><strong>Material</strong></th><th><strong>Specular</strong></th></tr></thead><tbody><tr class="odd"><td>Glass</td><td>0.5</td></tr><tr class="even"><td>Plastic</td><td>0.5</td></tr><tr class="odd"><td>Quartz</td><td>0.570</td></tr><tr class="even"><td>Ice</td><td>0.224</td></tr><tr class="odd"><td>Water</td><td>0.255</td></tr><tr class="even"><td>Milk</td><td>0.277</td></tr><tr class="odd"><td>Skin</td><td>0.35</td></tr></tbody></table>

 

-   Supports material instancing

 

*From &lt;<https://docs.unrealengine.com/latest/INT/Engine/Rendering/Materials/PhysicallyBased/index.html>&gt;*

 

Blue Print:
-----------

-   Construction Scripts: Run during level design

-   Event Graph: Run during game execution

-   The UI is very context sensitive. What you are selecting will affect context menus when you right click to create/connect nodes

-   BluePrints can communicate with each other through Events (these are more like class member functions) & Event Dispatchers (true events)

> Calling the Event Dispatcher will have no effect if there are no events bound to it. Consider that each Event Dispatcher has a list of events associated with it. The way to add an event to this list is by using a **Bind Event** node, and the way to remove an event from this list is by using an **Unbind Event** node. It is also possible to unbind all of the events currently bound to an Event Dispatcher with an **Unbind All Events** node.
>
> Each event can be bound only once, even if the **Bind Event** node is executed multiple times. Also, events in the *Class Blueprint* and the *Level Blueprint* are both added to the same event list, so an **Unbind All Events** node will unbind events in both the *Class Blueprint* and the *Level Blueprint*.

-   An **Unbind All Events** node executed in the *Class Blueprint* will unbind events in both the *Class Blueprint* and the *Level Blueprint* for all instances of the class.

-   An **Unbind All Events** node executed in the *Level Blueprint* will unbind events in both the *Class Blueprint* and the *Level Blueprint*, but just for the **Target**supplied.

-   Blueprints can implement interfaces (same concept as programming language interfaces). Interface functions are implemented using Events in BluePrint

-   QUESTION: What's the difference between Events & Functions?

-   Game mode defines the rules of the game and the default classes for Pawns, Player Controllers, etc

 

**In Level Blueprints**

A special type of Event Dispatcher event can be set up in the Level Blueprint, and it is the one case where an event is automatically bound to the Event Dispatcher. These events are created with the same steps as the default events such as **OnClicked** or **OnOverlap** events. The [Level Blueprint documentation]provides a walkthrough for this process.

These particular events are unique, and are automatically bound at the start of gameplay. As a result, an **Unbind All** node executed at any point will unbind these events as well. It is possible to rebind them, however, by wiring their delegate pins to **Bind Event** nodes that are executed at other points in gameplay.

 

*From &lt;<https://docs.unrealengine.com/latest/INT/Engine/Blueprints/UserGuide/EventDispatcher/CreatingEvents/index.html>&gt;*

 

 

>  

*From &lt;<https://docs.unrealengine.com/latest/INT/Engine/Blueprints/UserGuide/EventDispatcher/BindingAndUnbinding/index.html>&gt;*

>  
>
>  

 

Cascade
-------

**Emitters, Particle Systems, and Emitter Actors**

As you work with Cascade to create your own particle effects, it is important to keep in mind how each one of the objects relate to one another. In this document, we have already discussed the concept of modules, but they only make up one component of a complete particle effect. All told, the components of a particle system are **modules**, **emitters**, **particle systems**, and **emitter actors**. A solid way to remember how they relate is like so:

-   **Modules** define particle behavior and are placed within...

-   **Emitters**, which are used to emit a specific type of particle for an effect, and any number of which can be placed within a...

-   **Particle System**, which is an asset available in the Content Browser, and which can then in turn be referenced by an...

-   **Emitter Actor**, which is a placeable object that exists within your level, controlling where and how the particles are used in your scene.

 

*From &lt;<https://docs.unrealengine.com/latest/INT/Engine/Rendering/ParticleSystems/Overview/index.html>&gt;*

 

 

**Particle Calculation**

It is important to be aware of calculation order when working with particle systems. Each column in the Cascade emitter list area represents another emitter, and each block in the column represents another module. Calculation order runs like so:

-   Emitters are calculated from left to right in the emitter list.

-   Modules are calculated from top to bottom in the stack.

 

*From &lt;<https://docs.unrealengine.com/latest/INT/Engine/Rendering/ParticleSystems/Overview/index.html>&gt;*

 

 

 

 

Lighting
--------

-   Static Lights: Only affects static geometry that never moves and only contributes to lightmap bakes

-   Stationary Lights: Affects dynamic objects as well as contributes to the precomputed lightmap bakes.

-   Movable: Completely dynamic lights and only affects dynamic objects

  [Level Blueprint documentation]: https://docs.unrealengine.com/latest/INT/Engine/Blueprints/UserGuide/Types/LevelBlueprint/index.html#addingevents

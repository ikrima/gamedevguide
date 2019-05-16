Moving Components between Actors should be fully supported using the Rename function and specifying the new Actor as the outer. Renaming to change ownership doesn't impact attachment, so if you're also modifying the attachment hierarchy you'll want to also call AttachToComponent/DetachFromComponent.

If they are sub-components (i.e. declared in the component constructor and outered to the component), then only the parent needs to be renamed because the sub-component is implicitly related to the actor that it's containing component is owned by.

I don't think that the order of renames should matter. The rename on the ActorComponent is really only changing the Outer of the object and then managing the ownership arrays within the old and new owning actor.

Similarly the order of doing the rename vs. attachment shouldn't matter because the attachment will update transforms while the rename changes ownership, but neither should impact the other. (Though this all assumes no unique overrides of virtuals that do unusual actions).

 

*From &lt;<https://udn.unrealengine.com/questions/423433/moving-components-between-actors.html>&gt;*

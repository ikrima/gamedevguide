When you move or rename a file in Unreal, it is replaced with an invisible file called a Redirector. You should not let these files linger too long. The Epic Games team finds them useful, because one person can reorganize the project without needing to checkout all of the maps first, which would disrupt other users. However, it quickly turns into a big mess unless housekeeping steps are taken.

1.  Thou shalt not move a file or rename it more than once without cleaning up redirectors.

2.  To fix up redirectors:

    a. Go to the root level of the Content Browser (or select the folder that encompasses all the changes you just made)

    b. Clear the search field

    c. Add Filters-&gt;Miscellaneous-&gt;Redirector

    d. Right click on the Redirector and Choose "Fix Up"

    e. You can do this to more than one at a time.

    f. If you get a reference error, it's usually about an unloaded map. Load that map and do the operation again.

    g. Otherwise there might be references between Redirectors (if you didn't follow step 1), in this case, fix up the redirectors one at a time, starting with the first ones to be created.

### **<span class="underline">Gotchas</span>**

Unfortunately, if you're working with assets for the currently opened level, Unreal will complain that the current level still references the asset. It doesn't update references until you save the level. Once you do that, run the fix up command again.

It's extremely helpful to have all the levels loaded at once and then use "Save All Levels" to speed up this process.

### **Renaming**

If you create an object, rename it, and then create a new object with the same name as the original, an error will occur. This is because a Redirector was created when the first object was renamed, and a Redirector and a resource cannot have the same name. To solve this try the FixupRedirects commandlet.

### **Dangling Redirector**

There are a few known issues with Redirectors that can be reproduced as follows:

_Scenario 1_

1.  Rename object A to B

2.  Delete B

An error message will say that B couldn't be deleted because it is in use. This happens because the Redirector created during the rename will still point to B.

_Scenario 2_

1.  Rename object A to B

2.  Rename object B back to A

3.  Delete A

The redirector that was created for the first rename will be destroyed, but a new one will be created at B. As a result, A will not be able to be deleted because it is being referenced.

Running the FixupRedirects commandlet before deleting should solve these problems.

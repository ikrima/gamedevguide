```
sortIndex: 2
```

# Connect To Epic Perforce Depot/Downloading Epic Engine Source Code:

https://udn.unrealengine.com/docs/ue4/int/gettingstarted/downloadingunrealengine/index.html

https://udn.unrealengine.com/docs/ue4/int/gettingstarted/downloadingunrealengine/perforce/index.html

https://udn.unrealengine.com/docs/ue4/int/gettingstarted/downloadingunrealengine/perforce/setup/index.html

https://udn.unrealengine.com/docs/ue4/int/gettingstarted/downloadingunrealengine/VPNSetup/index.html

https://udn.unrealengine.com/docs/ue4/int/gettingstarted/downloadingunrealengine/perforce/Syncing/index.html

https://udn.unrealengine.com/docs/ue4/int/gettingstarted/downloadingunrealengine/perforce/Integration/index.html

# Setting Up Perforce Source Control:

Make Sure p Service is running:

- Run as root: /volume1/KnL/Perforce/start.sh

Set up ignore [file:p4] set P4IGNORE=.gitignore

##### Setting up new user:

- Create access rights on our server

- Create account in P4Admin

Disable user account creation for anyone but you:

- Open terminal in perforce workspace directory from super user account

- p4 configure set dm.user.noautocreate=2

##### Checking out a project:

1.  Open p4v and enter credentials to connect

2.  Go to Connection &gt; New Workspace

3.  Give the workspace a reasonable name, lowercase, no spaces (for working on command line later). Workspaces are stored per user so two users should be able to use the same workspace name without a conflict.

4.  Put it in a folder near the root of the drive (I have mine in C:\\Perforce\\\[ClientName\]\\\[WorkspaceName\]

5.  Right click on the folder in the depot that represents the project and choose "Include Tree". Right click on other projects and choose "Exclude Tree" (it doesn't work to just whitelist with "include tree", which seems silly -- is it configurable?).

6.  Check the box to automatically get latest revisions, otherwise you'll have to do it manually after the workspace is created.

##### Deleting a workspace:

If you screw up you can delete a workspace. Go to Connection -&gt; Choose Workspace… which will show you a list of your workspaces. Then open the command prompt and type p4 client -d \[workspace-name\]

Useful commands:

- **Fast Reconcile with files that have been edited, added, deleted and with special characters in their name**

  p4 reconcile -meadf d:\\Ikrima\\src\\Assembla\\Bebylon\\UnrealEngine\\Engine\\Binaries\\...

- **Show me files that were ignored:**

  p4 reconcile -nI d:\\Ikrima\\src\\Assembla\\Bebylon\\UnrealEngine\\Engine\\Binaries\\...

- **Show me files that were ignored but need to be added**

  p4 reconcile -naI d:\\Ikrima\\src\\Assembla\\Bebylon\\UnrealEngine\\Engine\\Binaries\\...

- **Why something was ignored:**

  p4 ignores -v -i d:\\Ikrima\\src\\Assembla\\Bebylon\\UnrealEngine\\Engine\\Binaries\\ThirdParty\\svn\\Mac\\lib\\apr.exp

- **Force resync only deleted files (deletes files that are only available locally and not in depot):**

  p4 -I clean -ead D:\\Ikrima\\src\\Assembla\\Bebylon\\UnrealEngine\\Engine\\Source\\Runtime\\...

- **Note: Using -m might skip files if you copied over stuff recently**

- -a Added files: Find files in the workspace that have no corresponding files in the depot and delete them.

- -d Deleted files: Find those files in the depot that do not exist in your workspace and add them to the workspace.

- -e Edited files: Find files in the workspace that have been modified and restore them to the last file version that has synced from the depot.

- (p4 clean =&gt; p4 reconcile -w)

_Reference From https://www.perforce.com/perforce/doc.current/manuals/cmdref/Content/CmdRef/p4_clean.html?Highlight=clean_

**Set editor:**

p4 set P4Editor="C:/Program Files/Sublime Text 3/subl.exe --wait"

**Tell P4 That Local Files Are Already Synced:**

Here's how:

1.  Note the last changelist synced

2.  Copy/move the folder to the new location

3.  Update your workspace (either the root, or the depot mapping) to point at the new location

4.  Run p4 flush //depot/path/to/folder/...@&lt;last_changelist&gt;

The [flush] command tells the server that you have the files at the path specified, at the changelist specified. It's a synonym for p4 sync -k.

_Reference From https://stackoverflow.com/questions/7030296/how-do-i-move-a-perforce-workspace-folder_

**Create fast branch stream:**

From the command line, starting from a workspace of //stream/parent, here's what you'd do to make a new task stream:

p4 stream -t task -P //stream/parent //stream/mynewtask01
p4 populate -r -S //stream/mynewtask01
p4 client -s -S //stream/mynewtask01
p4 sync

_Assuming you're starting with a synced workspace. If you're creating a brand new workspace for the new stream, then part of creating the new workspace is going to be syncing the files; I'd expect that to take about as long as the submit did since it's the same amount of data being transferred._

_Make sure when creating a new stream that you're not creating a new workspace. In the visual client there's an option to "create a workspace"; make sure to uncheck that box or it'll make a new workspace and then sync it, which is the part that'll take an hour._

_From the command line, starting from a workspace of //stream/parent, here's what you'd do to make a new task stream:_

_p4 stream -t task -P //stream/parent //stream/mynewtask01
p4 populate -r -S //stream/mynewtask01
p4 client -s -S //stream/mynewtask01
p4 sync\__

_The "stream" and "client" commands don't actually operate on any files, so they'll be really quick no matter what. The "populate" will branch all 10k files, but it does it on the back end without actually moving any content around, so it'll also be really quick (if you got up into the millions or billions it might take an appreciable amount of time depending on the server hardware, but 10k is nothing). The "sync" will be very quick if you were already synced to //stream/parent, because all the files are already there; again, it's just moving pointers around on the server side rather than transferring the file content._

_Reference From https://stackoverflow.com/questions/32697907/how-to-efficiently-work-with-a-task-stream_

**Merge from parent stream:**

While we’re working on features in //Ace/DEV, other changes are being submitted to //Ace/MAIN. Here’s how we merge those changes into the //Ace/DEV branch:

% p4 merge -S //Ace/DEV -r
% p4 resolve
% p4 submit -d ”Merged latest changes”

_Reference From https://www.perforce.com/blog/streams-tiny-tutorial_

**Push stream changes back to mainline:**

“Promote” is simply another way of saying “copy up after merging everything down”. So let’s make sure we’ve merged everything down first:

% p4 merge -S //Ace/DEV -r
All revisions already integrated.

Switch to main workspace:

% p4 workspace -s -S //Ace/MAIN
% p4 sync

We run **p4 sync** after switching the workspace, because both streams have files in them at this point. (You'll be happy to know that **p4 sync** will be smart enough to swap out only the files that aren't the same in both streams.)

Finally, we copy content from the //Ace/DEV stream to its parent:

% p4 -I copy -S //Ace/DEV -v
% p4 submit -d ”Here’s our new feature”

% p4 sync

_Et voilà_ -- our work in the //Ace/DEV stream has just been promoted to //Ace/MAIN.

_Reference From https://www.perforce.com/blog/streams-tiny-tutorial_

**Set global property settings:**

p4 property -a -n **_name_** -v **_value_**

_Reference From https://community.perforce.com/s/article/1273_

**Assemble performance optimizations:**

<https://articles.assembla.com/using-perforce/speed-up-your-perforce-repo-with-p4v>

p4 property -a -n P4IGNORE -v .p4ignore

p4 property -a -n P4V.Performance.ServerRefresh -v 60

p4 property -a -n filesys.bufsize -v 2M

p4 property -a -n net.tcpsize -v 2M

**Setup the typemap:**

```js
p4 typemap

\# Perforce File Type Mapping Specifications.
\#
\# TypeMap: a list of filetype mappings; one per line.
\# Each line has two elements:
\#
\# Filetype: The filetype to use on 'p4 add'.
\#
\# Path: File pattern which will use this filetype.
\#
\# See 'p4 help typemap' for more information.

TypeMap:
binary+w //depot/....exe
binary+w //depot/....dll
binary+w //depot/....lib
binary+w //depot/....app
binary+w //depot/....dylib
binary+w //depot/....stub
binary+w //depot/....ipa
binary //depot/....bmp
text //depot/....ini
text //depot/....config
text //depot/....cpp
text //depot/....h
text //depot/....c
text //depot/....cs
text //depot/....m
text //depot/....mm
text //depot/....py
binary+l //depot/....uasset
binary+l //depot/....umap
binary+l //depot/....upk
binary+l //depot/....udk
```

_Reference From https://docs.unrealengine.com/latest/INT/Engine/Basics/SourceControl/Perforce/index.html_

## Diff

You can diff Blueprints using built-in diffing tool

- <https://www.unrealengine.com/blog/diffing-blueprints

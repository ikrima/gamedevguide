## Git Config

\** Show Options\*\* [https://stackoverflow.com/questions/42675999/git-config-files-best-practice](https://stackoverflow.com/questions/42675999/git-config-files-best-practice)
`git config --list --show-origin`

## Git Diffing

**Diff working tree vs commit:**
Use '--' for working tree e.g.
`batch>git difftool --dir-diff HEAD --`

**Diff staged changes vs working directory:**
`batch>git difftool --dir-diff`

**Diff staged changes vs HEAD:**
`batch>git difftool --dir-diff --staged`

**Diff across branches:**

````batch
git difftool 4.17..bebylon -- /d/Ikrima/src/Public-Development/UnrealEngine/Engine/Source/Runtime/Renderer/Private/BasePassRendering.cpp
git difftool --dir-diff release ~HEAD
````

**Folder history diff or folder diff between two different commits**
`batch>git difftool --dir-diff 27990a4451cf9458b280c9be027af41898721791~1 27990a4451cf9458b280c9be027af41898721791`

## Patch

Create containing all commits in your current branch that are not in the master branch:
`batch>git format-patch origin/master --stdout > mypatch.patch`

From [https://stackoverflow.com/questions/5432396/create-a-patch-by-comparing-a-specific-branch-on-the-remote-with-a-specific-loca](https://stackoverflow.com/questions/5432396/create-a-patch-by-comparing-a-specific-branch-on-the-remote-with-a-specific-loca)

**GitExtensions: filter a set of branches**
Bebylon\* --remotes=upstream/release\* --remotes=upstream/dev\*

**Diff tool config:**

Araxis config:

````ini
[difftool "araxis"]
path = C:\\Program Files\\Araxis\\Araxis Merge\\compare.exe

[mergetool "Araxis"]
path = C:/Program Files/Araxis/Araxis Merge/Compare.exe
cmd = \"C:/Program Files/Araxis/Araxis Merge/Compare.exe\" \"$REMOTE\" \"$BASE\" \"$LOCAL\" \"$MERGED\"
````

**Merge with force accept theirs:**

Use this commands to do that:

````git
git checkout branch_new
git merge -s ours branch_old
git checkout branch_old
git merge branch_new
````

From [https://stackoverflow.com/questions/4624357/how-do-i-overwrite-rather-than-merge-a-branch-on-another-branch-in-git](https://stackoverflow.com/questions/4624357/how-do-i-overwrite-rather-than-merge-a-branch-on-another-branch-in-git)

**Remove a folder/file from history:**
[http://stackoverflow.com/questions/10067848/remove-folder-and-its-contents-from-git-githubs-history](http://stackoverflow.com/questions/10067848/remove-folder-and-its-contents-from-git-githubs-history)

[https://confluence.atlassian.com/display/BITBUCKET/Maintaining+a+Git+Repository](https://confluence.atlassian.com/display/BITBUCKET/Maintaining+a+Git+Repository)

[https://help.github.com/articles/remove-sensitive-data](https://help.github.com/articles/remove-sensitive-data)

You want to nuke commit C and never see it again. You do this:
`batch>git reset --hard HEAD~1`

From [http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit](http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit)

For the lightest touch, you can even undo your commit but leave your files and your [index](http://www.gitguys.com/topics/whats-the-deal-with-the-git-index/):
`batch>git reset --soft HEAD~1`

From [http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit](http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit)

**Remove all untracked files and directories. (`-f` is *force*, `-d` is *remove directories*)**
`batch>git clean -fd`

**Remove ignored files as well**
`batch>git clean -fdx`

From [http://stackoverflow.com/questions/5807137/how-to-revert-uncommitted-changes-including-files-and-folders](http://stackoverflow.com/questions/5807137/how-to-revert-uncommitted-changes-including-files-and-folders)

*Squash/Merge previous two commits:*
`batch>git rebase -i HEAD~2`

Then select squash for the second commit
From [https://stackoverflow.com/questions/5189560/squash-my-last-x-commits-together-using-git](https://stackoverflow.com/questions/5189560/squash-my-last-x-commits-together-using-git)

**To move folders into a different folders in git:**
`git filter-branch --tree-filter 'mkdir -p /path/to/tmp; mv * /path/to/tmp; mkdir subdir; mv /path/to/tmp/* subdir/' --tag-name-filter cat --prune-empty -- --all`
<https://gist.github.com/fabiomaggio/ce7ecd7dffd27b32a45325204288efce>

**Rebase against another branch overriding conflicts with your own branch changes:**

````git
# assuming branch-a is our current version
git rebase -Xtheirs branch-b # <- ours: branch-b, theirs: branch-a
````

***IMPORTANT: -Xtheirs and -Xours is counterintuitive***

* For rebase: -Xtheirs refers to your local current branch that you want to replay ontop of the master branch.
* For merge: -Xours refers to the local branch.

From <https://demisx.github.io/git/rebase/2015/07/02/git-rebase-keep-my-branch-changes.html>

## Git-P4

### TLDR

* You need to use python 2.7

* When doing git clone, you have to specify to use client spec `git p4 clone //depot/main/BBR/Source . --use-client-spec`
  
  * You can also exlcude paths and have multiple depot paths
* With different directory structures, you can reformat patch files: <https://stackoverflow.com/questions/931882/how-to-apply-a-git-patch-from-one-repository-to-another>
  
  ````sh
  $ cat patch_file | git am     \
            -p1                 \ # remove 1 leading directory ('static/')
          --directory='lib/'     # prepend 'lib/'
  ````

* You can also cherry pick commits directly (git will automatically resolve the different path )

* Remember to have your git-p4 repo in a separate directory from your actual p4 directory

* You can merge unrealted git histories with `git merge myotherbranch --allow-unrelated-histories`

* Use these `git config -e` settings
  
  ````ini
  [git-p4]
    skipSubmitEdit = true
    useclientspec = true
  ````

### More Info

You can use this to sync from perforce to a git and back (it's brittle)

Links:

* <https://www.paraesthesia.com/archive/2016/10/27/migrating-perforce-to-git-in-windows/>
* <https://zzz.buzz/2016/04/30/git-p4-on-windows/>
* <https://www.atlassian.com/git/tutorials/git-p4>

### Install instructions

* Needs python 2.7
* `git config --global alias.p4 !"python 'C:/Program Files (x86)/Git/mingw32/libexec/git-core/git-p4'"`

### Using

* Set P4 Vars:
  
  ````batch
  set P4PORT=public.perforce.com:1666
  set P4USER=yourusername
  set P4PASSWD=yourpassword
  ````

* Clone repo: `git p4 clone --detect-branches //depot/perforce_software/p4jenkins`

* Submit: `git p4 submit`

# Git Commands

## Git Config

* [Git Config Best Practice](https://stackoverflow.com/questions/42675999/git-config-files-best-practice)
* **Show Options:** `batch>git config --list --tshow-origin`
* **Diff tool config**
  * Araxis Merge
    ````ini
    [difftool "araxis"]
    path = C:\\Program Files\\Araxis\\Araxis Merge\\compare.exe
    [mergetool "Araxis"]
    path = C:/Program Files/Araxis/Araxis Merge/Compare.exe
    cmd = \"C:/Program Files/Araxis/Araxis Merge/Compare.exe\" \"$REMOTE\" \"$BASE\" \"$LOCAL\" \"$MERGED\"
    ````

## Git Clone

* **Shallow clone only the remote primary:** `batch>git clone url --single-branch`
* **Shallow clone up to depth:** `batch>git clone url --depth 1 #implies --single-branch`
* **Unshallow the current branch:** `batch>git fetch --unshallow`
* **Reverse unshallow all the branches:**
  ````batch
  git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*
  git fetch --unshallow
  ````

## Git Diffing

* **Diff working tree vs commit:**
  ````bash
  # Use '--' for working tree e.g.
  git difftool --dir-diff HEAD --
  ````

* **Diff staged changes vs working directory:** `batch>git difftool --dir-diff`
* **Diff staged changes vs HEAD:** `batch>git difftool --dir-diff --staged`
* **Diff across branches:**
  ````batch
  git difftool 4.17..bebylon -- /d/Ikrima/src/Public-Development/UnrealEngine/Engine/Source/Runtime/Renderer/Private/BasePassRendering.cpp
  git difftool --dir-diff release ~HEAD
  ````

* **Folder history diff or folder diff between two different commits:** `batch>git difftool --dir-diff 27990a4451cf9458b280c9be027af41898721791~1 27990a4451cf9458b280c9be027af41898721791`

## Git Commit/History Manipulation

* Undo last commit [Reference](http://stackoverflow.com/questions/927358/how-to-undo-the-last-git-commit): `git reset --soft 'HEAD^'`

* Force clean local repository (including deleting unchecked in files) [Reference](http://stackoverflow.com/questions/673407/how-do-i-clear-my-local-working-directory-in-git): `git clean -d -x -f`

* **Create patch containing all commits in current but not in the master branch:** [Reference](https://stackoverflow.com/questions/5432396/create-a-patch-by-comparing-a-specific-branch-on-the-remote-with-a-specific-loca)
  
  ````batch
  git format-patch origin/master --stdout > mypatch.patch
  ````

* **GitExtensions: filter a set of branches:** `batch>Bebylon* --remotes=upstream/release* --remotes=upstream/dev*`

* **Merge with force accept theirs:** [Reference](https://stackoverflow.com/questions/4624357/how-do-i-overwrite-rather-than-merge-a-branch-on-another-branch-in-git)
  
  ````batch
  git checkout branch_new
  git merge -s ours branch_old
  git checkout branch_old
  git merge branch_new
  ````

* **Remove a folder/file from history:**
  
  * Reference:
    * <http://stackoverflow.com/questions/10067848/remove-folder-and-its-contents-from-git-githubs-history>
    * <https://confluence.atlassian.com/display/BITBUCKET/Maintaining+a+Git+Repository>
    * <https://help.github.com/articles/remove-sensitive-data>
* **Undo/redo a commit:** [Reference](http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit)
  
  * `batch>git reset --hard HEAD~1` You want to nuke commit C and never see it again
  * `batch>git reset --soft HEAD~1` Undo your commit but leave your files and your index [Reference](http://www.gitguys.com/topics/whats-the-deal-with-the-git-index/):
* **Remove all untracked files and directories. (`-f` is *force*, `-d` is *remove directories*):** `batch>git clean -fd`

* **Remove ignored files as well:** [Reference](http://stackoverflow.com/questions/5807137/how-to-revert-uncommitted-changes-including-files-and-folders) `batch>git clean -fdx`

* **Squash/Merge previous two commits:** [Reference](https://stackoverflow.com/questions/5189560/squash-my-last-x-commits-together-using-git)
  
  ````bash
  git rebase -i HEAD~2
  # Then select squash for the second commit
  ````

* **To move folders into a different folders in git:** [Reference](https://gist.github.com/fabiomaggio/ce7ecd7dffd27b32a45325204288efce)
  `git filter-branch --tree-filter 'mkdir -p /path/to/tmp; mv * /path/to/tmp; mkdir subdir; mv /path/to/tmp/* subdir/' --tag-name-filter cat --prune-empty -- --all`

* **Rebase against another branch overriding conflicts with your own branch changes:** [Reference](https://demisx.github.io/git/rebase/2015/07/02/git-rebase-keep-my-branch-changes.html)
  
  ````bash
  # assuming branch-a is our current version
  git rebase -Xtheirs branch-b # <- ours: branch-b, theirs: branch-a
  ````
  
   > 
   > \[!danger\] `-Xtheirs` and `-Xours` are counterintuitive
   > For rebase: `-Xtheirs` refers to your local current branch that you want to replay ontop of the master branch.
   > For merge: `-Xours` refers to the local branch.

## Git-P4

### TLDR

* You need to use python 2.7
* When doing git clone, you have to specify to use client spec `git p4 clone //depot/main/BBR/Source . --use-client-spec`
  * You can also exlcude paths and have multiple depot paths
* With different directory structures, you can reformat patch files: <https://stackoverflow.com/questions/931882/how-to-apply-a-git-patch-from-one-repository-to-another>
  ````bash
  $ cat patch_file | git am   \
          -p1                 \ # remove 1 leading directory ('static/')
          --directory='lib/'    # prepend 'lib/'
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

* you can use this to sync from perforce to a git and back (it's brittle)
* Reference
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

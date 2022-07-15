# Git Commands

## Git Config

* [Git Config Best Practice](https://stackoverflow.com/questions/42675999/git-config-files-best-practice)
* **Show Options:** `#!shell git config --list --show-origin`
* **Diff tool config**
  ````ini
  # Submodule settings
  [alias]
    ssync = git submodule sync --recursive && git submodule update --init --recursive
    spull = !git pull && git submodule sync --recursive && git submodule update --init --recursive
    spush = push --recurse-submodules=on-demand
  [diff]
    submodule = log # clearer container diffs when referenced submodule commits changed
  [status]
    submoduleSummary = true # git status is useful again when a referenced submodule commit changed
  
  # Diff tool settings
  [difftool "araxis"]
    path = 'C:/Program Files/Araxis/Araxis Merge/compare.exe'
  [mergetool "araxis"]
    path = 'C:/Program Files/Araxis/Araxis Merge/Compare.exe'
    cmd  = \C:/Program Files/Araxis/Araxis Merge/Compare.exe\ '$REMOTE' '$BASE' '$LOCAL' '$MERGED'
  [difftool "beyondcompare"]
    path = 'C:/Program Files/Beyond Compare 4/bcomp.exe'
    cmd  = 'C:/Program Files/Beyond Compare 4/bcomp.exe' '$LOCAL' '$REMOTE'
  [mergetool "beyondcompare"]
    path = 'C:/Program Files/Beyond Compare 4/bcomp.exe'
    cmd  = 'C:/Program Files/Beyond Compare 4/bcomp.exe' '$LOCAL' '$REMOTE' '$BASE' '$MERGED'
  ````

## Git Clone

* **Shallow clone only the remote primary:** `#!shell git clone url --single-branch`
* **Shallow clone up to depth:** `#!shell git clone url --depth 1 #implies --single-branch`
* **Unshallow the current branch:** `#!shell git fetch --unshallow`
* **Reverse unshallow all the branches:**
  ````shell
  git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*
  git fetch --unshallow
  ````

* **Clone with specific line-endings:** `git clone --config core.autocrlf=false https://github.com/batiati/mustache-zig`

## Git Submodule

* **init repo with submodules:** `#!shell git submodule update --init --recursive`
* **sync repo with submodules:** `#!shell git submodule sync --recursive && git submodule update --init --recursive`
* **shallow clone with submodules up to depth:**
  ````shell
  git clone --depth 1 repo_url
  git submodule init
  git submodule update --depth 1
  ````

* **remove submodule:** `#!shell git rm path/to/submod && git commit`
  * 
     > 
     > \[!info\] can be undone with `#!shell git revert`
  
  * 
     > 
     > \[!info\] submodule's .git directory (e.g. .git/modules/path/to/submod) is not removed
     > to make possible past commit checkout without requiring fetching from another repository [Reference](https://git-scm.com/docs/gitsubmodules#_forms)

* **move submodule:** `#!shell git mv old/path/to/submod new/path/to/submod`
* **remove submodules completely:**
  ````shell
  # remove the submodule entry from .git/config
  git submodule deinit -f path/to/submod
  
  # remove the submodule directory from the superproject's .git/modules directory
  rm -rf .git/modules/path/to/submod
  
  # remove the entry in .gitmodules and submodule directory located at path/to/submod
  git rm -f path/to/submod
  ````

* **tracking branch submodule:**
  ````shell
  # for a new submodule
  git submodule add -b branch_name repo_url [path/to/submod]
  git submodule update --remote
  
  # for existing submodule
  git submodule set-branch -b branch_name -- path/to/submod
  ````

## Git Diffing

* **Diff working tree vs commit:**
  ````shell
  # Use '--' for working tree e.g.
  git difftool --dir-diff HEAD --
  ````

* **Diff staged changes vs working directory:** `#!shell git difftool --dir-diff`
* **Diff staged changes vs HEAD:** `#!shell git difftool --dir-diff --staged`
* **Diff across branches:**
  ````shell
  git difftool 4.17..bebylon -- /d/UnrealEngine/Engine/Source/Runtime/Renderer/Private/BasePassRendering.cpp
  git difftool --dir-diff release ~HEAD
  ````

* **Folder history diff or folder diff between two different commits:** `#!shell git difftool --dir-diff 27990a4451cf9458b280c9be027af41898721791~1 27990a4451cf9458b280c9be027af41898721791`

## Git Commit History Manipulation

* Undo last commit [Reference](http://stackoverflow.com/questions/927358/how-to-undo-the-last-git-commit): `git reset --soft 'HEAD^'`

* Force clean local repository (including deleting unchecked in files) [Reference](http://stackoverflow.com/questions/673407/how-do-i-clear-my-local-working-directory-in-git): `git clean -d -x -f`

* **Create patch containing all commits in current but not in the master branch:** [Reference](https://stackoverflow.com/questions/5432396/create-a-patch-by-comparing-a-specific-branch-on-the-remote-with-a-specific-loca)
  
  ````shell
  git format-patch origin/master --stdout > mypatch.patch
  ````

* **GitExtensions: filter a set of branches:** `#!shell Bebylon* --remotes=upstream/release* --remotes=upstream/dev*`

* **Merge with force accept theirs:** [Reference](https://stackoverflow.com/questions/4624357/how-do-i-overwrite-rather-than-merge-a-branch-on-another-branch-in-git)
  
  ````shell
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
  
  * `#!shell git reset --hard HEAD~1` You want to nuke commit C and never see it again
  * `#!shell git reset --soft HEAD~1` Undo your commit but leave your files and your index [Reference](http://www.gitguys.com/topics/whats-the-deal-with-the-git-index/):
* **Remove all untracked files and directories. (`-f` is *force*, `-d` is *remove directories*):** `#!shell git clean -fd`

* **Remove ignored files as well:** [Reference](http://stackoverflow.com/questions/5807137/how-to-revert-uncommitted-changes-including-files-and-folders) `#!shell git clean -fdx`

* **Squash/Merge previous two commits:** [Reference](https://stackoverflow.com/questions/5189560/squash-my-last-x-commits-together-using-git)
  
  ````shell
  git rebase -i HEAD~2
  # Then select squash for the second commit
  ````

* **To move folders into a different folders in git:** [Reference](https://gist.github.com/fabiomaggio/ce7ecd7dffd27b32a45325204288efce)
  `git filter-branch --tree-filter 'mkdir -p /path/to/tmp; mv * /path/to/tmp; mkdir subdir; mv /path/to/tmp/* subdir/' --tag-name-filter cat --prune-empty -- --all`

* **Rebase against another branch overriding conflicts with your own branch changes:** [Reference](https://demisx.github.io/git/rebase/2015/07/02/git-rebase-keep-my-branch-changes.html)
  
  ````shell
  # assuming branch-a is our current version
  #   ours:   branch-b
  #   theirs: branch-a
  git rebase -Xtheirs branch-b
  ````
  
   > 
   > \[!danger\] `-Xtheirs` and `-Xours` are counterintuitive
   > For rebase: `-Xtheirs` refers to your local current branch that you want to replay ontop of the master branch.
   > For merge: `-Xours` refers to the local branch.

## Git-P4

### TLDR

* you need to use python 2.7
* you can use this to sync from perforce to a git and back (it's brittle)
* when doing git clone, you have to specify to use client spec `git p4 clone //depot/main/BBR/Source . --use-client-spec`
  * can also exclude paths and have multiple depot paths
* with different directory structures, you can reformat patch files: <https://stackoverflow.com/questions/931882/how-to-apply-a-git-patch-from-one-repository-to-another>
  ````shell
  $ cat patch_file | git am   \
          -p1                 \ # remove 1 leading directory ('static/')
          --directory='lib/'    # prepend 'lib/'
  ````

* you can also cherry pick commits directly (git will automatically resolve the different path )
* remember to have your git-p4 repo in a separate directory from your actual p4 directory
* you can merge unrelated git histories with `git merge myotherbranch --allow-unrelated-histories`
* use these `git config -e` settings
  ````ini
  [git-p4]
  skipSubmitEdit = true
  useclientspec = true
  ````

### Install instructions

* Needs python 2.7
* `git config --global alias.p4 !"python 'C:/Program Files (x86)/Git/mingw32/libexec/git-core/git-p4'"`

### Using

* Set P4 Vars:
  ````shell
  set P4PORT=public.perforce.com:1666
  set P4USER=yourusername
  set P4PASSWD=yourpassword
  ````

* Clone repo: `git p4 clone --detect-branches //depot/perforce_software/p4jenkins`
* Submit: `git p4 submit`

### More Info

* Reference
  * <https://www.paraesthesia.com/archive/2016/10/27/migrating-perforce-to-git-in-windows/>
  * <https://zzz.buzz/2016/04/30/git-p4-on-windows/>
  * <https://www.atlassian.com/git/tutorials/git-p4>

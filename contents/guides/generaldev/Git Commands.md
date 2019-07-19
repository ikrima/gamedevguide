---
---

**Git show config options:**
git config --list --show-origin

From <[https://stackoverflow.com/questions/42675999/git-config-files-best-practice](https://stackoverflow.com/questions/42675999/git-config-files-best-practice)>

# Git Diffing

**Diff working tree vs commit:**
Use '--' for working tree e.g.
`batch>git difftool --dir-diff HEAD --`

**Diff staged changes vs working directory:**
`batch>git difftool --dir-diff`

**Diff staged changes vs HEAD:**
`batch>git difftool --dir-diff --staged`

**Diff across branches:**

```batch
git difftool 4.17..bebylon -- /d/Ikrima/src/Public-Development/UnrealEngine/Engine/Source/Runtime/Renderer/Private/BasePassRendering.cpp
git difftool --dir-diff release ~HEAD
```

**Folder history diff or folder diff between two different commits**
`batch>git difftool --dir-diff 27990a4451cf9458b280c9be027af41898721791~1 27990a4451cf9458b280c9be027af41898721791`

# Patch

Create containing all commits in your current branch that are not in the master branch:
`batch>git format-patch origin/master --stdout > mypatch.patch`

From <[https://stackoverflow.com/questions/5432396/create-a-patch-by-comparing-a-specific-branch-on-the-remote-with-a-specific-loca](https://stackoverflow.com/questions/5432396/create-a-patch-by-comparing-a-specific-branch-on-the-remote-with-a-specific-loca)>

**GitExtensions: filter a set of branches**
Bebylon* --remotes=upstream/release* --remotes=upstream/dev*

**Diff tool config:**

Araxis config:

  ```ini
  [difftool "araxis"]
  path = C:\\Program Files\\Araxis\\Araxis Merge\\compare.exe

  [mergetool "Araxis"]
  path = C:/Program Files/Araxis/Araxis Merge/Compare.exe
  cmd = \"C:/Program Files/Araxis/Araxis Merge/Compare.exe\" \"$REMOTE\" \"$BASE\" \"$LOCAL\" \"$MERGED\"
  ```

**Merge with force accept theirs:**

Use this commands to do that:

```git
git checkout branch_new
git merge -s ours branch_old
git checkout branch_old
git merge branch_new
```

From <[https://stackoverflow.com/questions/4624357/how-do-i-overwrite-rather-than-merge-a-branch-on-another-branch-in-git](https://stackoverflow.com/questions/4624357/how-do-i-overwrite-rather-than-merge-a-branch-on-another-branch-in-git)>

**Remove a folder/file from history:**
[http://stackoverflow.com/questions/10067848/remove-folder-and-its-contents-from-git-githubs-history](http://stackoverflow.com/questions/10067848/remove-folder-and-its-contents-from-git-githubs-history)

[https://confluence.atlassian.com/display/BITBUCKET/Maintaining+a+Git+Repository](https://confluence.atlassian.com/display/BITBUCKET/Maintaining+a+Git+Repository)

[https://help.github.com/articles/remove-sensitive-data](https://help.github.com/articles/remove-sensitive-data)

You want to nuke commit C and never see it again. You do this:
`batch>git reset --hard HEAD~1`

From <[http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit](http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit)>

For the lightest touch, you can even undo your commit but leave your files and your [index](http://www.gitguys.com/topics/whats-the-deal-with-the-git-index/):
`batch>git reset --soft HEAD~1`

From <[http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit](http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit)>

**Remove all untracked files and directories. (`-f` is *force*, `-d` is *remove directories*)**
`batch>git clean -fd`

**Remove ignored files as well**
`batch>git clean -fdx`

From <[http://stackoverflow.com/questions/5807137/how-to-revert-uncommitted-changes-including-files-and-folders](http://stackoverflow.com/questions/5807137/how-to-revert-uncommitted-changes-including-files-and-folders)>

*Squash/Merge previous two commits:*
`batch>git rebase -i HEAD~2`

Then select squash for the second commit
From <[https://stackoverflow.com/questions/5189560/squash-my-last-x-commits-together-using-git](https://stackoverflow.com/questions/5189560/squash-my-last-x-commits-together-using-git)>
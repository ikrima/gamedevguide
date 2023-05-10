# Rsync

## Rsync Daemon

- for host computers not running `SSH`/`RSH`, we can run rsync as a daemon
  - listens on port 873 for incoming connections from other computers

 > 
 > \[!danger\] not recommended for unsecure networks (e.g. Internet) bc it's unencrypted data transfer

- two approaches to running rsync as a daemon
  
  - launch rsync with `--daemon` option
  - `inetd`/`xinetd` to launch/run rsync as a service
- must configure the file `/etc/rsyncd.conf` and `/etc/rsyncd.secrets`

- Reference
  
  - [synchronizing folders with rsync](https://en.jveweb.net/archives/2010/11/synchronizing-folders-with-rsync.html)
  - [running rsync as a daemon](https://en.jveweb.net/archives/2011/01/running-rsync-as-a-daemon.html)
  - [rsync command](https://weihanglo.tw/debian-R-setup/doc/backup_rsync.html)
  - [setting rsync daemon](https://weihanglo.tw/debian-R-setup/doc/backup_rsync-daemon.html)

## Rsync Options

[`rsync -avh --info=progress2`](https://explainshell.com/explain?cmd=rsync+-avh+--info%3Dprogress2+)

|Command Options||
|---------------|--|
|`-axv`|`--archive`/`-rlptgoD`, don't cross file-system boundaries|
||`-r`: rescursive|
||`-l`: copies symlinks as symlinks|
||`-p`: preserves permissions|
||`-t`: preserves modification times|
||`-g`: preserves group|
||`-o`: preserves owner|
||`-D`: preserves device files|
|`-HAXN`|hardlinks, ACLs, xattrs, crtimes|
|`--delete`|propogate deletes to dst|
|`--no-z`|no compress|
|`-P`|`--partial`, `--progress`|
|`-ni`|`--dry-run`, `--itemize-changes`|
|`-R`|`--relative`: transform full paths to server root path relative|
||`rsync -av  /foo/bar/baz.c remote:/tmp/ => /tmp/baz.c`|
||`rsync -avR /foo/bar/baz.c remote:/tmp/ => /tmp/foo/bar/baz.c`|
||`foo`,`foo/bar` (the extra folders) are **implied directories**|
|`--password-file="~/rsyncd.secrets"`|password file|
|`--log-file="~/rsyncd.log"`|log file|
|`-e 'ssh -v -p 223'`|Use ssh to access subsequent directory|
|`rsync://<user>:<pw>@<server>/<module>/path/to/remote`|source|
|`/path/to/local`|dest|

## Understanding Rsync Output

### \--itemize-change

 > 
 > \[!example\] sample output
 > 
 > ```bash
 > .d..t..g... ./
 > .f...p.g... Something.pdf
 > .f.....g... md5sum-2010-02-21.txt
 > .f...p.g... prova.rb
 > .d.....g... .metadata/
 > .f...p.g... .metadata/.lock
 > .f...p.g... .metadata/version.ini
 > >f+++++++++ Parameter_Usage.txt
 > ```

- schema [(reference)](http://web.archive.org/web/20160904174444/http://andreafrancia.it/2010/03/understanding-the-output-of-rsync-itemize-changes.html)

```txt
YXcstpoguax  path/to/file
|||||||||||
`----------- the type of update being done::
 ||||||||||   <: file is being transferred to the remote host (sent).
 ||||||||||   >: file is being transferred to the local host (received).
 ||||||||||   c: local change/creation for the item, such as:
 ||||||||||      - the creation of a directory
 ||||||||||      - the changing of a symlink,
 ||||||||||      - etc.
 ||||||||||   h: the item is a hard link to another item (requires --hard-links).
 ||||||||||   .: the item is not being updated (though it might have attributes that are being modified).
 ||||||||||   *: means that the rest of the itemized-output area contains a message (e.g. "deleting").
 ||||||||||
 `---------- the file type:
  |||||||||   f for a file,
  |||||||||   d for a directory,
  |||||||||   L for a symlink,
  |||||||||   D for a device,
  |||||||||   S for a special file (e.g. named sockets and fifos).
  |||||||||
  `--------- c: different checksum (for regular files)
   ||||||||     changed value (for symlink, device, and special file)
   `-------- s: Size is different
    `------- t: Modification time is different
     `------ p: Permission are different
      `----- o: Owner is different
       `---- g: Group is different
        `--- u: The u slot is reserved for future use.
         `-- a: The ACL information changed
```

### \--info=progress2

 > 
 > \[!example\] sample output
 > 
 > ```bash
 > 105.45M 13% 602.83kB/s 0:02:50 (xfr#495, ir-chk=1020/3825)
 > ```

- **105.45M**     => destination reconstructed size
- **13%**         => completion percentage e.g. out of **811.15MB** source file's total size
- **602.83kB/s**  => file reconstruction rate
- **0:02:50**     => data transfer operation elapsed time
- **xfr#495**          => **495th** file is being transferred
- **ir-chk=1020/3825** => **1020** files to check/verify out of **3825** detected running total
  - file count is a running total because rsync starts file transfer during incremental recursion scan
  - **ir-chk**     => ongoing incremental recursion check; total file count in file list is still going to increase
  - **to-chk**     => finished incremental recursion check; finished computing the full size of the list
  - **to-chk=0/N** => whole process finished where **N** is _actual_ total number of files
- [(reference)](https://unix.stackexchange.com/a/261139)

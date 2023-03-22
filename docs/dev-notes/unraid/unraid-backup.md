# Unraid Backup Guide

## Syncthing

Syncthing syncs between folders. restic does backups. rclone syncs to clouds.

Each of the tools overlaps with the other, but in true unix fashion, I'll use them for what they were designed for.

Files are synced between machines with Syncthing. It is one of the many, almost unknown jewels of Open Source, running in the background with very little overhead and does what it should with few hiccups.

Backup of all unix machines (debian, arch) are done with restic to a restic pool on a macOS server with deduplication. That keeps the volume low and the size of the complete backup pool surprisingly small, and allows me to restore things quickly. Not a bare metal restore, though - I don't need those (except on Windows, which is done with Drive Snapshot).

Backup of individual folders to the cloud is done with rclone, some of them encrypted, some not (to allow access from other devices like phones and tablets).

But I do not copy my backups to the cloud. There is no real reason for me to do so.
For one, the backups are still large, and although I do have enough bandwidth, it would still clog the upload for hours at night. Unnecessary.
And if I need to do a backup or restore (usually of a few files only) I want it to be fast - to/from a local backup, not from the cloud. So it'll be local anyway and won't save me anything.
But most important: A backup is by definition just a duplication of something I have elsewhere anyway. There is little benefit in sync(thing)ing something from A to B (first copy) and back it up to C (second copy) to push it to the cloud (third copy), where I might have it rclone'd it before in encrypted form (forth copy). I'd have the same file four or five times. Three times is plenty.

This is also the reason why I haven't commented on your other questions. After decades in the industry, your questions sound like you want to replicate a companys backup strategy for home use, or rather: read an article about it and plan to do it. There are a zillion answers to your (rather newbie sounding) questions, and I am not the one who wants to change your mind that this is overkill and you are overthinking it comically.

If you really think you need five backups of each file, go ahead, do it. You'll learn a lot along the way, and that alone is worth it. You might even realize, two, three years down the road, after things have happened (or not) what you really need. And who knows, if things develop as speedy as they have, backups from local machines to cloud storage might even be financially and technically feasible even for home users and then you'll be all set up to take advantage of it.

## RClone

### What is recommended when copying large volumes and sized files?

[source](https://forum.rclone.org/t/what-is-recommended-when-copying-large-volumes-and-sized-files/13672/2)

 > 
 > Being relatively new to rclone, is the command below sufficient in achieving the following (with or without encryption)?
 > 
 > - Resuming transfers if interrupted
 > - Delta transfers
 > - Displaying itemized changes
 > - Preserving metadata such as permissions, ownership
 > - Parallelization

You command will do pretty well at that, though you don't want --stats and --progress (and --stats takes a time unit, eg `--stats 10s`.

Rclone doesn't do delta transfers like rsync (cloud storage doesn't support it in general) nor preserve permissions (same reason). You can quit and restart rclone and it will pick up where it left off. Rclone is very good at parallel transfers.

Rclone stores files 1:1 your disk -> cloud storage.

If you want a backup program which does do delta transfers and preserve permissions then you could use restic which can use rclone as a backend to store the actual objects.

 > 
 > Being relatively new to rclone, is the command below sufficient in achieving the following (with or without encryption)?
 > 
 > - Resuming transfers if interrupted
 > - Delta transfers
 > - Displaying itemized changes
 > - Preserving metadata such as permissions, ownership
 > - Parallelization

You command will do pretty well at that, though you don't want --stats and --progress (and --stats takes a time unit, eg `--stats 10s`.

Rclone doesn't do delta transfers like rsync (cloud storage doesn't support it in general) nor preserve permissions (same reason). You can quit and restart rclone and it will pick up where it left off. Rclone is very good at parallel transfers.

Rclone stores files 1:1 your disk -> cloud storage.

If you want a backup program which does do delta transfers and preserve permissions then you could use restic which can use rclone as a backend to store the actual objects.

 > 
 > Being relatively new to rclone, is the command below sufficient in achieving the following (with or without encryption)?
 > 
 > - Resuming transfers if interrupted
 > - Delta transfers
 > - Displaying itemized changes
 > - Preserving metadata such as permissions, ownership
 > - Parallelization

You command will do pretty well at that, though you don't want --stats and --progress (and --stats takes a time unit, eg `--stats 10s`.

Rclone doesn't do delta transfers like rsync (cloud storage doesn't support it in general) nor preserve permissions (same reason). You can quit and restart rclone and it will pick up where it left off. Rclone is very good at parallel transfers.

Rclone stores files 1:1 your disk -> cloud storage.

If you want a backup program which does do delta transfers and preserve permissions then you could use restic which can use rclone as a backend to store the actual objects.

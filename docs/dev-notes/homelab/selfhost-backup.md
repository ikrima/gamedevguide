# Selfhost Backup Guide

## Overview

- [What do you use for backup?](https://www.reddit.com/r/selfhosted/comments/l2kuzs/comment/gk7s8lg/)
  
   > 
   > \[!quote\]
   > restic:
   > If you are comfortable at the command line, my choice of backup for Linux/NAS devices is restic for data. Makes a repo of the data and stores it incrementally so you can go back through time and pick which backup you want. You mentioned you don't need cloud, but if you ever wanted it, restic is also powerful because it connects to rclone and that can be sent to a myriad of cloud providers
   > 
   > syncthing:
   > To backup important data on my widows clients I have a NAS where all of the important stuff goes (and it is backed up with restic), and I use syncthing for those whom don't have access to the NAS on their LAN. I also use Syncthing for the users that cannot be trained to use the NAS. Syncthing uses the NAS as its backend storage, which then of course is backed up with restic
   > 
   > rsync to USB drive:
   > I no longer do this becuase I went to restic/rclone to have a 3rd copy of my data and have it be offsite, but before I had that, I would monthly take a USB drive called my ColdBackup and stored in my firebox and stored offsite and then just use rsync to move the data to the USB drive.
   > 
   > general advice:
   > Keep as much of the data as you can in ONE location, then just backup that one location. This is exactly what I do with my NAS (which is ZFS underneath it, but that is outside the scope of backup) and it just makes life so much easier with it all in one place.
   > 
   > Consider cloud as well if privacy is your only concern. Resctic/rlcone has a way (which I do use) where everything is encrypted before it ever goes to them. So I don't worry about that aspect of it. If cost for cloud is your concern, that is a real concern you have to think about.
   > 
   > I have actually been trying to find some like minded people like myself that would want to data swap with me, where I keep my encrypted backups on their servers and they keep theirs on mine. I will find them eventually and move from cloud myself very likely.

- [What is the benefit of using duplicity/restic/borg over rclone](https://www.reddit.com/r/truenas/comments/tjtkd9/comment/i1mdt34/)
  
   > 
   > \[!quote\]
   > Rclone/syncthing/resilio/etc are sync tools.
   > 
   > Duplicacy/duplicity/borg/restic/Kopia/etc are backup tools.
   > 
   > The instrumental difference is obviously versioning and snapshot history. (Yes, you can have rudimentary versioning with rclone too, but it's just that - rudimentary per file full copies in a separate folder - good luck trying to restore consistent state from that). Backup tools provide you a way back machine to recover coherent state of your data arbitrary amount of time in the past, and do it efficiently minimizing storage space and bandwidth required.
   > 
   > If you don't want to go to all nitty gritty details go by intent: if you want backup - use backup tools. If you want sync - use sync tools. Sync is not a backup for obvious reasons.
   > 
   > The exception could be backup of immutable and incompressible data - like photos and videos where change always means corruption and the nature of the data does not lend itself to deduplication. Then you can get away with rclone versioning - to protect good version from being overwritten with a bad one. But then you have two solitons to maintain - much as well backup everything together with a proper backup app.

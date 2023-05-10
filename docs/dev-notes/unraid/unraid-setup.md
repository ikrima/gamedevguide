# Unraid Setup

## Config

### Docker

- create custom network
  
  ```bash
  docker network create omninet
  ```

- change docker installation to `docker directory` instead of `btrfs vDisk docker.img` to avoid SSD wear
  
  - some apps (e.g. Dropbox) constantly write to log file
  - this triggers the expected write amplification from `BRTFS` copy-on-write
  - [details](https://forums.unraid.net/bug-reports/stable-releases/683-docker-image-huge-amount-of-unnecessary-writes-on-cache-r733/page/22/?tab=comments#comment-13653)

### Advanced Disk Settings

- Query/Disable/Enable Write Caching [(Reference)](https://forums.unraid.net/topic/72862-drive-write-speeds-really-slow-solved/?do=findComment&comment=670028)
  
   > 
   > \[!note\] SATA drives
   > 
   > ```bash
   > hdparm -W  /dev/sdb # Query 
   > hdparm -W1 /dev/sdb # Enable
   > hdparm -W0 /dev/sdb # Disable
   > ```
  
   > 
   > \[!note\] SAS drives
   > 
   > ```bash
   > sdparm -g WCE    /dev/sdd # Query 
   > sdparm --set=WCE /dev/sdd # Enable
   > sdparm -c WCE    /dev/sdd # Disable
   > ```
  
  - Workarounds
    - [WD Drives](https://forums.unraid.net/topic/79966-enable-write-cache/?do=findComment&comment=1182577)
    - [Seagate IronWolf Drives](https://forums.unraid.net/topic/79966-enable-write-cache/?do=findComment&comment=844323)
- Turn on `Turbo Write`/`Reconstruct Write`
  
  - <https://wiki.unraid.net/Tips_and_Tweaks#Turn_on_Reconstruct_Write>

### VM

- disable `Copy-on-write` on share storing VM vdisk image files (default is `domains`)

- configure `CPU Isolation` for Unraid Host and `CPU Pinning` for VM
  
  - Unraid only needs one or two physical core for peak performance
- enable _**performance** cpu governor_ bc the boost trigger from within a vm doesn't consistently work
  
   > 
   > \[!note\] Enable _**performance** cpu governor_
   > 
   > ```bash
   > #!/bin/bash
   > cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
   > for file in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do echo "performance" > $file; done
   > cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
   > ```
  
   > 
   > \[!note\] Restore _**on-demand**_ cpu governor\_
   > 
   > ```bash
   > #!/bin/bash
   > cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
   > for file in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do echo "ondemand" > $file; done
   > cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
   > ```

- ensure `clock source=tsc`
  
  ```bash
  cat /sys/devices/system/clocksource/clocksource0/current_clocksource
  ```

- install Win11 without networking
  
  ```bat
  Shift-F10
  OOBE\BYPASSNRO 
  ```

- use `network model` = `virtio` instead of default `virtio-net`
  
  - [technical details](https://forums.unraid.net/topic/101283-what-is-the-difference-between-virtio-and-virtio-net/)
- tweaks for _**Hyper-V Enlightenments**_: see details at
  
  - [Optimizing Windows VM](https://forums.unraid.net/topic/134041-guide-optimizing-windows-vms-in-unraid/)
  - [Remote Gaming on Unraid](https://forums.serverbuilds.net/t/guide-remote-gaming-on-unraid/4248/14)
  - [Performance Optimizations for Gaming on with KVM/QEMU and PCI passthrough](https://mathiashueber.com/performance-tweaks-gaming-on-virtual-machines/)
- use direct disk path for cache only shares instead of the user share mount path e.g.
  
  - _Default VM Storage Path:_ `/mnt/user/domains/` => `/mnt/cache_nvme/domains/`
- Windows VM Guest tweaks
  
  - install the VirtIO drivers
  - install the QEMU Guest Agent
  - disable Hiberfil.sys: `powercfg -h off`
  - set power plan to maximum performance
  - disable index and/or cortana search
  - Nvidia control panel: `3D settings` -> `Manage 3D settings` -> `Global settings`
    - set `Power Management mode` = `Prefer maximum performance`
    - set `Low Latency Mode` = `On`
- references
  
  - https://resplendence.com/latencymon
  - https://forums.unraid.net/topic/135867-is-there-a-current-guide-for-setting-up-a-windows-11-vm/

### SMB

- SMB hardening
  ```config
  #disable SMB1 for security reasons
  [global]
    server min protocol     = SMB3_02
    client ipc min protocol = SMB3_02
    restrict anonymous      = 2
    # client signing        = mandatory
    # server signing        = mandatory
    # client ipc signing    = mandatory
    # client NTLMv2 auth    = yes
    # smb encrypt           = required
    # null passwords        = no
    # raw NTLMv2 auth       = no
  ```

## Backup

[What do you use for backup?](https://www.reddit.com/r/selfhosted/comments/l2kuzs/comment/gk7s8lg/)

 > 
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

[What is the benefit of using duplicity/restic/borg over rclone](https://www.reddit.com/r/truenas/comments/tjtkd9/comment/i1mdt34/)

 > 
 > Rclone/syncthing/resilio/etc are sync tools.
 > 
 > Duplicacy/duplicity/borg/restic/Kopia/etc are backup tools.
 > 
 > The instrumental difference is obviously versioning and snapshot history. (Yes, you can have rudimentary versioning with rclone too, but it's just that - rudimentary per file full copies in a separate folder - good luck trying to restore consistent state from that). Backup tools provide you a way back machine to recover coherent state of your data arbitrary amount of time in the past, and do it efficiently minimizing storage space and bandwidth required.
 > 
 > If you don't want to go to all nitty gritty details go by intent: if you want backup - use backup tools. If you want sync - use sync tools. Sync is not a backup for obvious reasons.
 > 
 > The exception could be backup of immutable and incompressible data - like photos and videos where change always means corruption and the nature of the data does not lend itself to deduplication. Then you can get away with rclone versioning - to protect good version from being overwritten with a bad one. But then you have two solitons to maintain - much as well backup everything together with a proper backup app.

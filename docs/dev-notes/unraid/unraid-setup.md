# Unraid Setup

## Docker Config

- create custom network
  
  ```bash
  docker network create omninet
  ```

- change docker installation to `docker directory` instead of `btrfs vDisk docker.img` to avoid SSD wear
  
  - some apps (e.g. Dropbox) constantly write to log file
  - this triggers the expected write amplification from `BRTFS` copy-on-write
  - [details](https://forums.unraid.net/bug-reports/stable-releases/683-docker-image-huge-amount-of-unnecessary-writes-on-cache-r733/page/22/?tab=comments#comment-13653)

## Advanced Disk Settings

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

## VM Config

### Host Config Tweaks

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
   > \[!note\] Restore _**on-demand** cpu governor_
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

### Windows VM Guest Tweaks

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

## SMB

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

# Windows SysAdmin: Troubleshooting Guide

## Drivers

### Approach 1: AutoRuns

- TLDR: use **_SysInternals: AutoRuns_** to find bad behaving/suspect drivers [(Reference)](https://www.overclock.net/threads/official-amd-ryzen-ddr4-24-7-memory-stability-thread.1628751/page-1041)
  - Configuration
    
    - **_Options->Hide Microsoft Entries:_** enable this and unhide everything else
    - **_Options->Scan Options->Verify code signatures:_** enable
    - **_Options->Scan Options->Check VirusTotal.com:_** optional; useful but lots of false positives
  - Key Points
    
    - `Red`:    no digital signature. if _"LargeCorp"_ driver, **_extremely suspect/dangers_** (failed/didn't care to pass WHL Quality Assurance); if _open-source_ driver, likely won't be signed bc of cost
    - `Yellow`: driver image not found; usually safe to remove
    - Most Important Categories: 'Drivers','Services','ScheduledTasks','Logon'
  - **_Drivers_**: most difficult bc Windows often can't remove kernel/device driver, marks it for deletion at reboot, which often silently fails
    
     > 
     > \[!danger\]\- Usual Suspects/Bad Offenders
     > 
     > |Driver|Problems|
     > |------|--------|
     > |`AMDRyzenMasterDriverV*`|seems latest versions are less dangerous and gets uninstalled, anyway better to remove RM unless you have gun pointed at your head|
     > |`AsrDrv*`|ASRock drivers, anything ASRock should be removed; literally banned as it provides [full kernel access](https://github.com/stong/CVE-2020-15368)|
     > |`Asusgio2`|anything ASUS should be removed, the worst. If you have ROG peripherals you may need to keep the ROG drivers. Armoury-Crate software is a virus-like, will cause BSOD and all sort of issues, stay away|
     > |`EneIo`,`EneTechIo`,`*Io64.sys`|RGB software drivers usually terrible written, suffering from performance **and** serious security holes|
     > |`gdrv`,`gdrv2`|GigaByte software, 2nd worse after ASUS, remove everything. Known to cause BSODs|
     > |`NTIOLib_MSISimple_OC`,`NTIOLib_OCKit`,`MSI Command Center`|not the worst but hitting performances. Remove all MSI software, you can do the same without usually. Nice to change options without rebooting but then once done disable the driver|
     > |`NPF*`,`Network Packet Filter drivers`|used by many network utils (e.g. PowerLine adapters, etc) so must check if needed; can always disable/re-enable on-demand instead of deleting|
     > |`AMDRyzenMasterDriverV*`|seems latest versions are less dangerous and gets uninstalled, anyway better to remove RM unless you have gun pointed at your head|
     > |`AsrDrv*`|ASRock drivers, anything ASRock should be removed; literally banned as it provides [full kernel access](https://github.com/stong/CVE-2020-15368)|
     > |`Asusgio2`|anything ASUS should be removed, the worst. If you have ROG peripherals you may need to keep the ROG drivers. Armoury-Crate software is a virus-like, will cause BSOD and all sort of issues, stay away|
     > |`EneIo`,`EneTechIo`,`*Io64.sys`|RGB software drivers usually terrible written, suffering from performance **and** serious security holes|
     > |`gdrv`,`gdrv2`|GigaByte software, 2nd worse after ASUS, remove everything. Known to cause BSODs|
     > |`NTIOLib_MSISimple_OC`,`NTIOLib_OCKit`,`MSI Command Center`|not the worst but hitting performances. Remove all MSI software, you can do the same without usually. Nice to change options without rebooting but then once done disable the driver|
     > |`NPF*`,`Network Packet Filter drivers`|used by many network utils (e.g. PowerLine adapters, etc) so must check if needed; can always disable/re-enable on-demand instead of deleting|
    
    - Application Drivers: usually fine since they should only be loaded on demand on app start (e.g. CPU-z,HWInfo,GPU-z,)
    - HW drivers: dangerous as can  can cause your system to stop booting; always use system snapshots
  - **_Services_**: pretty easy bc easily discoverable/traceable
    
     > 
     > \[!warning\]\- Usual Suspects/Bad Offenders
     > 
     > |Driver|Problems|
     > |------|--------|
     > |HW peripheral vendors|install superflous services e.g. [RazerGameService](https://scorpiosoftware.net/2022/05/14/zombie-processes/)|
     > |anti-cheat from games||
     > |'Automatic','DelayedStart' 3rd-party services|if service is for disabled/on-demand feature, requiring always-on background execution is sign of lurking issues (process likely running 'sleep mode' causing perf issues, micro-stuttering, zombie kernel objects/child processes). workaround by setting to 'Disabled' or `Manual`|
  
  - **_ScheduledTasks_**: tricky b/c big troubleshooting headache
    
    - usually disabling works in short-to-midterm but breaks in mid-to-longterm (e.g. update requires Task but upgrade didn't re-enable Task)
    - root cause analysis is headache b/c likely won't remember manually disabling task
    - then relying on dice roll of how robust app's logging is but if you had to disable the task manually, app was probably poorly written to begin with
    - safest to disable tasks for uninstalled software
  - **_Logon_**: subtle footguns abound
    
    - safest to mainly disable uninstalled/'yellow' registry keys
    - then use another tool to disable startups e.g. 
      - [NirSoft WhatInStartup](https://www.nirsoft.net/utils/what_run_in_startup.html)
      - [SystemInformer](https://systeminformer.sourceforge.io)
      - TaskManager/msconfig

### Approach 2: SCManager

`sc.exe`: **Service Control Manager CLI** to manipulate services; drivers run as special kernel service

- TLDR: attempt forensics on driver with `sc`
  
  - query driver to glean useful info
    ```batch
    sc queryex        ssgdio
    sc qc             ssgdio
    sc qdescription   ssgdio
    sc GetDisplayName ssgdio
    sc GetKeyName     ssgdio
    sc EnumDepend     ssgdio
    ```
  
  - disable service and reboot
    ```batch
    sc stop   ssgdio
    sc config ssgdio start= disabled
    [restart_machine]
    ```
  
  - delete driver
    ```batch
    sc delete ssgdio
    ```

- `sc` command details
  
  - `sc.exe`: Service Control Manager cli to manipulate services (drivers run as special kernel service)
    
    ```batch
    Syntax: sc <"\\ServerName"> [command] [service name] <option1> <option2>...
    Help:   sc [command]
    ```
  
  - Global Commands: operate on SCManager; does not take service name
    \| Command        | Description                                                                                        |
    \| -------------- | -------------------------------------------------------------------------------------------------- |
    \| `sc [command]` | get help for command                                                                               |
    \| `boot`         | `ok|bad` Indicates whether the last boot should be saved as the last-known-good boot configuration |
    \| `Lock`         | Locks the Service Database                                                                         |
    \| `QueryLock`    | Queries the LockStatus for the SCManager Database                                                  |
  
  - Service Commands: operates on services; requires service name
    \| Command           | Description                                                                                        |
    \| ----------------- | -------------------------------------------------------------------------------------------------- |
    \| `query`           | Queries the status for a service, or enumerates the status for types of services                   |
    \| `queryex`         | Queries the extended status for a service, or enumerates the status for types of services          |
    \| `start`           | Starts a service                                                                                   |
    \| `pause`           | Sends a PAUSE control request to a service                                                         |
    \| `interrogate`     | Sends an INTERROGATE control request to a service                                                  |
    \| `continue`        | Sends a CONTINUE control request to a service                                                      |
    \| `stop`            | Sends a STOP request to a service                                                                  |
    \| `config`          | Changes the configuration of a service (persistent)                                                |
    \| `description`     | Changes the description of a service                                                               |
    \| `failure`         | Changes the actions taken by a service upon failure                                                |
    \| `failureflag`     | Changes the failure actions flag of a service                                                      |
    \| `sidtype`         | Changes the service SID type of a service                                                          |
    \| `privs`           | Changes the required privileges of a service                                                       |
    \| `managedaccount`  | Changes the service to mark the service account password as managed by LSA                         |
    \| `qc`              | Queries the configuration information for a service                                                |
    \| `qdescription`    | Queries the description for a service                                                              |
    \| `qfailure`        | Queries the actions taken by a service upon failure                                                |
    \| `qfailureflag`    | Queries the failure actions flag of a service                                                      |
    \| `qsidtype`        | Queries the service SID type of a service                                                          |
    \| `qprivs`          | Queries the required privileges of a service                                                       |
    \| `qtriggerinfo`    | Queries the trigger parameters of a service                                                        |
    \| `qpreferrednode`  | Queries the preferred NUMA node of a service                                                       |
    \| `qmanagedaccount` | Queries whether a services uses an account with a password managed by LSA                          |
    \| `qprotection`     | Queries the process protection level of a service                                                  |
    \| `quserservice`    | Queries for a local instance of a user service template                                            |
    \| `delete`          | Deletes a service (from the registry)                                                              |
    \| `create`          | Creates a service. (adds it to the registry)                                                       |
    \| `control`         | Sends a control to a service                                                                       |
    \| `sdshow`          | Displays a service's security descriptor                                                           |
    \| `sdset`           | Sets a service's security descriptor                                                               |
    \| `showsid`         | Displays the service SID string corresponding to an arbitrary name                                 |
    \| `triggerinfo`     | Configures the trigger parameters of a service                                                     |
    \| `preferrednode`   | Sets the preferred NUMA node of a service                                                          |
    \| `GetDisplayName`  | Gets the DisplayName for a service                                                                 |
    \| `GetKeyName`      | Gets the ServiceKeyName for a service                                                              |
    \| `EnumDepend`      | Enumerates Service Dependencies                                                                    |
  
  - `query/queryex` options
    
    - query service status: `sc query [servicename]`
    - find matching services: `sc query [option]`
      \| Option     | Value Type                | Description                                                     |
      \| ---------- | ------------------------- | --------------------------------------------------------------- |
      \| `state=`   | `active`,`inactive`,`all` | service state to enumerate;               default: `active`     |
      \| `bufsize=` | `int`                     | size in bytes of enumeration buffer;      default: `4096`       |
      \| `ri=`      | `int`                     | resume index number to begin enumeration; default: `0`          |
      \| `group=`   | `string`                  | service group to enumerate;               default: `all groups` |
  - syntax examples
    
    ```batch
    sc query                                - Enumerates status for active services & drivers
    sc query   eventlog                     - Displays status for the eventlog service
    sc queryex eventlog                     - Displays extended status for the eventlog service
    sc query   type= driver                 - Enumerates only active drivers
    sc query   type= service                - Enumerates only Win32 services
    sc query   state= all                   - Enumerates all services & drivers
    sc query   bufsize= 50                  - Enumerates with a 50 byte buffer
    sc query   ri= 14                       - Enumerates with resume index = 14
    sc queryex group= ""                    - Enumerates active services not in a group
    sc query   type= interact               - Enumerates all interactive services
    sc query   type= driver group= NDIS     - Enumerates all NDIS drivers
    ```

### Approach 3: pnputil

- find bad offender's by looking at [zombie processes](https://scorpiosoftware.net/2022/05/14/zombie-processes/) using Pavel's Object Explorer
  - ex: Razer's shitty GameManagerService.exe that's forced on users for no reason
- list/inspect
  - AutoRuns
  - DriverView
  - DevManView
  - InstalledDriverList
  - command line
    ```batch
    driverquery /V
    pnputil /enum-drivers
    pnputil /enum-devices 
    pnputil /enum-interfaces
    ```

- delete
  - BCUninstaller
  - BleachBit
  - command line
    ```batch
    pnputil /delete-driver oem####.inf /uninstall /force
    ```
    
    ```powershell
    Get-CimInstance Win32_SystemDriver -Filter "name='LGBusEnum'" | Invoke-CimMethod -MethodName Delete
    Get-CimInstance Win32_SystemDriver -Filter "name='LGJoyXlCore'" | Invoke-CimMethod -MethodName Delete
    Get-CimInstance Win32_SystemDriver -Filter "name='LGVirHid'" | Invoke-CimMethod -MethodName Delete
    Get-CimInstance Win32_SystemDriver -Filter "name='LVRS64'" | Invoke-CimMethod -MethodName Delete
    ```

## Misc

- Export GroupPolicy modifications: `gpresult /h './GPReport.html'`
- Query Sids:
  ```batch
  wmic useraccount where sid='S-1-5-18' get domain,name,sid ;@rem get user by SID
  wmic useraccount get disabled,domain,name,sid             ;@rem list all the users and their SIDs
  wmic sysaccount get domain,name,sid                       ;@rem list built-in accounts
  wmic group get domain,name,sid                            ;@rem list Active Directory groups
  net user <username>                                       ;@rem list all info for one user
  net localgroup Administrators                             ;@rem list users in the local Administrators group
  ```

- Network Adapter:
  ```batch
  ipconfig [/all]                      ;@rem show basic/detailed information
  ipconfig [/renew   | /renew6 foo*]   ;@rem renew the IPv4/IPv6 address for all/matching adapter
  ipconfig [/release | /release6 foo*] ;@rem release IPv4/IPv6 address for all/matching adapter
  ipconfig /displaydns                 ;@rem show DNS Resolver cache contents
  ipconfig /flushdns                   ;@rem purge DNS Resolver cache
  ipconfig /registerdns                ;@rem refreshes all DHCP leases and re-registers DNS name
  
  @rem Reset network state/adaptors
  netsh int ip reset
  netsh winsock reset catalog
  <reboot>
  ```

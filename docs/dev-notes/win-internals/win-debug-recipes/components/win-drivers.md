# Troubleshooting Windows Drivers

## Check For Device Problems

- use [DeviceManager](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/using-device-manager) to see if the device has a [problem code](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/devpkey-device-problemcode)

- check all devices for problem
  
  ```batch
  pnputil /enum-devices /problem
  ```

- check specific [device instance path](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/device-instance-ids)
  
  ```batch
  pnputil /enum-devices /instanceid <device instance path>
  ```

## Check For Device Installation Problems

 > 
 > \[!TLDR\] Analyzing the Setupapi.dev.log File
 > Check the `%windir%\\inf\setupapi.dev.log` driver installation log file; lines beginning with "!" are _**warnings**_ and "!!!" are _**error failures**_

### SetupAPI Text Logs: Device Driver Installation Logs

_**Plug n Play Manager**_ and _**SetupAPI**_ log information about installation events:

|Log|Purpose<sup>
[1](https://github.com/MicrosoftDocs/windows-driver-docs/blob/staging/windows-driver-docs-pr/install/setupapi-text-logs.md "SetupAPI Logs Reference")</sup>|
|---|--------|
|`C:\Windows\INF\setupapi.dev.log`|_Device Installation Log_ on device/driver installs|
|`C:\Windows\INF\setupapi.app.log`|_App Installation Log_ on app installs associated w/device driver installs|

#### SetupAPI Logging Registry Settings

[SetupAPI](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/setupapi) logging supports:

- _**global event level:**_    controls log verbosity level; see [Setting the Event Level for a Text Log](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/setting-the-event-level-for-a-text-log)
- _**global event category:**_ determines the type of operations that can make log entries; see [Enabling Event Categories for a Text Log](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/enabling-event-categories-for-a-text-log)

#### Interpreting SetupAPI Log File

SetupAPI text logs internal format:

- _**log entry:**_               is one line in a text log

- _**text log header:**_         info about the os and computer architecture. see [Format of a Text Log Header](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/format-of-a-text-log-header).

- _**text log sections:**_       records the events during a single device installation; sections used to conceptually organize log entries in meaningful way

- _**non-section log entries:**_ associated with operations not tied to specific section; appear in order they're written. see [Format of Log Entries That Are Not Part of a Text Log Section](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/format-of-log-entries-that-are-not-part-of-a-text-log-section)
  their log entry format: _**entry_prefix** **time_stamp** **event_category** **formatted_message**_

|`Entry Prefix`|Message type|
|:-------------|:-----------|
|"!!!  "|error message|
|"!    "|warning message|
|"     "|info message|
|"   . "|info message|

|`Event Category`|SetupAPI operation|
|----------------|------------------|
|"...: "|Vendor-supplied operation|
|"bak: "|Backup data|
|"cci: "|Class installer or co-installer operation|
|"cpy: "|Copy files|
|"dvi: "|Device installation|
|"flq: "|Manage file queues|
|"inf: "|Manage INF files|
|"ndv: "|New device wizard|
|"prp: "|Manage device and driver properties|
|"reg: "|Manage registry settings|
|"set: "|General setup|
|"sig: "|Verify digital signatures|
|"sto: "|Manage the driver store|
|"ui : "|Manage user interface dialog boxes|
|"ump: "|User-mode PnP manager|

#### Example Log File

```cpp
>>>  [Device Install - PCI\VEN_104C&DEV_8019&SUBSYS_8010104C&REV_00\3&61aaa01&0&38]
>>>  2005/02/13 22:06:28.109: Section start
...
 Additional section body log entries
...
     dvi: {Build Driver List}
     dvi:      Enumerating all INFs...
     dvi:      Found driver match:
     dvi:           HardwareID - PCI\VEN_104C&DEV_8019
     dvi:           InfName    - C:\WINDOWS\inf\1394.inf
     dvi:           DevDesc    - Texas Instruments OHCI Compliant IEEE 1394 Host Controller
     dvi:           DrvDesc    - Texas Instruments OHCI Compliant IEEE 1394 Host Controller
     dvi:           Provider   - Microsoft
     dvi:           Mfg        - Texas Instruments
     dvi:           InstallSec - TIOHCI_Install
     dvi:           ActualSec  - TIOHCI_Install.NT
     dvi:           Rank       - 0x00002001
     dvi:           DrvDate    - 10/01/2002
     dvi:           Version    - 6.0.5033.0 
!!!  inf:      InfCache: Error flagging 1394.inf for match string pci\ven_104c&dev_8019
     dvi: {Build Driver List - exit(0x00000000)}
...
 Additional section body log entries 
...
<<<  [2005/02/13 22:06:29.000: Section end]
<<<  [Exit Status(0x00000000)]
```

```cpp
  . ump: Start service install for: PCI\VEN_104C&DEV_8019&SUBSYS_8010104C&REV_00\3&61aaa01&0&38
  . ump: Creating Install Process: rundll32.exe

>>>  [Device Install - PCI\VEN_104C&DEV_8019&SUBSYS_8010104C&REV_00\3&61aaa01&0&38]
>>>  2005/02/13 22:06:28.109: Section start
```

### Common Installation Errors Errors

|Error code|Description|
|----------|-----------|
|0x000005B4 (ERROR_TIMEOUT)|The device installation took too long and was stopped.  See [SetupApi logs](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/setupapi-text-logs) for more information about the device installation and where the time was spent.<br><br>Some common causes of timeouts are:<br><br>A co-installer executing for too long.  This could be because the co-installer is performing some unsupported operation that has hung or is too long running.  For example, a co-installer is executed in a non-interactive session, so it can't do something that needs to wait on user input.  Co-installers are deprecated and should be avoided. For more information, see [universal INFs](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/using-a-universal-inf-file).<br><br>Starting or restarting a device at the end of device installation has hung.|
|0xe0000219 (ERROR_NO_ASSOCIATED_SERVICE)|The driver package being installed on the device didn't specify an associated service for the device.  For more information, see the SPSVCINST_ASSOCSERVICE flag in the [INF AddService Directive](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/inf-addservice-directive) documentation.|
|0xe0000248 (ERROR_DEVICE_INSTALL_BLOCKED)|The installation of the device was blocked due to group policy settings.  For more information, see [controlling device installation using Group Policy](https://learn.microsoft.com/en-us/previous-versions/dotnet/articles/bb530324(v=msdn.10)) and [Mobile Device Management policies for device installation](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-deviceinstallation).|
|0x000001e0 (ERROR_PNP_QUERY_REMOVE_DEVICE_TIMEOUT)|At the end of device installation, one or more devices will be restarted to pick up new files or settings changed during the device installation.  As part of this restart operation, a query remove operation is performed on the device or devices being restarted. This error indicates that something hung or took too long during the query remove operation for the device being installed. For more information, see [SetupApi logs](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/setupapi-text-logs).|
|0x000001e1 (ERROR_PNP_QUERY_REMOVE_RELATED_DEVICE_TIMEOUT)|At the end of device installation, one or more devices will be restarted to pick up new files or settings changed during the device installation.  As part of this restart operation, a query remove operation is performed on the device or devices being restarted. This error indicates that something hung or took too long during the query remove operation for one of the device or devices being restarted. For more information, see [SetupApi logs](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/setupapi-text-logs).|
|0x000001e2 (ERROR_PNP_QUERY_REMOVE_UNRELATED_DEVICE_TIMEOUT)|At the end of device installation, one or more devices will be restarted to pick up new files or settings changed during the device installation.  As part of this restart operation, a query remove operation is performed on the device or devices being restarted. This error indicates that that query remove operation wasn't able to be performed in a timely manner due to a query remove operation being performed on another device on the system. For more information, see [SetupApi logs](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/setupapi-text-logs).|

## Misbehaving Or Bad Drivers

### Approach 1: AutoRuns

- TLDR: use _**Sysinternals: AutoRuns**_ to find bad behaving/suspect drivers [(Reference)](https://www.overclock.net/threads/official-amd-ryzen-ddr4-24-7-memory-stability-thread.1628751/page-1041)
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
    
    - Application Drivers: usually fine since they should only be loaded on demand on app start (e.g. `CPU-Z`,`HWInfo`,`GPU-Z`)
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
    
    |Command|Description|
    |-------|-----------|
    |`sc [command]`|get help for command|
    |`boot`|`ok\|bad` Indicates whether the last boot should be saved as the last-known-good boot configuration|
    |`Lock`|Locks the Service Database|
    |`QueryLock`|Queries the LockStatus for the SCManager Database|
  
  - Service Commands: operates on services; requires service name
    
    |Command|Description|
    |-------|-----------|
    |`query`|Queries the status for a service, or enumerates the status for types of services|
    |`queryex`|Queries the extended status for a service, or enumerates the status for types of services|
    |`start`|Starts a service|
    |`pause`|Sends a PAUSE control request to a service|
    |`interrogate`|Sends an INTERROGATE control request to a service|
    |`continue`|Sends a CONTINUE control request to a service|
    |`stop`|Sends a STOP request to a service|
    |`config`|Changes the configuration of a service (persistent)|
    |`description`|Changes the description of a service|
    |`failure`|Changes the actions taken by a service upon failure|
    |`failureflag`|Changes the failure actions flag of a service|
    |`sidtype`|Changes the service SID type of a service|
    |`privs`|Changes the required privileges of a service|
    |`managedaccount`|Changes the service to mark the service account password as managed by LSA|
    |`qc`|Queries the configuration information for a service|
    |`qdescription`|Queries the description for a service|
    |`qfailure`|Queries the actions taken by a service upon failure|
    |`qfailureflag`|Queries the failure actions flag of a service|
    |`qsidtype`|Queries the service SID type of a service|
    |`qprivs`|Queries the required privileges of a service|
    |`qtriggerinfo`|Queries the trigger parameters of a service|
    |`qpreferrednode`|Queries the preferred NUMA node of a service|
    |`qmanagedaccount`|Queries whether a services uses an account with a password managed by LSA|
    |`qprotection`|Queries the process protection level of a service|
    |`quserservice`|Queries for a local instance of a user service template|
    |`delete`|Deletes a service (from the registry)|
    |`create`|Creates a service. (adds it to the registry)|
    |`control`|Sends a control to a service|
    |`sdshow`|Displays a service's security descriptor|
    |`sdset`|Sets a service's security descriptor|
    |`showsid`|Displays the service SID string corresponding to an arbitrary name|
    |`triggerinfo`|Configures the trigger parameters of a service|
    |`preferrednode`|Sets the preferred NUMA node of a service|
    |`GetDisplayName`|Gets the DisplayName for a service|
    |`GetKeyName`|Gets the ServiceKeyName for a service|
    |`EnumDepend`|Enumerates Service Dependencies|
  
  - `query/queryex` options
    
    - query service status: `sc query [servicename]`
    
    - find matching services: `sc query [option]`
      
      |Option|Value Type|Description|
      |------|----------|-----------|
      |`state=`|`active`,`inactive`,`all`|service state to enumerate;               default: `active`|
      |`bufsize=`|`int`|size in bytes of enumeration buffer;      default: `4096`|
      |`ri=`|`int`|resume index number to begin enumeration; default: `0`|
      |`group=`|`string`|service group to enumerate;               default: `all groups`|
  
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

- find bad offender's by looking at [zombie processes](https://scorpiosoftware.net/2022/05/14/zombie-processes/) using _**Pavel's Object Explorer**_
  
  - ex: Razer's shitty `GameManagerService.exe` that's forced on users for no reason
- for list/inspect drivers:
  
  - _**Sysinternals AutoRuns**_
  - _**Nirsoft DriverView**_
  - _**Nirsoft DevManView**_
  - _**Nirsoft InstalledDriverList**_
  - command line
    ```batch
    driverquery /V
    pnputil /enum-drivers
    pnputil /enum-devices
    pnputil /enum-interfaces
    ```

- for deleting drivers:
  
  - _**BCUninstaller**_
  - _**BleachBit**_
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

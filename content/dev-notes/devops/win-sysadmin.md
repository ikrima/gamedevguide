# Windows SysAdmin: Dealing With The Bullshit

## Drivers

- find bad offender's by looking at [zombie processes](https://scorpiosoftware.net/2022/05/14/zombie-processes/) using Pavel's Object Explorer
  - ex: Razer's shitty GameManagerService.exe that's forced on users for no reason
- list/inspect
  - AutoRuns
  - DriverView
  - DevManView
  - InstalledDriverList
  - command line
    ```bat
    driverquery /V
    pnputil /enum-drivers
    pnputil /enum-devices 
    pnputil /enum-interfaces
    ```

- delete
  - BCUninstaller
  - BleachBit
  - command line
    ```bat
    pnputil /delete-driver oem####.inf /uninstall /force
    ```
    
    ```powershell
    Get-CimInstance Win32_SystemDriver -Filter "name='LGBusEnum'" | Invoke-CimMethod -MethodName Delete
    Get-CimInstance Win32_SystemDriver -Filter "name='LGJoyXlCore'" | Invoke-CimMethod -MethodName Delete
    Get-CimInstance Win32_SystemDriver -Filter "name='LGVirHid'" | Invoke-CimMethod -MethodName Delete
    Get-CimInstance Win32_SystemDriver -Filter "name='LVRS64'" | Invoke-CimMethod -MethodName Delete
    ```

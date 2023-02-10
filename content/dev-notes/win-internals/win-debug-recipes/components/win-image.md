# Windows Image Repair

- [dism](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/deployment-image-servicing-and-management--dism--command-line-options?view=windows-11): repair system image using Windows Update to restore ucorrupted files
  
  - scan but not repair corruptions
    ```batch
    dism /Online /Cleanup-Image /CheckHealth
    ```
  
  - more advanced scan
    ```batch
    dism /Online /Cleanup-Image /ScanHealth
    ```
  
  - scan and repair common issues
    ```batch
    dism /Online /Cleanup-Image /RestoreHealth
    ```
  
  - use mounted installation media/iso to restore system files
    ```batch
    dism /Online /Cleanup-Image /RestoreHealth /Source:F:\sources\Install.esd /LimitAccess
    ```
  
  - _`%windir%\Logs\DISM\dism.log`_: generated detailed log
- [System File Checker](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/sfc): scan/repair all protected system files using the local image files at `%windir%\System32\dllcache`
  
  ```batch
  sfc /scannow
  ```
  
  - if `sfc` returns `could not perform the requested operation`
    - ensure folders exist _`%windir%\WinSxS\Temp\PendingDeletes`_, _`%windir%\WinSxS\Temp\PendingRenames`_
    - reboot into **safe mode** and rerun `sfc`
  - _`%windir%\Logs\CBS\CBS.log`_: generated detailed log; extract sfc process details only with
    ```batch
    findstr /c:"[SR]" %windir%\Logs\CBS\CBS.log > "%userprofile%\Desktop\sfcdetails.txt"
    ```

- Cleanup Windows Update
  
  - analyze component store for removable updates
    ```batch
    dism /Online /Cleanup-Image /AnalyzeComponentStore
    ```
  
  - trigger cleanup
    ```batch
    dism /Online /Cleanup-Image /StartComponentCleanup
    ```
  
  - trigger more time consuming follow-up cleanup
    ```batch
    dism /Online /Cleanup-Image /StartComponentCleanup /ResetBase
    ```

# FontCache

- Delete for font duplicates in user/system-wide installations
  
  ```powershell
  (Get-Item "$env:SystemRoot\Fonts\Iosevka*"                    ).FullName | Remove-Item
  (Get-Item "$env:LOCALAPPDATA\Microsoft\Windows\Fonts\Iosevka*").FullName | Remove-Item
  ```

- Rebuild [Windows Font Cache](https://www.thewindowsclub.com/rebuild-font-cache-in-windows)
  
  ```powershell
  # stop/disable font cache services
  $fcStartType       = (Get-Service 'FontCache').StartType        # WindowsFontCacheService
  $fc3StartType      = (Get-Service 'FontCache3.0.0.0').StartType # WindowsPresentationFoundationFontCache3.0.0.0
  'FontCache'        | Stop-Service -PassThru | Set-Service -StartupType:Disabled
  'FontCache3.0.0.0' | Stop-Service -PassThru | Set-Service -StartupType:Disabled
  
  # delete font cache files
  "$env:SystemRoot/System32/FNTCACHE.dat"                                    | Remove-Item
  "$env:SystemRoot/ServiceProfiles/LocalService/AppData/Local/FontCache.dat" | Remove-Item
  "$env:SystemRoot/ServiceProfiles/LocalService/AppData/Local/FontCache/"    | Get-ChildItem | Remove-Item
  
  # reenable/restart font cache services
  'FontCache'        | Set-Service -StartupType:$fcStartType  -PassThru | Start-Service
  'FontCache3.0.0.0' | Set-Service -StartupType:$fc3StartType -PassThru | Start-Service
  ```

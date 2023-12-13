# Unraid OS Update

## Backup

- **AppData**:               `SettingsTab -> Backup/Restore Appdata -> Manual Backup`
- **Flash Drive**:           `MainTab     -> FlashSettings -> Flash Backup`

## Prep For Update

- Check/Update to Latest:
  
  - **Containers**:          `DockerTab   -> Check For Updates`
  - **Plugins**:             `PluginsTab  -> Check For Updates`
  - **Pkgs**:                `SettingsTab -> NerdTools -> Check For Updates`
- Disable/Shutdown:
  
  - **Custom Plugins**:      `un-get update; un-get installed; un-get remove bat; un-get cleanup; plugin remove un-get.plg`
  - **Background Jobs**:     `ParityCheck/Tuner, Mover, AutoUpdate, AutoBackup`
  - **Docker**:              `SettingsTab -> Docker     -> Enable Docker = No`
  - **VM Manager**:          `SettingsTab -> VM Manager -> Enable VMs    = No`
- Sanity Test:
  
  - **Fix Common Problems**: `SettingsTab -> Fix Common Problems`
  - **Update Assistant**:    `ToolsTab -> UpdateAssistant -> Run Tests`

## Apply Upgrade

- **Flash Drive Snapshot**:  `rsync -avh --delete server:/boot/ /mnt/backup/unraid-flash-snapshot/` or
  `scp -r server:/boot/*  ~/backup/unraid-flash-snapshot/`
- **Upgrade OS**:            `ToolsTab -> UpdateOS`

## Restore Settings

- Check/Update to Latest:
  
  - **Containers**
  - **Plugins**
  - **Pkgs**
- Reenable/Restart:
  
  - **Custom Plugins**
  - **Background Jobs**
  - **Docker**
  - **VM Manager**
- Sanity Test:
  
  - **Fix Common Problems**
  - **Flash Drive Backup**

# Intel Network Drivers

_**NOTE:** Don't install Intel PROSet/Wireless Software_

## Clean Install Ethernet Drivers

### Simple Clean Uninstall

[reference](https://www.intel.com/content/www/us/en/support/articles/000058304/ethernet-products.html)

- Open Windows Device Manager
- Double-click Network adapters to expand the section.
- Right-click the Intel Ethernet Connection (model) and select Properties.
- Click the Driver tab.
- Click Uninstall.
- Check Delete the driver software for this device and click OK.
- Press the Windows key + R, then type %Temp% and delete everything from that folder.
- Install the latest Intel driver from the Download Center.

### Remove phantom adapters

[reference](https://www.intel.com/content/www/us/en/support/articles/000006656/ethernet-products.html):

- Close Windows Device Manager.

- Select Start > All Programs > Accessories > Command Prompt, and enter the following commands
  
  ```bat
  set devmgr_show_nonpresent_devices=1
  start devmgmt.msc
  ```

- From the Windows Device Manager menu, select View > Show hidden devices.

- Expand the Network Adapter tree, delete the adapters that are no longer installed by right clicking the gray network adapters and select Uninstall.

- Close the Device Manager and reboot your system.

- Remove the phantom adapters from Device Manager.

- Uninstall and remove any existing teams and Virtual Local Area Networks (VLANs).

- Uninstall the drivers for the network interface cards (NICs) via Device Manager.

- Reboot.

- Install the latest drivers and software.

- Re-create any teams and VLANs.

### Advanced Clean Uninstall

[reference](https://www.intel.com/content/www/us/en/support/articles/000005781/ethernet-products.html)

- Before starting this procedure, download drivers and software for Intel Ethernet Adapters for use during the installation step

- Remove the phantom adapters from Device Manager

- Uninstall and remove any existing teams and Virtual Local Area Networks (VLANs)

- Uninstall the drivers for the network interface cards (NICs) via Device Manager

- Reboot.

- Install the latest drivers and software

- Re-create any teams and VLANs

### Manually Uninstall/Cleanup Registry Items

[reference](https://www.intel.com/content/www/us/en/support/articles/000005781/ethernet-products.html)

- Remove the phantom adapters from Device Manager.

- Uninstall and remove any existing teams and VLANs.

- Using Device Manager, uninstall the drivers for the NICs.

- From a command prompt, open regedt.exe.

- Back up the registry, File > Export.

- Go to HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class{4D36E972-E325-11CE-BFC1-08002bE10318}
  
  - Remove the numbered (0001 or 0007) registry keys where its DriverDesc value(s) = the name of your Intel LAN connection.
- Go to HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Network{4D36E972-E325-11CE-BFC1-08002BE10318}
  
  - Remove one of the following registry keys where, in subKey Connection:
  - Name value= Local Area Connection X and PnpInstanceID value = \ROOT\IANSMINIPORT\xxx
  - Name value= Local Area Connection X and PnpInstanceID value = PCI/VEN_8086&DEV_xxxxxxxxxxxxxxxxxx
- Go to HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkCards.
  
  - Remove the numbered key (1 or 5) where its Description value = the name of your Intel LAN connection(s).
- Remove the following keys, if present
  
  ```reg
  HKEY_LOCAL_MACHINE\Software\Intel\Network_Services\ANS
  HKEY_LOCAL_MACHINE\Software\Intel\Network_Services\DMIX
  HKEY_LOCAL_MACHINE\Software\Intel\Network_Services\INST_LANGUAGE_PRIV
  HKEY_LOCAL_MACHINE\Software\Intel\Network_Services\NCS2
  HKEY_LOCAL_MACHINE\Software\Intel\Prounstl\Dins
  HKEY_LOCAL_MACHINE\Software\Intel\Prounstl\Services
  HKEY_LOCAL_MACHINE\Software\Intel\SupportedDevices
  HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\iANSMiniport
  HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\iANSProtocol
  HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\PROSetDX
  ```
  
  - Search in the Uninstall section for Intel Network Connections for key where
    - DisplayVersion value equals your PROSet/DMIX version e.g. `DisplayVersion = 14.5.1.0`
    - delete this key: ({AAA8CA88-8A22-43D1-867F-ABD7944C9815})
- Go to HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Installer\Folders, and remove the following:
  
  - ..\Intel\ANS
  - ..\Intel\DMIX
  - ..\Intel\DMIX\Hlp
  - ..\Intel\DMIX\Resource
  - ..\Intel\DMIX\uninst
  - ..\Intel\NS2
  - ..\Intel\NCS2\Agent
  - ..\Intel\NCS2\Scripts
  - ..\Intel\NCS2\WMIProv
  - ..\Intel\NCS2\WMIProv\MOF
- Save and reboot

- Reinstall drivers and re-create the teams and VLANs

## Clean Install Wireless Drivers

### Clean Uninstall

[reference](https://www.intel.com/content/www/us/en/support/articles/000022173/wireless.html)

- Download and save the driver first

- Uninstall the Wi-Fi driver 
  _**NOTE:** Windows may have an inbox Wi-Fi driver that came preinstalled on your system; they can't be uninstalled and "Delete the driver software for this device" option is unavailable/_
  
  - Go to Device Manager
  - Expand the Network Adapters category
  - Right-click your Intel Wireless Adapter and choose to uninstall it
  - Make sure to the option to Delete the driver software for this device is selected
  - Repeat steps A through D until the  the option to Delete the driver software for this device is greyed out
- Restart your computer

- Install previously downloaded driver

### Apply Recommended Settings for Wireless Connectivity

[reference](https://www.intel.com/content/www/us/en/support/articles/000024678/wireless.html)

|**Property**|**Value**|
|--------|-----|
|Channel Width for 5GHz|Auto (Access Point determines width)|
|Roaming Aggressiveness|Medium|
|Throughput Booster|Disabled|
|Transmit Power|Highest|
|802.11a/b/g Wireless Mode or Wireless Mode|Dual-band 802.11a/b/g or 802.11a/b/g|
|802.11n/ac Wireless Mode or HT Mode|802.11ac or VHT Mode|
|Other Advanced Properties|[more details](https://www.intel.com/content/www/us/en/support/articles/000005585.html)|

- **802.11n/ac Wireless Mode or HT Mode:** determines the supported data rates/throughput mode
  Ensure WiFi Router/Access Point supports 5 GHz and configured for 11ac mode
  
  - `HT=High=802.11n`
  - `VHT=Very High=802.11ac`
  - `Disabled=11a/g rates`
- **Key settings related to 11ac**
  _**NOTE:** The actual name and feature of the setting may vary depending on the AP. Check the user manual or contact your AP manufacturer for details_
  
  - **Channel**
    
    - This setting controls the channel your AP uses to communicate with client devices on your Wi-Fi network.
    
    - Most APs should have this set to Auto by default. We don't recommend changing this setting unless you:
      
      - Have a good understanding of Wi-Fi channels
      - Know how to determine the least congested channel in your environment
  - **Channel Width**
    
    For optimal performance and compatibility, enable support for all channel widths. If configured for 40MHz only or 80MHz only, this setting prevents legacy devices that support only 20MHz from connecting to the AP.
  
  - **(Wireless) Mode**
    
    This setting controls the type of Wi-Fi devices (802.11a/b/g/n/ac) that can connect to the AP.
    For optimal performance and compatibility, enable support for all wireless modes.
    If configured for 11ac mode only, legacy devices that support only 11n or 11a/g aren't able to connect to the AP.

# Network

- Network Adapter
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

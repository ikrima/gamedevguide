# Vcpkg Cheatsheet

- update:
  - short version: `git pull && bootstrap-vcpkg.bat -disableMetrics`
  - safer version:
    ```bash
    cd <vcpkg_root>
    vcpkg list > installed_ports.txt  # save a list of all installed ports somewhere 
    git pull
    nukedir installed/
    bootstrap-vcpkg.bat -disableMetrics # reinstall all ports:triplets you need
    vcpkg install <...> 
    ```
  
  - 
     > 
     > \[!warning\] `vcpkg upgrade/update` command is discouraged
     > it's not transactional
     > generally not needed but might need to re-integrate i.e. `vcpkg integrate remove/install`

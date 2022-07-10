# Vcpkg Cheat Sheet

* update:
  * short version: `git pull && bootstrap-vcpkg.bat -disableMetrics`
  * safer version:
    ````bat
    cd <vcpkg_root>
    vcpkg list > installed_ports.txt @rem save a list of all installed ports somewhere 
    git pull
    nukedir installed/
    bootstrap-vcpkg.bat -disableMetrics
    vcpkg install <...> @rem reinstall all ports:triplets you need
    ````
  
  * 
     > 
     > \[!warning\] `vcpkg upgrade/update` command is discouraged
     > it's not transactional
     > generally not needed but might need to re-integrate i.e. `vcpkg integrate remove/install`

# Linux Basics

## Resources

- [explainshell](https://explainshell.com/): match command-line arguments to their help text
- [tldr pages](https://tldr.sh/): more concise man pages
- [Introduction to Linux Technology and Philosophy by Jeremy Hajek](../_assets/intro-to-linux-textbook.pdf)
  - [github source](https://github.com/jhajek/Linux-text-book-part-1)
- [DigitalOcean Linux Basics Tutorials](https://www.digitalocean.com/community/tutorials?q=%5BLinux%20Basics%5D)
  - [Introduction to Linux Basics](https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-basics)
  - [Linux Command Line Primer](https://www.digitalocean.com/community/tutorials/a-linux-command-line-primer)
  - [How To Use ps, kill, and nice to Manage Linux Processes](https://www.digitalocean.com/community/tutorials/how-to-use-ps-kill-and-nice-to-manage-processes-in-linux)
- [bash beginner series](https://linuxhandbook.com/tag/bash-beginner/)

## Filesystem

- `stat`: pretty print stats about file
  ```bash
  stat [file]
  ```

- `rm`: delete directory
  ```bash
  rm -rf
  ```

- `find`: find file/directory recursively
  ```bash
  find . -name _gsdata_ -exec rm {} +
  find . -type d -name _gsdata_ -print -exec rm -rfv {} +
  find . -type f -name \( -name .DS_Store -o -name Thumbs.db \) -print -exec rm {} +
  ```

- `tree`: show directory structure as tree
  ```bash
  tree -d [dir]   # list directories only
  tree -ah        # include hidden, human readable
  tree -fp -L <n> # include paths, permissions, limit up to N levels
  ```

- `df`: display free disk space
  ```bash
  df -lhT # show usage of all mounted filesystems
  ```

## Package Management

|Command|Description|
|-------|-----------|
|`apt list --installed`|list installed `pkgs`|
|`sudo apt install <pkg>`|install `<pkg>`|
|`sudo apt remove <pkg>`|uninstall `<pkg>`|
|`sudo apt autoremove`|uninstall unused dependencies e.g. `<pkg>` leftover deps that were auto installed but longer required|
|`sudo apt purge <pkg>`|uninstall `<pkg>` configuration files e.g. located under `/etc`|

## Console Management

- `env`: print the environment variables
  ```bash
  stat [file]
  ```

- `tail`: displays the last part of a file
  ```bash
  tail -f [file]      # outputs last lines in realtime
  tail -n 100 [file]  # outputs last n lines
  ```

- `bind`: keybinds
  ```bash
  bind -l   # List bindable editing functions names
  bind -p   # List bindable editing functions names with their bindings are
  ```

## Permissions

- `chmod`: change permissions to folders and files
  
  ```bash
  find . -type d -exec chmod 755 {} +
  find . -type f -exec chmod 644 {} +
  ```

- `chown`: change ownership to user/group recursively
  
  ```bash
  chown -R user:group /some/path/here
  ```

- `chmod` recursively to 775/664
  
  ```bash
  chmod -R a=,a+rX,u+w,g+w /some/path/here
            ^  ^    ^   ^ adds write to group
            |  |    | adds write to user
            |  | adds read to all and execute to all folders (which controls access)
            | sets all to `000`
  ```

## Processes

- `id`: find UID/GID for user
  ```bash
  id [username]
  ```

- `ps`: list running processes
  ```bash
  ps aux
  ```

- `pkill`: kill process by name
  ```bash
  ps chrome
  ```

## Services

- `systemctl`: manage services/daemons
  - start/stop/restart the specified service
    
    ```bash
    systemctl start [service]
    systemctl stop [service]
    systemctl restart [service]
    ```
  
  - enable/disable service to auto start at boot time
    
    ```bash
    systemctl enable [service]
    systemctl disable [service]
    ```
  
  - show/check service current status/runtime information
    
    ```bash
    systemctl status [service]
    systemctl is-active [service]
    systemctl is-enabled [service]
    systemctl is-failed [service]
    systemctl list-dependencies [service]
    ```
  
  - list running services
    
    ```bash
    systemctl | grep running # Loaded+Active
    systemctl --no-pager | grep running | column -t # For more readable output
    systemctl list-units --all # Loaded services
    systemctl list-units --all --state=inactive # Inactive services
    systemctl list-units --type=service
    systemctl list-units --type=service --state=running 
    systemctl list-unit-files # All installed i.e. Loaded+Unloaded
    ```

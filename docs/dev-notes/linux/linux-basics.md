# Linux Basics

## Filesystem

- pretty print stats about file
  
  ```bash
  stat [file]
  ```

- delete directory
  
  ```bash
  rm -rf
  ```

- find file/directory recursively
  
  ```bash
  find . -name _gsdata_ -exec rm {} +
  find . -type d -name _gsdata_ -print -exec rm -rfv {} +
  find . -type f -name \( -name .DS_Store -o -name Thumbs.db \) -print -exec rm {} +
  ```

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

## Processes/Services

- `id`: find UID/GID for user
  
  ```bash
  id [username]
  ```

- list running processes
  
  ```bash
  ps aux
  ```

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

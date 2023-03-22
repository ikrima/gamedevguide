# Unraid Docker Troubleshooting

## General Docker Issues

[Source](https://github.com/binhex/documentation/blob/master/docker/faq/general.md)

### `Bridge Network Type` vs `Host Network Type`

- Bridge networking (default): allows the user to map a port from the host to the container (see later questions)
- Host networking: means the Docker applications ports cannot be defined and are bound to the Host's adapter

### What are Volume Mappings used for?

- Means of accessing running container's virtual file system from host; defined in two halves:
  
  - _Host Path:_        the full path you wish to share with the Docker Container
  - _Container Volume:_ the root folder that will appear INSIDE the Docker Container
   > 
   > \[!example\] volume mapping of `/config /mnt/cache/appdata`
   > Will create a folder called "config" off the root of the Docker Containers file system
   > This folder will contain all files and folders that exist in the hosts path `/mnt/cache/appdata`

 > 
 > \[!warning\] Always use the **Container Volume Path** when configuring the Docker application
 > correct:   `/data/completed` for _completed folder_, `/data/incomplete` for _incomplete downloads_
 > incorrect: `/mnt/user/appdata/completed` Host Path

### What are these Container Volume Paths used for?

- `/config`: used to store application configuration, such as ini files, db's, cached data, etc
- `/data`:   used to store downloaded data generated from the Docker application, such as TV Shows, Movies, Games, etc
- `/media`:  for Docker applications that index data for user consumption, or that require access to your media library to perform post processing e.g. Plex

### What are Port Mappings used for?

- used to map a hosts ports to a containers ports
- gives flexibility to have multiple containers running using the same port but are defined as different ports on the host side

 > 
 > \[!danger\] Don't change the container port when editing the Docker container
 > This is hardcoded and set in the Docker image
 > This also applies to application configuration, the port number should _**not**_ be changed

### Why are multiple Container Ports specified?

- sometimes applications require multiple dockerized processes e.g. _Deluge_
  - has a daemon process that does the downloading
  - a webui process serving the http interface
  - an additional port for incoming requests

### I have a problem with a Docker, are there any logs?

- All the Docker containers for this repository use a process manager called Supervisor
- this will log stdout and stderr to a log file called "supervisord.log" in the root of the defined /config hosts path
- When logging an issue on the forum please attach this to help diagnose the issue quicker

### Since the latest update i am having issues with application MineOS/Minecraft/Libreoffice/PyCharm and it is unable to start, what is the cause of this and how can i fix it?

- Upgrade the version of 'runc' to '1.0-rc93' or later. Do one of following:
  - Update runc manually
    - Drop to Terminal for the Unraid server (_**not**_ the container) and issue the following command to upgrade runc:
      ```bash
      curl -o '/usr/bin/runc' -L 'https://github.com/binhex/arch-packages/raw/master/static/x86-64/runc/runc' && chmod +x '/usr/bin/runc'
      ```
    
    - 
       > 
       > \[!note\] This step will be necessary on subsequent restarts of the server (_**not**_ the container)
    
    - This is a temporary stopgap until next release of Unraid (6.9.2), which should include latest version of Docker
  - Switch to privileged mode
    - workaround if you do not want to update runc, but it does elevate permissions for the container and increases potential security risks
    - go to web ui/Docker tab/left click icon and select `edit`
    - toggle the `Privileged` to `on` and click on `Apply`
  - Roll back to previous version is a last resort
    - roll back to a previous version before the glibc update by using a specifc tagged image

## Unraid Docker Issues

[Source](https://github.com/binhex/documentation/blob/master/docker/faq/unraid.md)

### What does the Privileged check-box do?

- The Privileged checkbox allows the Docker Container to perform certain privileged activities
- these are typically required for additional networking functions e.g. creating/editing virtual adapters

### I can't see how to configure the settings for the VPN Docker images

- current default action in the Unraid webui for Docker is to hide the Advanced options
- for some applications you need to view these advanced options to configure the application using Environment Variables
- to view these additional fields simply click on the "Advanced View" toggle button and then fill in the values

### I can see there is a newer version of the Docker application im running, can i update the application using the applications built-in update system?

- in place upgrades are not recommended when using Docker applications; instead wait for a new build from developer
- Once the new image has been built, then go to the Unraid webui "Docker" tab
- press the "Check for Updates" button
- this should then change the "Version" for the Docker container to "update ready"
- simply click on this and click the "Just do it!" button to begin the download of the newer image

### Why can't my metadata application post process my downloads from download client?

- The location you set for downloads MUST be consistent for the metadata containers (e.g. Sonarr/Radarr/Lidarr/SickRage/Medusa) and the download container (e.g. NZBGet/SABnzbd/Deluge/qBittorrent/rTorrent)
- Misconfiguration examples for hypothetical two containers setup: **sabnzbdvpn** as downloader and **sonarr** as metadata downloader
  - **Broken Example 1**
    
    - **sabnzbdvpn**
      _Host Path:_      `/mnt/cache/appdata/data/completed`
      _Container Path:_ `/data`
    - **sonarr**
      _Host Path:_      `/mnt/cache/appdata/data`
      _Container Path:_ `/data`
    - _**Problem:**_    because although the container path (/data) is the same for both containers, the host path does _**not**_ match
  - **Broken Example 2**
    
    - **sabnzbdvpn**
      _Host Path:_      `/mnt/cache/appdata/data/Completed`
      _Container Path:_ `/data`
    - **sonarr**
      _Host Path:_      `/mnt/cache/appdata/data/completed`
      _Container Path:_ `/data`
    - _**Problem:**_    because although the container path (/data) is the same for both containers, the host path does _**not**_ match (linux is CaSe sensitive)
  - **Broken Example 3**
    
    - **sabnzbdvpn**
      _Host Path:_      `/mnt/cache/appdata/data/completed`
      _Container Path:_ `/data`
    - **sonarr**
      _Host Path:_      `/mnt/cache/appdata/data/completed`
      _Container Path:_ `/downloads`
    - _**Problem:**_    because although the host path is now ok, the container paths do _**not**_ match
  - **Working Example**
    
    - **sabnzbdvpn**
      _Host Path:_      `/mnt/cache/appdata/data/completed`
      _Container Path:_ `/data`
    - **sonarr**
      _Host Path:_      `/mnt/cache/appdata/data/completed`
      _Container Path:_ `/data`
    - _**Solution:**_   because BOTH the container path (`/data`) and the host path (`/mnt/cache/appdata/data/completed`) EXACTLY match.
     > 
     > \[!warning\] Application Configuration
     > Keep in mind that when you configure **sabnzbdvpn** and **sonarr** the paths again must match
     > So if you configure **sabnzbdvpn** to download to `/data/usenet/` then you MUST also configure **sonarr** to use the same path, not `/data`
     > This again would cause path mismatch, even if you have set the container path and the host path to be the same

### There is an issue with the latest version of an application, how do i roll back to a specific version?

- in order to pull down a specific version of an application you need to specify the tag with the version you want
- to find out what tags are available for the docker image you need to go to the first post in the applications support thread
  - copy URL shown after the text "Docker Hub:" and append "tags/" to the end of the url
  - paste into your browser to retrieve list of available tag names
  - make a note of the tag you want (tag name denotes the version of the application)
- go the Unraid webui interface
  - left clicking the specific Docker container and selecting "edit",
  - then click on the advanced view option (top right) and edit the repository string, adding in ":" to the end of the name, e.g. to specify a version of 1.0.0.0 for couchpotato.
  - the repository would be changed from: `binhex/arch-couchpotato` -> `binhex/arch-couchpotato:1.0.0.0`

### I am seeing corruption with the applications database or issues when attempting to run `Lidarr/Radarr/Sonarr/Plex/PlexPass`, what could be the cause?

- Certain applications are not compatible with FUSE, which is part of Unraid

- FUSE is used to join or fuse (thus the name) multiple disks together to create a logical view of your media

- FUSE system is seen when you browse any share with `/mnt/user/` in the path, such as `/mnt/user/appdata`

- Due to this limitation certain apps need to have their configuration files defined on non-FUSE share. Fix:
  
  1. Stop the docker container that has the issues
  1. Left click the icon in the Unraid Web UI and select 'edit'
  1. Click on the toggle to switch to 'Advanced View' (top right)
  1. Scroll down to the path defined for /config and change it:
     - if on cache drive:     `/mnt/user/appdata/<container name>` -> `/mnt/cache/appdata/<container name>`
     - if not on cache drive: `/mnt/user/appdata/<container name>` ->  `/mnt/disk<number>/appdata/<container name>`
  1. Click on 'apply' to save the change
  1. Check the application is running.
   > 
   > \[!note\]
   > If without cache drive and you switch to a specific disk then you may need to reconfigure the application from scratch

### A new feature requires me to add in values for a named variable XXXXX but I can't find it in the Container's Webui 'Edit' menu?

- Unraid doesn't automatically push out new `Variables` when they are added the the Template by the Docker image developer
- Fix by either:
  - manually adding any additional `Variables`
    1. Left click on the container you want to add in the new feature and select `Edit`
    1. Click on the `Advanced view` toggle at the top right of the screen.
    1. Click on the link `Add another Path, Port, Variable, Label or Device` at the bottom
    1. On the `Config Type` dropdown and select `Variable`
    1. Set the `Key:` to the name of the feature to add, e.g. `VPN_INPUT_PORTS` (ask on the support thread on the forum if you are unsure of the name).
    1. Set the `Value:` to be the value for the variable, for the above example that would be something like `1234` (ask on the support thread on the forum if you are unsure of the value).
    1. Click on `ADD` to add the variable and then click on `Apply` to apply the change.
  - recreate the application from scratch
    1. delete the existing template
    1. re-download from Community Applications and reconfigure from scratch
    1. obviously not ideal and should only be a last resort

 > 
 > \[!note\] Some variables allow you to define more than one value
 > this is generally done by use a comma to separate the `Value` e.g. `1234,5678`
 > if you are unsure whether the variable supports multiple values then please ask on the support thread on the forum

### I'm still stuck

Try the [Unraid Docker FAQ](https://forums.unraid.net/topic/57181-real-docker-faq/)

# Unraid Console

[source](https://docs.unraid.net/legacy/FAQ/console)

## Basics of Console Usage

- If you are new to Linux, start by reading the [Terminal
  Access](terminal-access.md) page.
- The commands below usually list a usage note, which is a link to a
  'man page'. In Linux, man pages describe the syntax of command
  usage, including all options for the command. Linux splits all of
  these command line commands into numbered groups, and often lists
  the group number with the command, eg. `cat(1)`. Ignore the
  numbers! I think they are just there to confuse those of us who did
  not grow up speaking Linux.
- In some commands, you have to press the Ctrl-C keystroke combination
  to break out. In `less`, use the `q` key to quit.
- When a command produces output that is more than can fit on the
  physical console, you can use the Shift-PgUp and Shift-PgDn key
  combinations to page up and down through the console display,
  including what may appear to have scrolled off the top.
- The commands below are often compared with DOS or Windows console
  commands, but even when they appear essentially equivalent, there
  can be very subtle differences, not necessarily mentioned below.
- `cat` - [usage](http://linux.die.net/man/1/cat) and a [how to
  use](http://www.cyberciti.biz/faq/howto-use-cat-command-in-unix-linux-shell-script/)
  - `cat` is like the DOS/Windows `type`, displays a file on
    screen. The file is assumed to be all text, and if not, will
    usually display garbage.
  - `cat` is used often below, but could easily be replaced by
    `more` or `less` (eg. `cat /proc/cpuinfo` could be `less /proc/cpuinfo`)
- `more` - [usage](http://linux.die.net/man/1/more)
  - `more` displays text files like `cat`, but pages them to the
    screen. It waits for a keystroke between each page.
- `less` - [usage](http://linux.die.net/man/1/less)
  - `less` pages text files like `more`, but also lets you page
    up and down through them (press `q` to quit).
- `ls` - [usage](http://linux.die.net/man/1/ls)
  - `ls` is a little like the DOS/Windows `dir` command, for
    displaying directories in different ways, but the syntax is very
    different.
  - `ls -l` is a common way to list complete directory entries
  - see the [Command Macros](#command-macros)
    section for more complex examples
  - _Note: in the default setup of Unraid, `v` is an alias for
    `ls -l`, so you can replace the `ls -l` above with just
    `v`. It is OK to use the alias, but it is far better to learn
    the actual `ls -l` command in case you are ever in a situation
    where the alias does not exist. (nearly every other Linux based
    device will NOT have `v` as an alias for `ls -l`, and it may
    even be aliased to something completely different!)_
- `cp` - [usage](http://linux.die.net/man/1/cp)
  - `cp` is like the DOS/Windows `copy` command.
- `rm` - [usage](http://linux.die.net/man/1/rm)
  - `rm` is like the DOS/Windows `del` command.
- `cd` - [usage](http://ss64.com/bash/cd.html) and a [how to
  use](http://www.linfo.org/cd.html)
  - `cd` is like the DOS/Windows `cd` command.
  - `cd` with no parameters changes to the users home directory
- `pwd` - [usage](http://linux.die.net/man/1/pwd)
  - `pwd` displays the users current directory
- `mkdir` - [usage](http://linux.die.net/man/1/mkdir)
  - `mkdir` is like the DOS/Windows `md` command.
- `rmdir` - [usage](http://linux.die.net/man/1/rmdir)
  - `rmdir` is like the DOS/Windows `rd` command.
- `chmod` - [usage](http://linux.die.net/man/1/chmod)
  - `chmod` is a little like the DOS/Windows `attrib` command,
    but the syntax is very different.
  - The Linux system of security and access attributes is very
    different to the Windows system. For more help, see
    [this](https://wiki.archlinux.org/index.php/File_permissions_and_attributes)
    and
    [this](http://www.yourownlinux.com/2013/09/chmod-basics-of-filesdirectories.html).
- `find` - [usage](http://linux.die.net/man/1/find)
  - `find` is used to search for files
  - Example: the command `find . -iname "file*"` will search
    the current folder and all sub-folders for files matching
    `file*`, using a case-insensitive search.

## Console Commands for Hard Drives

The following commands require the Device ID, which you can get from
the "Main" tab of your webgui. Locate your drive, then look for the Device ID in parentheses. It
is always 3 lowercase letters, beginning with either **hd** or **sd**,
eg. _sda_, _sdk_, _hdc_, _hdg_. For simplicity, _sdx_ will be used
below, and you will substitute the appropriate Device ID for your drive.
(Extra spaces are added for clarity only, only one space is needed.)

### hdparm

- Instruction manual (a Linux MAN page) =\>
  <http://linux.die.net/man/8/hdparm>

To view the identity and configuration information for a drive (at the
console or terminal prompt)

`hdparm  -I  /dev/sdx`

To determine the read speed of a hard drive, the following command can
be used. The very last number in MB/sec is the one you want, ignore the
rest. Although one run will give you a decent result, for better
accuracy, take the average of at least 5 runs. See also [Check Harddrive
Speed](check-harddrive-speed.md).

`hdparm  -tT  /dev/sdx`

### smartctl

- Instruction manual (a Linux MAN page) =\>
  <http://smartmontools.sourceforge.net/man/smartctl.8.html>

To obtain the SMART info for a drive, including some identity and
configuration information, and physical statistics and error history.
For more information about SMART and `smartctl`, see
[here](https://forums.unraid.net/forum/index.php?topic=1521) and
[here](/unraid-os/manual/troubleshooting#data-recovery) and
[here](https://forums.unraid.net/forum/index.php?topic=1845.msg13042#msg13042)
and [here](https://forums.unraid.net/forum/index.php?topic=2097) and
[here](https://forums.unraid.net/forum/index.php?topic=2074.0).

`smartctl  -a  -d  ata  /dev/sdx`

Some newer drives and disk controllers will not issue a report if you
use the "-d ata" option, as they are not "ata" drives. (in fact,
they will respond with an error message instead) Most older disk
controllers did require the "-d ata" option, even if SATA drives. If
the smartctl report works without "-d ata" it is OK to leave it off.
If you get an error with "-d ata", try without it. The basic command
would then be

`smartctl -a /dev/sdx`

To copy the SMART report to a file called **smart.txt** on your Unraid
flash drive, that you can copy elsewhere and post to the forums, use the
following command. Of course, you can change the file name to what ever
you like, for example, **smart_Seagate320_2008-12-15.txt**.

`smartctl  -a  -d  ata  /dev/sdx  >/boot/smart.txt`

or

`smartctl  -a  -d  ata  /dev/sdx  |  todos  >/boot/smart.txt`

This second form makes it easier to look at the **smart.txt** file from
a Windows workstation, because it adds the standard end-of-lines that
are used in Windows.

To run a short or long SMART test on a drive, select one of the
following commands (short test takes minutes, long test can take several
hours depending on size of drive)

`smartctl  -d  ata  -tshort  /dev/sdx`  
`smartctl  -d  ata  -tlong  /dev/sdx`

As of Unraid v4.3 final, **smartctl** is included with Unraid. Prior to
this, it needed to be copied to the flash drive, see
[this](http://lime-technology.com/wiki/index.php?title=Best_of_the_Forums#unRAID_Addons_and_Tools)
for links to obtaining it. If you had to copy it to your flash drive,
then the command to execute would be **/boot/smartctl** instead of just
**smartctl**. For example, the command to get a SMART report would be

`/boot/smartctl  -a  -d  ata  /dev/sdx`

### other hard drive commands

To view the partitioning of a drive, the drive geometry, and the total
number of sectors

`fdisk  -l  -u  /dev/sdx`

To obtain the total number of sectors on a drive

`blockdev  --getsz  /dev/sdx`

To verify how the drive is labeled (note the "1" at the end of the
command, indicating the first partition on device /dev/sdx)

`vol_id  /dev/sdx1`

Shows you the drives by their model and serial number and the drive
device ID (sda, hdc, etc) linked to each

`ls  -l  /dev/disk/by-id`  
`-or-`  
`ls  -l  /dev/disk/by-id/[au]*  |  grep  -v  part1`

Lists the drive devices that have "volume labels", and device ID
linked to each. Typically, only the flash drive will have an entry here
and it MUST have a volume label of "UNRAID" for Unraid to start up
properly

`ls  -l  /dev/disk/by-label`

_Note: in the default setup of Unraid, `v` is an alias for `ls -l`,
so you can replace the `ls -l` above with just `v`._

## Console Commands for Networking

Here are a few networking commands that will provide more info about the
driver, about the card, about its configured parameters and speed, and
about its connection statistics.

Note: The ethtool utility is included in some but not all Unraid
distributions. See
[here](https://forums.unraid.net/forum/index.php?topic=2109.msg15568#msg15568)
for more information about ethtool, and a download link.

- `lsmod` - [usage](http://linux.die.net/man/8/lsmod)
  - lists the installed kernel modules, including your network
    driver
- `ethtool -i eth0` - [usage](http://linux.die.net/man/8/ethtool)
  - displays the network driver being used by your network chipset
    (for eth0), and its version
- `ethtool eth0`
  - displays a number of the settings for your network chipset
  - displays the speed setting, typically "Speed: 1000 Mb/s" for a
    gigabit connection
  - displays the Wake-on-LAN setting, typically "Wake-on: g" if
    enabled for 'magic' packet
- `ifconfig` - [usage](http://linux.die.net/man/8/ifconfig)
  - displays various numeric parameters and statistics for your
    networking
  - displays your MAC address, as `HWaddr`
  - displays your local IP, as `inet addr`
  - displays your MTU setting
  - displays assorted transmit and receive statistics, including
    errors and collisions
- `ethtool -S eth0`
  - displays more detailed network statistics
- `net lookup google.com` - [usage](http://linux.die.net/man/8/net)
  - check for correct nameserver and DNS configuration, should
    provide the IP for Google if setup right
- `ping -c5 google.com` - [usage](http://linux.die.net/man/8/ping)
  - another way to check for correct nameserver configuration (if it
    times out, or produces errors, you need to set a nameserver)
- `egrep -i "eth0|rc.inet1|((forcedeth|r8169|e1000|e1000e|sky2|skge|tg3|bcm5700|sk98lin)[ :])|dhcp" /var/log/syslog` -
  [usage](http://linux.die.net/man/1/egrep)
  - displays lines in the system log (/var/log/syslog) affiliated
    with networking

## Console Commands for System Management

**`section needs more work`**

- `tail -f --lines=99 /var/log/syslog` -
  [usage](http://linux.die.net/man/1/tail)
  
  - Display current end of syslog
  - If you leave the `--lines` parameter off, it will display the
    last 10 lines, which is often all you need. There are many
    situations though where at least a page full is useful, perhaps
    even 200 (eg. `\--lines=200`).
  - It is essentially real time, use Ctrl-C to quit.
- `free -l` - [usage](http://linux.die.net/man/1/free)
  
  - Show current memory usage
- `top` - [usage](http://linux.die.net/man/1/top)
  
  - List processes, with some memory and CPU stats
- `ps -eF` - [usage](http://linux.die.net/man/1/ps)
  
  - List processes (similar to top but ...)
- `ps -eo size,pid,time,args --sort -size` _(those are commas not
  periods, double hyphen before sort)_
  
  - List the processes on the server and their memory size (first
    column) sorted by memory size
- `testparm -sv` - [usage](http://linux.die.net/man/1/testparm)
  
  - Show system configuration parameters, including security and
    permissions
- `w` - [usage](http://linux.die.net/man/1/w)
  
  - Show who is logged on and what they are doing

For excellent descriptions and examples of the use of `screen`
([usage](http://linux.die.net/man/1/screen)), see
[here](https://forums.unraid.net/forum/index.php?topic=72.msg27984#msg27984)
and
[here](https://forums.unraid.net/forum/index.php?topic=2817.msg32232#msg32232).
The `screen` tool allows you to 'detach' a terminal session, to keep
it running even if you log out of the terminal session. An interesting
example using `screen` is in the
[rtorrent](https://forums.unraid.net/forum/index.php?topic=4029)
thread.

### To cleanly Stop the array from the command line

The following section is from 2011, and does NOT take into consideration
any of the extra services etc that Unraid has had incorporated since
then.

To shutdown the server properly from the command prompt, simply type in

powerdown

To cleanly stop the array from the linux command line prior to a reboot
requires the use of several commands in turn. They will stop SAMBA,
unmount the disks, and then stop the Unraid server. These commands can
be performed on the linux command line as follows:

`/root/samba stop`

Then, for each of your data disks type (note, the command is umount, not
unmount. data disk1=/dev/md1, disk2=/dev/md2, etc...):

`umount /dev/md1`  
`umount /dev/md2`  
`umount /dev/md3`  
`umount /dev/md4`  
`umount /dev/md5`  
`etc...`

`/root/mdcmd stop`

Note, a disk will not be able to be unmounted if it is busy. It will be
busy if it has an open file, or a process whose current directory is
located on the disk. If a disk is unable to be unmounted you'll first
need to terminate the processes holding it busy before it can be
unmounted.

To identify processes holding a disk busy you can type:

`fuser -mv /mnt/disk* /mnt/user/*`

To terminate processes holding a disk busy you can type (example is for
disk1):

`fuser -mvk /mnt/disk1`

or you can individually terminate individual process IDs by typing

`kill PID`

(where PID = the numeric process ID as printed by the prior `fuser -mv` command)  
\--[Joe L.](https://forums.unraid.net/profile/6-joe-l/) 16:54, 3 January 2011 (UTC)

## Console Commands for Files and Folders

Many more file and folder commands can be found in the [Basics of
Console Usage](#basics-of-bonsole-usage) section
above.

- `df` - [usage](http://linux.die.net/man/1/df)
  - reports file system disk space usage
  - example: `df /var/log` reports space usage of the log folder,
    in RAM
- `mount` - [usage](http://linux.die.net/man/8/mount)
  - mounts file systems; makes your files available!
- `umount` - [usage](http://linux.die.net/man/8/umount)
  - unmounts mounted file systems
- `which` - [usage](http://linux.die.net/man/1/which)
  - checks for shell commands that are executable from the system
    path

## Console Commands for System Information

In the commands below, `cat` is often used to display info, but
`more` and `less` can be used instead (see [Basics of Console
Usage](#basics-of-bonsole-usage) section above).

### CPU Info

- `lscpu` - [usage](http://linux.die.net/man/1/lscpu)
  - short summary of CPU info
- `cat /proc/cpuinfo`
  - much longer report of all CPU's
- `grep --color lm /proc/cpuinfo`
  - tests for 64 bit compatibility; if your CPU supports 64bit mode,
    then 'lm' will be highlighted in the cpuinfo report
- `grep --color vmx /proc/cpuinfo`
  - tests for Intel VT CPU Virtualization Extensions; if your CPU
    supports them, then 'vmx' will be highlighted in the cpuinfo
    report
- `grep --color svm /proc/cpuinfo`
  - tests for AMD V CPU Virtualization Extensions; if your CPU
    supports them, then 'svm' will be highlighted in the cpuinfo
    report
- `egrep --color 'lm\|vmx\|svm' /proc/cpuinfo`
  - quick way to test all 3 above _(thanks WeeboTech!)_

### Memory Info

- `free` - [usage](http://linux.die.net/man/1/free)
  - abbreviated summary of general memory info
  - Note: be careful putting much importance on low free memory
    numbers, as Linux uses memory very differently than Windows
- `free -t`
  - summary of general memory info with totals
- `free -mt`
  - summary of general memory info with totals, all in megabytes
- `cat /proc/meminfo`
  - more complete report of memory usage
- `slabtop` - [usage](http://linux.die.net/man/1/slabtop)
  - displays kernel slab cache information in real time
- `slabtop -s c`
  - slabtop display, but sorted by cache size usage
- `vmstat` - [usage](http://linux.die.net/man/8/vmstat)
  - displays virtual memory statistics
- `vmstat -m`
  - detailed memory usage

### Sensor Info

- `sensors` - [usage](http://linux.die.net/man/1/sensors)
  - displays some of available sensor info, may include system, CPU,
    and drive temperatures, system voltages, fan speeds and
    settings, etc
- `sensors-detect` -
  [usage](http://linux.die.net/man/8/sensors-detect)
  - analyses system and displays all available sensors and needed
    modules, helps configure
    [`sensors.conf`](http://linux.die.net/man/5/sensors.conf),
    requires Perl installed first

### Network Info

- Please see the [Network
  section](#console-commands-for-networking) above

### Other Hardware Info

_Note: the following commands may or may not be installed in your release_

- `lspci` - [usage](http://linux.die.net/man/8/lspci)
  - displays information about PCI buses and devices
- `lspci -vnn`
  - displays more verbose information about PCI buses and devices
    (add another `v` (`-vvnn`) for even more verbose)
- `lspci -knn`
  - displays more information about PCI buses and devices, including
    device numbers and assigned kernel modules
- `lsscsi` - [usage](http://linux.die.net/man/8/lsscsi)
  - displays information about SCSI devices
- `lsscsi -vgl` _(that's a lower case L)_
  - displays more verbose information about SCSI devices, including
    ATA numbers!
- `lsusb` - [usage](http://linux.die.net/man/8/lsusb)
  - displays information about USB buses and the devices connected
    to them
- `dmidecode` - [usage](http://linux.die.net/man/8/dmidecode)
  - displays the raw information from DMI/SMBIOS tables; may contain
    info on system manufacturer, motherboard, BIOS, memory,
    chipsets, etc
  - some of it is not human readable, and it is very often
    unreliable or wrong
  - if you see _Invalid entry length (0). DMI table is broken!
    Stop._, then the DMI tables are bad. Sometimes a BIOS update
    will improve them, but not guaranteed.

### Version Info

- `uname -a` - [usage](http://linux.die.net/man/1/uname)
  - displays the Linux kernel version
- `grep "emhttp: unRAID System Management Utility" /var/log/syslog` - [usage](http://linux.die.net/man/1/grep)
  - displays the UnRAID version
- `ethtool -i eth0` - [usage](http://linux.die.net/man/8/ethtool)
  - displays the version of the network driver being used by your
    network chipset (for eth0)
- `openssl version` - [usage](http://linux.die.net/man/1/openssl)
  - displays the version of OpenSSL, if installed

## Command Macros

Typing commands at the console command prompt can get tiresome,
especially when repetitive. You can use the up and down keys to repeat
previous commands, or at least reduce the typing, but Linux provides for
command macros, otherwise called a command alias. Below is a sample
macro file (with the file name of `macros`) that you can use and
modify. It requires being executed from your `go` file, so insert a
line into `/boot/config/go` similar to `/boot/macros`.

```shell
#!/bin/bash

# set dn like Windows dir/o-d, newest files first
echo "alias dn='ls -Aogt --group-directories-first --time-style=long-iso'">>/etc/profile

# set ds like dn plus Windows dir/s, newest files first, include all subdirs
echo "alias ds='ls -AogtR --group-directories-first --time-style=long-iso'">>/etc/profile

# start tail of syslog with plenty of lines
echo "alias tale='tail -f --lines=200 /var/log/syslog'">>/etc/profile

# an attempt to emulate the old Norton FF (FileFind)
echo "alias ff='find . -wholename '/proc' -prune -o -name '">>/etc/profile

# set screen blanking (if idle for 10 minutes) and monitor to standby (if idle for 30 minutes)
/bin/setterm -blank 10 -powersave powerdown -powerdown 30
```

When these macros are added to `/etc/profile`, they are available in
any console you open, whether by SSH or Telnet or at the physical
console on the UnRAID machine.

UnRAID already includes one macro - `v` is aliased to `ls -l`.

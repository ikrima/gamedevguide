---
sortIndex: 1
sidebar: ue4guide
---

One of the challenges in game development is pre-computing static lighting. Emulating photons bouncing around in a virtual environment can require legions of compute cycles. This process is called baking. The end result is a lightmap, a compact data structure that represents the way static objects are lit.

The [Unreal Engine](https://www.unrealengine.com/en-US/) suite provides software that makes baking lightmaps easy and fast. There are three components involved:

- **Unreal Lightmass**: the app that does the actual lighting computations. It’s designed to run on many different PCs simultaneously.

- **Swarm Agent**: a background app that runs on any PC that has been designated to bake lighting. The Swarm Agent invokes Lightmass to do bakes.

- **Swarm Coordinator**: an app that runs on a single always-on PC that receives requests for lighting builds and determines which Swarm Agents are available to participate in the bake.

To build lighting, anybody running the Unreal Editor can kick off a bake by selecting Build Lighting in the editor. This results in a number of Swarm Agents across the local network participating in the build. The number is a function of the size and quality of the bake, and also depends on which Agents have free CPU cycles. Each selected Swarm Agents receives Lightmass along with enough data to run its portion of the bake. The combined results are ultimately assembled back into a complete lightmap.

By running Swarm Agents on many computers on your local network, lighting builds can be performed very quickly. What might take hours on a single machine takes only a few minutes with Swarm.

The documentation on [Swarm](https://api.unrealengine.com/udk/Three/Swarm.html) and [Lightmass](https://docs.unrealengine.com/en-us/Engine/Rendering/LightingAndShadows/Lightmass) is sparse. The best reference is a single Unreal AnswerHub [post](https://answers.unrealengine.com/questions/27550/swarm-what-is-it-and-how-to-use-it.html).

Where I work at HBO, only a subset of employees use Unreal. However, we want every machine on our network to participate in lighting builds — without the hassle of installing Unreal. That goal turned into an interesting adventure. Although Epic recommends copying the Engine\\Binaries\\DotNET folder to install Swarm, that alone is insufficient.

Without rehashing what the existing documentation already covers, I’m including everything I’ve learned about Swarm as of Unreal version 4.9. This information is useful to anybody setting up Swarm on your network or wanting to understand how to best configure Swarm.

### Swarm Coordinator

The Coordinator keeps track of all of the Swarm Agents on the network and the status of each. You can also use the Coordinator to restart Swarm Agent instances.

- SwarmCoordinator.exe is designed to run on a single machine on your network. We run it on a low-end always-on Windows box. We also run Swarm Agent on the same machine.
- Swarm Coordinator does not require that Unreal Engine be installed. I didn’t do the original setup of the Coordinator on our network, but based on empirical evidence, it requires the same files as the Swarm Agent (see below), plus the SwarmCoordinator.exe.config file.
- We place a shortcut to SwarmCoordinator.exe in the Windows Startup folder so that the Coordinator always begins at system start.
- In theory you could have multiple Coordinators on the network, each managing an independent set of machines/Agents. We haven’t tested this theory.

### Unreal Lightmass

Lightmass is the workhorse application that bakes lighting. It is automatically distributed to Swarm Agents on a per bake basis.

- Do not install UnrealLightmass.exe directly; it’s automatically copied and run whenever a bake is kicked off.

- Because Lightmass is completely independent of Swarm, Swarm Agents can run different versions of Lightmass. That means you can have teams running different versions of Unreal and using different versions of Swarm Agents to bake lighting. Nice.

- Lightmass will utilize multiple CPU cores (you can configure how many) and peg the CPU on most machines. However, because (by default) it is run at below normal priority, it doesn’t normally impact the productivity of anybody actually using the machine.

- Lightmass is RAM intensive. It is not uncommon for it to use 1GB or more RAM depending on the bake size/quality.

- Lightmass does not utilize the GPU (as of 4.9).

- Depending on the size/quality of your bakes, Lightmass can require significant hard drive space. For instance, for our current small project, Lightmass uses many hundreds of MB per lighting build. See notes on configuring the Swarm cache for more details.

- Lightmass source code is located at Engine\\Source\\Editor\\UnrealEd\\Private\\Lightmass and Engine\\Source\\Programs\\UnrealLightmass

- The version of UnrealLightmass.exe that an Agent receives is dependent on processor architecture. There are 32 and 64-bit versions. Epic [recommends][post] only using Swarm/Lightmass on 64-bit systems for best performance, and we follow this advice.

- Lightmass requires the following be installed in order to run. If you’re installing Swarm Agents on machines, you’ll need to be sure these components are also installed.

  - DirectX v9 extensions, specifically D3DX9_43.dll, DComp.dll and XInput1_3.dll

  - Microsoft C runtime for Visual Studio 2013, specifically MSVCP120.dll and MSVCR120.dll

### Swarm Agent

Swarm Agent is designed to run on multiple machines across your network, building lighting on demand.

- SwarmAgent.exe runs on Windows XP and up. It does not run on MacOS or Linux (as of 4.9).

- Swarm is built with C# using the .NET 4.0 framework

- SwarmAgent.exe and its associated DLLs are 32-bit images

- We place a shortcut to SwarmAgent.exe in the Windows Startup folder so that the Agent always begins at system start.

- Swarm can technically run a variety of distributed tasks, but as of 4.9 it only runs lighting calculations by distributing and spawning Lightmass

- There are two types of logical Swarm Agents. The same SwarmAgent.exe client supports both modes.

  - The *Local* agent is the agent that kicked off the lighting bake

  - *Remote* agents running on other network PCs are assigned to participate in a given lighting bake

- After initial communication with the Coordinator, Swarm Agents appear to perform all Agent-to-Agent communication in a peer-to-peer fashion.

- The Local agent distributes UnrealLightmass.exe and lighting information to each assigned Remote agent. The Local agent also participates in the bake (unless otherwise configured), collects the work from remote agents and merges the results.

- Swarm will not execute bakes on machines where it detects that the CPU usage has been, on average, above 20% for the past 10 seconds (see CPUBusyThreshold in Agent.cs)

- Swarm spawns the Lightmass process at BELOW_NORMAL_PRIORITY_CLASS on the Local agent and IDLE_PRIORITY_CLASS on Remote agents to reduce the CPU impact on busy machines. These values are configurable.

- Swarm will not necessarily use all available non-busy agents. The number of agents appears to depend on the size and complexity of the lighting bake.

- Swarm does not require that Unreal Engine be installed.

- Swarm requires the following files be present in the same folder as SwarmAgent.exe. These files are found in the Engine/Binaries/DotNET folder.

  - SwarmAgent.exe

  - AgentInterface.dll

  - SwarmCommonUtils.dll

  - SwarmCoordinatorInterface.dll

  - UnrealControls.dll

  - SwarmAgent.Options.xml

- Swarm requires that the .NET 4.0 framework (or greater) be installed. If you’re running on Windows 8 or better, it’s already present. On Windows 7, it’s not preloaded, but comes automatically with Windows Update.

- Although Swarm itself doesn’t require DirectX v9 extensions or the C runtime, Lightmass does need these, so if you’re installing Swarm, be sure to install those components, too.

- Swarm Agent runs as a Notification (or System Tray) app. It is designed to run continuously in the background.

- To view the Swarm Agent interface, locate the app in the system tray (yellow and black S icon) and double click the icon.

- SwarmAgent.exe does not respond to WM_CLOSE. To close it manually, you must choose File->Exit from the main menu. To close it programatically, you can run taskkill.exe SwarmAgent.exe.

- Empirically (using Microsoft Message Analyzer) SwarmAgent and SwarmCoordinator use the following protocols and ports:

  - ICMP protocol for ping requests between agents

  - TCP protocol for all other communication, using ports: 8008, 8009, 54430, 56574, 56587 and 56589

- Some ports are configurable. For instance, SwarmCoordinator.exe.config allow you to remap port 8009.

- Swarm will not activate on sleeping PCs. I recommend that if you always want your Swarm Agents to be available, those PCs should not enter power-saving sleep states. Alternatively, you can use Windows Task Scheduler to wake machines at the appropriate times to run your bakes. See [powercfg](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-vista/cc748940(v=ws.10)) command line tool for details. We’ve found that not all machines have BIOS configurations that support powercfg, so your mileage may vary.

- Until we explored the issue in detail, the most common Swarm problem was blocked communication between different Swarm agents. Firewalls are the culprits. Windows Firewall will block Swarm by default, even if the user chooses to allow Swarm to do outbound communications. Because Swarm communicates in a peer-to-peer fashion, it must also be configured to allow *inbound* communication from other agents.

- Programmatically, the Windows Firewall can be configured to permit Swarm usage with the following commands. We also do IP filtering to make sure these firewall exceptions only happen on our local network — replace x.y with your actual leading IP octets.

  - Allow Swarm ICMP pings: netsh advfirewall firewall add rule name=”Unreal Swarm” dir=in action=allow enable=yes remoteip=x.y.0.0-x.y.255.255 protocol=icmpv4 interfacetype=lan

  - Allow Swarm TCP commands: netsh advfirewall firewall add rule name=”Unreal Swarm” dir=in action=allow enable=yes remoteip=x.y.0.0-x.y.255.255 protocol=tcp interfacetype=lan localport=8008,8009,54430,56574,56587 remoteport=8008,8009,54430,56574,56587

  - Uninstall firewall exceptions: netsh advfirewall firewall delete rule name=”Unreal Swarm”

> ![SwarmOverview_Networkconfig](../../assets/SwarmOverview_Networkconfig.png)

This diagram shows a scenario where the PC in the bottom center has kicked off a Unreal lighting bake. Three PCs have Unreal installed, but all the PCs are running Swarm Agents. The top center PC is running the Swarm Coordinator. Five PCs were chosen to participate in the bake. The other PC was busy (compiling code, etc.). Communication between the local agent and the remote agents, represented by the arrows, happens in a peer-to-peer fashion.

### Swarm Parameters

Many elements of how Swarm operates can be modified. The Settings tab in Swarm Agent allows you to change settings. Configuration information is stored in SwarmAgent.Options.xml and SwarmCoordinator.exe.config. Here are some of the most interesting elements, in order of importance.

- **CoordinatorRemotingHost**: must match the Swarm Coordinator Computer name from Control Panel->System

- **CacheFolder**: where Swarm caches job information. At install time, we set this to the equivalent of %temp%/SwarmCache

- **MaximumCacheSize**: the maximum amount of HDD space that Swarm will consume in GB. We use 10 (the default).

- **MaximumJobsToKeep**: the maximum number of cached jobs (and logs) to keep around. We use 5 (the default), but it’s extremely rare that we need to look at logs of old jobs, so I think 1 or 2 would be fine.

- **AllowedRemoteAgentNames**: allows you to select a subset of Remote agents that you want to use. We always want to use all available, so we set this to \*

- **AllowedRemoteAgentGroup**: allows different PCs to participate in different Swarm groups. We currently have a single group with our team name.

- **AgentGroupName**: this is the name of the group that the local agent belongs to. We use our team name.

- **LocalJobsDefaultProcessorCount** and **RemoteJobsDefaultProcessorCount** (developer settings): the number of CPU cores used by Lightmass for local and remote bakes. These are set automatically to reasonable values, but can be reduced to lessen CPU impact at the cost of bake speed.

### Swarm Installer

To make life easier for our extended team, I wrote a Windows installer that handles the complexity described above. The installer uses the [WiX Toolset](http://wixtoolset.org/) to generate a standard Windows MSI file. Notes about the installer:

- The installer is a 64-bit package. This addresses: 1) Unreal’s recommendation that Lightmass run on 64-bit systems only, 2) a limitation of WiX that doesn’t allow 32-bit packages to include/install 64-bit binaries, plus 3) the fact that everybody in our office is running 64-bit Windows anyway

- The following DirectX v9 files must be installed: dxsetup.exe, dxupdate.cab, dsetup.dll, dsetup32.dll, Jun2010_d3dx9_43_x64.cab and Apr2007_XInput_x64.cab. You can grab these files from the DirectX SDK. The WiX toolset page has [good instructions](http://wixtoolset.org/documentation/manual/v3/howtos/redistributables_and_install_checks/install_directx9.html) for installing DX extensions.

- In addition to the normal installer-y stuff (copying files and updating the registry), the installer:

  - Places a shortcut to SwarmAgent.exe in the Startup folder

  - [Configures the Swarm cache folder](https://pkisensee.wordpress.com/2015/09/08/windows-installer-modify-config-files/) in SwarmAgent.Options.xml

  - [Punches holes in the firewall](https://pkisensee.wordpress.com/2015/09/22/windows-installer-firewall-settings/)

- For uninstalls, in addition to nuking the right files, the installer:

  - [Shuts down Swarm](https://pkisensee.wordpress.com/2015/09/02/windows-installer-shut-down-system-tray-apps/)

  - [Nukes the cache folder](https://pkisensee.wordpress.com/2015/10/06/windows-installer-removing-folders/)

  - [Restores the firewall](https://pkisensee.wordpress.com/2015/09/22/windows-installer-firewall-settings/)

The Swarm requirements we publish to our team:

- 64-bit Windows 7 or above

- 4+ GB RAM

- 10+ GB free hard drive space

We recommend that everybody on the team with machines that meet the spec — including people that already have Unreal installed — install Swarm Agent.

*Reference From <https://pkisensee.wordpress.com/2015/11/06/baking-with-swarm>*

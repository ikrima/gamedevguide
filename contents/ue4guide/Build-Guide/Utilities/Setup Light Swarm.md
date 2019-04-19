# Setup Light Swarm.docx {#setup-light-swarm-docx}

Setup Light Swarm

Friday, May 01, 2015

7:00 PM

Setup Swarm

[http://www.srombauts.fr/2017/11/10/ue4-use-swarm-distribute-lighting-build-network/](http://www.srombauts.fr/2017/11/10/ue4-use-swarm-distribute-lighting-build-network/)

If you use Lightmass and/or Precomputed Visibility, you can notice that map build takes a long time.

Swarm – is a system for deployed builds, which provide ability to distribute build process between workstations in local network.

Swarm consists of two parts - Coordinator and Agent.

Coordinator will manage resources, and agent will be a resource.

In general, your local network will consist of server and connected client computers.

Some of them will be workstations for level designers, and UDK will be installed there. Others can be used as simple resource, and you don’t need to install UDK on it.

From Binaries folder, of installed UDK, get next files:

for coordinator:

- SwarmCoordinator.exe

- SwarmCoordinatorInterface.dll

for agent:

- AgentInterface.dll

- SwarmAgent.exe

- SwarmCoordinatorInterface.dll

- UnrealControls.dll

Place it, for example, in C:\Swarm\SwarmCoordinator and C:\Swarm\SwarmAgent, on server (but any computer in local network can be coordinator).

Add SwarmCoordinator.exe and SwarmAgent.exe to startup.

Run SwarmCoordinator.exe.

![C:\F31A12E5\B0BE3043-20AD-49AC-959C-AC7C5CB802C6_files\image001.png](C:\ikrima\src\personal\ue4guide\exports\export\assets\cf31a12e5b0be3043-20ad-49ac-959c.png)

Run SwarmAgent.exe and select **Settings** tab.

![C:\F31A12E5\B0BE3043-20AD-49AC-959C-AC7C5CB802C6_files\image002.png](C:\ikrima\src\personal\ue4guide\exports\export\assets\cf31a12e5b0be3043-20ad-49ac-959c.png)

Set next values:

CacheFolder: C:\Swarm\SwarmCache

AllowedRemoteAgentGroup: Default

AllowedRemoteAgentNames: *

AvoidLocalExecution: True

CoordinatorRemotingHost: SERVER (here IP or name of coordinator computer)

Next options are very important:

- AllowedRemoteAgentGroup – group should be the same for all agents, or they will not connect.

- AllowedRemoteAgentNames – to allow any names I set *.

- AvoidLocalExecution – agent should avoid local execution to distribute task to other agents through coordinator.

If you set ShowDeveloperMenu: True, new tab with developer options will be added.

Most interesting options here – LocalJobsDefaultProcessorCount, LocalJobsDefaultProcessPriority, RemoteJobsDefaultProcessorCount and RemoteJobsDefaultProcessPriority, which mean count of cores for local/remote task and priority of execution/connection to task.

If you look in coordinator now, you can see first agent, which running on this computer.

![C:\F31A12E5\B0BE3043-20AD-49AC-959C-AC7C5CB802C6_files\image003.png](C:\ikrima\src\personal\ue4guide\exports\export\assets\cf31a12e5b0be3043-20ad-49ac-959c.png)

So, optionally, coordinator can be an agent too.

Few words about coordinator’s fields:

Name – name of connected agent.

Group Name – name of agent group.

Agent Version – with next UDK build it will be changed, so don’t forget to update it.

State – agent’s state, it depends on whether it is assigned to current task, available or busy, closed.

Cores for Local, Cores for Remote – count of cores available for build (set in LocalJobsDefaultProcessorCount and RemoteJobsDefaultProcessorCount).

Look in C:\Swarm\SwarmAgent. Here you can see new files - SwarmAgent.DeveloperOptions.xml and SwarmAgent.Options.xml. This is options, which you set before.

Now you need to install agents (but not coordinators) on other workstations. Get all files of SwarmAgent folder (with options files).

Don’t forget to add SwarmAgent.exe to startup.

When setup completed, and all agents visible through coordinator, try to build any map. You will see all processes of connected agents, in this machine’s agent. And instead of few hours, build takes only a few minutes.

![C:\F31A12E5\B0BE3043-20AD-49AC-959C-AC7C5CB802C6_files\image004.png](C:\ikrima\src\personal\ue4guide\exports\export\assets\cf31a12e5b0be3043-20ad-49ac-959c.png)

Also, try to install agents only on powerful computers, it will prevent build delays, and decreases build time.

Good luck!

From &lt;[_https://forums.epicgames.com/threads/965487-Setup-Swarm_](https://forums.epicgames.com/threads/965487-Setup-Swarm)&gt;
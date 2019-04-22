---
title:  "Gamedev Development Environment Part 3"
pageSubTitle: A Yak Shaving for fun & profit series™
sideMenuHeading: "Part 3: Windows Config"
---
# Part III: Making Windows Tolerable + software I use + semi-auto imaging dev machines

First, if you install adobe stuff, do yourself a favor and remove the 12 services they install for lulz even when you're not using any adobe product. You can uninstall CreativeCloud desktop app while keeping photoshop/premiere/etc

[Remove Creative Cloud Desktop App](https://helpx.adobe.com/creative-cloud/help/uninstall-creative-cloud-desktop-app.html) \
![](https://pbs.twimg.com/media/DuzvOgqVsAAmEEB.jpg)

# Making Windows tolerable
Now tools I use. ⭐ => how must have it is to me

- **⭐Chocolatey** - package manager for windows
- **⭐Keypirinha** - launcher like alfred/quicksilver
- **⭐Cmder** - terminal emulator
- **⭐Everything** - fast search
- **⭐Rapidee** - environment vars editor
- ScreenToGif - screen capture
- Clover - Tabs in explorer
- Youtube-dl - download youtube/vimeo files for offline viewing
- **⭐Display Fusion** - virtualize desktop; use it to split my 33" monitor into two virtual monitors
- Remote Desktop Connection Manager
- Duet + iPad Pro 3rd Gen + Pencil - Turn my iPad Pro into a Cintiq
- Firefox
- Lastpass - password manager
- Tree Style Tab - Tree column view of all your tabs
- Stylus - make youtube distraction free and remove notifications/likes showing up on page
- uBlock Origin - ad block

&nbsp;

# DCC:
- **⭐⭐⭐Houdini** - Deserves its own post but hands down my favorite program in recent memory. It's more like a platform with a built in DCC app. I use it for prototyping, machine learning, math visualization, everything
- **⭐⭐⭐PureRef** - This is a god send for pulling references
- KeyframePro - video player for animators; allows markups and stuff
- 3D Max - what I started with
- Maya - only use it enough to get around
- Marvelous Designer - for clothes
- RedShift - for renders; fast GPU + constant development unlike Octane
- Photoshop/Premiere

# SysAdmin/Poor man's devops:
- **⭐⭐⭐SysInternals** -  Awesome set of windows sys tools
- **⭐Rohitab Api Monitor** - Amazingly well written; use it for api hooking
NTLite - I use it to help my ghetto bare metal provisioning for windows
Powershell - Powershell Desired State Configuration for poor man provisioning

# Research/Personal Productivity
- **⭐⭐⭐RescueTime** - Auto track where my time goes
- **Mathematica** - Preferred it over matlab but has annoying learning curve
- **⭐⭐⭐Houdini**
- ~~*OneNote - This was such an amazing program but hasn't seen much innovation in 4 years~~ I've abandoned this since it's been rotting over the last 4 years.
- Trillium - Currently trying this out as my onenote replacement
- Notion - Knowledge management alternate since OneNote isnt progressing
- **⭐Diigo** - Knowledge repository integrated with google search
- Mendeley - Knowledge repository for papers (where I store all my Siggraph papers)
- **⭐⭐⭐Workflowy** - tasking software
- Desmos/Geogebra - Powerful Math grapher/calculator
- Matcha - Math notebook bc screw latex. It's 2018. [mathcha.io](https://www.mathcha.io/)

# Programming:
- [**⭐⭐⭐@liveplusplus**](https://molecular-matters.com/products_livepp.html) - imho, absolute necessity with UE4. Makes iteration bearable with fast hotreload. With plugin, you can get up & running in 2 mins
- BeyondCompare
- Sublime
- Sublime Merge/Git Extensions
- UIForETW - Use this over Very Sleepy; pays dividends
- VS2017:
  - [**⭐ @visualassist**](https://twitter.com/visualassist) - Makes large C++ codebases manageable
  - Visual Commander - easy scriptable modification of VS UI (eg: autoattach to ue4 process with a button)
  - Debug Single Thread
- RenderDoc
- Nvidia Nsight Graphics/PIX
- WinDbg - still has features vs debugger doesnt
- VSCode - Okay, I was a hater/skeptic but now I'm drinking the koolade. It's replacing sublime for me bc it's almost as fast/snappy
- vcpkg - C++ library manager that surprisingly works
- PVS Studio: Static Analyzer

# Scripting:
- Python - MiniConda3 distro. Libs I use as python novice
  - **⭐click** - Make easy CLI apps
  - **⭐cogapp** - use it for our inline C++ codegen
  - **⭐boltons**
  - **⭐glom**
  - colorama
  - winregistry
  - requests
  - pybars3
  - hsluv
  - p4python
- Powershell
- Shadershop - Dont use it bc its proof of concept but wanted to sneak it here so *someone* can fully flesh it out. Silly in 2018 we still have to do this in our heads (but real motivation is my brain is getting older and can't do it as well anymore #MathIsASportForTheYoung)

Credit to [@kenpex](https://twitter.com/kenpex) where I discovered some of these tools. Here's his [list](https://c0de517e.blogspot.com/2011/04/2011-tools-that-i-use.html)
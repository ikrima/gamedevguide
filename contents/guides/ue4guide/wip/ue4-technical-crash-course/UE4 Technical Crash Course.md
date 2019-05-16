    sortIndex: 1

# Overview Of Engine:

<https://docs.unrealengine.com/latest/INT/Programming/Introduction/index.html>

GDC Europe 2014: Unreal Engine 4 for Programmers - Lessons Learned & Things to Come: <http://www.slideshare.net/GerkeMaxPreussner/gdc-europe-2014>

## Modules

**Types:**

- Developer: Used by Editor & Programs, but not games
- Editor: Used by UnrealEditor Only
- Runtime: Used by Editor, Games, & Programs
- ThirdParty: External third party libs/code
- Plugins: Extensions for Editor and/or Games. Should not have dependencies on other plugins
- Programs: Standalone apps & tools

**Important Modules:**

- Core: fundamental types & functions
- CoreUObject: Implements Uobject reflection system
- Engine: Game & engine framework classes
- OnlineSubsystem: Online & social networking features
- Slate: Widget library & high level UI functionality

**Modules for Advanced Functionality:**

- DesktopPlatform: Modules for OS function calls (e.g. filesystem, etc)
- DetailCustomization: Editor Detail panel customizations
- Launch: Main loop classes & functions
- Messaging: Message passing subsystem
- Sockets: Network socket implementation
- Settings: Editor & Project settings API
- SlateCore: Low level UI functionality
- TargetPlatform: Platform abstraction layer
- UMG: WYSIWYG UI system (Unreal Motion Graphics)
- UnrealEd: Unreal Editor main frame & features
- Analytics: Analytics functionality
- AssetRegistry: Asset database functionality for UnrealEd
- JsonUtilities & XmlParser: Parsing json/xml files

# Deep Dive Technical Course:

<http://nikoladimitroff.github.io/Game-Engine-Architecture/>

<https://www.blaenkdenum.com/notes/unreal-engine/>

# Rendering:

- How Unreal Renders A Frame: <https://interplayoflight.wordpress.com/2017/10/25/how-unreal-renders-a-frame/>

- UE4 Rendering Overview: <https://medium.com/@lordned/unreal-engine-4-rendering-overview-part-1-c47f2da65346>

- <http://gregory-igehy.hatenadiary.com/entry/2018/02/24/023251>

- <http://gregory-igehy.hatenadiary.com/entry/2017/12/28/002645>

# Python:

READ: PYTHON REPO

README.MD

UOBJECT_API.md

Skim through:

SnippetsForStaticAndSkeletalMeshes.md

Examples\\\*.md

How to find stuff:

Snippets.py

Find all in BuildAutomation

Visual assist symbol search "py\_ ..."

<https://www.toptal.com/python/top-10-mistakes-that-python-programmers-make?utm_source=Engineering+Blog+Subscribers&utm_campaign=51aba2b5ff-Blog_Post_Email_Top10PythonMistakes&utm_medium=email&utm_term=0_af8c2cde60-51aba2b5ff-109835873>

<http://book.pythontips.com/en/latest/index.html>

<http://ozkatz.github.io/improving-your-python-productivity.html>

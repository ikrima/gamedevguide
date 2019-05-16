Enable Stats from Command Line:

-StatCmds="startfile"

 

*From &lt;<https://udn.unrealengine.com/questions/445587/long-initial-load-times.html>&gt;*

  

Description of stats: <https://docs.unrealengine.com/udk/Three/StatsDescriptions.html>

 

Common options: \[-ms=5.0\] \[-root=None\] \[leaf=None\] \[-depth=maxint\] \[-nodisplay\]

stat groupname\[+\] - toggles displaying stats group, + enables hierarchical display

stat group list|listall|enable name|disable name|none|all|default - manages enabling/disabling recording of the stats groups. Doing stat \[groupname\] automatically enables that group

-   Also supports \[-group=groupname\] \[-sortby=name\] \[-maxhistoryframes=60\] \[-reset\] \[-maxdepth=4\] \[-root=None\] \[-ms=0.2\] \[-reset\]

 

stat namedmarker \#markername\# - adds a custom marker to the stats stream

stat none - disables drawing all stats groups

stat display -font=small\[tiny\] - Changes stats rendering display options

 

 

stat slow \[-ms=1.0\] \[-depth=4\] - toggles displaying the game and render thread stats

stat dumpframe - dumps a frame of stats

stat dumpframe -ms=.001 -root=initviews

stat dumpframe -ms=.001 -root=shadow

stat dumpave|dumpmax|dumpsum \[-start | -stop | -num=30\] - aggregate stats over multiple frames

stat dumphitches \[-start | -stop | empty toggles\] - toggles dumping hitches

stat dumpevents \[-ms=0.2\] \[-all\] - dumps events history for slow events, -all adds other threads besides game and render

stat dumpcpu - dumps cpu stats

stat dumpnonframe \[groupname\] - dumps non-frame stats, usually memory stats

 

 

stat hier -group=groupname \[-sortby=name\] \[-maxhistoryframes=60\] \[-reset\] \[-maxdepth=4\] \[-root=None\] \[-ms=0.2\] \[-reset\]

\- groupname is a stat group like initviews or statsystem

\- sortby can be name (by stat FName), callcount (by number of calls, only for scoped cycle counters), num(by total inclusive time)

\- maxhistoryframes (default 60, number of frames used to generate the stats displayed on the hud)

\- reset (reset the accumulated history)

\- maxdepth (default 4, maximum depth for the hierarchy)

 

stat startfile - starts dumping a capture

stat stopfile - stops dumping a capture (regular, raw, memory)

stat startfileraw - starts dumping a raw capture

stat toggledebug - toggles tracking the most memory expensive stats

 

add -memoryprofiler in the command line to enable the memory profiling

stat stopfile - stops tracking all memory operations and writes the results to the file

stat testfile - loads the last saved capture and dumps first, middle and last frame

 

 

Details from Stats.h: Implementing custom stats or cycle counters

 

/\*\*

\* Unreal Engine Stats system

\*

\* This is a preliminary version of the documentation, any comments are welcome :)

\*

\* This system allows you to collect various performance data and then the data can be used to optimize your game.

\* There are a few methods how to achieve this. This quick tutorial will describe all of them.

\* For stats commands check out method PrintStatsHelpToOutputDevice();

\*

\* Stats system in the UE4 supports following stats types:

\* Cycle Counter - a generic cycle counter used to counting the number of cycles during the lifetime of the object

\* Float/Dword Counter - a counter that is cleared every frame

\* Float/Dword Accumulator - a counter that is not cleared every frame, persistent stat, but it can be reset

\* Memory - a special type of counter that is optimized for memory tracking

\*

\* Each stat needs to be grouped, this usually corresponds with displaying the specified stat group i.e. 'stat statsystem' which displays stats' related data.

\*

\* To define a stat group you need to use one of the following methods:

\* DECLARE\_STATS\_GROUP(GroupDesc,GroupId,GroupCat) - declares a stats group which is enabled by default

\* DECLARE\_STATS\_GROUP\_VERBOSE(GroupDesc,GroupId,GroupCat) - declares a stats group which is disabled by default

\* DECLARE\_STATS\_GROUP\_MAYBE\_COMPILED\_OUT(GroupDesc,GroupId,GroupCat) - declares a stats group which is disabled by default and may be stripped by the compiler

\*

\* where

\* GroupDesc is a text description of the group

\* GroupId is an UNIQUE id of the group

\* GroupCat is reserved for future use

\* CompileIn if set to true, the compiler may strip it out

\*

\* It can be done in the source or header file depending the usage scope.

\*

\* Examples:

\* DECLARE\_STATS\_GROUP(TEXT("Threading"), STATGROUP\_Threading, STATCAT\_Advanced);

\* DECLARE\_STATS\_GROUP\_VERBOSE(TEXT("Linker Load"), STATGROUP\_LinkerLoad, STATCAT\_Advanced);

\*

\* Now, you can declare/define a stat.

\* A stat can be used only in one cpp file, in the function scope, in the module scope or can be used in the whole project.

\*

\* For one file scope you need to use one of the following methods depending on the stat type.

\* DECLARE\_CYCLE\_STAT(CounterName,StatId,GroupId) - declares a cycle counter stat

\*

\* DECLARE\_SCOPE\_CYCLE\_COUNTER(CounterName,StatId,GroupId) - declares a cycle counter stat and uses it at the same time, it is limited to one function scope

\* QUICK\_SCOPE\_CYCLE\_COUNTER(StatId) - declares a cycle counter stat that will belong to stat group called 'Quick'

\* RETURN\_QUICK\_DECLARE\_CYCLE\_STAT(StatId,GroupId) - returns a cycle counter, used by a few specialized classes, more information later

\*

\* DECLARE\_FLOAT\_COUNTER\_STAT(CounterName,StatId,GroupId) - declares a float counter, technically speaking it's based on the double type, 8 bytes

\* DECLARE\_DWORD\_COUNTER\_STAT(CounterName,StatId,GroupId) - declared a dword counter, technically speaking it's based on the qword type, 8 bytes

\* DECLARE\_FLOAT\_ACCUMULATOR\_STAT(CounterName,StatId,GroupId) - declares a float accumulator

\* DECLARE\_DWORD\_ACCUMULATOR\_STAT(CounterName,StatId,GroupId) - declares a dword accumulator

\* DECLARE\_MEMORY\_STAT(CounterName,StatId,GroupId) - declares a memory counter, same as the dword accumulator, but will be displayed with memory specific units

\* DECLARE\_MEMORY\_STAT\_POOL(CounterName,StatId,GroupId,Pool) - declares a memory counter with a pool

\*

\* If you want to have these stats accessible in the whole project/or wider range of files you need to use extern version.

\* These methods are the same as the previously mentioned but with \_EXTERN and the end of the name, here is the list:

\* DECLARE\_CYCLE\_STAT\_EXTERN(CounterName,StatId,GroupId, API)

\* DECLARE\_FLOAT\_COUNTER\_STAT\_EXTERN(CounterName,StatId,GroupId, API)

\* DECLARE\_DWORD\_COUNTER\_STAT\_EXTERN(CounterName,StatId,GroupId, API)

\* DECLARE\_FLOAT\_ACCUMULATOR\_STAT\_EXTERN(CounterName,StatId,GroupId, API)

\* DECLARE\_DWORD\_ACCUMULATOR\_STAT\_EXTERN(CounterName,StatId,GroupId, API)

\* DECLARE\_MEMORY\_STAT\_EXTERN(CounterName,StatId,GroupId, API)

\* DECLARE\_MEMORY\_STAT\_POOL\_EXTERN(CounterName,StatId,GroupId,Pool, API)

\*

\* Then in the source file you need to define those stats.

\* DEFINE\_STAT(CounterName) - defines stats declared with \_EXTERN

\*

\* where

\* CounterName is a text description of the stat

\* StatId is an UNIQUE id of the stat

\* GroupId is an id of the group that the stat will belong to, the GroupId from DECLARE\_STATS\_GROUP\*

\* Pool is a platform specific memory pool, more details later

\* API is the \*\_API of module, can be empty if the stat will be used only in that module

\*

\* Examples:

\* Custom memory stats with pools

\* First you need to add a new pool to enum EMemoryCounterRegion, it can be global or platform specific.

\*

\* enum EMemoryCounterRegion

\* {

\* MCR\_Invalid, // not memory

\* MCR\_Physical, // main system memory

\* MCR\_GPU, // memory directly a GPU (graphics card, etc)

\* MCR\_GPUSystem, // system memory directly accessible by a GPU

\* MCR\_TexturePool,// presized texture pools

\* MCR\_MAX

\* };

\*

\* This is an example that will allow using the pools every where, see CORE\_API.

\* THE NAME OF THE POOL MUST START WITH MCR\_

\* Header file.

\* DECLARE\_MEMORY\_STAT\_POOL\_EXTERN(TEXT("Physical Memory Pool \[Physical\]"), MCR\_Physical, STATGROUP\_Memory, FPlatformMemory::MCR\_Physical, CORE\_API);

\* DECLARE\_MEMORY\_STAT\_POOL\_EXTERN(TEXT("GPU Memory Pool \[GPU\]"), MCR\_GPU, STATGROUP\_Memory, FPlatformMemory::MCR\_GPU, CORE\_API);

\* DECLARE\_MEMORY\_STAT\_POOL\_EXTERN(TEXT("Texture Memory Pool \[Texture\]"), MCR\_TexturePool, STATGROUP\_Memory, FPlatformMemory::MCR\_TexturePool,CORE\_API);

\*

\* Source file.

\* DEFINE\_STAT(MCR\_Physical);

\* DEFINE\_STAT(MCR\_GPU);

\* DEFINE\_STAT(MCR\_TexturePool);

\*

\* This is a pool, so it needs to be initialized. Usually in the F\*PlatformMemory::Init()

\* SET\_MEMORY\_STAT(MCR\_Physical, PhysicalPoolLimit);

\* SET\_MEMORY\_STAT(MCR\_GPU, GPUPoolLimit);

\* SET\_MEMORY\_STAT(MCR\_TexturePool, TexturePoolLimit);

\*

\* Now we have pools, so we can setup memory stats for those pools.

\* Accessible everywhere.

\* DECLARE\_MEMORY\_STAT\_POOL\_EXTERN(TEXT("Index buffer memory"), STAT\_IndexBufferMemory, STATGROUP\_RHI, FPlatformMemory::MCR\_GPU, RHI\_API);

\* DECLARE\_MEMORY\_STAT\_POOL\_EXTERN(TEXT("Vertex buffer memory"), STAT\_VertexBufferMemory, STATGROUP\_RHI, FPlatformMemory::MCR\_GPU, RHI\_API);

\* DECLARE\_MEMORY\_STAT\_POOL\_EXTERN(TEXT("Structured buffer memory"), STAT\_StructuredBufferMemory,STATGROUP\_RHI, FPlatformMemory::MCR\_GPU, RHI\_API);

\* DECLARE\_MEMORY\_STAT\_POOL\_EXTERN(TEXT("Pixel buffer memory"), STAT\_PixelBufferMemory, STATGROUP\_RHI, FPlatformMemory::MCR\_GPU, RHI\_API);

\*

\* Accessible only in the module where defined.

\* DECLARE\_MEMORY\_STAT\_POOL\_EXTERN(TEXT("Pool Memory Size"), STAT\_TexturePoolSize, STATGROUP\_Streaming, FPlatformMemory::MCR\_TexturePool, );

\* DECLARE\_MEMORY\_STAT\_POOL\_EXTERN(TEXT("Pool Memory Used"), STAT\_TexturePoolAllocatedSize, STATGROUP\_Streaming, FPlatformMemory::MCR\_TexturePool, );

\*

\* And the last thing, updating the memory stats.

\* INC\_MEMORY\_STAT\_BY(STAT\_PixelBufferMemory,NumBytes) - increases a memory stat by the specified value

\* DEC\_MEMORY\_STAT\_BY(STAT\_PixelBufferMemory,NumBytes) - decreases a memory stat by the specified value

\* SET\_MEMORY\_STAT(STAT\_PixelBufferMemory,NumBytes) - sets a memory stat to the specified value

\*

\* Regular memory stats, without pools

\* DECLARE\_MEMORY\_STAT(TEXT("Total Physical"), STAT\_TotalPhysical, STATGROUP\_MemoryPlatform);

\* DECLARE\_MEMORY\_STAT(TEXT("Total Virtual"), STAT\_TotalVirtual, STATGROUP\_MemoryPlatform);

\* DECLARE\_MEMORY\_STAT(TEXT("Page Size"), STAT\_PageSize, STATGROUP\_MemoryPlatform);

\* DECLARE\_MEMORY\_STAT(TEXT("Total Physical GB"), STAT\_TotalPhysicalGB, STATGROUP\_MemoryPlatform);

\*

\* Or DECLARE\_MEMORY\_STAT\_EXTERN in the header file and then DEFINE\_STAT in the source file.

\* Updating the memory stats is done the same way as in the version with pools.

\*

\*

\* Performance data using the cycle counters.

\* First you need to add cycle counters.

\* DECLARE\_CYCLE\_STAT(TEXT("Broadcast"), STAT\_StatsBroadcast,STATGROUP\_StatSystem);

\* DECLARE\_CYCLE\_STAT(TEXT("Condense"), STAT\_StatsCondense, STATGROUP\_StatSystem);

\*

\* Or DECLARE\_CYCLE\_STAT\_EXTERN in the header file and then DEFINE\_STAT in the source file.

\*

\* Now you can grab the performance data.

\*

\* Stats::Broadcast()

\* {

\* SCOPE\_CYCLE\_COUNTER(STAT\_StatsBroadcast);

\* ...

\* // a piece of code

\* ...

\* }

\*

\* and that's all.

\* Sometimes you don't want to grab the stats every time the function is called, so you can use conditional cycle counter.

\* It's not very common, but may be useful.

\*

\* Stats::Broadcast(bool bSomeCondition)

\* {

\* CONDITIONAL\_SCOPE\_CYCLE\_COUNTER(STAT\_StatsBroadcast,bSomeCondition);

\* ...

\* // a piece of code

\* ...

\* }

\*

\* If you want to grab the performance data from one function you can use following construction.

\*

\* Stats::Broadcast(bool bSomeCondition)

\* {

\* DECLARE\_SCOPE\_CYCLE\_COUNTER(TEXT("Broadcast"), STAT\_StatsBroadcast, STATGROUP\_StatSystem);

\* ...

\* // a piece of code

\* ...

\* }

\*

\* or

\*

\* Stats::Broadcast(bool bSomeCondition)

\* {

\* QUICK\_SCOPE\_CYCLE\_COUNTER(TEXT("Stats::Broadcast"));

\* ...

\* // a piece of code

\* ...

\* }

\*

\* Mostly used for temporary stats.

\*

\* Those all cycle counters are used to generate the hierarchy. So you can get more detailed information about performance data.

\* There is also an option to set flat cycle counter.

\*

\* Stats::Broadcast(bool bSomeCondition)

\* {

\* const uint32 BroadcastBeginTime = FPlatformTime::Cycles();

\* ...

\* // a piece of code

\* ...

\* const uint32 BroadcastEndTime = FPlatformTime::Cycles();

\* SET\_CYCLE\_COUNTER(STAT\_StatsBroadcast, BroadcastEndTime-BroadcastBeginTime);

\* }

\*

\*

\* A few tasks implemented in the UE4 use a different approach in terms of getting the performance data.

\* They implement method GetStatId(). If there is no GetStatId(), the code will not compile.

\* Here is an example.

\*

\* class FParallelAnimationCompletionTask

\* {

\* // ...

\* // a piece of code

\* FORCEINLINE TStatId GetStatId() const

\* {

\* RETURN\_QUICK\_DECLARE\_CYCLE\_STAT(FParallelAnimationCompletionTask, STATGROUP\_TaskGraphTasks);

\* }

\* // a piece of code

\* // ...

\* };

\*

\*

\* Generic data using the float or dword counters.

\* First you need to add a few counters.

\* DECLARE\_FLOAT\_COUNTER\_STAT\_EXTERN(STAT\_FloatCounter,StatId,STATGROUP\_TestGroup, CORE\_API)

\* DECLARE\_DWORD\_COUNTER\_STAT\_EXTERN(STAT\_DwordCounter,StatId,STATGROUP\_TestGroup, CORE\_API)

\* DECLARE\_FLOAT\_ACCUMULATOR\_STAT\_EXTERN(STAT\_FloatAccumulator,StatId,STATGROUP\_TestGroup, CORE\_API)

\* DECLARE\_DWORD\_ACCUMULATOR\_STAT\_EXTERN(STAT\_DwordAccumulator,StatId,STATGROUP\_TestGroup, CORE\_API)

\*

\* Updating counters.

\* INC\_DWORD\_STAT(StatId) - increases a dword stat by 1

\* DEC\_DWORD\_STAT(StatId) - decreases a dword stat by 1

\* INC\_DWORD\_STAT\_BY(StatId,Amount) - increases a dword stat by the specified value

\* DEC\_DWORD\_STAT\_BY(StatId,Amount) - decreases a dword stat by the specified value

\* SET\_DWORD\_STAT(StatId,Value) - sets a dword stat to the specified value

 

\* INC\_FLOAT\_STAT\_BY(StatId,Amount) - increases a float stat by the specified value

\* DEC\_FLOAT\_STAT\_BY(StatId,Amount) - decreases a float stat by the specified value

\* SET\_FLOAT\_STAT(StatId,Value) - sets a float stat to the specified value

\*

\*

\* A few helper methods

\* GET\_STATID(StatId) - returns an instance of the TStatId of the stat, ADVANCED

\* GET\_STATDESCRIPTION(StatId) - returns a description of the stat

\*

\*

\* If you don't want to use the stats system and just log some performance data, there is functionality for this.

\*

\* SCOPE\_SECONDS\_COUNTER(double&Seconds) - captures time passed in seconds, adding delta time to passed in variable

\*

\* Stats::Broadcast()

\* {

\* double ThisTime = 0;

\* {

\* SCOPE\_SECONDS\_COUNTER(ThisTime);

\* ...

\* // a piece of code

\* ...

\* }

\* UE\_LOG(LogTemp, Log, TEXT("Stats::Broadcast %.2f"), ThisTime );

\* }

\*

\* FScopeLogTime - utility class to log time passed in seconds, adding cumulative stats to passed in variable, print the performance data to the log in the destructor

\*

\* SCOPE\_LOG\_TIME(Name,CumulativePtr) - using the given name prints the performance data and gathers cumulative stats

\* SCOPE\_LOG\_TIME\_IN\_SECONDS(Name,CumulativePtr) - the same as above, but prints in seconds

\*

\* SCOPE\_LOG\_TIME\_FUNC() - using the funcion name prints the performance data, cannot be nested

\* SCOPE\_LOG\_TIME\_FUNC\_WITH\_GLOBAL(CumulativePtr), same as above, but gather cumulative stats

\*

\* A few examples.

\*

\* double GMyBroadcastTime = 0.0;

\* Stats::Broadcast()

\* {

\* SCOPE\_LOG\_TIME("Stats::Broadcast", &GMyBroadcastTime );

\* SCOPE\_LOG\_TIME\_IN\_SECONDS("Stats::Broadcast (sec)", &GMyBroadcastTime );

\* ...

\* // a piece of code

\* ...

\* }

\*

\* Stats::Condense()

\* {

\* SCOPE\_LOG\_TIME\_FUNC(); // The name should be "Stats::Condense()", may differ across compilers

\* SCOPE\_LOG\_TIME\_FUNC\_WITH\_GLOBAL(&GMyBroadcastTime);

\* ...

\* // a piece of code

\* ...

\* }

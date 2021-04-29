---
sortIndex: 4
sidebar: ue4guide
---

# Reflection System Details: Part 3

[Source](https://www.cnblogs.com/ghl_carmack/p/5746921.html)

The previous two articles introduced the support for reflection in Unreal Engine (if you haven't read the first two articles, I recommend that you take a closer look, otherwise you may not know what I'm talking about), but it's still a bit short That is, how this information is added to the runtime. After talking about it, this series is basically over, let's enter the text below.

Unreal Engine uses a series of static variables to register functions that need to generate reflection information. This has been covered in detail in our previous article. As for the benefits of using the generated C ++ code, I also talked about it in my translated article. I'll post it here.

> One of the biggest benefits of using generated C ++ code to store reflection data is that it guarantees synchronization with the binary. You will never load stale or outdated reflection data, because it is compiled with other engine code at the same time, and it will use C ++ expressions to calculate member offsets, etc. when the program starts, rather than by targeting specific platforms / Compiler / optimized combination for reverse engineering. UHT is built as a separate program that does not use any header files, so it also avoids the chicken and egg problem, which has been criticized in the Unreal 3 script compiler.

## UCLASS

For class reflection support, Unreal 4 is done in two steps.

1. IMPLEMENT_CLASS () This macro is used to register this class when the program starts, including generating UClass classes and registering C ++ native functions.
2. static FCompiledInDefer creates a static variable to add a registration function to the DeferredCompiledInRegistration static array to initialize the default reflection properties. Including functions, member variables, metadata, etc.

## USTRUCT

For structural support, the Unreal Engine 4 is also divided into two steps.

1. static FCompiledInDeferStruct stores a singleton function for constructing a structure, which is called when the program starts. The reader can check the code to know the process.
2. A static object will also be created. This object will call UScriptStruct :: DeferCppStructOps in the constructor, which is used to register a class that dynamically manages the structure construction and destruction of this DeferredCppStructOps map.

Enumeration is relatively simple, with only one step.

1. static FCompiledInDeferEnum creates a static variable for storing a singleton function that creates an enumerated reflection object when the program starts.

Above we explained the process of registering information, and their execution is performed with the loading of the current module. We all know that the initialization of static variables is performed before the Main function. Below we briefly draw the startup process of Unreal Editor so that we can accurately see the entire process of registering reflection information.

![Reflection Class Diagram](../../assets/UE4startup.png)

You can see that the void ProcessNewlyLoadedUObjects () function is our main concern. The registration information we mentioned earlier, including reflection information of classes, structures, and enumeration types, will be registered here. Its code is as follows:

```cpp
void ProcessNewlyLoadedUObjects ()
{
  DECLARE_SCOPE_CYCLE_COUNTER (TEXT ("ProcessNewlyLoadedUObjects"), STAT_ProcessNewlyLoadedUObjects, STATGROUP_ObjectVerbose);

#if WITH_HOT_RELOAD
  UClassGenerateCDODuplicatesForHotReload ();
#endif
  UClassRegisterAllCompiledInClasses ();

  while (AnyNewlyLoadedUObjects ())
  {
    UObjectProcessRegistrants ();
    UObjectLoadAllCompiledInStructs ();
    UObjectLoadAllCompiledInDefaultProperties ();
  }
#if WITH_HOT_RELOAD
  UClassReplaceHotReloadClasses ();
#endif
}
```

Below we give a simple explanation of the above code, the reader can also flip through the code to see how it is implemented.

1. The WITH_HOT_RELOAD macro in the code is used to handle the hot loading of C ++ code.
2. UClassRegisterAllCompiledInClasses () is used to register all the classes to be loaded. All the classes inside are added through the previous IMPLEMENT_CLASS () macro.
3. UObjectProcessRegistrants () is used to process automatically registered objects and add them to the ObjectArray for later retrieval.
4. UObjectLoadAllCompiledInStructs () is used to register structure and enumeration reflection information. The array in the array is registered with static objects created by FCompiledInDeferStruct and FCompiledInDeferEnum.
5. UObjectLoadAllCompiledInDefaultProperties () is used to register reflection information of the class and create a default object (CDO).

To this end, the three articles in this series show readers the implementation of the reflection system in Unreal by way of examples. The principle is actually very simple. There are also some methods on the Internet that support reflection classes in C ++. One, because of the help of UHT, we do not have to do a lot of dirty and tired work. For example, the most stupid way is to implement some macros to register various reflection information, but this is still relatively inefficient. Some implementation methods start with the debugging information generated by the compiler, such as the pdb file generated by vs, or the file generated by clang. This is also possible, but it has a relatively large problem that cross-platform support is not particularly friendly. . Therefore, this set of UHT tools in Unreal 4 is still very good in general. If you have time later, I hope to bring you an analysis of UHT tools. By the way, if you have anything you want to know about the Unreal 4 engine, please feel free to leave a comment below. I will also choose the modules that are more interesting for you to analyze first. Next, I may focus on the implementation of Blueprint in Unreal and the specific implementation of physical-based rendering. Stay tuned!

# CRT Initialization

* [Detailed how to override MSVC CRT's initialization](https://gist.github.com/vaualbus/622099d88334fbba1d4ae703642c2956)
* [DllMainCRTStartup](https://docs.microsoft.com/en-us/cpp/build/run-time-library-behavior?view=vs-2019)
* [https://stackoverflow.com/questions/1583193/what-functions-does-winmaincrtstartup-perform](https://stackoverflow.com/questions/1583193/what-functions-does-winmaincrtstartup-perform)
* [https://stackoverflow.com/questions/22934206/what-is-the-difference-between-main-and-maincrtstartup](https://stackoverflow.com/questions/22934206/what-is-the-difference-between-main-and-maincrtstartup)
* [https://stackoverflow.com/questions/36187320/maincrtstartup-vs-wmaincrtstartup](https://stackoverflow.com/questions/36187320/maincrtstartup-vs-wmaincrtstartup)
* [http://zetcode.com/gui/winapi/main/](http://zetcode.com/gui/winapi/main/)
* [https://internals.rust-lang.org/t/windows-does-rust-need-the-x86-x64-c-runtime-to-be-initalized/11581/7](https://internals.rust-lang.org/t/windows-does-rust-need-the-x86-x64-c-runtime-to-be-initalized/11581/7)
* [https://docs.microsoft.com/en-us/cpp/build/reference/entry-entry-point-symbol?view=vs-2019](https://docs.microsoft.com/en-us/cpp/build/reference/entry-entry-point-symbol?view=vs-2019)
* [https://docs.microsoft.com/en-us/cpp/build/run-time-library-behavior?view=vs-2019](https://docs.microsoft.com/en-us/cpp/build/run-time-library-behavior?view=vs-2019)
* [http://coderdreambook.blogspot.com/2013/11/md-vs-mt-options-to-use-run-time-library.html](http://coderdreambook.blogspot.com/2013/11/md-vs-mt-options-to-use-run-time-library.html)

## Default DLL entry point \_DllMainCRTStartup

In Windows, all DLLs can contain an optional entry-point function, usually called `DllMain`, that is called for both initialization and termination. This gives you an opportunity to allocate or release additional resources as needed.
Windows calls the entry-point function in four situations: process attach, process detach, thread attach, and thread detach. 

* *process attach* When a DLL is loaded into a process address space, either when an application that uses it is loaded, or when the application requests the DLL at runtime, the operating system creates a separate copy of the DLL data
* *Thread attach* occurs when the process the DLL is loaded in creates a new thread
* *Thread detach* occurs when the thread terminates, and *process detach* is when the DLL is no longer required and is released by an application. 

The operating system makes a separate call to the DLL entry point for each of these events, passing a *reason* argument for each event type. For example, the OS sends `DLL_PROCESS_ATTACH` as the *reason* argument to signal process attach.
The VCRuntime library provides an entry-point function called `_DllMainCRTStartup` to handle default initialization and termination operations

On process attach, the `_DllMainCRTStartup` function 

* sets up buffer security checks
* initializes the CRT and other libraries
* initializes run-time type information
* initializes and calls constructors for static and non-local data
* initializes thread-local storage, increments an internal static counter for each attach
* and then calls a user- or library-supplied `DllMain` 
  On process detach, the function goes through these steps in reverse. 
* It calls `DllMain`
* decrements the internal counter
* calls destructors
* calls CRT termination functions and registered `atexit` functions
* notifies any other libraries of termination
  When the attachment counter goes to zero, the function returns `FALSE` to indicate to Windows that the DLL can be unloaded. 
  The `_DllMainCRTStartup` function is also called during thread attach and thread detach. In these cases, the VCRuntime code does no additional initialization or termination on its own, and just calls `DllMain` to pass the message along
  If `DllMain` returns `FALSE` from process attach, signaling failure, `_DllMainCRTStartup` calls `DllMain` again and passes `DLL_PROCESS_DETACH` as the *reason* argument, then goes through the rest of the termination process.

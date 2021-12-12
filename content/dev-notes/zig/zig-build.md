# Zig Build

## Basics

Zig build scripts (usually named `build.zig`) are ordinary Zig programs with a special exported function (`pub fn build(b: *std.build.Builder) void`) utilizing [`std.build.Builder`](https://github.com/ziglang/zig/blob/master/lib/std/build.zig)
The build runner is invoked by `zig build` which in turn invokes  said `build.zig:build()`

* create DAG of `std.build.Step` nodes where each `Step`
  * executes a part of our build process
  * has a set of dependencies that need to be made before the step itself is made
  * user can invoke *named* steps by calling `zig build step-name` or predefined steps (e.g. `install`)
  * create with `Builder.step`:
    ````zig
    pub fn build(b: *std.build.Builder) void {
        const named_step = b.step("step-name", "This is what is shown in help");
    }
    ````

## Compiling Executable

### Source Compilation

`Builder` exposes `Builder.addExecutable` which will create us a new `LibExeObjStep`

* a convenient wrapper around `zig build-exe`, `zig build-lib`, `zig build-obj` or `zig test` depending on how it is initialized

* example:
  
  ````zig
  pub fn build(b: *std.build.Builder) void {
      const exe = b.addExecutable("fresh", "src/main.zig");
  
      const target = b.standardTargetOptions(.{});
      exe.setTarget(target);
  
      const mode = b.standardReleaseOptions();
      exe.setBuildMode(mode);
  
      const compile_step = b.step("compile", "Compiles src/main.zig");
      compile_step.dependOn(&exe.step);
  }
  ````

* create with `Builder.addExecutable` that will compile *main.zig* into *fresh/fresh.exe*

* add dependency graph with `compile_step.dependOn(&exe.step);`. This is how we build our dependency graph and declare that when `compile_step` is made, `exe` also needs to be made.

### Cross Compilation

* cross compilation is enabled by setting the target and build mode of our program:
  * `exe.setBuildMode(.ReleaseSafe);` will pass `-O ReleaseSafe` to the build invocation.
  * `exe.setTarget(...);` will set what `-target ...` will see.
* `Builder.standardReleaseOptions`/`Builder.standardTargetOptions`: convenience functions to make both the build mode and the target available as a command line option
  * invoke `zig build --help` to see command line options added by `standardTargetOptions` (first two) and `standardReleaseOptions` (rest)
    ````zig
    Project-Specific Options:
      -Dtarget=[string]           The CPU architecture, OS, and ABI to build for
      -Dcpu=[string]              Target CPU features to add or subtract
      -Drelease-safe=[bool]       Optimizations on and safety on
      -Drelease-fast=[bool]       Optimizations on and safety off
      -Drelease-small=[bool]      Size optimizations on and safety off
    ````
  
  * example command line:
    ````zig
    zig build -Dtarget=x86_64-windows-gnu -Dcpu=athlon_fx
    zig build -Drelease-safe=true
    zig build -Drelease-small
    ````

### Installing Artifacts

Installation involves making a step on the `install` step of the `Builder`

* `install` step always created and accessed via `Builder.getInstallStep()`

* `InstallArtifactStep` is build step responsible for copying exe artifact to install directory
  
  ````zig
  pub fn build(b: *std.build.Builder) void {
      const exe = b.addExecutable("fresh", "src/main.zig");
  
      const install_exe = b.addInstallArtifact(exe);
      b.getInstallStep().dependOn(&install_exe.step);
  }
  ````

This will now do several things:

* `b.addInstallArtifact` creates a new `InstallArtifactStep` that copies the compilation result of `exe` to `$prefix/bin` (usually `zig-out`)
* `InstallArtifactStep` (implicitly) depends on `exe` so will build `exe` as well
* invoke by `zig build install` (or just `zig build` for short)
* uninstall the artifact by invoking `zig build uninstall`
  * the `InstallArtifactStep` registers the output file for `exe` in a list that allows uninstalling it again
  * ***NOTE:*** deletes all files created by `zig build install`, but **not** directories!
* Other helper functions
  * `b.installArtifact(exe)/exe.install()`: convenience functions to wrap above steps. Ex:
    ````zig
    pub fn build(b: *std.build.Builder) void {
        const exe = b.addExecutable("fresh", "src/main.zig");
        b.installArtifact(exe);  //    Helper 1
        exe.install();           // OR Helper 2
    }
    ````
  
  * `Builder.installFile/installDirectory/etc`: install other types of artifacts

### Running Applications

Can run programs from build script for convenience

* usually exposed via a `run` step that can be invoked via `zig build run`
  
  ````zig
  pub fn build(b: *std.build.Builder) void {
      const exe = b.addExecutable("fresh", "src/main.zig");
  
      const run_step = std.build.RunStep.create(exe.builder, "run fresh");
      run_step.addArtifactArg(exe);
  
      const step = b.step("run", "Runs the executable");
      step.dependOn(&run_step.step);
  }
  ````

* `std.build.RunStep` runs any executable on the system
  
  * `RunStep.addArg` will add a single string argument to argv.
  
  * `RunStep.addArgs` will add several strings at the same time
  
  * `RunStep.addArtifactArg` will add the result file of a `LibExeObjStep` to argv
  
  * `RunStep.addFileSourceArg` will add any file generated by other steps to the argv
  
  * ***NOTE:*** first argument must be the path to the executable we want to run. In this case, we want to run the compiled output of `exe`
  
  * ***NOTE:*** `RunStep` runs executable in the compile cache directory, not install directory (e.g. `./zig-cache/o/b0f56fa4ce81bb82c61d98fb6f77b809/fresh` vs `zig-out/bin/fresh`)
  
  * `exe.run()`: helper convenience function for above
    
    ````zig
    pub fn build(b: *std.build.Builder) void {
        const exe = b.addExecutable("fresh", "src/main.zig");
    
        const run_step = exe.run();
    
        const step = b.step("run", "Runs the executable");
        step.dependOn(&run_step.step);
    }
    ````
  
  * `Builder.args` contains command line args that can be passed to process. Ex:
    
    ````zig
    pub fn build(b: *std.build.Builder) void {
        const exe = b.addExecutable("fresh", "src/main.zig");
        const run_step = exe.run();
        if (b.args) |args| { run_step.addArgs(args); }
        const step = b.step("run", "Runs the executable");
        step.dependOn(&run_step.step);
    }
    ````
    
    ````batch
    zig build run -- -o foo.bin foo.asm
    ````

## Recipes

### Link zig library

* Use `LibExeObjStep.addPackage/addPackagePath` with a `Pkg{ .name = "library", .path = "/path/to/the/library"}`.
* use `const library = @import("library");` in your root source file

### Use a native (C) library

* Use `LibExeObjStep.linkSystemLibrary()` with your library's name
* `@cInclude()` in your source code

### Use a native (C++) library

* use `LibExeObjStep.linkSystemLibrary("c++");`

### Use build-time custom command line flags (`-Dsomething`)

* Use `LibExeObjStep.addBuildOption()` to add a value to the `build_options` package
* To get this value from the building user, use `Builder.option()`
* Supported types for `option` are Strings and Enums (`-Dname=value` style), Booleans (`-Dname`, `-Dname=true`, `-Dname=false` style) and list of strings (`-Dname=value -Dname=value2` style)
* Use from your source code like `const should_do_thing = @import("build_options").do_thing;`

### Run commands as build steps

* Use `Builder.addSystemCommand()` to get a step that runs your command
* create a top level step using `b.step()`
* make the top level step depend on your run step using `top.dependOn(&run.step)`

### Generate documentation

* Use `Builder.addTest()` to get a step that will test your program that we will call `test_doc`
* make it emit documentation using `test_doc.emit_docs = true;`
* make it stop emitting binary files using `test_doc.emit_bin = false`
* finally set the output directory to some folder using for example `test_doc.output_dir = "docs"`
* create a top level step using `b.step()`
* make that newly created step depends on documentation step using `doc_step.dependOn(&test_doc.step)`

## Internals

### Overview

* `std.build.Builder`: representing a pending build and a DAG of all of its associated steps and their respective settings
* `build.zig:pub fn build(b: *Builder) void` is responsible for adding the custom build logic for module to said Builder
* invoking `zig build` does under the hood is building and running [lib/std/special/build_runner.zig](https://github.com/ziglang/zig/blob/master/lib/std/special/build_runner.zig),
  * just a normal Zig application with `pub fn main()` and all the things you might already know from your actual project
  * `build_runner` imports your project's `build.zig` (it does this with a magic `@import("@build")`)
  * somewhere in its belly invokes your `pub fn build(b: *Builder)` on a `Builder` it created earlier
  * The very last thing it does is hand over to this `Builder` you got to modify using `make()`
* the main workhorse is `LibExeObjStep.make` which spawns the actual zig compiler (e.g. `zig build-exe/zig build-lib/zig cc`) with the builder/step settings converted as command line args

### std.build.Builder

The core build graph coordinator. Main purpose:

* Coordinate and execute `Step`s that describe different stages of a build
* Provide default target and release mode for `Step`s
* Provide `build_options`

### std.build.Step

the base node in the build DAG

* two noteworthy properties:
  * `makeFn`: does the actual work which implementing this step entails
  * `dependencies`: an `ArrayList` of different `Step`s that must be executed before this one (though that isn't handled by `Step` itself)
* you'll mostly use structs that wrap a bare `Step`
  * `BuildExeObjStep`: this is the big one that actually does all of the compiling work
  * `LogStep`: very simple step that writes something to stderr
  * `RunStep`: which runs a system command
  * these are usually constructed with one of many convenience methods on `Builder` like `builder.addTranslateC(std.build.FileSource)`
  * to get a quick overview of them, grep for `pub fn add` while in the source file

### std.build.LibExeObjStep

main step capable of invoking the zig compiler on your sources and turning them into executables or shared objects/DLLs

* usually constructed with one of `Builder`s `addX` methods and then its myriad settings modified
* finally call `install()` to create a build artifact in `./zig-cache/bin` (this path is also adjustable using `setOutputDir`)
* can also use a `LibExeObjStep` to run your tests as done in the [default build.zig for libraries](https://github.com/ziglang/zig/blob/master/lib/std/special/init-lib/build.zig)

### std.zig.CrossTarget

defines project Build Targets

* `build.zig` template exposes the full power of Zig's cross-compiling to the building user
* use `LibExeObjStep.setTarget(std.CrossTarget)` to set targets
* easiest way is calling it with [`std.CrossTarget`](https://github.com/ziglang/zig/blob/master/lib/std/zig/cross_target.zig)`.parse(std.CrossTarget.ParseOptions)` to get a interface reminiscent of the `-target` CLI option
  * The `ParseOptions` struct is fairly well documented in the source.
  * `Builder.standardTargetOptions()` is convenience wrapper around `std.CrossTarget.parse()`

### build_options

provide compile-time configuration to your code

* the build system can create a package called `build_options` to communicate values from `build.zig` to your project's source code
* declarations are populated by calling `LibExeObjStep.addBuildOption(type, name, value)` in your build.zig
* can provide user input for these in form of `-Dname=value` flags.
* can get the value a user provided (or `null` if they didn't, so use `orelse` on anything you get from this) using `Builder.option(type, name, description)`

## Translate-C

### Incrementally Porting C App Series

* [Incrementally Porting C App: Part1](https://www.youtube.com/watch?v=xg7EZNf7cmE)
* [Incrementally Porting C App: Part2](https://www.youtube.com/watch?v=zAd3LDe6A-4)
* [Incrementally Porting C App: Part3](https://www.youtube.com/watch?v=t1n_1-bVpEI)
* [Incrementally Porting C App: Part4](https://www.youtube.com/watch?v=tl-7oxLQEDY)

## Reference

* [Zig Build Explained: Part I](https://zig.news/xq/zig-build-explained-part-1-59lf)
* [Zig Build Explained: Part II](https://zig.news/xq/zig-build-explained-part-2-1850)
* [Zig Build System Wiki Entry](https://github.com/ziglang/zig/wiki/Zig-Build-System)
* Relevant source files
  * [std/build.zig](https://github.com/ziglang/zig/blob/master/lib/std/build.zig) for `Builder`, `LibExeObjStep` and some other steps
  * [std/build/](https://github.com/ziglang/zig/tree/master/lib/std/build) for various other steps
  * [std/special/init-exe/build.zig](https://github.com/ziglang/zig/blob/master/lib/std/special/init-exe/build.zig) for the default application build.zig template
  * [std/special/init-lib/build.zig](https://github.com/ziglang/zig/blob/master/lib/std/special/init-exe/build.zig) for the default library build.zig template
  * [std/special/build_runner.zig](https://github.com/ziglang/zig/blob/master/lib/std/special/build_runner.zig) for the file executed when you run `zig build`

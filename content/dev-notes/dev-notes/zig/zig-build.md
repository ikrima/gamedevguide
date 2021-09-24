# Zig Build

## Basics

Zig toolchain compiles a Zig program (`build.zig`) that has special exported function (`pub fn build(b: *std.build.Builder) void`) invoked by `zig build`

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

## Reference

[Zig Build Explained: Part I](https://zig.news/xq/zig-build-explained-part-1-59lf)
[Zig Build Explained: Part II](https://zig.news/xq/zig-build-explained-part-2-1850)

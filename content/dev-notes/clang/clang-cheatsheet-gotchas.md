# Clang Cheat Sheet/Gotchas

## Misc Gotchas

- Compile c file as c++: `clang -xc++ "filename" -std=c++14`
  - note `-xc++` must come before file list
  - `clang` driver won't automatically link C++ stdlib; must pass `-stdlib=libc++`
- Treating `.h` files as C++ headers (to get around `#pragma once` warning)
  - pass `-xc++-header` 
  - for `clang-cl`, `/clang:-xc++-header`
  - _**NOTE:**_ don't pass `-xc++` and `-xc++-header`
  - _**NOTE:**_ might have ordering issues in `compile_commands.json` so be sure to use --
  - Additional info
    - [https://github.com/clangd/clangd/issues/777](https://github.com/clangd/clangd/issues/777)
    - [https://github.com/clangd/clangd/issues/555](https://github.com/clangd/clangd/issues/555)
    - [Compile C++ header files with clang-cl that have a .h extension](https://stackoverflow.com/questions/59429667/can-you-compile-c-header-files-with-clang-cl-that-have-a-h-extension)

# Symbol Server For Windows Debuggers

## Symbol Paths

`dbghelp.dll` takes a `;` delimited path list to locate symbol files

### Default Search Paths

- `_NT_SYMBOL_PATH` environment variable
- `_NT_ALT_SYMBOL_PATH` environment variable
- directory that contains the corresponding module

### Standard Directory Path

- syntax: `[DirPath]`
- points to standard windows path; can be on a share/remote
- search order is:
  - `[DirPath]`: looks for symbol file in immediate path
  - `[DirPath]/[moduleExtension]`: then path subdirectory based on module's file extension e.g. `[DirPath]/dll`, `[DirPath]/exe`, `[DirPath]/sys`
  - `[DirPath]/symbols/[moduleExtension]`: finally attempts hardcoded lookup in `[DirPath]/symbols` subdirectory e.g. `[DirPath]/symbols/dll`, `[DirPath]/symbols/exe`, `[DirPath]/symbols/sys`
- Ex: `[DirPath] := C:\foo\app`, `Module := bar.dll` results in these lookups
  - `C:\foo\app`
  - `C:\foo\app\dll`
  - `C:\foo\app\symbols\dll`

### Symbol Cache Path

- syntax: `CACHE*[CachePath]`
- points to standard windows path but treated as a cache repository
- searched like normal directory
- if symbol's not found in cache but found in subsequent path in the chain, then symbol is copied and stored at in the cache location
- 

### Symbol Server Path

- _**Symbol Server:**_ coordinates with debugger to deliver symbol files for specific binary from _symbol stores_; `SymSrv` is default MS implementation

- _**Symbol Stores:**_ centralized symbol file collection uniquely indexed w.r.t module binary; `SymStore`  is default MS implementation

- can contain any number of symbol files, corresponding to any number of programs or operating systems
  
  - can also contain binary files, which are particularly useful when debugging minidump files.
- `SRV*[SymStore]*SRV*[SymStore1]*SRV*[SymStoreN]`: list of symbol store locations delimited by `*` that _symbol server_ uses to locate symbol
  
  - 
     > 
     > \[!note\] `SRV*` prefix is assumed if path points to symbol store
     > If `SRV*` prefix is missing but path points to a symbol server store, path is still treated as Symbol Server Path and `SRV*` is assumed
     > Symbol handler uses `pingme.txt` file in path's root directory to demarcate _symbol servers_ from normal folders
  
  - max 10 symbol stores after the "SRV\*" prefix
- precedence is from left/_downstream stores_ to right/_upstream stores_

- `SymSrv` searches from leftmost to rightmost symbol store until it finds a match

- on match, `SymSrv` copies the file to **every** downstream store and opens _always_ it from the leftmost store

### Symbol Store Types

- _**`C:\local\cache` store:**_ path to a directory on the client machine

- _**`<blank>` store:**_ two asterisks without text in-between (`**`) indicate _default downstream store_; default value is `[CallingAppDir]\sym`

- _**`\\server\share` store:**_ fully qualified UNC path to a share on a remote server

- _**`http://foo.app` store:**_ url to HTTP-based symbol hosting server
  
  - 
     > 
     > \[!danger\] HTTP stores must be rightmost in a store list
     > HTTP-based stores are read-only; this means `SymSrv` can't copy symbols located an upstream store downstream to the HTTP store
     > This usually results in silent errors because the because of the broken symbol store chain
  
  - 
     > 
     > \[!danger\] HTTP-based store cannot be the only store on the list
     > Symbol handler can't open a file on a website; if `SymSrv` encounters this, it attempts recovery by force copying to the default downstream store and opening from there
     > This may cause performance issues or silent failures if the `SymSrv` the downstream copy to the default store failes

## SymSrv Examples

- use symbols from remote share:                                                       `SRV*\\buildsShare\fooSymbols`
- copy symbols from remote to local folder: C:\localSymbols:                           `SRV*C:\localSymbols*\\buildsShare\fooSymbols`
- copy symbols from remote to default downstream store, usually `C:\debuggers\sym`:    `SRV**\\buildsShare\fooSymbols`
- use multiple stores with cascading downstream copy: `SRV*C:\localSymbols*\\nearbyServer\store*https://DistantServer`
  - `SymSrv` searches `C:\localSymbols`;       if found, return local file path
  - `SymSrv` searches `\\nearbyServer\store`;  if found, copy file to `C:\localSymbols`, return local file path e.g. `C:\localSymbols\bar.pdbg`
  - `SymSrv` searches `https://DistantServer`; if found, copy file to `\\nearbyServer\store` **_and_** `C:\localSymbols`

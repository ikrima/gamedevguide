# Windows File Paths

## File Paths Formats

### Traditional DOS Path

- standard DOS path can consist of three components:
  
  - `volume`/`drive letter` + `volume separator` (i.e. `:`)
  - `directory name`: `directory separator` (i.e. `\`,`/`) delimits nested subdirectories
  - optional `filename`: `directory separator` separates `file path` vs `filename`
- qualification
  
  - `absolute`: all three components are present
  - `relative to current drive root`: no volume/drive letter is specified and directory name begins with `directory separator`
  - `relative to current directory`: all other cases
  |Dos Path Example|Description|
  |----------------|-----------|
  |`C:\Documents\Newsletters\Summer2018.pdf`|An absolute file path from the root of drive `C:`.|
  |`\Program Files\Custom Utilities\StringFinder.exe`|A relative path from the root of the current drive.|
  |`2018\January.xlsx`|A relative path to a file in a subdirectory of the current directory.|
  |`..\Publications\TravelBrochure.pdf`|A relative path to a file in a directory starting from the current directory.|
  |`C:\Projects\apilibrary\apilibrary.sln`|An absolute path to a file from the root of drive `C:`.|
  |`C:Projects\apilibrary\apilibrary.sln`|A relative path from the current directory of the `C:` drive.|

### UNC Path

- has following format
  
  - `\\` + `server/host name`; name can be `NetBIOS` machine name/`IPv4`/`IPv6`/`FQDN` address
  - `\` + `share name`; the volume is defined by combining `server` + `share name`
  - `directory name`: `directory separator` delimits nested subdirectories
  - optional `filename`: `directory separator` separates `file path` vs `filename`
- must always be fully qualified; any relative directory segments (i.e. `.`,`..`) must be part of fully qualified path
  
  |UNC Path Example|Description|
  |----------------|-----------|
  |`\\system07\C$\`|The root directory of the `C:` drive on `system07`.|
  |`\\Server2\Share\Test\Foo.txt`|The `Foo.txt` file in the Test directory of the `\\Server2\Share` volume.|

### Device Path

- windows has a unified object model that points to all resources, including files
  
  - object paths exposed to the Win32 layer through special folders of symbolic links that legacy DOS and UNC paths are mapped to
  - `\\?\`: `Win32 file namespaces` special folder e.g. `\\.\C:\Test\Foo.txt`
    - tells the Windows APIs to disable all string parsing and to send subsquent string straight to the file system
    - this also turns off automatic expansion of the path string
    - allows you to do
      - exceed `MAX_PATH` limits usually enforced by the Windows APIs (assuming file system supports large paths)
      - use `..`,`.` in path names which can be useful if attempting to perform operations on file with illegal qualified path
  - `\\.\`: `Win32 device namespaces` special folder e.g. `\\?\C:\Test\Foo.txt`
    - direct access to physical device, disk, or volume disks and volumes; bypasses filesystem
    - ex: `CreateFile` with `\\.\PhysicalDrive1`,`\\.\CdRomX`
    - 
       > 
       > \[!danger\] only use `\\.\` prefix to access devices only and not files; most APIs won't support it
  
  - or by a volume's GUID
    `\\.\Volume{b75e2c83-0000-0000-0000-602f00000000}\Test\Foo.txt`
    `\\?\Volume{b75e2c83-0000-0000-0000-602f00000000}\Test\Foo.txt`
- `DOS device path` consists of:
  
  - `device path specifier`: i.e. `\\.\` or `\\?\`
  
  - symbolic link to the "real" device object (e.g. `C:` for drive name, `Volume{b75e2c83-0000-0000-0000-602f00000000}` for volume GUID)
    
    - first path segment after the `device path specifier` identifies the volume or drive (e.g. `\\?\C:\` or `\\.\BootPartition\`.)
    - `UNC`: specific link for `UNC paths`
      `\\.\UNC\Server\Share\Test\Foo.txt`
      `\\?\UNC\Server\Share\Test\Foo.txt`
- for `UNC device paths`, the `server`+`share segments` form the `volume`
  
  - e.g. `\\?\server1\e:\utilities\\filecomparer\`, the `server/share portion` is `server1\utilities`
  - means it's never possible to navigate past the volume with relative `directory segments`
- `DOS device path` is fully qualified by definition

### Example Paths

These all point to the same file

- `c:\temp\test-file.txt`
- `\\127.0.0.1\c$\temp\test-file.txt`
- `\\LOCALHOST\c$\temp\test-file.txt`
- `\\.\c:\temp\test-file.txt`
- `\\?\c:\temp\test-file.txt`
- `\\.\UNC\LOCALHOST\c$\temp\test-file.txt`
- `\\127.0.0.1\c$\temp\test-file.txt`

## Path Normalization

- Identifies path type
  
  |Path Type|Identification|
  |---------|--------------|
  |`device path`|begin with `\\?` or `\\.`|
  |`UNC path`|begin with `\\`|
  |`fully qualified DOS path`|begin with `drive letter`+`volume separator`+`component separator` .e. `C:\`|
  |`legacy device`|e.g. `CON`, `LPT1`|
  |`relative to current drive root`|begin with single component separator `\`|
  |`relative to specific drive current directory`|begin with `drive letter`+`volume separator` without `component separator` e.g. `C:`|
  |`relative to current directory`|everything else e.g. `temp\testfile.txt`|

- Applies the current directory to partially qualified (relative) paths

- Canonicalizes component and directory separators

- Evaluates relative directory components (. for the current directory and .. for the parent directory)

- Trims certain characters

## References

- [.Net API Reference](https://learn.microsoft.com/en-us/dotnet/standard/io/file-path-formats)
- [Win32 API Reference](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file)
- [Definitive Guide on Win32 to NT Path Conversion](https://googleprojectzero.blogspot.com/2016/02/the-definitive-guide-on-win32-to-nt.html)

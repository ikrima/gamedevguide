---
sortIndex: 1
---

## Debugging:

```cpp
import pprint

pprint.pprint(randomObj.\_\_dict\_\_)          =>     Prints all the attributes & their values in an object

dir(randomObj)                                   =>     enumerates attributes & methods in an object

inspect(module)                                 =>     Allows you to inspect a module
```

## Import statements:

Absolute vs. Relative Import

- An absolute import uses the full path (starting from the project’s root folder) to the desired module to import.

- A relative import uses the relative path (starting from the path of the current module) to the desired desired module to import. There are two types of relative imports:

  - explicit relative import follows the format from .&lt;module/package> import X, where &lt;module/package> is prefixed by dots . that indicate how many directories upwards to traverse. A single dot . corresponds to the current directory; two dots .. indicate one folder up; etc.

  - Implicit: deprecated. Don't use


- Use absolute imports rooted at the test/ directory (i.e. middle column in the table above). This guarantees that running start.py directly will always work. In order to run a2.py directly, we can modify sys.path in a2.py to include test/packA/, before sa2 is imported.

```cpp
 import os, sys

 sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
```

## Now this works, even when a2.py is run directly

 from packA.subA import sa2

<https://chrisyeh96.github.io/2017/08/08/definitive-guide-python-imports.html>

### Logging:

```cpp
print("")

import os

os.environ\['HOME'] will retrieve the environment variable. os.environ is a dictionary

os.environ.get('KEY') will return None if the key doesn't exist instead of raising KeyError
```

### Directory Traversal:

<http://www.diveintopython.net/file_handling/os_module.html>

<https://docs.python.org/2/library/filesys.html>

You can use glob:

```cpp
import glob 
import os 
os.chdir("/mydir")for file in glob.glob("*.txt"): 
print file

or simply os.listdir:

import os 
for file in os.listdir("/mydir"): 
if file.endswith(".txt"): 
print file

or if you want to traverse directory:

import os 
for root, dirs, files in os.walk("/mydir"): 
for file in files: 
if file.endswith(".txt"):

print os.path.join(root, file)


List immediate child subdirectories:

next(os.walk('.')) [1]
```

*Reference From <https://stackoverflow.com/questions/973473/getting-a-list-of-all-subdirectories-in-the-current-directory>*

### Convert Path:

#### Renaming Script in directory and append number based on name sort order:

```cpp
import os, glob

files = glob.glob('/Users/ikrima/src/MythlyRepos/CineX/Photogrammetry/CineX/TAJA/Distortion/renames/*.tif')

files.sort()

for i in xrange(0, len(files)):

filename,ext = os.path.splitext(os.path.basename(files[i]))

os.rename(files[i], os.path.join(os.path.dirname(files[i]), filename + ".%07d" % i + ext))
```

#### Executing shell commands

```cpp
os.system("some_command with args")
```

*Reference From <http://stackoverflow.com/questions/89228/calling-an-external-command-in-python>*

```cpp
import subprocess

proc = subprocess.Popen(\["cat", "/tmp/baz"], stdout=subprocess.PIPE) 
(out, err) = proc.communicate() 
print "program output:", out
```

#### Directory/Filesystem Traversal:

```cpp
os.chdir()/os.getcwd()
```

<https://docs.python.org/2/library/os.html#os-file-dir>

#### Object as dictionary:

```cpp
obj = Foo()

dict(obj)
```

#### Unzip List of Tuples:

```cpp
zipper_list = [(1, 'a'), (2, 'b'), (3, 'c')]

list_a, list_b = zip(*zipper_list)
```

| Strings:                             |             |
| :----------------------------------- | ----------- |
| Unicode string                       | u'bla'      |
| Unescaped                            | r'bla\\d'   |
| String interpolation with formatting | f'{bla:10}' |

#### String Formatting:

f'This is inline string interpolation {bla:10}'

Examples:

```cpp
f'{a:02}' => '01'S
```

<https://www.programiz.com/python-programming/methods/string/format#numbers>

The general form of a standard format specifier is:

```cpp
[[fill]align] [sign] [#] [0] [minimumwidth] [.precision] [type]
```

*Reference From <https://www.python.org/dev/peps/pep-3101/#standard-format-specifiers>*

[\[fill\]align][sign] [#][0] [width][,] [.precision][type] 
where, the options are 
fill ::= any character 
align ::= "&lt;" | ">" | "=" | "^" 
sign ::= "+" | "-" | " " 
width ::= integer 
precision ::= integer 
type ::= "b" | "c" | "d" | "e" | "E" | "f" | "F" | "g" | "G" | "n" | "o" | "s" | "x" | "X" | "%"

*Reference From <https://www.programiz.com/python-programming/methods/built-in/format>*

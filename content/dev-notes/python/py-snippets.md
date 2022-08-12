# Python Snippets

## Debug

Debug module imports and show what is importing the current module

* If it says `<importlib frozen>`, then it means the import came from `importlib.reload(..)`

````python
import inspect
print(inspect.getframeinfo(inspect.getouterframes(inspect.currentframe())[1][0])[0])
````

## Enums

* declare
  ````python
  from enum import Enum, auto
  class DbgCmdType(Enum):
      Standalone = auto()
      Toggle     = auto()
      IntRange   = auto()
      FloatRange = auto()
      String     = auto()
      ComboBox   = auto()
  ````

* iterate over enums
  ````python
  ((targetTypeEnum.name,targetTypeEnum.value) for targetTypeEnum in UE4TargetType)
  ````

## Type Checking

* exact: `type(py_obj) is list`
* inheritance Checking: `isinstance(py_obj, SWidget)`

## Dictionary

* \``dict.get(key\[, default\])\`: get with optional default fallback

* merge dictionary
  
  ````python
  x = dict(a=1, b=2)
  y = dict(b=3, d=4)
  z = {**x, **y}
  # z := {'a': 1, 'b': 3, 'd': 4}, note that value for `b` is taken from the latter dict.
  ````

## Lists

* unzip or transpose list of tuples
  ````python
  original = [('a', 1), ('b', 2), ('c', 3), ('d', 4)]
  zip(*original) => (['a', 'b', 'c', 'd'], [1, 2, 3, 4])
  ````

* unzip list of Tuples:
  ````python
  zipper_list = [(1, 'a'), (2, 'b'), (3, 'c')]
  list_a, list_b = zip(*zipper_list)
  ````

* flatten list
  ````python
  a_list = [[1, 2], [3, 4], [5, 6]]
  print(list(itertools.chain.from_iterable(a_list))) # Output: [1, 2, 3, 4, 5, 6]
  print(list(itertools.chain(*a_list))) # Output: [1, 2, 3, 4, 5, 6]
  [*[1,2],*[3]] # Output: [1,2,3]
  ````

## List Comprehensions

* nested list comprehensions
  ````python
  # Just think in for-loops syntax. So, If I used for loops for the previous flattening, I’d do something like:
  [y for x in non_flat for y in x]
  # equiv to:
  for x in non_flat:
    for y in x:
      y
  ````

## Environment

* Registry updating
  
  ````python
  from winregistry import WinRegistry
  reg = WinRegistry()
  regPath = r"HKLM\System\CurrentControlSet\Control\Session Manager\Environment"
  return reg.read_value(regPath, envVarName)['data']
  regPath = r"HKCU\Environment"
  reg.write_value(regPath, envVarName, value, valTypeStr)['data']
  ````

* get or set environment variables on windows
  
  ````python
  klcommon.getSysEnvVar(envVarName)
  klcommon.setSysEnvVar(envVarName, value, valTypeStr='REG_EXPAND_SZ')
  klcommon.getUserEnvVar(envVarName)
  klcommon.setUserEnvVar(envVarName, value, valTypeStr='REG_EXPAND_SZ')
  ````

* Python interpreter version number
  
  ````python
  import sys
  sys.version_info
  print(sys.version)
  print(sys.executable)
  import os
  print(os.__file__)
  ````

## Path Manipulations

* convert to relative
  ````python
  ue4_asset_dir = '/Game/' + Path(os.path.relpath(capself.animAssetDirPicker.get_directory(), ue.get_content_dir()))
  ````

* normalize path
  ````python
  Path('../mydir').absolute()
  ````

* convert to forward slashes only
  ````python
  Path(...).as_posix()
  ````

* join paths together
  ````python
  Path('/engine')  / Path('/content')
  ````

## Directory

* list directory contents
  ````python
  import os
  for file in os.listdir("/mydir"):
    if file.endswith(".txt"):
      print(file)
  ````

* list directory contents with filter
  ````python
  import os
  import glob
  os.chdir("/mydir")
  for file in glob.glob("*.txt"):
    print(file)
  ````

* iterate directory hierarchy
  ````python
  import os
  for root, dirs, files in os.walk("/mydir"):
    for file in files:
      if file.endswith(".txt"):
        print os.path.join(root, file)
  ````

* list immediate child subdirectories
  ````python
  next(os.walk('.'))[1]
  ````

* References
  * <http://www.diveintopython.net/file_handling/os_module.html>
  * <https://docs.python.org/2/library/filesys.html>
  * <https://stackoverflow.com/questions/973473/getting-a-list-of-all-subdirectories-in-the-current-directory>

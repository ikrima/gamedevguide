## **Debugging:**

import pprint

pprint.pprint(randomObj.\_\_dict\_\_)          =&gt;     Prints all the attributes & their values in an object

dir(randomObj)                                   =&gt;     enumerates attributes & methods in an object

inspect(module)                                 =&gt;     Allows you to inspect a module

## **Import statements:**

Absolute vs. Relative Import

- An absolute import uses the full path (starting from the project’s root folder) to the desired module to import.

- A relative import uses the relative path (starting from the path of the current module) to the desired desired module to import. There are two types of relative imports:

  - explicit relative import follows the format from .&lt;module/package&gt; import X, where &lt;module/package&gt; is prefixed by dots . that indicate how many directories upwards to traverse. A single dot . corresponds to the current directory; two dots .. indicate one folder up; etc.

  - Implicit: deprecated. Don't use

* Use absolute imports rooted at the test/ directory (i.e. middle column in the table above). This guarantees that running start.py directly will always work. In order to run a2.py directly, we can modify sys.path in a2.py to include test/packA/, before sa2 is imported.

​ import os, sys

​ sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(\_\_file\_\_))))

​ \# now this works, even when a2.py is run directly

​ from packA.subA import sa2

<https://chrisyeh96.github.io/2017/08/08/definitive-guide-python-imports.html>

### **Logging:**

print("")

import os

os.environ\['HOME'\] will retrieve the environment variable. os.environ is a dictionary

os.environ.get('KEY') will return None if the key doesn't exist instead of raising KeyError

### **Directory Traversal:**

<http://www.diveintopython.net/file_handling/os_module.html>)

<https://docs.python.org/2/library/filesys.html>

You can use glob:

import glob  
import os  
os.chdir("/mydir")for file in glob.glob("\*.txt"):  
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

next(os.walk('.'))\[1\]

_From &lt;<https://stackoverflow.com/questions/973473/getting-a-list-of-all-subdirectories-in-the-current-directory>&gt;_

### **Convert Path:**

#### **Renaming Script in directory and append number based on name sort order:**

import os, glob

files = glob.glob('/Users/ikrima/src/MythlyRepos/CineX/Photogrammetry/CineX/TAJA/Distortion/renames/\*.tif')

files.sort()

for i in xrange(0, len(files)):

filename,ext = os.path.splitext(os.path.basename(files\[i\]))

os.rename(files\[i\], os.path.join(os.path.dirname(files\[i\]), filename + ".%07d" % i + ext))

#### **Executing shell commands**

os.system("some_command with args")

_From &lt;<http://stackoverflow.com/questions/89228/calling-an-external-command-in-python>&gt;_

import subprocess

proc = subprocess.Popen(\["cat", "/tmp/baz"\], stdout=subprocess.PIPE)  
(out, err) = proc.communicate()  
print "program output:", out

#### **Directory/Filesystem Traversal:**

os.chdir()/os.getcwd()

<https://docs.python.org/2/library/os.html#os-file-dir>

#### **Object as dictionary:**

obj = Foo()

dict(obj)

#### **Unzip List of Tuples:**

zipper_list = \[(1, 'a'), (2, 'b'), (3, 'c')\]

list_a, list_b = zip(\*zipper_list)

Strings:

<table><thead><tr class="header"><th>Unicode string</th><th>u'bla'</th></tr></thead><tbody><tr class="odd"><td>Unescaped</td><td>r'bla\d'</td></tr><tr class="even"><td>String interpolation with formatting</td><td>f'{bla:10}'</td></tr></tbody></table>

#### **String Formatting:**

f'This is inline string interpolation {bla:10}'

Examples:

f'{a:02}' =&gt; '01'S

<https://www.programiz.com/python-programming/methods/string/format#numbers>

The general form of a standard format specifier is:

\[\[fill\]align\]\[sign\]\[\#\]\[0\]\[minimumwidth\]\[.precision\]\[type\]

_From &lt;<https://www.python.org/dev/peps/pep-3101/#standard-format-specifiers>&gt;_

\[\[fill\]align\]\[sign\]\[\#\]\[0\]\[width\]\[,\]\[.precision\]\[type\]  
where, the options are  
fill ::= any character  
align ::= "&lt;" | "&gt;" | "=" | "^"  
sign ::= "+" | "-" | " "  
width ::= integer  
precision ::= integer  
type ::= "b" | "c" | "d" | "e" | "E" | "f" | "F" | "g" | "G" | "n" | "o" | "s" | "x" | "X" | "%"

_From &lt;<https://www.programiz.com/python-programming/methods/built-in/format>&gt;_

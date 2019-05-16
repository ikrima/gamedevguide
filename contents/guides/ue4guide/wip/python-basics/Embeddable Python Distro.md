Bundling/Creating custom python distribution (Embeddable zip or not). Also known as "freezing" a python distro:

<https://docs.python-guide.org/shipping/freezing/>

## **Python embedded distribution for Windows**

Jul 15, 2018

Python is available as an [[embedded distribution for Windows]](https://docs.python.org/3.7/using/windows.html#embedded-distribution). The distribution is a minimal, isolated build for redistribution as part of another application.

These are my notes to install third-party packages for this version of Python using [[pip]](https://pip.pypa.io/en/stable/). This worked for both the 32-bit and 64-bit versions of Python 3.7.

1.  Download and extract either the 32-bit or 64-bit version of the embedded distribution (the ‘embeddable zip file’) from the [[Python website]](https://www.python.org/downloads/release/python-370/)

2.  In the path configuration file (in the Python 3.7 distribution: ‘python37.\_pth’), uncomment the last line to import site

3.  Download [[get-pip.py]](https://pip.pypa.io/en/stable/installing/#installing-with-get-pip-py) and install pip: &gt; python get-pip.py

4.  You can now install (and, by \[2\], import) third-party packages with: &gt; python -m pip install ... where ... is the list of package names

_From &lt;<http://www.christhoung.com/2018/07/15/embedded-python-windows/>&gt;_

_This is how you can do this, extract Python embeddable zip file. It has the file pythonxx.\_pth. This file contains list of directory/zip files which embedded python uses to look for modules i.e. to setup sys.path . For example I have extracted 3.6 embedded version into E:\\dev folder._

_PS C:\\Users\\user2&gt; get-content E:\\dev\\python-3.6.5-embed-amd64\\python36.\_pth  
python36.zip  
.  
\# Uncomment to run site.main() automatically  
\#import site_

_sys.path will reflect the same thing_

_PS C:\\Users\\user2&gt; python  
Python 3.6.5 (v3.6.5:f59c0932b4, Mar 28 2018, 17:00:18) \[MSC v.1900 64 bit (AMD64)\] on win32  
&gt;&gt;&gt; import sys  
&gt;&gt;&gt; sys.path  
\['E:\\\\dev\\\\python-3.6.5-embed-amd64\\\\python36.zip', 'E:\\\\dev\\\\python-3.6.5-embed-amd64'\]  
&gt;&gt;&gt;_

_Now all I need to do is create a new directory or zip file in E:\\dev\\python-3.6.5-embed-amd64, which contains all my modules and add that directory in python36.\_pth file. Once all the testing is done, I can zip the folder E:\\dev\\python-3.6.5-embed-amd64 which can be used to deploy Python with all the required modules ready to import._

_From &lt;<https://stackoverflow.com/questions/51231247/how-to-create-or-extend-a-python-3-x-embeddable-zip-for-windows>&gt;_

T*here is a way to extend Python embedded installation. I managed to create Flask-ready package, that I can just unzip on target machine and run code. The trick is to install **EXACT same** python version (normal full blown python) as your target embedded small python. Not only version but x86, x64 has to match as well.*

_Then install modules from pip on normal python, go to **NormalPython\\Lib\\site-packages** and copy all new files that appear after installing to **EmbeddedPython\\Lib** finally add **Lib** to **pythonXX.\_pth** inside Embedded python folder._

_It's extremely important to fully test your application in case you miss some package. Also this would not work for packages that also add .exe to Scripts folder. You could still probably copy the exe's to Script folder and add it to path which could do the trick._

_From &lt;<https://stackoverflow.com/questions/49737721/adding-packages-to-python-embedded-installation-for-windows>&gt;_

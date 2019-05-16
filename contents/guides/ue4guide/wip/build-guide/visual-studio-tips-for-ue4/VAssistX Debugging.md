```
sortIndex: 2
```

# Enable Logging

Visual Assist can produce debug logs to assist with technical problems. Follow these steps only upon direction of Whole Tomato Software. Do not send a log with an initial request for technical assistance, or when unsolicited.

Although debug logs contain information primarily related to functions and performance of Visual Assist, they will contain names of local solutions, projects, directories, and files, and may also contain symbol names.

If you can open the options dialog of Visual Assist, enable logging:
![](/../../assets/VSTipsUE4_VAssistXDebug_options.png)

(Logging begins the moment you enable the checkbox. If you close and re-open the options dialog, the checkbox may not be enabled even though logging is in effect.)

Note the location of va.log.
![](../../assets/VSTipsUE4_VisualAssist.png)

If you cannot open the options dialog of Visual Assist or are so directed by customer support, use regedit to enable logging before Visual Studio starts:

1.  navigate to HKCU\\Software\\Whole Tomato

2.  set the value of Logging to 1

*Reference From https://support.wholetomato.com/default.asp?W305*


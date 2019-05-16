---
sortIndex: 10
---

Logging Commands

Friday, May 26, 2017

6:16 PM

showlog - will toggle output terminal

Log list - list all log categories

Log list \[string] - list all log categories containing a substring

Log reset - reset all log categories to their boot-time default

Log \[cat] - toggle the display of the category \[cat]

Log \[cat] off - disable display of the category \[cat]

Log \[cat] on - resume display of the category \[cat]

Log \[cat] \[level] - set the verbosity level of the category \[cat]

Log \[cat] break - toggle the debug break on display of the category \[cat]

Log Levels

Fatal

Error

Warning

Display

Log

Verbose

VeryVerbose

Command line to stream log output to file

\-log LOG=Logfile.txt

Log categories to separate files

\-LogCategoryFiles="Category1=Filename1, Category2=Filename2"

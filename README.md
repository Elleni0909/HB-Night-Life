Intro to Web Development
=============
Windows users:
Download and install Python (64Bit) https://www.python.org/ftp/python/2.7.6/python-2.7.6.amd64.msi
Download and install Python (32Bit) https://www.python.org/ftp/python/2.7.6/python-2.7.6.msi

Download and install Git SCM https://github.com/msysgit/msysgit/releases/download/Git-1.9.2-preview20140411/Git-1.9.2-preview20140411.exe

Add ";C:\Python27" to your PATH Environment Variable. (From Command prompt: SET PATH=%PATH%;c:\Python27)

Clone this Repo to a diectory of your choice.

In the directory you chose, run this command: git update-index --assume-unchanged index.html

In that same directory, run the Simple HTTP Server (Python): python -m SimpleHTTPServer

This is needed because of the AJAX lessons being loaded asynchronously from the local machine.

Run index.html

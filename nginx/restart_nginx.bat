@echo off
echo restart_nginx.bat
echo Starting nginx...
RunHiddenConsole nginx.exe -s reload
exit



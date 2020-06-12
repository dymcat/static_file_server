@echo off
chcp 65001
color b0
pushd %1 & for %%i in (.) do set folder=%%~ni
title %folder%
if exist bin\javaw.exe (
	bin\javaw.exe -Dfile.encoding=UTF-8 -jar dymcat.netty.jar HttpServer.js
) else if exist ..\bin\javaw.exe (
	..\bin\javaw.exe -Dfile.encoding=UTF-8 -jar dymcat.netty.jar HttpServer.js
) else (
	..\..\bin\javaw.exe -Dfile.encoding=UTF-8 -jar dymcat.netty.jar HttpServer.js
)
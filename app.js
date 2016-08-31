/*jslint node: true*/
var electron = require('electron');
electron.app.on('ready', function () {
    'use strict';
    var mainWindow = new electron.BrowserWindow({
        width: 1030,
        height: 595
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});
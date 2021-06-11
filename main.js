var http = require('http');
var fs = require('fs');


const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
function createWindow () {
    const win = new BrowserWindow({
      width: 320,
      height: 480,
      frame: false,
      resizable: false,
      icon: "./strike.ico"
    })
  
    win.loadFile('index.html')
  }
  app.setUserTasks([
    {
      program: null,
      arguments: '',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'Check For Updates',
      description: 'Checks for app updates'
    }
  ])
  app.whenReady().then(() => {
    Menu.setApplicationMenu(null)
    createWindow()
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

  function pDownload(url, dest){
    var file = fs.createWriteStream(dest);
    return new Promise((resolve, reject) => {
      var responseSent = false; // flag to make sure that response is sent only once.
      http.get(url, response => {
        response.pipe(file);
        file.on('finish', () =>{
          file.close(() => {
            if(responseSent)  return;
            responseSent = true;
            resolve();
          });
        });
      }).on('error', err => {
          if(responseSent)  return;
          responseSent = true;
          reject(err);
      });
    });
  }
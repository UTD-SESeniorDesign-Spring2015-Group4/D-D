// Load native UI library
var gui = require('nw.gui');

// Setup menu
// Create an empty menu
var menu = new gui.Menu({type: 'menubar'});

// Empty app menu when running mac
if(process.platform === 'darwin')
  menu.append(new gui.MenuItem({label: 'D&D'}));



// File menu
var fileMenu = new gui.MenuItem({
  label: 'File',
  submenu: new gui.Menu()
});

fileMenu.submenu.append(new gui.MenuItem({
  label: 'New',
  key: 'n',
  modifier: 'mod'
}));

fileMenu.submenu.append(new gui.MenuItem({
  type: 'separator'
}));

fileMenu.submenu.append(new gui.MenuItem({
  label: 'Open',
  key: 'o',
  modifier: 'mod'
}));

fileMenu.submenu.append(new gui.MenuItem({
  label: 'Save',
  key: 's',
  modifier: 'mod'
}));

fileMenu.submenu.append(new gui.MenuItem({
  label: 'Save As',
  key: 's',
  modifier: 'mod+shift'
}));

fileMenu.submenu.append(new gui.MenuItem({
  label: 'Export'
}));

fileMenu.submenu.append(new gui.MenuItem({
  type: 'separator'
}));

fileMenu.submenu.append(new gui.MenuItem({
  label: 'Quit',
  key: 'q',
  modifier: 'mod',
  click: function() {
    gui.App.closeAllWindows();
  }
}));

menu.append(fileMenu);

gui.Window.get().menu = menu;

// Developer shortcuts

document.addEventListener('keydown', function(e){
  // Ctrl/Cmd + Shift + I : Open Dev Tools
  if((e.ctrlKey || e.metaKey) && e.altKey && e.keyCode === 73)
    gui.Window.get().showDevTools();
  // Ctrl/Cmd + Shift + I : Reload Application
  if((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 82)
    gui.Window.get().reloadDev();
});


// Disable brower opening files when dragging onto the window
window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };

// Catch uncaught exceptions so they don't crash the entire program
// TODO: add indicator that program crashed?
process.on('uncaughtException', function(e) {
    console.error(e);
});

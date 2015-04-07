define([
    './DiagramIO'
], function(DiagramIO){
    // Load native UI library
    var gui = window.nwgui;
    var isMac = process.platform === 'darwin';

    setupMenu()
    setupFileDialogs();


    // Developer shortcuts
    document.addEventListener('keydown', function(e){
      // Ctrl/Cmd + Shift + I : Open Dev Tools
      if((e.ctrlKey || e.metaKey) && e.altKey && e.keyCode === 73)
        window.nwWindow.showDevTools();
      // Ctrl/Cmd + Shift + I : Reload Application
      if((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 82)
        window.nwWindow.reloadDev();
    });

    // Disable brower opening files when dragging onto the window
    window.ondragover = function(e) { e.preventDefault(); return false };
    window.ondrop = function(e) { e.preventDefault(); return false };

    function fileDialog(id) {
        $('#'+id)
    }

    function setupFileDialogs() {
        $('#openFileDialog').change(function(e){
            var path = this.files[0].path;
            DiagramIO.read(path, function(err){
                if(!err) {
                    alert("Opened");
                    window.graph.set('path', path);
                }
                else
                    alert("Error: ", err)
            })
        });
        $('#saveFileDialog').change(function(e){
            var path = this.files[0].path;
            DiagramIO.write(path, function(err){
                if(!err) {
                    alert("Saved");
                    window.graph.set('path', path);
                }
                else
                    alert("Error: ", err)
            });
        });
        $('#exportFileDialog').change(function(e){
            var path = this.files[0].path;
            alert("Not implemented", path);
        });
    }

    function showOpenFileDialog() {
        $('#openFileDialog').click();
    }

    function showSaveFileDialog() {
        $('#saveFileDialog').click();
    }

    function showExportFileDialog() {
        $('#exportFileDialog').click();
    }

    function setupMenu() {
        // Setup menu
        // Create an empty menu
        var menu = new gui.Menu({type: 'menubar'});

        // Empty app menu when running mac
        if(isMac)
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
            modifier: 'mod',
            click: showOpenFileDialog
        }));

        fileMenu.submenu.append(new gui.MenuItem({
            label: 'Save',
            key: 's',
            modifier: 'mod',
            click: function() {
                var path = window.graph.get('path');
                if(path) {
                    DiagramIO.write(path, function(err){
                        if(!err) {
                            alert("Saved");
                            window.graph.set('path', path);
                        }
                        else
                            alert("Error: ", err)
                    });
                }
                else
                    showSaveFileDialog();
            }
        }));

        fileMenu.submenu.append(new gui.MenuItem({
            label: 'Save As',
            key: 's',
            modifier: 'mod-shift',
            click: showSaveFileDialog
        }));

        fileMenu.submenu.append(new gui.MenuItem({
            label: 'Export',
            click: showExportFileDialog
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

        window.nwWindow.menu = menu;
    }
});

define([
    './DiagramIO'
], function(DiagramIO){
    // Load native UI library
    var gui = window.nwgui;
    var isMac = process.platform === 'darwin';

    setupMenu()
    setupFileDialogs();
    setupKeyboardShortcuts();

    function newDiagram() {
        alert("Not implemented");
    }

    function openDiagram() {
        showOpenFileDialog();
    }

    function quit() {
        gui.App.closeAllWindows();
    }

    function saveDiagram() {
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

    function saveDiagramAs() {
        showSaveFileDialog();
    }

    function exportDiagram() {
        alert("Not implemented!");
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


    function setupMenu() {
        // Setup menu
        // Create an empty menu
        var menu = new gui.Menu({type: 'menubar'});

        var mod = isMac ? '⌘' : 'Ctrl';

        // Empty app menu when running mac
        if(isMac)
            menu.append(new gui.MenuItem({label: 'D&D'}));

        // File menu
        var fileMenu = new gui.MenuItem({
            label: 'File',
            submenu: new gui.Menu()
        });

        fileMenu.submenu.append(new gui.MenuItem({
            label: 'New ('+mod+'+N)',
            click: newDiagram
        }));

        fileMenu.submenu.append(new gui.MenuItem({
            type: 'separator'
        }));

        fileMenu.submenu.append(new gui.MenuItem({
            label: 'Open ('+mod+'+O)',
            click: openDiagram
        }));

        fileMenu.submenu.append(new gui.MenuItem({
            label: 'Save ('+mod+'+S)',
            click: saveDiagram
        }));

        fileMenu.submenu.append(new gui.MenuItem({
            label: 'Save As ('+mod+'+Shift+S)',
            click: saveDiagramAs
        }));

        fileMenu.submenu.append(new gui.MenuItem({
            label: 'Export ('+mod+'+E)',
            click: exportDiagram
        }));

        fileMenu.submenu.append(new gui.MenuItem({
            type: 'separator'
        }));

        fileMenu.submenu.append(new gui.MenuItem({
            label: 'Quit ('+mod+'+Q)',
            click: function() {
                gui.App.closeAllWindows();
            }
        }));

        menu.append(fileMenu);

        window.nwWindow.menu = menu;
    }

    function setupKeyboardShortcuts() {

        document.addEventListener('keydown', function(e){
            // User shortcuts
            // Ctrl/Cmd + N : New Diagram
            if((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.keyCode === 'N'.charCodeAt(0))
                newDiagram();
            // Ctrl/Cmd + O : Open Diagram
            if((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.keyCode === 'O'.charCodeAt(0))
                openDiagram();
            // Ctrl/Cmd + S : Save Diagram
            if((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.keyCode === 'S'.charCodeAt(0))
                saveDiagram();
            // Ctrl/Cmd + Shift + S : Save Diagram As..
            if((e.ctrlKey || e.metaKey) && !e.altKey && e.shiftKey && e.keyCode === 'S'.charCodeAt(0))
                saveDiagramAs();
            // Ctrl/Cmd + E : Export Diagram
            if((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.keyCode === 'E'.charCodeAt(0))
                exportDiagram();
            // Ctrl/Cmd + Q : Save Diagram
            if((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.keyCode === 'Q'.charCodeAt(0))
                quit();

            // Developer shortcuts

            // Ctrl/Cmd + Alt + I : Open Dev Tools
            if((e.ctrlKey || e.metaKey) && e.altKey && e.keyCode === 'I'.charCodeAt(0))
                window.nwWindow.showDevTools();
            // Ctrl/Cmd + Shift + R : Reload Application
            if((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 'R'.charCodeAt(0))
                window.nwWindow.reloadDev();
        });
    }
});

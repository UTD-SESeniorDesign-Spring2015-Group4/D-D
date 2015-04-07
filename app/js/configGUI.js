define([
    './DiagramIO',
    'text!../tmpl/dialog.html'
], function(DiagramIO, tmplDialog){
    // Load native UI library
    var gui = window.nwgui;
    var isMac = process.platform === 'darwin';
    var dialogTemplate = _.template(tmplDialog);
    var dialogPromise;

    setupMenu()
    setupFileDialogs();
    setupKeyboardShortcuts();
    setupWindow();

    function setDiagramPath(path) {
        window.graph.set('path', path, {silent: true});
        window.graph.set('unsavedChanges', false, {silent: true});
        document.title = 'D&D' + (path ? ' - ' + path : '');
    }

    function newDiagram() {
        confirmCloseDiagram('Save before creating new empty diagram?', function(){
            window.graph.clear();
            setDiagramPath(undefined)
            toastr.success('Created new empty diagram', 'New Diagram');
        });
    }

    function openDiagram() {
        confirmCloseDiagram('Save before opening another diagram?', showOpenFileDialog)
    }

    function quit() {
        nwWindow.close();
    }

    function saveDiagram(cb) {
        var path = window.graph.get('path');
        if(path) {
            DiagramIO.write(path, function(err){
                if(!err) {
                    toastr.success('Saved diagram to '+path, 'Sucessfully Saved');
                    setDiagramPath(path)
                    cb()
                }
                else
                    toastr.error(err, 'Error')
            });
        }
        else
            showSaveFileDialog().then(cb);
    }

    function saveDiagramAs() {
        showSaveFileDialog();
    }

    function exportDiagram() {
        toastr.warning('Not yet implemented');
    }

    function showFileDialog(selector) {
        var $dialog = $(selector);
        // Clear the value so opening the same file triggers a change
        $dialog.val('');
        // Click on file input so file dialog opens
        $dialog.click();

        dialogPromise = $.Deferred();
        return dialogPromise;
    }

    // Corresponding showFileDialog for open/save/export
    var showOpenFileDialog = _.partial(showFileDialog, '#openFileDialog');
    var showSaveFileDialog = _.partial(showFileDialog, '#saveFileDialog');
    var showExportFileDialog = _.partial(showFileDialog, '#exportFileDialog');

    function confirmCloseDiagram(text, func) {
        if(window.graph.get('unsavedChanges'))
        {
            picoModal({
                content: dialogTemplate({
                    title: 'Save Changes?',
                    text: 'This diagram has unsaved changes. ' + text,
                    buttons: {
                        btnSave: 'Save',
                        btnDontSave: 'Don\'t Save',
                        btnCancel: 'Cancel'
                    }
                }),
                closeButton: false,
                overlayClose: false
            }).afterCreate(function(modal){
                var $modal = $(modal.modalElem())
                $modal.find('#btnSave').click(function() {
                    modal.destroy();
                    saveDiagram(func);
                });
                $modal.find('#btnDontSave').click(function() {
                    modal.destroy();
                    func()
                });
                $modal.find('#btnCancel').click(function() {
                    modal.destroy();
                });
            }).show();
        }
        else
            func();
    }

    function setupFileDialogs() {
        $('#openFileDialog').change(function(e){
            // Ignore empty values, we clear the value to allow opening the same file again
            if(this.value === '') return;
            var path = this.files[0].path;
            DiagramIO.read(path, function(err){
                if(!err) {
                    toastr.success('Opened diagram from '+path, 'Successfully Opened');
                    setDiagramPath(path);
                    dialogPromise.resolve();
                }
                else
                    toastr.error(err, 'Error');
            })
        });
        $('#saveFileDialog').change(function(e){
            // Ignore empty values, we clear the value to allow opening the same file again
            if(this.value === '') return;
            var path = this.files[0].path;
            DiagramIO.write(path, function(err){
                if(!err) {
                    toastr.success('Saved diagram to '+path, 'Sucessfully Saved');
                    setDiagramPath(path)
                    dialogPromise.resolve();
                }
                else
                    toastr.error(err, 'Error');
            });
        });
        $('#exportFileDialog').change(function(e){
            // Ignore empty values, we clear the value to allow opening the same file again
            if(this.value === '') return;
            var path = this.files[0].path;
            toastr.warning('Not yet implemented');
            dialogPromise.resolve();
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

    function setupWindow() {
        nwWindow.on('close', function() {
            confirmCloseDiagram('Save before closing?', function(){
                nwWindow.close(true);
            });
        })
    }
});

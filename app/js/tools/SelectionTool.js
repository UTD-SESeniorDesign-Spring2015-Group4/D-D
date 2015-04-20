// This is the default mouse tool. Since joint.js already does everything for us we don't need to do anything.
define(
    [
      './Tool',
      'text!../../tmpl/editComponentDialog.html'
    ],
    function (Tool, tmplEditComponent) {
      'use strict';
      var editComponentTemplate = _.template(tmplEditComponent);

      // These are the listeners that are called whenever
      // the tool is used
      // onActivated: when the tool is chosen from the toolbox
      // onDeactivated: when the tool is deselcted in the toolbox (another tool chosen)
      // onClick: when the canvas is clicked while this tool is active
      return _.defaults({
        name: 'selection',
        icon: 'img/mouse_tool.svg',
        onDoubleClick: function (cellView) {
          var componentClicked = cellView.model;

          // Display an options menu.
          picoModal({
            content: editComponentTemplate({
              title: 'Edit Component',
              text: 'This diagram has unsaved changes. ',
              componentName: componentClicked.get('name'),
              buttons: {
                btnSave: {
                  text: 'Save',
                  className: 'pure-button pure-button-primary'
                },
                btnDelete: {
                  text: 'Delete Component',
                  className: 'pure-button pure-button-danger'
                },
                btnCancel: {
                  text: 'Cancel',
                  className: 'pure-button'
                }
              }
            }),
            closeButton: false,
            overlayClose: false
          }).afterCreate(function (modal) {
            var $modal = $(modal.modalElem());

            // Save button.
            $modal.find('#btnSave').click(function () {
              modal.destroy();
              var componentNameInputValue = $modal.find('#component-name-input').val();
              componentClicked.set('name', componentNameInputValue);
            });

            // Delete button.
            $modal.find('#btnDelete').click(function () {
              modal.destroy();
              componentClicked.remove();
            });

            // Cancel button.
            $modal.find('#btnCancel').click(function () {
              modal.destroy();
            });
          }).show();
        },
        onActivated: function(){
            $('.link-tools').css( 'display', 'none');
            $('.marker-arrowheads').css( 'display', 'none');
        },
        onPointerDown: function(cell) {
            console.log("pointer down");
        }
      }, Tool);
    });

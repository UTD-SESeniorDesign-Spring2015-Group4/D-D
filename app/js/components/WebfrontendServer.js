define([
  './Component'
], function(Component) {
  var WebfrontendServer = Component.extend({
    defaults: {
      type: 'WebfrontendServer',
      name: '',
      template: _.template(
        [
          '<text class="type" font-size="15" x="0" y="0"><%= type %></text>',
          '<g class="scalable">',
            '<path id="server-6-icon" fill="#333333" d="M960,390.2H282.2V560H960V390.2z M327.2,512.6L357,438h36l-29.8,74.6H327.2zM385.8,512.6l29.8-74.6h36l-29.8,74.6H385.8z M443.8,512.6l29.8-74.6h36l-29.8,74.6H443.8z M502.3,512.6l29.8-74.6h36l-29.8,74.6H502.3z M596.8,512.6h-36l29.8-74.6h36L596.8,512.6z M879.6,500.1c-13.7,0-24.9-11.1-24.9-24.9c0-13.7,11.1-24.9,24.9-24.9c13.7,0,24.9,11.1,24.9,24.9C904.5,488.9,893.5,500.1,879.6,500.1z M215.4,509.5c-95.2-2.6-170.3-79.4-170.3-173.4c0-77.9,51.6-145,124.4-166.3c20.4-69.4,93.8-110.4,163.5-91.7C374.6,28.7,435.9,0,501.8,0c107.5,0,198.3,76.8,217.9,180c55.7,26.8,93.1,81,97.6,143.6H742c-5.4-58.3-47.4-88.4-91.9-88.4c-2.4-110.9-76.3-159.9-147.8-159.9c-94.5,0-133.4,71.8-143.3,99c-38.6-55.7-143.3-13.5-121.8,60.9c-65.1-11.8-117,37.2-117,101.4c0,52.6,41.5,95.5,95,98.1L215.4,509.5L215.4,509.5z"/>',
            '<rect fill="rgba(0, 0, 0, 0)" width="960" height="560"/>',
          '</g>',
          '<text class="name"><%= name %></text>'
        ].join('')
      ),
      attrs: {
        path: {
          fill: "#333333"
        },
        text: {
          fill: "#333333"
        }
      },
      paletteIcon: 'img/webfrontentserver_palette.svg'
    },
    initialize: function() {
      // Dynamically generate the markup using a template.
      this.set('markup', this.get('template')(this.attributes));

      // This overrides its super initialize function.
      // To use this, must call the parent prototype's initialize function.
      Component.prototype.initialize.apply(this, arguments);
    }
  });

  return WebfrontendServer;
});

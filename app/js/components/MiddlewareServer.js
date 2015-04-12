define([
  './Component'
], function(Component) {
  var MiddlewareServer = Component.extend({
    defaults: {
      type: 'MiddlewareServer',
      name: '',
      template: _.template(
        [
          '<text class="type" font-size="15" x="0" y="0"><%= type %></text>',
          '<g class="scalable">',
            '<path id="server-icon" fill="#333333" d="M533.2,420.3h-75.3v73h-56.5v0.9v65.7h188.3v-65.7v-0.9h-56.5V420.3L533.2,420.3zM759.9,493.3H627.3v66.6h132.5V493.3z M363.7,493.3H231.1v66.6h132.5V493.3z M838.6,203.7H152.4v172h686.1L838.6,203.7L838.6,203.7z M198.1,327.3l30.2-75.5h36.4l-30.2,75.5H198.1z M257.1,327.3l30.2-75.5h36.4l-30.2,75.5H257.1z M316.1,327.3l30.2-75.5h36.4l-30.2,75.5H316.1z M375.2,327.3l30.2-75.5h36.4l-30.2,75.5H375.2z M470.8,327.3h-36.4l30.2-75.5H501L470.8,327.3zM757.2,314.9c-14,0-25.2-11.4-25.2-25.2s11.4-25.2,25.2-25.2c14,0,25.2,11.4,25.2,25.2S771.1,314.9,757.2,314.9z M800.7,158.6h-609L311.8,0.1h367.4L800.7,158.6z"/>',
            '<rect x="152.4" y="0.1" fill="rgba(0, 0, 0, 0)" width="686.1" height="559.8"/>',
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
      }
    },
    initialize: function() {
      // Dynamically generate the markup using a template.
      this.set('markup', this.get('template')(this.attributes));

      // This overrides its super initialize function.
      // To use this, must call the parent prototype's initialize function.
      Component.prototype.initialize.apply(this, arguments);
    }
  });

  return MiddlewareServer;
});

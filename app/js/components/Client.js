define([
  './Component'
], function(Component) {
  var Client = Component.extend({
    defaults: {
      type: 'Client',
      name: '',
      template: _.template(
        [
          '<text class="type" font-size="15" x="0" y="0"><%= type %></text>',
          '<g class="scalable">',
            '<path id="laptop-icon" fill="#333333" d="M783.3-0.1H212v384.7h571.1V-0.1H783.3z M734.7,336.1H260.5V48.4h474.1v287.7H734.7zM783.3,411.7H212l-84.4,148.4h740.7L783.3,411.7z M429.2,528.6l14.4-42.2h108.7l14.4,42.2H429.2z"/>',
            '<rect x="127.6" y="-0.1" fill="rgba(0, 0, 0, 0)" width="740.7" height="560.2"/>',
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
      paletteIcon: 'img/client_palette.svg'
    },
    initialize: function() {
      // Dynamically generate the markup using a template.
      this.set('markup', this.get('template')(this.attributes));

      // This overrides its super initialize function.
      // To use this, must call the parent prototype's initialize function.
      Component.prototype.initialize.apply(this, arguments);
    }
  });

  return Client;
});

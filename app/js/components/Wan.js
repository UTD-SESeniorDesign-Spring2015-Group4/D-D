define([
  './Component'
], function(Component) {
  var Wan = Component.extend({
    defaults: {
      type: 'Wan',
      name: '',
      template: _.template(
        [
          '<text class="type" font-size="15" x="0" y="0"><%= type %></text>',
          '<g class="scalable">',
            '<path id="cloud-3-icon" fill="#333333" d="M797,197.9C775.4,84.3,675.8,0.1,557.8,0.1c-72.5,0-139.7,31.5-185.7,85.9C295.4,65.5,215,110.5,192.5,186.7c-79.7,23.4-136.8,97.4-136.8,182.8c0,105.1,85.5,190.3,192.5,190.3H714c105.1,0,190.3-85.5,190.3-190.3C904.7,295.1,862.2,229.2,797,197.9z M714.2,477.1H248.7c-61.5,0-109.9-48.2-109.9-107.7c0-70.5,57.3-124,128.4-111c-23.8-81.7,91-127.8,133.5-66.8C411.5,161.4,454,82.7,557.8,82.7c78.4,0,159.9,54,162.6,175.6c52.4,0.2,101.6,37.9,101.6,111C822.1,428.8,773.7,477.1,714.2,477.1z"/>',
            '<rect x="55.7" y="0.1" fill="rgba(0, 0, 0, 0)" width="848.6" height="559.8"/>',
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

  return Wan;
});

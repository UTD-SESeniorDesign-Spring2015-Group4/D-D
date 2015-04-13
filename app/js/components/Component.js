define([], function(){
  var Component = joint.shapes.basic.Generic.extend({
    defaults: {
      name: '',
      markup: '',
      type: '',
      paletteIcon: '',
    },
    initialize: function() {
      // Dynamically generate the markup using the component's template.
      this.set('markup', this.get('template')(this.attributes));

      // Set change listeners.
      this.on('change:name', this.updateName, this);
      this.on('change:markup', this.updateMarkup, this);

      // This overrides its super initialize function.
      // To use this, must call the parent prototype's initialize function.
      joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments)
    },
    updateName: function() {
      this.set('markup', this.get('template')(this.attributes));
    },
    updateMarkup: function() {
      this.findView(paper).render();
    }
  });

  return Component
});

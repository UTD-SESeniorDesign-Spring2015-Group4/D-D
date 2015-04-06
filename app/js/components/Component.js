var Component = joint.shapes.basic.Generic.extend({
  defaults: {
    name: '',
    markup: '',
    type: ''
  },

  initialize: function() {
    // This overrides its super initialize function.
    // To use this, must call the parent prototype's initialize function.
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments)
  }
});

/**
 * Represents a component in a network topology. This should be subclassed
 * by more specific definitions of components.
 */
define([], function () {
	return joint.shapes.basic.Generic.extend({
		defaults: {
			name: '',
			type: '',
			template: '',
			attrs: '',
			paletteIcon: ''
		},

		/**
		 * Called when an instance of this Class or any Subclass is created.
		 */
		initialize: function () {
			// Generate the component's markup using the component's template.
			this.set('markup', this.get('template')(this.attributes));

			// Set change listeners.
			this.on('change:name', this.updateName, this);
			this.on('change:markup', this.updateMarkup, this);

			// Call back to the parent's initialize function.
			joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
		},

		/**
		 * Update the component's markup when it's name is changed.
		 */
		updateName: function () {
			this.set('markup', this.get('template')(this.attributes));
		},

		/**
		 * Re-render the component's markup when it is changed.
		 */
		updateMarkup: function () {
			this.findView(paper).render();
		}
	});
});

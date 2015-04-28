/**
 * Represents a Client in a network topology.
 * Subclass of Component.
 */
define([
	'./Component'
], function (Component) {
	return Component.extend({
		defaults: {
			type: 'Client',
			name: '',

			// Text field content is left to be filled in by the parent class's
			// initialize() function.
			template: _.template(
				[
					'<text class="type" text-anchor="middle" font-size="15" x="33" y="0"><%= type %></text>',
					'<g class="scalable">',
					'<path transform="translate(0, 50)" id="laptop-icon" fill="#333333" d="M783.3-0.1H212v384.7h571.1V-0.1H783.3z M734.7,336.1H260.5V48.4h474.1v287.7H734.7zM783.3,411.7H212l-84.4,148.4h740.7L783.3,411.7z M429.2,528.6l14.4-42.2h108.7l14.4,42.2H429.2z"/>',
					'<rect transform="translate(0, 50)" x="127.6" y="-0.1" fill="rgba(0, 0, 0, 0)" width="740.7" height="560.2"/>', // Invisible rectangle to allow the component to be clicked where it should be blank.
					'</g>',
					'<text class="name" text-anchor="middle" font-size="15" x="33" y="60"><%= name %></text>'
				].join('')
			),

			// All fill attributes are set explicitly so the color of components
			// can be easily changed externally.
			attrs: {
				path: {
					fill: "#333333"
				},
				text: {
					fill: "#333333"
				}
			},

			// The icon to be displayed when the component is in the Palette.
			paletteIcon: 'img/client_palette.svg'
		}
	});
});

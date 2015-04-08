define([
  './Component'
], function(Component) {
  var ApplicationServer = Component.extend({
    defaults: {
      name: '',
      markup: '<g class="scalable"><g id="Layer_2"> <rect x="227.1" y="0" fill="none" width="507.4" height="560"/> </g> <g id="Layer_1"> <path id="server-7-icon" fill="#333333" d="M227.1,0v392.2h507.4V0H227.1z M682.7,340.3H279.2V51.8h403.5V340.3z M458.2,197.5L380.5,270l-28.1-26l50-46.5l-50.2-46.7l28.1-26L458.2,197.5z M596.1,232.7H479.9v36h116.3V232.7z M734.5,432.5h-509V560h509V432.5L734.5,432.5z M259.3,524.3l22.5-56h27.1l-22.5,56H259.3z M303.1,524.3l22.5-56h27.1l-22.5,56H303.1z M347,524.3l22.5-56h27.1l-22.5,56H347z M390.8,524.3l22.5-56h27.1l-22.5,56H390.8z M461.6,524.3h-27.1l22.5-56h27.1L461.6,524.3z M674,514.9c-10.3,0-18.6-8.4-18.6-18.6c0-10.3,8.4-18.6,18.6-18.6c10.3,0,18.6,8.4,18.6,18.6C692.7,506.6,684.3,514.9,674,514.9z"/> </g></g>',
      type: 'ApplicationServer'
    }
  });

  return ApplicationServer;
});

var jQuery;

jQuery = require('jquery');

window['jQuery'] = window['$'] = jQuery;

$('body, html').click(function() {
  return console.log('test');
});

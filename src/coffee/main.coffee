jQuery = require('jquery')
window['jQuery'] = window['$'] = jQuery;

$('body, html').click ->
  console.log('test')
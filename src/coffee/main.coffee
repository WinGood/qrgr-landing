#jQuery = require('jquery')
#window['jQuery'] = window['$'] = jQuery;

$(document).ready ->
  $('.scroll-to-form').bind 'click', ->
    $('html, body').stop().animate({
      scrollTop: $('#section-8').offset().top
    }, 1000)
    return false
  $('.modal-btn').fancybox({
    width: 380,
    autoHeight: true,
    autoSize: false,
    padding: 0,
    scrolling: 'no',
    helpers: {
      overlay: {
        locked: false
      }
    }
  })
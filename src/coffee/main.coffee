#jQuery = require('jquery')
#window['jQuery'] = window['$'] = jQuery;

#$(document).ready ->
#  $('.scroll-to-form').bind 'click', ->
#    $('html, body').stop().animate({
#      scrollTop: $('#section-8').offset().top
#    }, 1000)
#    return false
#  $('.modal-btn').fancybox({
#    width: 380,
#    autoHeight: true,
#    autoSize: false,
#    padding: 0,
#    scrolling: 'no',
#    helpers: {
#      overlay: {
#        locked: false
#      }
#    }
#  })
#  $('form').bind 'submit', ->
#    form = $(this).serialize()
#    $.ajax({
#      type: "POST"
#      url: "/../../form-handler.php"
#      dataType: "json"
#      data: form
#      success: (data) ->
#        console.log data
##      error: (XMLHttpRequest, textStatus, errorThrown) ->
##        error_msg = 'Ошибка запроса. Проверьте своё подключение к интернету! Если ошибка повторяется обратитесь к администратору\n' + XMLHttpRequest.responseText + textStatus + "=" + errorThrown
##        console.log error_msg
#    });
#    return false
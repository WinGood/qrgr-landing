$(document).ready(function() {

    $('.scroll-to-form').bind('click', function() {
        $('html, body').stop().animate({
            scrollTop: $('#section-8').offset().top
        }, 1000);
        return false;
    });

    $('.phone-input').mask('+9 (999) 999-9999');

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
    });

    var requestSent = false;

    $('form').bind('submit', function() {
        if(!requestSent) {
            requestSent = true;
            var form = $(this).serialize();
            var el = this;
            $.ajax({
                type: "POST",
                url: "./form-handler.php",
                dataType: "json",
                data: form,
                success: function (data) {
                    if (data.result == 1) {
                        $(el).parent().find('.success-block').show().delay(3000).slideUp();
                        $(el).parent().find('input[type="text"], input[type="email"]').val('');
                    } else {
                        alert(data.message);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var error_msg = 'Ошибка запроса. Проверьте своё подключение к интернету! Если ошибка повторяется обратитесь к администратору\n' + XMLHttpRequest.responseText + textStatus + "=" + errorThrown;
                    alert(error_msg);
                },
                complete: function() {
                    requestSent = false;
                }
            });
        }
        return false;
    });
});

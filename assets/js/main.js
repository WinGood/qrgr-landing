$(document).ready(function() {
  $('.scroll-to-form').bind('click', function() {
    $('html, body').stop().animate({
      scrollTop: $('#section-8').offset().top
    }, 1000);
    return false;
  });
  return $('.modal-btn').fancybox({
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
});

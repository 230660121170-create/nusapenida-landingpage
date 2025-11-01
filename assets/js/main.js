(function($) {

  skel.breakpoints({
    xlarge: '(max-width: 1680px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)'
  });

  $(function() {

    var $window = $(window),
        $body = $('body');

    // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function() {
      window.setTimeout(function() {
        $body.removeClass('is-loading');
      }, 100);
    });

    // Fix: Placeholder polyfill.
    $('form').placeholder();

    // Prioritize "important" elements on medium.
    skel.on('+medium -medium', function() {
      $.prioritize(
        '.important\\28 medium\\29',
        skel.breakpoint('medium').active
      );
    });

    // Nav.
    $('#nav')
      .append('<a href="#nav" class="close"></a>')
      .appendTo($body)
      .panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: 'right'
      });

    // ==========================
    // ✨ Animasi Scroll Dua Arah
    // ==========================
    function animateOnScroll() {
      $('.feature.left, .feature.right').each(function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var windowTop = $window.scrollTop();
        var windowBottom = windowTop + $window.height();

        // Jika elemen terlihat di layar
        if (elementBottom > windowTop + 100 && elementTop < windowBottom - 100) {
          $(this).addClass('visible');
        } else {
          // Hilangkan animasi saat elemen keluar layar (biar bisa muncul lagi)
          $(this).removeClass('visible');
        }
      });
    }

    // Jalankan saat scroll dan saat load
    $window.on('scroll', animateOnScroll);
    $window.on('load', animateOnScroll);
    $window.on('resize', animateOnScroll);

  });

})(jQuery);

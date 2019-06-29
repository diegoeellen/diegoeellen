$(document).ready(() => {
    // Render menu
    $('#headerContent').load('common/menu.html', () => {
        $('.navbar-nav .nav-item').removeClass('active');
        if (window.location.pathname.includes('/index.html')) {
            $('a[href="index.html"]').parent().addClass('active');
        } else if (window.location.pathname.includes('/padrinhos.html')) {
            $('a[href="padrinhos.html"]').parent().addClass('active');
        } else if (window.location.pathname.includes('/mensagem.html')) {
            $('a[href="mensagem.html"]').parent().addClass('active');
        } else if (window.location.pathname.includes('/rsvp.html')) {
            $('a[href="rsvp.html"]').parent().addClass('active');
        } else if (window.location.pathname.includes('/product-list.html')) {
            $('a[href="product-list.html"]').parent().addClass('active');
        } else if (window.location.pathname.includes('/evento.html')) {
            $('a[href="evento.html"]').parent().addClass('active');
        } else {
            $('a[href="index.html"]').parent().addClass('active');
        }
    });

    // Render footer
    $('#footerContent').load('common/footer.html');
});
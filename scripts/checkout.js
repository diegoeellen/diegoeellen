$(document).ready(() => {
    loadCart();
});

function loadCart() {
    var productId = window.location.search.replace('?id=', '');
    if (productId) {
        $.getJSON('api/products.json', (data) => {
            if (data) {
                var product = data.find((p) => p.id === parseInt(window.atob(productId)));
                if (product) {
                    $('#prodImg').attr('src', product.image);
                    $('#prodDesc').html(product.title);
                    $('#prodQtd').html(1);
                    $('#prodVal').html(product.price.toLocaleString('pt-Br', { style: 'currency', currency: 'BRL' }));
                }
            }
        });
    }
}
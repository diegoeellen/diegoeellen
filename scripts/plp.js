$(document).ready(() => {
    loadProducts();
});

function loadProducts(filterBy = 1) {
    // Template
    var template =
        `<div class="col-lg-3 col-md-4 pb-4">
            <div class="card">
                <img src="#image" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title text-center">#title</h5>
                    <p class="card-text">#description</p>
                    <p class="text-muted text-center">#quota</p>
                    <h2 class="card-title pricing-card-title text-center">#price</h2>
                    <p class="card-text text-center">#stock</p>                    
                    <form target="_self" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                        <input type="hidden" name="cmd" value="_s-xclick">
                        <input type="hidden" name="hosted_button_id" value="#ppId">
                        <button type="submit" class="btn #btnStyle btn-block">#btnLabel</button>
                    </form>
                </div>
            </div>
        </div>`;

    // Clear
    $('.container #listing').html('');

    // Get
    $.getJSON('api/products.json', (data) => {
        if (data) {
            // Test Mode
            let params = new URLSearchParams(window.location.search);
            let isTestMode = params && params.get("test") === "true";

            // Filter
            data = data
                .filter(p => p.visible)
                .filter(p => {
                    if (!isTestMode) {
                        return !p.test;
                    } else {
                        return p.test;
                    }
                })
                .sort((a, b) => { return a.price - b.price });

            // New list
            var products;
            switch (filterBy) {
                case 2:
                    products = data.filter((f) => f.type == 2);
                    break;
                case 3:
                    products = data.filter((f) => f.type == 1);
                    break;
                default:
                    products = data;
                    break;
            }

            // Add
            products.map((p) => {
                var card = template
                    .replace('#image', p.image)
                    .replace('#title', p.title)
                    .replace('#description', p.description)
                    .replace('#price', p.price.toLocaleString('pt-Br', { style: 'currency', currency: 'BRL' }))
                    .replace('#ppId', p.paypalId);

                if (p.quota === 1) {
                    card = card.replace('#quota', '1 item de');
                } else {
                    if (p.isQuota) {
                        card = card.replace('#quota', p.quota + ' cotas de');
                    } else {
                        card = card.replace('#quota', p.quota + ' itens de');
                    }
                }

                if (p.stock === 0) {
                    card = card
                        .replace('#btnStyle', 'btn-success disabled')
                        .replace('#btnLabel', 'Comprado')
                        .replace('#stock', 'Obrigado :)');
                } else {
                    card = card
                        .replace('#btnStyle', 'btn-outline-success')
                        .replace('#btnLabel', 'Adicionar ao carrinho');

                    if (p.isQuota) {
                        card = p.stock === 1 ? card.replace('#stock', 'falta 1 cota') : card.replace('#stock', 'faltam ' + p.stock + ' cotas');
                    } else {
                        card = p.stock === 1 ? card.replace('#stock', 'falta 1 item') : card.replace('#stock', 'faltam ' + p.stock + ' itens');
                    }
                }

                $('.container #listing').append(card);
            });
        }
    });
}

function filterBy(type) {
    $('#btnType1').addClass('btn-light').removeClass('btn-danger');
    $('#btnType2').addClass('btn-light').removeClass('btn-danger');
    $('#btnType3').addClass('btn-light').removeClass('btn-danger');

    switch (type) {
        case 1:
            $('#btnType1').addClass('btn-danger').removeClass('btn-light');
            break;
        case 2:
            $('#btnType2').addClass('btn-danger').removeClass('btn-light');
            break;
        case 3:
            $('#btnType3').addClass('btn-danger').removeClass('btn-light');
            break;
    }

    loadProducts(type);
}
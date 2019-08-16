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
                    <div class="alert alert-warning text-center #alertStyle" role="alert">
                        Oops!! Já foi rs..
                    </div>
                    <div class="dropdown #btnStyle">
                        <button class="btn btn-block btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Comprar
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <h6 class="dropdown-header text-center">PayPal</h6>
                            <a class="dropdown-item" href="#">
                                <form target="_self" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                                    <input type="hidden" name="cmd" value="_s-xclick">
                                    <input type="hidden" name="hosted_button_id" value="#ppId">
                                    <input type="image" src="https://www.paypalobjects.com/pt_BR/i/btn/btn_cart_LG.gif" border="0" name="submit" alt="PayPal - A maneira fácil e segura de enviar pagamentos online!">
                                    <img alt="" border="0" src="https://www.paypalobjects.com/pt_BR/i/scr/pixel.gif" width="1" height="1">
                                </form>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-center" href="javascript:;" onclick="openModal();">Transferência Bancária</a>
                        </div>
                    </div>                    
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
                .filter(p => p.visible && p.paypalId != "")
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
                        .replace('#stock', 'Obrigado :)')
                        .replace('#alertStyle', 'd-block')
                        .replace('#btnStyle', 'd-none');
                } else {
                    card = card
                        .replace('#alertStyle', 'd-none')
                        .replace('#btnStyle', 'd-block');

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
};

function openModal() {
    $('#myModal').modal('show');
};

function goToMessagePage() {
    window.location.href = '/mensagem.html'
};

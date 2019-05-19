$(document).ready(() => {
    // Template
    var template =
        `<div class="col-lg-3 col-md-4 pb-4">
            <div class="card">
                <img src="#image" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">#title</h5>                            
                    <p class="card-text">#description</p>
                    <h2 class="card-title pricing-card-title">#price</h2>
                    <a href="#" class="btn btn-sm btn-block btn-success">Comprar</a>
                </div>
            </div>
        </div>`;

    // Clear
    $('.container #listing').html('');

    // Get
    $.getJSON('api/products.json', (data) => {
        if (data) {
            // Add
            data.map((p) => {
                var card = template
                    .replace('#image', p.image)
                    .replace('#title', p.title)
                    .replace('#description', p.description)
                    .replace('#price', p.price.toLocaleString('pt-Br', { style: 'currency', currency: 'BRL' }));

                $('.container #listing').append(card);
            });
        }
    });
});
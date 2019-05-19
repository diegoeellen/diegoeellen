$(document).ready(() => {
    // Template
    var template =
        `<div class="col-lg-3 col-md-4 pb-4">
            <div class="card h-100">
                <img class="card-img-top" src="#image" alt="#alt">
                <div class="card-body">
                    <h5 class="card-title">#name</h5>
                    <p class="lead text-justify">#description</p>
                </div>
            </div>
        </div>`;

    // Clear
    $('#containerPadrinhos').html('');

    // Get
    $.getJSON('api/padrinhos.json', (data) => {
        if (data) {
            // Add
            data.map((p) => {
                var card = template
                    .replace('#image', p.image)
                    .replace('#alt', p.name)
                    .replace('#name', p.name)
                    .replace('#description', p.description);

                $('#containerPadrinhos').append(card);
            });
        }
    });
});  
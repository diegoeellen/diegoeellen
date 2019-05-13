$(document).ready(() => {
    // Set the date we're counting down to
    var countDownDate = new Date("Jan 4, 2020 11:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("cd-days").innerHTML = days;
        document.getElementById("cd-hours").innerHTML = hours;
        document.getElementById("cd-minutes").innerHTML = minutes;
        document.getElementById("cd-seconds").innerHTML = seconds;

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "CASADOS!!";
        }
    }, 1000);

    // Template
    var template =
        `<div class="col-6 col-md-4 col-lg-3 pb-3">
            <figure class="figure">
                <img src="#image" class="figure-img img-fluid rounded" alt="#alt">
                <p class="lead text-justify">#description</p>
            </figure>
        </div>`;

    // Clear
    $('.container #moments').html('');

    // Get
    $.getJSON('api/noivos.json', (data) => {
        if (data) {
            // Order
            data = data.sort((a, b) => {
                return (a.order === b.order ? 0 : (a.order > b.order ? 1 : -1));
            });

            // Filter
            data = data.filter((p) => p.visible);

            // Add
            data.map((p) => {
                var card = template
                    .replace('#image', p.image)
                    .replace('#alt', p.title)
                    .replace('#description', p.description);

                $('.container #moments').append(card);
            });
        }
    });
});
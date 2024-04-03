$(document).ready(() => {
    countDown();
    loadImagesNoivos();
});

function countDown() {
    // Set the date we're counting down to
    let countDownDate = new Date("Jan 4, 2020 11:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        let now = new Date().getTime();        
        let distance = countDownDate - now;        
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        
        if (distance > 0) {
            days = Math.floor(distance / (1000 * 60 * 60 * 24));
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }

        document.getElementById("cd-days").innerHTML = days;
        document.getElementById("cd-hours").innerHTML = hours;
        document.getElementById("cd-minutes").innerHTML = minutes;
        document.getElementById("cd-seconds").innerHTML = seconds;

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.querySelector("#countdown").previousElementSibling.innerHTML = "ENFIM CASADOS s2 s2 s2"
        }
    }, 1000);
}

function loadImagesNoivos() {
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
            // Filter
            data = data
                .filter((p) => p.visible)
                .sort((a, b) => { return a.order - b.order });

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
}

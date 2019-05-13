$(document).ready(function () {
    if (window.location.search.indexOf('?page=rsvp') > -1) {
        $('#confirmation').removeClass('d-none');
    } else {
        $('#message').removeClass('d-none');
    }

    window.setTimeout(() => {
        window.location.href = '/';
    }, 5000);
});
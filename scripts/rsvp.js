function submitRSVP() {
    clearInvalidCss();

    var isFormOk = true;
    var response = grecaptcha.getResponse();

    if ($.trim($('#name').val()) === '') {
        $('#name').addClass('is-invalid');
        isFormOk = false;
    }

    if ($.trim($('#email').val()) === '') {
        $('#email').addClass('is-invalid');
        isFormOk = false;
    }

    if ($.trim($('#phone').val()) === '') {
        $('#phone').addClass('is-invalid');
        isFormOk = false;
    }

    if ($.trim($('#choose').val()) === '0') {
        $('#choose').addClass('is-invalid');
        isFormOk = false;
    }

    var result = isFormOk && !!response;
    if (result) {
        var mybase = new MyFirebase();
        mybase.saveRSVP({
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            choose: $('#choose').val(),
            date: new Date(),
            visible: false,
            page: '/thanks.html?page=rsvp'
        });
    }
};

function clearInvalidCss() {
    $('#name').removeClass('is-invalid');
    $('#email').removeClass('is-invalid');
    $('#phone').removeClass('is-invalid');
    $('#choose').removeClass('is-invalid');
};
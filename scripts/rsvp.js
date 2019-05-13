$(document).ready(() => {
    // Form validate
    $('#frmRSVP').submit((event) => {
        clearInvalidCss();

        var isFormOk = true;

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

        return isFormOk;
    });

    // Clear
    clearInvalidCss = () => {
        $('#name').removeClass('is-invalid');
        $('#email').removeClass('is-invalid');
        $('#phone').removeClass('is-invalid');
        $('#choose').removeClass('is-invalid');
    };
});
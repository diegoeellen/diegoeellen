$(document).ready(() => {
    // Template
    var template =
        `<div class="media pt-3">
            <div class="media-body">
                <h4>#name <small><i>Posted on #date</i></small></h4>
                <p>#message</p>
            </div>
        </div>`;

    // Clear
    $('.container .messages').html('');

    // Get
    $.getJSON('api/messages.json', (data) => {
        if (data) {
            var count = 0;

            // Filter
            data = data.filter((p) => p.visible);

            // Check
            if (data.length > 0) {
                $('#messagesContainer').removeClass('d-none');
            }

            // Add
            data.map((m) => {
                var messageDate = new Date(m.date.year, m.date.month, m.date.day, m.date.hour, m.date.minute);
                var message = template
                    .replace('#name', m.name)
                    .replace('#date', messageDate.toUTCString())
                    .replace('#message', m.message);

                $('.container .messages').append(message);
                count++;

                if (data.length > count) {
                    $('.container .messages').append('<hr>');
                }
            });
        }
    });

    // Form validate
    $('#frmMessage').submit((event) => {
        clearInvalidCss();

        var isFormOk = true;

        if ($.trim($('#name').val()) === '') {
            $('#name').addClass('is-invalid');
            isFormOk = false;
        }

        if ($.trim($('#_replyto').val()) === '') {
            $('#_replyto').addClass('is-invalid');
            isFormOk = false;
        }

        if ($.trim($('#message').val()) === '') {
            $('#message').addClass('is-invalid');
            isFormOk = false;
        }

        return isFormOk;
    });

    // Clear
    clearInvalidCss = () => {
        $('#name').removeClass('is-invalid');
        $('#_replyto').removeClass('is-invalid');
        $('#message').removeClass('is-invalid');
    };
});
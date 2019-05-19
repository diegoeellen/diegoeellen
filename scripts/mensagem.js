$(document).ready(() => {
    loadMessages();
});

function submitMessage() {
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

    if ($.trim($('#message').val()) === '') {
        $('#message').addClass('is-invalid');
        isFormOk = false;
    }

    var result = isFormOk && !!response;
    if (result) {
        var mybase = new myFirebase();
        mybase.saveMessage({
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val(),
            date: new Date(),
            visible: false,
            page: '/thanks.html'
        });
    }
};

async function loadMessages() {
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
    var mybase = new myFirebase();
    var messages = await mybase.getMessages();

    if (messages) {
        var count = 0;

        // Check
        if (messages.length > 0) {
            $('#messagesContainer').removeClass('d-none');
        }

        // Add
        messages.map((m) => {
            var messageDate = new Date(m.date.year, m.date.month, m.date.day, m.date.hour, m.date.minute);
            var message = template
                .replace('#name', m.name)
                .replace('#date', messageDate.toUTCString())
                .replace('#message', m.message);

            $('.container .messages').append(message);
            count++;

            if (messages.length > count) {
                $('.container .messages').append('<hr>');
            }
        });
    }
};

function clearInvalidCss() {
    $('#name').removeClass('is-invalid');
    $('#email').removeClass('is-invalid');
    $('#message').removeClass('is-invalid');
};

var myBase = new MyFirebase();

$(document).ready(() => {
    loadMessages();
    checkSource();
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
        myBase.saveMessage({
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
        `<div class="media pb-3">
            <div class="media-body">
                <h4>#name <small><i>Posted on #date</i></small></h4>
                <p>#message</p>
                <span>&#129505;&#128077;</span>
            </div>
        </div>`;

    // Clear
    $('.container .messages').html('');

    // Get
    var messages = await myBase.getMessages();
    if (messages && messages.length) {
        var count = 0;

        messages.forEach((e, i) => {
            var messageTemplate = template
                .replace('#name', e.name)
                .replace('#date', GetDateString(e.date))
                .replace('#message', e.message);

            $('.container .messages').append(messageTemplate);
            count++;

            if (messages.length > count) {
                $('.container .messages').append('<hr>');
            }
        });

        // Check
        if (count > 0) {
            $('#messagesContainer').removeClass('d-none');
        }
    }
};

function clearInvalidCss() {
    $('#name').removeClass('is-invalid');
    $('#email').removeClass('is-invalid');
    $('#message').removeClass('is-invalid');
};

function GetDateString(date) {
    return new Date(date.year, date.month, date.day, date.hour, date.minute).toLocaleString();
}

function checkSource() {
    let params = new URLSearchParams(window.location.search);
    let hasSuccess = params && params.get("success") === "true";
    if (hasSuccess) {
        $('#myModal').modal({
            keyboard: false
        });

        $('#myModal').on('hidden.bs.modal', function (e) {
            $('html,body').animate({ scrollTop: $('.container').offset().top - 130 }, 'slow');
        });
    }
}

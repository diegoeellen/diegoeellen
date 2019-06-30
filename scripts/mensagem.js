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
        `<div class="media pt-3">
            <div class="media-body">
                <h4>#name <small><i>Posted on #date</i></small></h4>
                <p>#message</p>
            </div>
        </div>`;

    // Clear
    $('.container .messages').html('');

    // Get
    var messages = await myBase.getMessages();
    if (messages) {
        var count = 0;
        var keys = Object.keys(messages);

        // Filter & Add        
        keys.filter(k => messages[k].visible)
            .forEach((m) => {
                var message = messages[m];
                var messageTemplate = template
                    .replace('#name', message.name)
                    .replace('#date', GetDateString(message.date))
                    .replace('#message', message.message);

                $('.container .messages').append(messageTemplate);
                count++;

                if (keys.length > count) {
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

        $('#myModal').on('hidden.bs.modal', function(e) {
            $('html,body').animate({ scrollTop: $('.container').offset().top - 130 }, 'slow');
        });
    }
}
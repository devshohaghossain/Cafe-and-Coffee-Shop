$(document).ready(function() {
    $('#send_message').click(function(e) {
        e.preventDefault(); // Prevent form submission

        // Reset error state
        var error = false;
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var phone = $('#phone').val().trim();
        var message = $('#message').val().trim();

        // Remove previous error styles when typing again
        $('#name, #email, #phone, #message').on('input', function() {
            $(this).removeClass("error_input");
        });

        // Validation rules
        if (name.length === 0) {
            error = true;
            $('#name').addClass("error_input");
        }

        if (email.length === 0 || email.indexOf('@') === -1) {
            error = true;
            $('#email').addClass("error_input");
        }

        if (phone.length === 0) {
            error = true;
            $('#phone').addClass("error_input");
        }

        if (message.length === 0) {
            error = true;
            $('#message').addClass("error_input");
        }

        // Process the form if no error
        if (!error) {
            $('#send_message').attr({
                'disabled': true,
                'value': 'Sending...'
            });

            $.post("contact-2.html", $("#contact_form").serialize(), function(result) {
                if (result.trim() === 'sent') {
                    // Success message
                    $('#contact_form').fadeOut(400, function() {
                        $('<div id="success_message" class="alert alert-success mt-3">Your message has been sent successfully!</div>')
                            .hide()
                            .appendTo($(this).parent())
                            .fadeIn(500);
                    });
                } else {
                    // Failure message
                    if (!$('#mail_fail').length) {
                        $('<div id="mail_fail" class="alert alert-danger mt-3">Message failed to send. Please try again.</div>')
                            .hide()
                            .appendTo($('#contact_form').parent())
                            .fadeIn(500);
                    }
                    $('#send_message').removeAttr('disabled').attr('value', 'Send Message');
                }
            });
        }
    });
});

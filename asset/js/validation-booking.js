$(document).ready(function () {

    $("#contact_form").on("submit", function (e) {

        e.preventDefault();

        let error = false;

        $("input, select, textarea").removeClass("error_input");
        $("#error_message").hide();

        const guests = $("#guests").val();
        const date = $("#date").val();
        const time = $("#time").val();
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const phone = $("#phone").val().trim();

        if (!guests) {
            $("#guests").addClass("error_input");
            error = true;
        }

        if (!date) {
            $("#date").addClass("error_input");
            error = true;
        }

        if (!time) {
            $("#time").addClass("error_input");
            error = true;
        }

        if (name === "") {
            $("#name").addClass("error_input");
            error = true;
        }

        if (email === "" || email.indexOf("@") === -1) {
            $("#email").addClass("error_input");
            error = true;
        }

        if (phone === "") {
            $("#phone").addClass("error_input");
            error = true;
        }

        if (error) {
            return;
        }

        $("#send_message")
            .prop("disabled", true)
            .val("Sending...");

        $.ajax({

            url: "booking.php",
            type: "POST",
            data: $("#contact_form").serialize(),

            success: function (result) {

                if ($.trim(result) === "sent") {

                    let html = "";

                    html += '<table class="table table-bordered table-striped">';
                    html += "<tbody>";

                    html += "<tr><th width='220'>Name</th><td>" + $("#name").val() + "</td></tr>";
                    html += "<tr><th>Email</th><td>" + $("#email").val() + "</td></tr>";
                    html += "<tr><th>Phone</th><td>" + $("#phone").val() + "</td></tr>";
                    html += "<tr><th>Number of Guests</th><td>" + $("#guests").val() + "</td></tr>";
                    html += "<tr><th>Reservation Date</th><td>" + $("#date").val() + "</td></tr>";
                    html += "<tr><th>Reservation Time</th><td>" + $("#time").val() + "</td></tr>";
                    html += "<tr><th>Special Requests</th><td>" + $("#message").val().replace(/\n/g, "<br>") + "</td></tr>";

                    html += "</tbody>";
                    html += "</table>";

                    $("#booking_summary").html(html);

                    $("#contact_form").hide();

                    $("#booking_success")
                        .removeClass("d-none")
                        .hide()
                        .fadeIn(500);

                } else {

                    $("#error_message").show();

                    $("#send_message")
                        .prop("disabled", false)
                        .val("Reserve a Table");

                }

            },

            error: function () {

                $("#error_message").show();

                $("#send_message")
                    .prop("disabled", false)
                    .val("Reserve a Table");

            }

        });

    });

});
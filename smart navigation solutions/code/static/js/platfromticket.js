$(document).ready(function () {
    // Ticket price calculation
    $("#tickets").on("input", function () {
        let ticketCount = parseInt($(this).val());
        if (isNaN(ticketCount) || ticketCount < 1) {
            $("#total-price").text("Please enter a valid number of tickets.");
            return;
        }
        let ticketPrice = 10; // Assume ₹10 per ticket
        let totalPrice = ticketCount * ticketPrice;
        $("#total-price").text(`Total Price: ₹${totalPrice}`);
    });

    // Form submission using AJAX
    $("#ticket-form").on("submit", function (e) {
        e.preventDefault();
        
        let station = $("#station-search").val();
        let tickets = $("#tickets").val();
        let totalPrice = tickets * 10;

        // Validate input
        if (!station || isNaN(tickets) || tickets < 1) {
            alert("Please enter a valid station and number of tickets.");
            return;
        }

        // Send data to Flask backend
        $.ajax({
            type: "POST",
            url: "/generate_qr",  // Ensure this matches your Flask route
            data: {
                station: station,
                tickets: tickets,
                total_price: totalPrice
            },
            success: function (response) {
                // Redirect to the QR code page with response data
                window.location.href = `/qr?station=${encodeURIComponent(station)}&tickets=${tickets}&totalPrice=${totalPrice}`;
            },
            error: function () {
                alert("Error processing your request. Please try again.");
            }
        });
    });
});

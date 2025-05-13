document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const classSelect = document.getElementById("class");
    const trainNumberContainer = document.getElementById("train-number-container");
    const trainNumberInput = document.getElementById("train-number");

    // Show or hide the Train Number field based on selected class
    classSelect.addEventListener("change", function () {
        if (["first", "second", "sleeper", "chair"].includes(classSelect.value)) {
            trainNumberContainer.style.display = "block";
            trainNumberInput.setAttribute("required", "required"); // Train Number is required
        } else {
            trainNumberContainer.style.display = "none";
            trainNumberInput.removeAttribute("required"); // Not required for General
        }
    });

    // Form validation and submission handling
    document.getElementById("ticket-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const from = document.getElementById("from-station").value;
        const to = document.getElementById("to-station").value;
        const date = document.getElementById("date").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const travelClass = document.getElementById("class").value;
        const seats = parseInt(document.getElementById("seats").value);
        const trainNumber = trainNumberInput.value.trim(); 

        // Ensure the date is today or in the future
        const today = new Date().toISOString().split('T')[0];
        if (date < today) {
            alert("You cannot book tickets for past dates.");
            return;
        }

        // Ensure seats do not exceed 4
        if (seats > 4) {
            alert("You cannot book more than 4 tickets.");
            return;
        }

        // Ensure train number is entered for required classes
        if (["first", "second", "sleeper", "chair"].includes(travelClass) && trainNumber === "") {
            alert("Please enter the Train Number for the selected class.");
            return;
        }

        // Calculate ticket price
        const baseFare = 500; // Base price per seat
        const priceMultiplier = {
            "first": 2.5,
            "second": 2.0,
            "sleeper": 1.5,
            "chair": 1.2,
            "general": 1.0
        };
        const totalPrice = baseFare * priceMultiplier[travelClass] * seats;

        // Redirect to QR code page with parameters
        let queryParams = `?name=${encodeURIComponent(name)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&class=${encodeURIComponent(travelClass)}&seats=${seats}&price=${totalPrice}`;
        
        // Include train number in URL if applicable
        if (trainNumber) {
            queryParams += `&train=${encodeURIComponent(trainNumber)}`;
        }

        window.location.href = "/homepage/qrcode.html" + queryParams;
    });

    // Restrict past dates
    document.getElementById("date").setAttribute("min", new Date().toISOString().split('T')[0]);
});

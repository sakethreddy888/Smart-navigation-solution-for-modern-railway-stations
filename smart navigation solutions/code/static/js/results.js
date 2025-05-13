document.addEventListener("DOMContentLoaded", function () {
    const hotels = JSON.parse(localStorage.getItem("hotelResults"));

    if (!hotels || hotels.length === 0) {
        document.getElementById("results").innerHTML = "<p>No hotels found.</p>";
        return;
    }

    let resultsHTML = "<h2>Hotel Results</h2>";
    hotels.forEach(hotel => {
        resultsHTML += `
            <div class="hotel-card">
                <h3>${hotel.name}</h3>
                <p>Distance: ${hotel.distance}</p>
                <p>Price: ${hotel.price}</p>
                <img src="/static/images/${hotel.image}" alt="${hotel.name}" width="200">
            </div>
        `;
    });

    document.getElementById("results").innerHTML = resultsHTML;
});

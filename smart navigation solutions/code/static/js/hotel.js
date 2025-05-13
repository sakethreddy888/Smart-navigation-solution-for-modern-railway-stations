const apiKey = "AlzaSycZMn48p16q4K92SyiSOcI_jd-TYkzNpin"; // Replace with your actual Google API Key

const hotelsData = {
    "New Delhi": [
        { name: "The Leela Palace", distance: "200m", price: "1200", lat: 28.6139, lng: 77.2090 },
        { name: "Taj Mahal Hotel", distance: "500m", price: "1500", lat: 28.6117, lng: 77.2138 },
        { name: "Hotel Blue Sapphire", distance: "800m", price: "800", lat: 28.6200, lng: 77.2102 }
    ],
    "Mumbai CST": [
        { name: "The Oberoi", distance: "300m", price: "2000", lat: 18.9283, lng: 72.8335 },
        { name: "Trident Nariman Point", distance: "600m", price: "1800", lat: 18.9281, lng: 72.8200 },
        { name: "Hotel Sea Rock", distance: "900m", price: "1000", lat: 18.9350, lng: 72.8450 }
    ],
    "Chennai Central": [
        { name: "ITC Grand Chola", distance: "250m", price: "1400", lat: 13.0827, lng: 80.2707 },
        { name: "Taj Coromandel", distance: "550m", price: "1700", lat: 13.0600, lng: 80.2500 },
        { name: "The Raintree", distance: "850m", price: "900", lat: 13.0500, lng: 80.2300 }
    ],
    "Kolkata Howrah": [
        { name: "The Oberoi Grand", distance: "400m", price: "1600", lat: 22.5726, lng: 88.3639 },
        { name: "Hotel Hindusthan International", distance: "700m", price: "1110", lat: 22.5720, lng: 88.3635 },
        { name: "Taj Bengal", distance: "1km", price: "2300", lat: 22.5460, lng: 88.3625 }
    ],
    "Bangalore City": [
        { name: "ITC Windsor", distance: "350m", price: "2000", lat: 12.9716, lng: 77.5946 },
        { name: "The Ritz-Carlton", distance: "750m", price: "2200", lat: 12.9721, lng: 77.5995 },
        { name: "Shangri-La", distance: "1.2km", price: "1400", lat: 12.9760, lng: 77.6012 }
    ],
    "Hyderabad Secunderabad": [
        { name: "Taj Krishna", distance: "500m", price: "1900", lat: 17.3850, lng: 78.4867 },
        { name: "ITC Kohenur", distance: "800m", price: "3000", lat: 17.3950, lng: 78.4825 },
        { name: "The Park Hyderabad", distance: "1km", price: "2220", lat: 17.4200, lng: 78.4800 }
    ],
    "Ahmedabad Junction": [
        { name: "Hyatt Regency", distance: "400m", price: "1404", lat: 23.0225, lng: 72.5714 },
        { name: "Courtyard by Marriott", distance: "700m", price: "4500", lat: 23.0250, lng: 72.5700 },
        { name: "Lemon Tree Premier", distance: "1km", price: "1000", lat: 23.0300, lng: 72.5650 }
    ],
    "Pune Junction": [
        { name: "JW Marriott", distance: "300m", price: "5000", lat: 18.5204, lng: 73.8567 },
        { name: "The Westin Pune", distance: "650m", price: "900", lat: 18.5215, lng: 73.8500 },
        { name: "Sheraton Grand", distance: "900m", price: "1110", lat: 18.5250, lng: 73.8400 }
    ],
    "Jaipur Junction": [
        { name: "Rambagh Palace", distance: "250m", price: "700", lat: 26.9124, lng: 75.7873 },
        { name: "ITC Rajputana", distance: "600m", price: "1500", lat: 26.9150, lng: 75.7830 },
        { name: "The Lalit Jaipur", distance: "950m", price: "1300", lat: 26.9200, lng: 75.7800 }
    ],
    "Lucknow Charbagh": [
        { name: "Hotel Clarks Avadh", distance: "400m", price: "1120", lat: 26.8467, lng: 80.9462 },
        { name: "Taj Mahal Lucknow", distance: "700m", price: "1400", lat: 26.8500, lng: 80.9400 },
        { name: "Hyatt Regency Lucknow", distance: "1km", price: "1000", lat: 26.8600, lng: 80.9300 }
    ]

};

// **🎤 Voice Recognition Function**
function startVoiceRecognition(inputId, type) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.start();

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript.trim();

        switch (type) {
            case 'text':
                document.getElementById(inputId).value = transcript;
                break;
            case 'date':
                let date = new Date(transcript);
                if (!isNaN(date.getTime())) {
                    document.getElementById(inputId).value = date.toISOString().split('T')[0];
                } else {
                    alert("Invalid date. Try again.");
                    return;
                }
                break;
            case 'number':
                let number = parseInt(transcript);
                if (!isNaN(number) && number > 0 && number <= 10) {
                    document.getElementById(inputId).value = number;
                } else {
                    alert("Invalid number. Enter between 1 and 10.");
                    return;
                }
                break;
            case 'select':
                transcript = transcript.toLowerCase();
                if (transcript.includes('ac')) {
                    document.getElementById(inputId).value = "AC";
                } else if (transcript.includes('non-ac') || transcript.includes('non ac')) {
                    document.getElementById(inputId).value = "Non-AC";
                } else {
                    alert("Invalid room type. Say 'AC' or 'Non-AC'.");
                    return;
                }
                break;
        }
    };

    recognition.onerror = function () {
        alert('Voice recognition error. Please try again.');
    };
}

// **🔎 Handle Search Button Click**
document.getElementById("searchButton").addEventListener("click", function () {
    const place = document.getElementById("place").value;
    const checkInDate = document.getElementById("checkInDate").value;
    const checkOutDate = document.getElementById("checkOutDate").value;
    const rooms = document.getElementById("roomsInput").value;

    if (!place) {
        alert("❌ Please enter a place!");
        return;
    }
    if (!checkInDate || !checkOutDate || checkOutDate <= checkInDate) {
        alert("❌ Check-in and check-out dates must be valid!");
        return;
    }
    if (rooms < 1 || rooms > 10) {
        alert("❌ Number of rooms must be between 1 and 10!");
        return;
    }

    const hotels = hotelsData[place] || [];
    let resultsHTML = `<h2>Hotels near ${place}</h2>`;

    if (hotels.length === 0) {
        resultsHTML += `<p>No hotels found.</p>`;
    } else {
        hotels.forEach(hotel => {
            resultsHTML += `
                <div class="hotel-card">
                    <img id="img-${hotel.lat}-${hotel.lng}" src="placeholder.jpg" alt="Hotel Image" width="200">
                    <h3>${hotel.name}</h3>
                    <p>⭐ 4.5 Rating</p>
                    <p><strong>Distance:</strong> ${hotel.distance} from station</p>
                    <p><strong>Price:</strong> ₹${hotel.price} per night</p>
                    <button onclick="showDirections(${hotel.lat}, ${hotel.lng}, 'map-${hotel.lat}-${hotel.lng}')">Get Directions</button>
                    <div id="map-${hotel.lat}-${hotel.lng}" class="map-container" style="display:none; width: 100%; height: 300px;"></div>
                </div>
            `;
            fetchHotelImage(hotel.name, hotel.lat, hotel.lng); // Fetch image
        });
    }

    document.getElementById("results").innerHTML = resultsHTML;
});

// **📸 Fetch Hotel Image from Google Places API**
function fetchHotelImage(hotelName, lat, lng) {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(hotelName)}&inputtype=textquery&fields=photos&key=${apiKey}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].photos) {
                const photoRef = data.candidates[0].photos[0].photo_reference;
                const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${apiKey}`;
                document.getElementById(`img-${lat}-${lng}`).src = photoUrl;
            }
        })
        .catch(error => console.error("Error fetching hotel image:", error));
}

// **🗺️ Function to Show Directions**
function showDirections(hotelLat, hotelLng, mapId) {
    const mapContainer = document.getElementById(mapId);

    // Toggle visibility
    if (mapContainer.style.display === "block") {
        mapContainer.style.display = "none"; // Hide the map if it's already displayed
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                displayDirections(userLat, userLng, hotelLat, hotelLng, mapId);
            },
            function (error) {
                alert("❌ Geolocation failed! Please enter your location manually.");
                let userLocation = prompt("Enter your location (latitude, longitude):", "28.6139, 77.2090");
                if (userLocation) {
                    let [userLat, userLng] = userLocation.split(",").map(Number);
                    displayDirections(userLat, userLng, hotelLat, hotelLng, mapId);
                }
            }
        );
    } else {
        alert("❌ Geolocation is not supported. Please enter your location manually.");
    }
}

// **🗺️ Display Directions on Map**
function displayDirections(userLat, userLng, hotelLat, hotelLng, mapId) {
    const mapContainer = document.getElementById(mapId);
    mapContainer.style.display = "block"; // Show the map

    const map = new google.maps.Map(mapContainer, {
        center: { lat: hotelLat, lng: hotelLng }, // Focus on hotel
        zoom: 14,
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
        origin: { lat: userLat, lng: userLng },
        destination: { lat: hotelLat, lng: hotelLng },
        travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        } else {
            alert("❌ Unable to fetch directions!");
        }
    });
}

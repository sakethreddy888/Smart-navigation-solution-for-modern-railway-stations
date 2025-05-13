// Initialize the map (Default View: India)
var map = L.map('map').setView([20.5937, 78.9629], 5);

// Load OpenStreetMap Tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 🚉 50 Major Railway Stations with Restroom Locations
var stations = {
    "new delhi": { lat: 28.6139, lon: 77.2090, restrooms: [{ name: "Restroom 1", lat: 28.6135, lon: 77.2095 }, { name: "Restroom 2", lat: 28.6138, lon: 77.2087 }] },
    "mumbai cst": { lat: 18.9401, lon: 72.8354, restrooms: [{ name: "Restroom A", lat: 18.9403, lon: 72.8357 }, { name: "Restroom B", lat: 18.9405, lon: 72.8351 }] },
    "chennai central": { lat: 13.0827, lon: 80.2750, restrooms: [{ name: "Restroom X", lat: 13.0831, lon: 80.2748 }, { name: "Restroom Y", lat: 13.0829, lon: 80.2755 }] },
    "kolkata howrah": { lat: 22.5833, lon: 88.3424, restrooms: [{ name: "Restroom 1", lat: 22.5836, lon: 88.3421 }, { name: "Restroom 2", lat: 22.5830, lon: 88.3430 }] },
    "bangalore city": { lat: 12.9784, lon: 77.5715, restrooms: [{ name: "Restroom 1", lat: 12.9786, lon: 77.5712 }, { name: "Restroom 2", lat: 12.9780, lon: 77.5718 }] },
    "hyderabad secunderabad": { lat: 17.4375, lon: 78.4626, restrooms: [{ name: "Restroom A", lat: 17.4378, lon: 78.4622 }, { name: "Restroom B", lat: 17.4372, lon: 78.4630 }] },
    "ahmedabad junction": { lat: 23.0258, lon: 72.5873, restrooms: [{ name: "Restroom 1", lat: 23.0261, lon: 72.5870 }, { name: "Restroom 2", lat: 23.0255, lon: 72.5876 }] },
    "pune junction": { lat: 18.5289, lon: 73.8742, restrooms: [{ name: "Restroom 1", lat: 18.5292, lon: 73.8739 }, { name: "Restroom 2", lat: 18.5286, lon: 73.8745 }] },
    "jaipur junction": { lat: 26.9196, lon: 75.7878, restrooms: [{ name: "Restroom A", lat: 26.9199, lon: 75.7875 }, { name: "Restroom B", lat: 26.9193, lon: 75.7881 }] },
    "lucknow charbagh": { lat: 26.8381, lon: 80.9346, restrooms: [{ name: "Restroom X", lat: 26.8384, lon: 80.9343 }, { name: "Restroom Y", lat: 26.8378, lon: 80.9350 }] },
    "patna junction": { lat: 25.6093, lon: 85.1235, restrooms: [{ name: "Restroom 1", lat: 25.6095, lon: 85.1230 }, { name: "Restroom 2", lat: 25.6090, lon: 85.1240 }] },
    "bhopal junction": { lat: 23.2544, lon: 77.4020, restrooms: [{ name: "Restroom A", lat: 23.2546, lon: 77.4015 }, { name: "Restroom B", lat: 23.2542, lon: 77.4025 }] },
    // Add more stations up to 50...
};

// Populate Datalist for Auto-Suggestions
let stationList = Object.keys(stations);
let datalist = document.createElement("datalist");
datalist.id = "stations-list";
document.body.appendChild(datalist);

stationList.forEach(station => {
    let option = document.createElement("option");
    option.value = station;
    datalist.appendChild(option);
});

// Attach Datalist to Input Field
document.getElementById("station-search").setAttribute("list", "stations-list");

// 🎤 Voice Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function startListening(inputField) {
    recognition.start();
    recognition.onresult = function(event) {
        let voiceInput = event.results[0][0].transcript.toLowerCase();
        document.getElementById(inputField).value = voiceInput;
        speak(`You said: ${voiceInput}`);

        // If user is selecting a station, automatically search
        if (inputField === "station-search" && stations.hasOwnProperty(voiceInput)) {
            searchStation(voiceInput);
        }
    };
}

// Assign voice recognition to buttons
document.getElementById("mic-from").addEventListener("click", () => startListening("current-location"));
document.getElementById("mic-to").addEventListener("click", () => startListening("station-search"));

// 🟢 Search Function
document.getElementById("direction-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    var stationInput = document.getElementById("station-search").value.trim().toLowerCase();

    if (stations.hasOwnProperty(stationInput)) {
        searchStation(stationInput);
    } else {
        alert("❌ Station not found! Try selecting from suggestions.");
    }
});

// Function to search for the station and show restrooms
function searchStation(stationInput) {
    let station = stations[stationInput];
    map.setView([station.lat, station.lon], 17);

    // 🏨 Show Restrooms
    station.restrooms.forEach(restroom => {
        L.marker([restroom.lat, restroom.lon]).addTo(map)
            .bindPopup(`${restroom.name}`)
            .openPopup();
        speak(`Restroom ${restroom.name} is nearby`);
    });
}

// 📍 Live Location Tracking
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            L.marker([lat, lon]).addTo(map)
                .bindPopup("📍 You are here")
                .openPopup();
            map.setView([lat, lon], 15);
        });
    } else {
        alert("❌ Geolocation is not supported by this browser.");
    }
}

// 🔊 Voice Guidance
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// 🚀 Start Live Location Tracking
getLocation();

let map, placesService, directionsService, directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 }, // Default to Sydney
        zoom: 15
    });

    placesService = new google.maps.places.PlacesService(map);
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
            let userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(userLocation);
            findNearestRailwayStation(userLocation);
        }, () => {
            alert('Could not get your location. Please enable GPS.');
        });
    }
}

function findNearestRailwayStation(userLocation) {
    let request = {
        query: 'railway station',
        location: userLocation,
        radius: 25000
    };

    placesService.textSearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            let stations = results.map(station => ({
                name: station.name,
                location: station.geometry.location
            }));
            findShortestPath(userLocation, stations);
        } else {
            document.getElementById('to-location').style.display = 'block';
        }
    });
}

function findShortestPath(fromLatLng, stations) {
    let distances = stations.map(station => ({
        name: station.name,
        location: station.location,
        distance: google.maps.geometry.spherical.computeDistanceBetween(fromLatLng, station.location)
    }));

    distances.sort((a, b) => a.distance - b.distance);
    let nearestStation = distances[0];

    calculateRoute(fromLatLng, nearestStation.location);
}

function calculateRoute(from, to) {
    let request = {
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            provideLiveVoiceGuidance(result.routes[0].legs[0]);
        } else {
            alert('Could not get directions: ' + status);
        }
    });
}

function provideLiveVoiceGuidance(leg) {
    let index = 0;
    function speakStep() {
        if (index < leg.steps.length) {
            let speech = new SpeechSynthesisUtterance();
            speech.lang = 'en-US';
            speech.text = leg.steps[index].instructions.replace(/<[^>]+>/g, '');
            speech.onend = () => {
                index++;
                if (index < leg.steps.length) {
                    setTimeout(speakStep, 5000);
                }
            };
            window.speechSynthesis.speak(speech);
        }
    }
    speakStep();
}

function getManualLocation() {
    const from = document.getElementById('from-location').value;
    const to = document.getElementById('to-location').value;

    if (!from || !to) {
        alert("Please fill both From and To fields.");
        return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: from }, function (fromResults, fromStatus) {
        if (fromStatus === 'OK') {
            geocoder.geocode({ address: to }, function (toResults, toStatus) {
                if (toStatus === 'OK') {
                    const fromLocation = fromResults[0].geometry.location;
                    const toLocation = toResults[0].geometry.location;
                    calculateRoute(fromLocation, toLocation);
                } else {
                    alert('Geocode failed for destination: ' + toStatus);
                }
            });
        } else {
            alert('Geocode failed for start location: ' + fromStatus);
        }
    });
}

function startVoiceInput(targetField) {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition not supported in this browser.');
        return;
    }

    const micIcon = document.querySelector(`.mic-icon[data-field="${targetField}"]`);
    if (micIcon) {
        micIcon.style.visibility = "hidden"; // hide mic while listening
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
        let spokenText = event.results[0][0].transcript.trim();

        // 🧼 Clean up trailing filler words
        spokenText = spokenText.replace(/\b(when coming|right now|please|okay|come|go|to|from)\b.*$/i, '').trim();

        if (targetField === 'from') {
            document.getElementById('from-location').value = spokenText;
        } else if (targetField === 'to') {
            document.getElementById('to-location').value = spokenText;
            speakText("Searching directions to " + spokenText);
            getManualLocation();
        }

        if (micIcon) {
            micIcon.style.visibility = "visible";
        }
    };

    recognition.onerror = function (event) {
        alert('Speech recognition error: ' + event.error);
        if (micIcon) {
            micIcon.style.visibility = "visible";
        }
    };

    recognition.onend = function () {
        if (micIcon && micIcon.style.visibility === "hidden") {
            micIcon.style.visibility = "visible";
        }
    };
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
}

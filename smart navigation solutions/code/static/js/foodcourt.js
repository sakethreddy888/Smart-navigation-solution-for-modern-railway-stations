let map, directionsRenderer, directionsService;
let userLocation = null;
let speechSynthesis = window.speechSynthesis;

// Mock food courts (replace with real API calls)
let foodCourts = [
    { name: "Food Court A", lat: 12.9716, lng: 77.5946 },
    { name: "Food Court B", lat: 12.9750, lng: 77.5990 },
    { name: "Food Court C", lat: 12.9685, lng: 77.5958 }
];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 15
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    getUserLocation();
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLocation = { 
                lat: position.coords.latitude, 
                lng: position.coords.longitude 
            };

            document.getElementById("from-location").value = 
                `Lat: ${userLocation.lat}, Lng: ${userLocation.lng}`;
            
            map.setCenter(userLocation);
        }, () => {
            alert("Geolocation permission denied.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function findNearestFoodCourt() {
    if (!userLocation) {
        alert("User location not available.");
        return;
    }

    let graph = buildGraph(foodCourts, userLocation);
    let nearest = dijkstra(graph, "user", foodCourts.map(fc => fc.name));

    if (nearest) {
        let nearestFoodCourt = foodCourts.find(fc => fc.name === nearest);
        document.getElementById("to-location").value = nearestFoodCourt.name;
        let destination = { lat: nearestFoodCourt.lat, lng: nearestFoodCourt.lng };

        speak(`Navigating to ${nearestFoodCourt.name}`);
        calculateRoute(userLocation, destination);
    } else {
        alert("No nearby food courts found.");
    }
}

function buildGraph(foodCourts, userLocation) {
    let graph = {};
    graph["user"] = {};

    foodCourts.forEach(fc => {
        let distance = haversineDistance(userLocation, fc);
        graph["user"][fc.name] = distance;
    });

    foodCourts.forEach((fc1, i) => {
        graph[fc1.name] = {};
        foodCourts.forEach((fc2, j) => {
            if (i !== j) {
                graph[fc1.name][fc2.name] = haversineDistance(fc1, fc2);
            }
        });
    });

    return graph;
}

function dijkstra(graph, start, destinations) {
    let distances = {};
    let visited = {};
    let previous = {};
    let nodes = new Set(Object.keys(graph));

    nodes.forEach(node => distances[node] = Infinity);
    distances[start] = 0;

    while (nodes.size) {
        let minNode = null;

        nodes.forEach(node => {
            if (minNode === null || distances[node] < distances[minNode]) {
                minNode = node;
            }
        });

        if (minNode === null || distances[minNode] === Infinity) break;

        nodes.delete(minNode);
        visited[minNode] = true;

        if (destinations.includes(minNode)) return minNode;

        Object.keys(graph[minNode]).forEach(neighbor => {
            if (!visited[neighbor]) {
                let newDist = distances[minNode] + graph[minNode][neighbor];
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    previous[neighbor] = minNode;
                }
            }
        });
    }

    return null;
}

function haversineDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
    const dLng = (coord2.lng - coord1.lng) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coord1.lat * (Math.PI / 180)) * 
        Math.cos(coord2.lat * (Math.PI / 180)) * 
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function calculateRoute(origin, destination) {
    let request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            provideVoiceNavigation(result);
        } else {
            alert("Could not find directions.");
        }
    });
}

function provideVoiceNavigation(directionsResult) {
    let steps = directionsResult.routes[0].legs[0].steps;

    steps.forEach((step, index) => {
        setTimeout(() => {
            speak(step.instructions.replace(/<[^>]+>/g, ''));
        }, index * 5000);
    });
}

function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

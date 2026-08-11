let map;
let directionsService;
let directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: 51.207, lng: 16.161 } // Legnica
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

window.initMap = initMap;

document.getElementById("calcBtn").addEventListener("click", () => {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const rate = parseFloat(document.getElementById("vehicle").value);

    if (!start || !end) {
        alert("Wpisz pełne adresy!");
        return;
    }

    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            const distanceMeters = result.routes[0].legs[0].distance.value;
            const distanceKm = distanceMeters / 1000;
            const price = distanceKm * rate;

            document.getElementById("output").innerHTML =
                `Dystans: ${distanceKm.toFixed(2)} km<br>Cena: ${price.toFixed(2)} zł`;
        } else {
            alert("Nie można obliczyć trasy.");
        }
    });
});
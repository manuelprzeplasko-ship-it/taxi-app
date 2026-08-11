
async function getDistance(origin, destination) {
    const apiKey = "AIzaSyBo7fxKQB3dTjyyn0sn5M4wOOIz0KDboYw"; 

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    try {
        return data.routes[0].legs[0].distance.value / 1000; // km
    } catch {
        return null;
    }
}

async function calculate() {
    const vehicle = document.getElementById("vehicle").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    const km = await getDistance(from, to);

    if (!km) {
        document.getElementById("result").innerHTML = "Nie można obliczyć dystansu.";
        return;
    }

    let price = 0;

    if (vehicle === "bmw") price = 30 + km * 6;
    if (vehicle === "van") price = 10 + km * 5;
    if (vehicle === "normal") price = 8 + km * 4;

    document.getElementById("result").innerHTML =
        `Dystans: ${km.toFixed(2)} km<br>Cena: ${price.toFixed(2)} zł`;
}
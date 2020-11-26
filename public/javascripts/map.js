var mymap = L.map('main_map').setView([-34.6012424,-58.3861497], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FyaTAwMTgiLCJhIjoiY2toeXZwZDJhMHhuODJybmp2bXRoaHFqZSJ9.YccPPyZzlErJs1Fnr3dxrQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

L.marker([-34.6012424,-58.3861497]).addTo(mymap);
L.marker([-34.596932,-58.3808287]).addTo(mymap);
L.marker([-34.599564,-58.3778777]).addTo(mymap);


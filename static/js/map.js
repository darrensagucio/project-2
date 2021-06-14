var myMap = L.map("map", {
    center: [37.8,-96],
    zoom: 4
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
}).addTo(myMap);

function getColor(d){
    return d > 50 ? '#282828' :
            d > 40 ? '#787878' : 
            d > 30 ? '#989898' :
            d > 15 ? '#B8B8B8' :
                      '#D3D3D3';
                      
}

function style (info) {
    return {
        color: "white",
        fillColor: getColor(parseInt(info.properties.STATE)),
        fillOpacity: 1,
        weight: 1.5
    }
}
var info = L.control(); 

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (label) {
    this._div.innerHTML = '<h4>Food Insecurity In The U.S</h4>'
}; 

info.addTo(myMap);

function highlightFeature(e) {
    var layer = e.target; 

    layer.setStyle({
        weight: 5,
        color: '#667',
        dashArray: '',
        fillOpaciity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

var geojson; 

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    })
    layer.on('click', function() {
        layer.bindPopup('<h2>' + feature.properties.NAME + '</h2><h2>' + feature.properties.STATE + '</h2>').openPopup();
    })
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 15, 30, 40, 50];
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor(grades[i]+1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);


d3.json("http://127.0.0.1:5000/mapdata").then(function(mapData) {
  var data = mapData;
  console.log("hi");
  console.log(data);
  console.log(parseInt(data.features[0].properties.STATE))
  geojson = L.geoJson(data, {
    // Passing in our style object
    style: style,
    dashArray: 3,
    onEachFeature: onEachFeature
  }).addTo(myMap);
}).catch(function (error) {
	console.log(error);
});
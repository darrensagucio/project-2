// var myMap = L.map("map", {
//     center: [37.8,-96],
//     zoom: 4
// });

// L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "light-v10",
//     accessToken: API_KEY
// }).addTo(myMap);

// function getColor(d){
//     return d > 50 ? '#282828' :
//             d > 40 ? '#787878' : 
//             d > 30 ? '#989898' :
//             d > 15 ? '#B8B8B8' :
//                       '#D3D3D3';
                      
// }

// function style (info) {
//     return {
//         color: "white",
//         fillColor: getColor(parseInt(info.properties.STATE)),
//         fillOpacity: 1,
//         weight: 1.5
//     }
// }
// var info = L.control(); 

// info.onAdd = function (map) {
//     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
//     this.update();
//     return this._div;
// };

// info.update = function (label) {
//     this._div.innerHTML = '<h4>Food Insecurity In The U.S</h4>'
// }; 

// info.addTo(myMap);

// function highlightFeature(e) {
//     var layer = e.target; 

//     layer.setStyle({
//         weight: 5,
//         color: '#667',
//         dashArray: '',
//         fillOpaciity: 0.7
//     });

//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
// }

// var geojson; 

// function resetHighlight(e) {
//     geojson.resetStyle(e.target);
// }

// function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight
//     })
//     layer.on('click', function() {
//         layer.bindPopup('<h2>' + feature.properties.NAME + '</h2><h2>' + feature.properties.STATE + '</h2>').openPopup();
//     })
// }

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function () {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 15, 30, 40, 50];
//         labels = [];

//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//         '<i style="background:' + getColor(grades[i]+1) + '"></i> ' +
//         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(myMap);


// d3.json("http://127.0.0.1:5000/mapdata").then(function(mapData) {
//   var data = mapData;
//   console.log(data);
//   geojson = L.geoJson(data, {
//     // Passing in our style object
//     style: style,
//     dashArray: 3,
//     onEachFeature: onEachFeature
//   }).addTo(myMap);
// }).catch(function (error) {
// 	console.log(error);
// });
/// 
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

console.log("is this working??");
console.log(API_KEY);

function getColor(d){
    return d > 20.0 ? '#000000' :
            d > 14.0 ? '#404040' :
            d > 12.0 ? '#696969' : 
            d > 10.0 ? '#888888' : 
            d > 8.0 ? '#A9A9A9' :
            d > 4.0 ? '#C0C0C0' :
                      '#E8E8E8';
                      
}

function style (info) {
    return {
        color: "white",
        fillColor: getColor(info.properties.RatesNum),
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

// var mapStyle = {
//     color: "white",
//     fillColor: "black",
//     fillOpacity: 0.5,
//     weight: 1.5
// };

randomNumArray = []; 

for (var i = 0; i < 52; i++) {
    var randomNum = Math.floor(Math.random() * 1000);
    randomNumArray.push(randomNum)
}


// console.log(features.properties. )
console.log(randomNumArray.length)
console.log(randomNumArray)
// var info = L.control();

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

    // info.update(layer.feature.properties);
}

var geojson; 
var geojson1;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    // info.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    })
    layer.on('click', function() {
        // layer.bindPopup('<h2>' + feature.properties.RatesNum + '%</h2><h2>' + feature.properties.NAME + '</h2>').openPopup();
        layer.bindPopup('<h2>' + feature.properties.NAME + '</h2><h2> Rate: ' + feature.properties.RatesNum + '%</h2><h2> Insecure Individuals: ' + feature.properties.IndString + '</h2>').openPopup();
    })
}

// function onEachFeatureToolTip(feature, layer) {
//     layer.on('click', function() {
//         layer.bindPopup('<h2>' + feature.precipitation + '</h2><h2>' + feature.properties.STATE + '</h2>').openPopup();
//     })
// }

var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 4.0, 8.0, 10.0, 12.0, 14.0, 20.0];
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor(grades[i]+ .01) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

var dropdownLegend = L.control({position: 'bottomleft', title: "hi"});

dropdownLegend.onAdd = function () {
    var div = L.DomUtil.create('div', 'year legend');
    div.innerHTML = '<select id= "year-selected"><option id="2019">2019</option><option id="2018">2018</option><option>2017</option><option>2016</option><option>2015</option><option>2014</option><option>2013</option><option>2012</option><option>2011</option><option>2010</option><option>2009</option></select>';
    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    return div;
};

dropdownLegend.addTo(myMap);

function init () {
    d3.json("http://127.0.0.1:5000/realdata").then(function(mapData) {
        var data = mapData;
        console.log("hi");
        console.log("INIT");
        console.log(data);
        console.log(parseInt(data.features[0].properties.STATE))
        console.log("NAMES");
        //   var nameState = []; 
        //   for (var i = 0; i < 52; i++) {   
        //     nameState.push(data.features[i].properties.NAME)
        //   }
        //   console.log(nameState);
        //   console.log(typeof data.weatherdata[2].precipitation)
        //   console.log(data.weatherdata[2].precipitation)
        //   console.log(data.weatherdata.precipitation)
        //   var m = 1;
        //   console.log(typeof m)
        geojson = L.geoJson(data, {
            // Passing in our style object
            style: style,
            dashArray: 3,
            onEachFeature: onEachFeature
        }).addTo(myMap);
        }).catch(function (error) {
            console.log(error);
        });
}

init();
const url = "/api/brewery_api_export_MD.json";

// Fill the drop doen for picking the city and filtering the data
d3.json(url).then(function (x) {
    console.log(x);

    for (let i = 0; i < x.length; i++) {
        let b_city = x[i].city;
        console.log(b_city);
    }
    const distinctCities = [...new Set(x.map((d) => d.city))]
    console.log(distinctCities)

    //fill the dropdown
    for (let i = 0; i < distinctCities.length; i++) {
        d3.select("#selDataset").append("option").text(distinctCities[i]).property("value", distinctCities[i])

    }

})

//The base map
var myMap = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 5
});

//Link to the data
var link = "/api/brewery_api.geojson";
// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


function Cities(selectedCiti) {
    // Our style object
    var mapStyle = {
        color: "red",
    };
    
    // Getting our GeoJSON data
    d3.json(link).then(function (x) {
        console.log(x.features.length)
        // Creating a GeoJSON layer with the retrieved data
          L.geoJSON(x, {
                filter: function (feature, layer) {
                    return feature.properties.city == selectedCiti;
                },
                style: mapStyle
            }).addTo(myMap);

        }
    );

};

//Definign the function that plots the markers base dont he city selected
function optionChanged(selectedCiti) {
 
    console.log(`city ${selectedCiti} selected by the user`)
    Cities(selectedCiti)

}
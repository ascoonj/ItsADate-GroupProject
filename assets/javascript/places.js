// var lat = 40.7695999146;
// var lon = -73.9832000732;
// var location;

// //var proxy = 'https://cors-anywhere.herokuapp.com/';

// var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-40.7695999146,73.9832000732&radius=500&type=restaurant&keyword=restaurant&key=AIzaSyDjv6KApCTx7THqCKqLhCRo4x7erp7Fu6s"

// // Performing an AJAX request with the queryURL
// $.ajax({
//         url: queryURL,
//         method: "GET",
//         //dataType: "jsonp"
//         // data: {
//         //     type: "restaurant", // use the button's attribute data-name as the search term
//         //     key: "AIzaSyDjv6KApCTx7THqCKqLhCRo4x7erp7Fu6s", // my generated api-key
//         //     location: lat, lon,
//         //     radius: 100
//         //     //rankby: distance
//         //     //limit: 10 // request 10 gifs
//         // }
//     })
//     // After the promise is fulfilled
//     .done(function (response) {
//         // Store the data from the AJAX request in the results variable
//         var results = response.data;
//         console.log(response.data);
//     });

var map;
var infowindow;
$("#map").hide();


function initMap(lat, lon) {

        var eventLoc = {
        lat: lat,
        lng: lon
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: eventLoc,
        radius: 500,
        type: ['restaurant']
    }, callback);

    console.log("i'm here");
    console.log(map);

}

function callback(results, status) {
    console.log("now the results");
    console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    console.log("Place name:", place.name);

    console.log("place:", place);

    var placeLoc = place.geometry.location;
    // console.log("placeLoc:", placeLoc);
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

// var request = {
//     location: new google.maps.LatLng(52.48, -1.89),
//     radius: '500',
//     types: ['store']
// };

// var container = document.getElementById('results');

// var service = new google.maps.places.PlacesService(container);
// service.nearbySearch(request, callback);

// function callback(results, status) {

//     if (status == google.maps.places.PlacesServiceStatus.OK) {

//         for (var i = 0; i < results.length; i++) {

//             container.innerHTML += results[i].name + '<br />';
//         }
//     }
// }
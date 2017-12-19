//var userInput = "";

var queryURL;


$(".locationSearch").on("click", function (event) {

        event.preventDefault();

        var userZip = $("#zipInput").val().trim();
        localStorage.setItem("zip", userZip);

        location.href = "results.html";

});


var zipCode = localStorage.getItem("zip");
var testZip = (/(^\d{5}$)|(^\d{5}-\d{4}$)/);
console.log(zipCode);


if (zipCode === "") {
        queryURL = "https://api.seatgeek.com/2/events?geoip=true&per_page=4&client_id=OTk0NTAwOHwxNTEzMTI5OTU4Ljk1";
} else if (!testZip.test(zipCode)) {
        console.log("Invalid zip code");

} else {
        queryURL = "https://api.seatgeek.com/2/events?geoip=" + zipCode + "&per_page=4&client_id=OTk0NTAwOHwxNTEzMTI5OTU4Ljk1";
}


console.log(queryURL);



var restLat;
var restLon;

var eventsObject = [];

console.log(queryURL);
//ajax call//
$.ajax({
        url: queryURL,
        method: "GET"

}).done(function eventInfo(response) {
        //sets up a variable to hold the events object//
        eventsObject = response.events
        console.log(response)
        //created a for loop to loop through the events object//
        for (var i = 0; i < eventsObject.length; i++) {
                console.log(eventsObject[i]);
                //created a new div with a class to hold the events, and added attributes for easy reference
                var eventSection = $("<div class='eventsection'>");
                eventSection.attr("id", "indivEvent-" + i);
                eventSection.attr("data-index", i);

                //Access event info by traversing the response object
                var eventTitle = eventsObject[i].title;
                var pTitle = $("<p>").text("Title: " + eventTitle);

                var eventType = eventsObject[i].type;
                var eventTypePretty = eventType.replace(/_/g, " ");
                var pType = $("<p>").text("Type: " + eventTypePretty);

                var eventDateTime = eventsObject[i].datetime_local;
                var dateTimeFormatted = new Date(eventDateTime);

                //sets the formatting parameters for the new date and time//
                var formatOptions = {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                };

                //formats the eventDateTime variable using the parameters in the format options variable//
                var dateString = dateTimeFormatted.toLocaleDateString('en-US', formatOptions);
                //splits the date and time into two seperate indexes in an array//
                var splitDateTime = dateString.split(", ");
                //displays the date which is housed in the index position 0//
                var pDate = $("<p>").text("Date: " + splitDateTime[0]);
                //displays the time which is housed in the index position 1//
                var pTime = $("<p>").text("Time: " + splitDateTime[1]);

                var eventVenue = eventsObject[i].venue.name;
                var pVenue = $("<p>").text("Venue: " + eventVenue);

                var eventWebsite = eventsObject[i].url;
                var aTag = document.createElement("a");
                aTag.setAttribute("href", eventWebsite);
                aTag.setAttribute("target", "_blank");
                aTag.innerHTML = "View SeatGeek Event";
                var pWebsite = $("<p>").html(aTag);


                var eventAddressLn1 = eventsObject[i].venue.address;
                var eventCity = eventsObject[i].venue.city;
                var pAddress = $("<p>").html("Address: " + eventAddressLn1 + ", " + eventCity);


                //Test outputs
                console.log(eventTitle);
                console.log(eventType);
                console.log(eventTypePretty);
                console.log(dateString)
                console.log(splitDateTime)
                console.log(splitDateTime[0]);
                console.log(splitDateTime[1]);
                console.log(aTag);
                console.log(eventAddressLn1)
                console.log(eventCity);
                console.log(eventVenue);

                eventSection.append(pTitle).append(pType).append(pDate).append(pTime).append(pVenue).append(pAddress).append(pWebsite);

                //   $("#event-" + i).append($("#indivEvent-" + i));
                $("#event-" + i).append(eventSection);

                // restLat = eventsObject[i].venue.location.lat;
                // restLon = eventsObject[i].venue.location.lon;

        };

        // var event1 = $("#indivEvent-0");
        //$("#displayEvent0").append(event1);

        // $("#displayEvent1").append($("#indivEvent-1"));
        // $("#displayEvent2").append($("#indivEvent-2"));
        // $("#displayEvent3").append($("#indivEvent-3"));



        // restLat = eventsObject[0].venue.location.lat;
        // console.log("lat: ", restLat);
        // restLon = eventsObject[0].venue.location.lon;

        // initMap(restLat, restLon);
});

var map;
var infowindow;
$("#map").hide();

var service;

function initMap(lat, lon) {

        var eventLoc = {
                lat: lat,
                lng: lon
        };

        map = new google.maps.Map($('#map')[0], {
                center: eventLoc,
                zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
                location: eventLoc,
                radius: 500,
                type: ['restaurant']
        }, callback);

        console.log("i'm here");
        console.log(map);
}

var restId;

var restaurants = [];

function callback(results, status) {
        console.log("now the results");
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
                $(".displayRestaurant").empty();
                for (var i = 0; i < 6; i++) {
                        // restuarants = results;
                        console.log(results[i]);
                        console.log("Restaurant Name: " + results[i].name);
                        findDetail(results[i]);
                        console.log("Restaurant Icon: ", results[i].icon);
                        console.log("Restaurant Rating: ", results[i].rating);
                        console.log("Restaurant Adress: ", results[i].vicinity);
                        console.log("Restaurant Price Level: ", results[i].price_level);
                        // console.log("Restaurant Opening: ", results[i].opening_hours.weekday_text.length);
                        console.log("Restaurant Place_Id: ", results[i].place_id);

                        var restOpeningHours = $("<div class = openHrs>");

                        var restSection = $("<div class = 'restsection'>");
                        restSection.attr("id", "eventRestaurant-" + i);
                        restSection.attr("data-index", i);

                        var restIcon = $("<img>");
                        restIcon.addClass("rest-img");
                        restIcon.attr("src", results[i].icon);

                        var restName = $("<p>").text("Restaurant Name " + results[i].name);
                        var restRating = $("<p>").text("Rating " + results[i].rating);
                        var restAddress = $("<p>").text("Address " + results[i].vicinity);
                        findDetail(results[i].place_id).then(function (details) {
                                for (var j = 0; j < place.opening_hours.weekday_text.length; j++) {
                                        restOpeningHours = $("<p>").text("Restaurant Hours " + (place.opening_hours.weekday_text[i]));
                                }
                        });
                        var restPrice = $("<p>").text("Price Level " + results[i].price_level);

                        restSection.append(restIcon).append(restName).append(restRating).append(restAddress).append(restPrice).append(restOpeningHours);

                        $("#eventRestaurant-" + i).append(restSection);


                }
        }
};

// findDetail() takes in a place object
function findDetail(place) {
        // return promise
        return new Promise(function (resolve, reject) {
                // use getDetails method to retrieve Place data via the Place's place_id property
                service.getDetails({
                        placeId: place.place_id
                }, function (place, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                                //console.log(place.opening_hours.weekday_text);
                                for (var j = 0; j < place.opening_hours.weekday_text.length; j++) {
                                        console.log(place.opening_hours.weekday_text[j]);

                                }
                                resolve(place);
                        } else {
                                // else reject with status
                                reject(status);
                        }
                });
        });
}


// function findDetail(place) {
//         return new Promise(function(resolve,reject) {
//           service.getDetails({placeId: place.place_id}, function(place,status) {
//             if (status == google.maps.places.PlacesServiceStatus.OK) {
//               resolve(place);
//             } else {
//               reject(status);
//             }
//           });
//         });
//       }


//$(".displayEvents").on("click", ".eventSection", displayRestaurant);
$(".displayEvents").on("click", ".eventsection", function () {
        //alert("event clicked");

        var eventIndex = $(this).attr("data-index");
        console.log(eventIndex);

        restLat = eventsObject[eventIndex].venue.location.lat;
        restLon = eventsObject[eventIndex].venue.location.lon;
        console.log("clicked event longitude and latitude: ", restLat, restLon);
        initMap(restLat, restLon);

});



// restId = results[i].place_id;

// var serviceHours = new google.maps.places.PlacesService(map);
// serviceHours.getDetails({
//         placeId:results[i].place_id
// }, function (place, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {

//                 for (var j = 0; j < place.opening_hours.weekday_text.length; j++) {
//                         console.log("Opening Hours: ", place.opening_hours.weekday_text[j]);
//                 }
//         }
// })
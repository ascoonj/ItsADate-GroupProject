var queryURL = "https://api.seatgeek.com/2/events?geoip=true&per_page=4&client_id=OTk0NTAwOHwxNTEzMTI5OTU4Ljk1"

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
                //created a new div to hold the events with a class//
                var eventSection = $("<div class='eventsection'>");
                //created an individual id for each event and appended the events to the display class div//
                eventSection.attr("id", "indivEvent-" + i);
                eventSection.attr("data-index", i);
                //$(".displayEvents").append(eventSection);
                //each parameter is appeneded to each other using <p> tag//
                var eventTitle = eventsObject[i].title;
                var pOne = $("<p>").text("Title: " + eventTitle);
                //eventSection.append(pOne);
                console.log(eventTitle);
                var eventType = eventsObject[i].type;
                var typeOfEvent = eventType.replace(/_/g, " ");
                console.log(typeOfEvent);
                var pTwo = $("<p>").text("Type: " + typeOfEvent);
                //pOne.append(pTwo);
                console.log(eventType);
                var eventDateTime = eventsObject[i].datetime_local;
                //setting up a new date and time//
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
                console.log(dateString)
                //splits the date and time into two seperate indexes in an array//
                var splitDateTime = dateString.split(", ");
                console.log(splitDateTime)
                //displays the date which is housed in the index position 0//
                var pThree = $("<p>").text("Date: " + splitDateTime[0]);
                //pTwo.append(pThree);
                console.log(splitDateTime[0]);
                //displays the time which is housed in the index position 1//
                var pFour = $("<p>").text("Time: " + splitDateTime[1]);
                //pThree.append(pFour);
                console.log(splitDateTime[1]);
                var eventLocation = eventsObject[i].venue.name;
                var pFive = $("<p>").text("Location: " + eventLocation);
                //pFour.append(pFive);
                console.log(eventLocation);
                var eventWebsite = eventsObject[i].url;
                var stringEvent = "View SeatGeek Event"
                var displayStringEvent = stringEvent.link(eventWebsite)
                var pSix = $("<p>").html("Website: " + displayStringEvent);
                //pFive.append(pSix);

                $(".eventsection").append(pOne).append(pTwo).append(pThree).append(pFour).append(pFive).append(pSix);

                // $("#displayEvent0").append($("#indivEvent-0").html());
                // $("#displayEvent1").append($("#indivEvent-1"));
                // $("#displayEvent2").append($("#indivEvent-2"));
                // $("#displayEvent3").append($("#indivEvent-3"));
             // $("#displayEvent0").append(eventSection);
               
                // console.log(displayStringEvent);
                // restLat = eventsObject[i].venue.location.lat;
                // restLon = eventsObject[i].venue.location.lon;

        };

       // var event1 = $("#indivEvent-0");
        //$("#displayEvent0").append(event1);
       $("#displayEvent0").append(eventSection);
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

                for (var i = 0; i < 5; i++) {
                        // restuarants = results;
                        console.log(results[i]);
                        console.log("Restaurant Name: ", results[i].name);
                        findDetail(results[i]);
                        console.log("Restaurant Icon: ", results[i].icon);
                        console.log("Restaurant Rating: ", results[i].rating);
                        console.log("Restaurant Adress: ", results[i].vicinity);
                        console.log("Restaurant Price Level: ", results[i].price_level);
                        // console.log("Restaurant Opening: ", results[i].opening_hours.weekday_text.length);
                        console.log("Restaurant Place_Id: ", results[i].place_id);

                        var restDiv = $("<div>");

                        var restIcon = $("<img>");
                        restIcon.addClass("rest-img");
                        restIcon.attr("src", results[i].icon);

                        var restName = $("<p>").text("Restaurant Name " + results[i].name);
                        var restRating = $("<p>").text("Restaurant Rating " + results[i].rating);
                        var restAddress = $("<p>").text("Restaurant Address " + results[i].vicinity);
                        var restPrice = $("<p>").text("Restaurant Price Level " + results[i].price_level);

                        restDiv.append(restIcon).append(restName).append(restRating).append(restAddress).append(restPrice);

                        $(".displayRestaurant").append(restDiv);
                        


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
                                //resolve(place);
                        } else {
                                // else reject with status
                                reject(status);
                        }
                });
        });
}

//$(".displayEvents").on("click", ".eventSection", displayRestaurant);
$("#displayEvent0").on("click", ".eventsection", function () {
        //alert("event clicked");

        var eventIndex = $(this).attr("data-index");
        console.log(eventIndex);

        restLat = eventsObject[eventIndex].venue.location.lat;
        restLon = eventsObject[eventIndex].venue.location.lon;
        console.log("cliced event longitude and latitude: ", restLat, restLon);
        initMap(restLat, restLon);

      


});
var queryURL = "https://api.seatgeek.com/2/events?geoip=true&per_page=5&client_id=OTk0NTAwOHwxNTEzMTI5OTU4Ljk1"

console.log(queryURL);
//ajax call//
$.ajax({
    url: queryURL,
    method: "GET"

}).done(function eventInfo(response) {
//sets up a variable to hold the events object//
    var eventsObject = response.events
    console.log(response)
//created a for loop to loop through the events object//
    for (var i = 0; i < eventsObject.length; i++) {
        console.log(eventsObject[i]);
//created a new div to hold the events with a class//
        var eventSection = $("<div class='eventsection'>");
//created an individual id for each event and appended the events to the display class div//
        eventSection.attr("id", "indivEvent" + i);
        $(".display").append(eventSection);
//each parameter is appeneded to each other using <p> tag//
        var eventTitle = eventsObject[i].title;
        var pOne = $("<p>").text("Title: " + eventTitle);
        eventSection.append(pOne);
        console.log(eventTitle);
        var eventType = eventsObject[i].type;
        var typeOfEvent =  eventType.replace(/_/g, " ");
        console.log(typeOfEvent);
        var pTwo = $("<p>").text("Type: " + typeOfEvent);
        pOne.append(pTwo);
        console.log(eventType);
        var eventDateTime = eventsObject[i].datetime_local;
//setting up a new date and time//
        var dateTimeFormatted = new Date(eventDateTime);
//sets the formatting parameters for the new date and time//
        var formatOptions = { 
               day:    '2-digit', 
               month:  '2-digit', 
               year:   'numeric',
               hour:   '2-digit', 
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
        pTwo.append(pThree);
        console.log(splitDateTime[0]);
//displays the time which is housed in the index position 1//
        var pFour = $("<p>").text("Time: " + splitDateTime[1]);
        pThree.append(pFour);
        console.log(splitDateTime[1]);
        var eventLocation = eventsObject[i].venue.name;
        var pFive = $("<p>").text("Location: " + eventLocation);
        pFour.append(pFive);
        console.log(eventLocation);
        var eventWebsite = eventsObject[i].url;
        var stringEvent = "View SeatGeek Event"
        var displayStringEvent = stringEvent.link(eventWebsite)
        var pSix = $("<p>").html("Website: " + displayStringEvent);
        pFive.append(pSix);
        console.log(displayStringEvent);
    };
});

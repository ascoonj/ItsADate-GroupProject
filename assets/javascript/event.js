var queryURL = "https://api.seatgeek.com/2/events?geoip=10029&per_page=5&client_id=OTk0NTAwOHwxNTEzMTI5OTU4Ljk1"

console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"

}).done(function (response) {
    var eventsObject = response.events
    console.log(response)
    for (var i = 0; i < eventsObject.length; i++) {
        console.log(eventsObject[i]);
        var eventSection = $("<div class='eventsection'>");
        eventSection.attr("id", "indivEvent" + i);
        $(".display").append(eventSection);
        var eventTitle = eventsObject[i].title;
        var pOne = $("<p>").text("Title: " + eventTitle);
        eventSection.append(pOne);
        console.log(eventTitle);
        var eventType = eventsObject[i].type;
        var pTwo = $("<p>").text("Type: " + eventType);
        pOne.append(pTwo);
        console.log(eventType);
        var eventDateTime = eventsObject[i].datetime_local;
        var dateTimeFormatted = new Date(eventDateTime);
        var formatOptions = { 
               day:    '2-digit', 
               month:  '2-digit', 
               year:   'numeric',
               hour:   '2-digit', 
               minute: '2-digit',
               hour12: false 
        };
        var dateString = dateTimeFormatted.toLocaleDateString('en-US', formatOptions);
        var pThree = $("<p>").text("Date and Time: " + dateString);
        pTwo.append(pThree);
        console.log(eventDateTime);
        var eventLocation = eventsObject[i].venue.name;
        var pFour = $("<p>").text("Location: " + eventLocation);
        pThree.append(pFour);
        console.log(eventLocation);
        var eventWebsite = eventsObject[i].url;
        var pFive = $("<p>").text("Website: " + eventWebsite);
        pFour.append(pFive);
        console.log(eventWebsite);
        

    };
});
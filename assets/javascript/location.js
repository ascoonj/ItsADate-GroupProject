var queryURL = "https://api.seatgeek.com/2/events?geoip=false&per_page=4&client_id=OTk0NTAwOHwxNTEzMTI5OTU4Ljk1";
var userInput = "";

$.ajax({
    url: queryURL,
    method: "GET",
   

}).done(function (response){
    console.log(response);
    $("#zipSearch").on("click", function(event){        
        var zipCode = $("#zipInput").val().trim();
        console.log(zipCode);
           

    });
});
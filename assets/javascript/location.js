var queryURL = "https://api.seatgeek.com/2/events?geoip=false&per_page=4&client_id=OTk0NTAwOHwxNTEzMTI5OTU4Ljk1";
var userInput = "";
var zipCode = $("#zipInput").val().trim();





$.ajax({
    url: queryURL,
    method: "GET",
   

}).done(function (response){
    console.log(response);
    $("#zipSearch").on("click", function(event){        
        var zipCode = $("#zipInput").val().trim();
        var locationPara =  new URLSearchParams("events?geoip=false&per_page=4");
        var userInput = "";
        console.log(zipCode);
        if(userInput === zipCode){
            locationPara.set("geoip", zipCode);
            console.log("hi")
        }else{
            locationPara.has("geoip", true);
        }
        

    });
});
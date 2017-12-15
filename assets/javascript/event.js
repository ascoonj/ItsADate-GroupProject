var queryURL = "https://api.seatgeek.com/2/events?client_id=OTk0NTAwOHwxNTEzMTI5OTU4Ljk1"

console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
         
}).done(function(response){
    console.log(response)
});
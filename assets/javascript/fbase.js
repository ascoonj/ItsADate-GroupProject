var config = {
    apiKey: "AIzaSyDIUceZVUad3KQ0AFCZOHlHKJ0wFTEUh0E",
    authDomain: "itsadate-groupproject.firebaseapp.com",
    databaseURL: "https://itsadate-groupproject.firebaseio.com",
    projectId: "itsadate-groupproject",
    storageBucket: "itsadate-groupproject.appspot.com",
    messagingSenderId: "663719656128"
};
firebase.initializeApp(config);

// Get user credentials
// const userEmail = $("#emailInput").val().trim();
// const userPswd = $("#pswdInput").val().trim();

// Add login event
$("#btnLogin").on("click", function (event) {
    //const btnLogin = document.getElementbyId('btnLogin');
    //btnLogin.addEventListener('click', e +> {)
    //Get email and password
    event.preventDefault();
    console.log("user logging in");
    const userEmail = $("#emailInput").val().trim();
    const userPswd = $("#pswdInput").val().trim();
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(userEmail, userPswd);
    promise.catch(event => console.log(event.message));
});


//Add signup event
$("#btnSignup").on("click", function (event) {
    //Get email and password
    //TODO - VALIDATE EMAIL ADDRESS
    event.preventDefault();
    console.log("user signing up");
    const userEmail = $("#emailInput").val().trim();
    const userPswd = $("#pswdInput").val().trim();
    const confirm = $("#confirmInput").val().trim();
    const auth = firebase.auth();

    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

    console.log("1st pswd: ", userPswd);
    console.log("2nd pswd: ", confirm);


    if (!testEmail.test(userEmail)) {
        console.log("Invalid email address");
        $("#errorDisplay").text("Uh oh... that's not a valid user address.");

    } else if (userPswd !== confirm) {
        console.log("Mismatched passwords");
        $("#errorDisplay").text("Oops.... your passwords don't match.");

    } else {
        const promise = auth.createUserWithEmailAndPassword(userEmail, userPswd);
        promise.catch(event => console.log(event.message));
        location.href = "location.html"
        $("#errorDisplay").empty();
        
    }

});

$("#btnLogout").on("click", function (event) {
    event.preventDefault();
    firebase.auth().signOut();
});
var currentUser;
//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {

    if (firebaseUser) {
        currentUser = firebaseUser;
        console.log(firebaseUser);
        console.log(firebaseUser.uid)
        $("#btnLogout").removeClass('hide');
    } else {
        console.log("not logged in");
        $("#btnLogout").addClass('hide');

    }
});
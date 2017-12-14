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
    console.log("user signing up");
    const userEmail = $("#emailInput").val().trim();
    const userPswd = $("#pswdInput").val().trim();
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(userEmail, userPswd);
    promise.catch(event => console.log(event.message));

});

$("#btnLogout").on("click", function (event) {
    firebase.auth().signOut();
});

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        $("#btnLogout").removeClass('hide');
    } else {
        console.log("not logged in");
        $("#btnLogout").addClass('hide');

    }
});
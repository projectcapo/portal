

// When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDqf5CBy1FgOmJYYWZpj6n6yNWWk8zfHPY",
    authDomain: "capo-cbd68.firebaseapp.com",
    databaseURL: "https://capo-cbd68.firebaseio.com",
    projectId: "capo-cbd68",
    storageBucket: "capo-cbd68.appspot.com",
    messagingSenderId: "1023788850417"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();
  var auth = firebase.auth();

// Initial Values
var name = "";
var email = "";
var age = 0;
var comment = "";

// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    age = $("#age-input").val().trim();
    comment = $("#comment-input").val().trim();

    // Code for the push
    dataRef.ref().push({

    name: name,
    email: email,
    age: age,
    comment: comment,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.key);
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().email);
    console.log(childSnapshot.val().age);
    console.log(childSnapshot.val().comment);

    // full list of items to the well
    $("#full-member-list").append("<div id='" + childSnapshot.key + "'class='well'><span class='member-name'> " +
    childSnapshot.val().name +
    " </span><span class='member-email'> " + childSnapshot.val().email +
    " </span><span class='member-age'> " + childSnapshot.val().age +
    " </span><span class='member-comment'> " + childSnapshot.val().comment + " </span></div>");
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().on("child_changed", function (newVal) {
    console.log("on child changed fired");
    $("#" + newVal.key + " > span.member-name").text(newVal.val().name);
    $("#" + newVal.key + " > span.member-email").text(newVal.val().email);
    $("#" + newVal.key + " > span.member-age").text(newVal.val().age);
    $("#" + newVal.key + " > span.member-comment").text(newVal.val().comment);
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#email-display").text(snapshot.val().email);
    $("#age-display").text(snapshot.val().age);
    $("#comment-display").text(snapshot.val().comment);
});




// Decide fields to collect when a user signs up
// Make email username/password required fields
// On submit, check to see if same user exists, if Yes, prompt user for new user name
// If No, create user
// If user sign-up is successful, re-direct to login page
// Collect username and password
// Login - Check if username and password exists in DB
// If yes, re-direct to main screen
// On Nav, always show Login and Signup the first time you launch
// If new user, select signup
// Once user has signed up and logged in, they see log out button, no sign up, or login
// Each web page must MUST check if user is authenticated
// User has logged in, but closed page, how to check user auth (session mgmt)

$("#login-user").on("click", function (event) {
    event.preventDefault();
    var email = $("#email-login").val();
    var password = $("#password-login").val();

    console.log(email, password);
    var promise = auth.signInWithEmailAndPassword(email, password).catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ...
    });

    promise.then(function(value) {
        console.log(value);
    });
});
  
$(".logout-user").on("click", function (event) {
    event.preventDefault();

    var promise = auth.signOut().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ...
    });

    promise.then(function(value) {
        console.log(value);
    });
});

auth.onAuthStateChanged(function(user) {
    if (user) {
        $(".logout-user").show()
        $("#login-header").hide()
        $("#sign-up-header").hide()
    } else {
        $(".logout-user").hide()
        $("#login-header").show()
        $("#sign-up-header").show()

    }
  });
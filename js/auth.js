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

// Initial Global Values
var name = "";
var company = "";
var comment = "";

var displayName;
var email;
var emailVerified;
var photoURL;
var uid;
var providerData;

/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = $("#email-login").val();
        var password = $("#password-login").val();

        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function () {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);

                //document.getElementById('quickstart-sign-in').disabled = false;
                // [END_EXCLUDE]
            });
        // [END authwithemail]
    }
    //document.getElementById('quickstart-sign-in').disabled = true;
    $(".logout-user").show()
    $(".login-user").hide()
    $("#sign-up-header").hide()
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
    var email = $("#email-login").val();
    var password = $("#password-login").val();
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END createwithemail]
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function () {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
    });
    // [END sendemailverification]
}

function sendPasswordReset() {
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */


function initUser() {

    var user = firebase.auth().currentUser;

    if (user != null) {
        user.providerData.forEach(function (profile) {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        });
    } else {
        // No user is signed in.
        console.log("not signed in")
        //window.location.replace("./login.html")
    }

}


function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        // [START_EXCLUDE silent]
        //    document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            /* document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
              document.getElementById('quickstart-verify-email').disabled = false;
            }
            */
            $(".logout-user").show()
            $(".login-user").hide()
            $("#sign-up-header").hide()
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            $(".logout-user").hide()
            $(".login-user").show()
            $("#sign-up-header").show()
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            //   document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            //  document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        // document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]

    //document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    //document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    //document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    //document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}



/*
// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();

    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    company = $("#company-input").val().trim();
    comment = $("#comment-input").val().trim();

    // Code for the push
    dataRef.ref().push({

    name: name,
    email: email,
    company: company,
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
    console.log(childSnapshot.val().company);
    console.log(childSnapshot.val().comment);

    // full list of items to the well
    $("#full-member-list").append("<div id='" + childSnapshot.key + "'class='well'><span class='member-name'> " +
    childSnapshot.val().name +
    " </span><span class='member-email'> " + childSnapshot.val().email +
    " </span><span class='member-company'> " + childSnapshot.val().company +
    " </span><span class='member-comment'> " + childSnapshot.val().comment + " </span></div>");
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().on("child_changed", function (newVal) {
    console.log("on child changed fired");
    $("#" + newVal.key + " > span.member-name").text(newVal.val().name);
    $("#" + newVal.key + " > span.member-email").text(newVal.val().email);
    $("#" + newVal.key + " > span.member-company").text(newVal.val().company);
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
});*/


$(document).ready(function () {
    $(".login-user").on("click", function (event) {
        event.preventDefault();
        toggleSignIn();
    })
});

$(document).ready(function () {
    $(".logout-user").on("click", function (event) {
        event.preventDefault()
        event.stopPropagation()
        firebase.auth().signOut()
            .then(function () {
                // Sign-out successful.
                console.log("sign-out")
            })
            .catch(function (error) {
                // An error happened
                console.log("ERR MSG" + error)
            });
    });
});

auth.onAuthStateChanged(function (user) {
    if (user) {
        $(".logout-user").show()
        $(".login-user").hide()
        $("#sign-up-header").hide()
    } else {
        $(".logout-user").hide()
        $(".login-user").show()
        $("#sign-up-header").show()
    }
});

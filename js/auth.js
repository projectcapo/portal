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

function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = $("#email_input").val();
        var password = $("#password_input").val();

        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                $(".login-link").hide();
                setTimeout(function() {
                    window.location.href = "dashboard.html"; //will redirect to your blog page (an ex: blog.html)
                }, 2000); //will call the function after 2 secs.
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch(function(error) {
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
                // [END_EXCLUDE]
            });
        // [END authwithemail]
        $(".logout-link").hide()
    }
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
    var email = $("#email_input").val();
    var password = $("#password_input").val();
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
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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
    firebase.auth().currentUser.sendEmailVerification().then(function() {
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
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function(error) {
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

var initUser = function() {
    var accountdetails;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.

            //var displayName = user.displayName;
            var email = user.email;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            console.log("user logged in");

            user.getIdToken().then(function(accessToken) {
                // document.getElementById('sign-in-status').textContent = 'Signed in';
                //document.getElementById('sign-in').textContent = 'Sign out';
                dataRef.ref('/users/').orderByChild("email").equalTo(email).on('value', function(snapshot) {
                    //snapshot would have list of NODES that satisfies the condition
                    console.log(snapshot.val())
                    console.log('-----------');
        
                    //go through each item found and print out the emails
                    snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();
                        //this will be the actual email value found
                        console.log(childData.email);
                        console.log(childData.name);
                        //$('.js-acc-btn').text(childData.name);
                        $('.email').text(childData.email);
                        $('.name').text(childData.name);
                    });
                    $('#navul').append('<li><a id="dash" href="dashboard.html">Dashboard</a></li>');

                }, null, '  ');
            });
            //   $('.name').text(displayName);
        } else {
            // User is signed out.
            //document.getElementById('sign-in-status').textContent = 'Signed out';
            //   document.getElementById('sign-in').textContent = 'Sign in';
            //document.getElementById('account-details').textContent = 'null';
            window.location.replace = "./login.html";
        }
    }, function(error) {
        console.log(error);
    });
};

function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
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
            //$(".logout-user").show()
            //$(".login-user").hide()
            //$("#sign-up-header").hide()
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

$(document).ready(function() {
    $(".login-user").on("click", function(event) {
        event.preventDefault();
        toggleSignIn();
    })
});

$(document).ready(function() {
    $(".sign-out").on("click", function(event) {
        event.preventDefault()
        event.stopPropagation()
        firebase.auth().signOut()
            .then(function() {
                // Sign-out successful.
                console.log("sign-out");
                $(location).attr("href", "index.html");
            })
            .catch(function(error) {
                // An error happened
                console.log("ERR MSG" + error)
            });
    });
});

auth.onAuthStateChanged(function(user) {
    if (user) {
        $(".logout-link").show()
        $(".login-link").hide()
        $(".login-user").hide()
        $("#sign-up-header").hide()



    } else {
        $(".logout-link").hide()
        $(".login-user").show()
        $("#sign-up-header").show()
    }
});

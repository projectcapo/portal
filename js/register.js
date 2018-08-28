// Decide fields to collect when a user signs up
// Make email/password required fields
// On submit, check if user exists, if Yes, prompt user for new user name
// If No, create user
// If user sign-up is successful, re-direct to login page
// Collect username and password
// Login - Check if username and password exists in DB
// If yes, re-direct to main screen
// On Nav, always show Login and Sign-up the first time you launch
// If new user, select Sign-up
// Once user has signed up and logged in, log out button viewable, hide sign up & login
// Each web page must MUST check if user is authenticated
// User has logged in, but closed page, check user auth (session mgmt)

// Initial Values
var name = "";
var company = "";
var email = "";
var password = "";
var mobile = "";
var address = "";

// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();
    handleSignUp()
    // Code in the logic for storing and retrieving the most recent user.
    name = $("#name-input").val().trim();
    company = $("#company-input").val().trim();
    email = $("#email-input").val().trim();
    password = $("#password-input").val().trim();
    mobile = $("#mobile-input").val().trim();
    address = $("#address-input").val().trim();

    // Code for the push
    dataRef.ref('users').push({

        name: name,
        company: company,
        email: email,
        // password: password,
        mobile: mobile,
        address: address,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});
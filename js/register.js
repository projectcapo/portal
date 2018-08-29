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

/// Initial Values
var name = "";
var company = "";
var email = "";
var password = "";
var confirm_password = "";
var mobile = "";
var address = "";
var city = "";
var state = "";
var zipCode = "";

$("#signupForm").validate({
    rules: {
        name_input: "required",
        password_input: {
            required: true,
            minlength: 5
        },
        confirm_password: {
            required: true,
            minlength: 5,
            equalTo: "#password"
        },
        email_input: {
            required: true,
            email: true
        },
        Zip_input: {
            zipCodeValidation: true // hook in custom zip code validation
        },
        accept: {
            required: "#acceptterms:checked",
            minlength: 2
        },
    },
    messages: {
        nameinput: "Please enter your name",
        password_input: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
        },
        confirm_password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long",
            equalTo: "Please enter the same password as above"
        },
        email_input: "Please enter a valid email address",
        accept: "Please accept our policy"
    }
});

$.validator.addMethod("zipCodeValidation", function () {
    var zipCode = $('#zip_input').val();
    return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(zipCode); // returns boolean
}, "Please enter a valid US zip code (use a hyphen if 9 digits).");


// Capture Button Click
$().ready(function () {
    $("#add-user").on("click", function (event) {
        event.preventDefault();

        name = $("#name_input").val().trim();
        company = $("#company-input").val().trim();
        email = $("#email_input").val().trim();
        password = $("#password_input").val().trim();
        confirm_password = $("#password_input").val().trim();
        mobile = $("#mobile-input").val().trim();
        address = $("#address-input").val().trim();
        city = $("#city-input").val().trim();
        state = $("#state-input").val().trim();
        zipCode = $("#zipCode_input").val().trim();

        var form = $("#signupForm");
        form.validate(); // "validate" method is required for jquery.validate.js

        if (form.valid()) {
            handleSignUp();
            // Code for the push
            dataRef.ref('users').push({
                name: name,
                company: company,
                email: email,
                mobile: mobile,
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        }
    });
});
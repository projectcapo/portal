/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new sheduled item (train) - then update the html + update the database
// When adding trains, administrators should be able to submit the following:
// Train Name
// Destination  
// First Train Time -- in military time
// Frequency -- in minutes
// 3. Create a way to retrieve sheduled items from the item database.
// 4. Create a way to calculate : 
// calculate when the next train will arrive; this should be relative to the current time.
// 5. Stylish & Responsive 

// 1. Initialize Firebase

var database = firebase.database();
var auth = firebase.auth();

// 2. Form-Button for adding Items
$(document).ready(function () {
  $("#add-request-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var itmName = $("#requestor").val().trim();
    var itmDesc = $("#desc-input").val().trim();
    var itmDate = moment().format("X");
    var itmType = $("#cat-input").val().trim();

    // Creates local "temporary" object for holding item data
    var newItm = {
      name: itmName,
      desc: itmDesc,
      date: itmDate,
      type: itmType
    };

    // Uploads item data to the database
    database.ref('events').push(newItm);

    // Logs everything to console
    console.log(newItm.name);
    console.log(newItm.desc);
    console.log(newItm.date);
    console.log(newItm.type);

    // Clears all of the text-boxes
    $("#item-name-input").val("");
    $("#desc-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
});
// 3. Create Firebase event for adding item to the database and a row in the html when a user adds an entry
database.ref('events').on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var itmName = childSnapshot.val().name;
  var itmDesc = childSnapshot.val().desc;
  var itmDate = childSnapshot.val().date;
  var itmType = childSnapshot.val().type;

  // Event Info
  console.log(itmName); 
  console.log(itmDesc);
  console.log(itmDate);
  console.log(itmType);

  // Prettify the item start
  var itmStartPretty = moment.unix(itmDate).format("HH:mm");
  console.log("Event TIME: " + itmStartPretty);

  
  // Add each train's data into the table
  $("#request-table > tbody").append("<tr><td>" + itmDate + "</td><td>" + itmName  + "</td><td>" + itmDesc + "</td><td>" +
  itmDate + "</td><td>" + itmType + "</td></tr>" + "In-Progress" + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Event start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case


// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21


/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new request item - then update the html + update the database
// 3. Create a way to retrieve sheduled items from the item database.
// 4. Create a way to calculate days open : 
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
    var itmStatus = "Open";


    // Creates local "temporary" object for holding item data
    var newItm = {
      name: itmName,
      desc: itmDesc,
      date: itmDate,
      type: itmType,
      status: itmStatus
    };

    // Uploads item data to the database
    database.ref('requests').push(newItm);

    // Logs everything to console
    console.log(newItm.name);
    console.log(newItm.desc);
    console.log(newItm.date);
    console.log(newItm.type);

    // Clears all of the text-boxes
    $("#requestor").val("");
    $("#desc-input").val("");
    $("#cat-input").val("");
  });
});
// 3. Create Firebase event for adding item to the database and a row in the html when a user adds an entry
database.ref('requests').on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var itmName = childSnapshot.val().name;
  var itmDesc = childSnapshot.val().desc;
  var itmDate = childSnapshot.val().date;
  var itmType = childSnapshot.val().type;
  var itmStatus = childSnapshot.val().status;

  // Event Info
  console.log(itmName); 
  console.log(itmDesc);
  console.log(itmDate);
  console.log(itmType);
  console.log(itmStatus);

  // Prettify the item start
  var itmDatePretty = moment.unix(itmDate).format("YYYY-MM-DD HH:mm");
  console.log("Event: " + itmDatePretty);

  var dateTimeConverted = moment.unix(itmDate).format("YYYY-MM-DD");
  console.log("Start time : " + dateTimeConverted);
  
  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("YYYY-MM-DD"));

  // Difference between the times
  var diffTime = moment().diff(moment(dateTimeConverted), "Days");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Add each train's data into the table
  $("#request-table > tbody").append("<tr><td>" + itmDatePretty + "</td><td>" + itmName  + "</td><td>" + itmDesc + "</td><td>" + itmType + "</td><td>" + itmStatus + "</td><td>" + diffTime + "</td></tr>");
});

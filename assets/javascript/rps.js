var config = {
    apiKey: "AIzaSyCHNBdbp9D_Ut7fJB3jlxBBV1iVpuqTR94",
    authDomain: "myfirstfirebase-57571.firebaseapp.com",
    databaseURL: "https://myfirstfirebase-57571.firebaseio.com",
    projectId: "myfirstfirebase-57571",
    storageBucket: "myfirstfirebase-57571.appspot.com",
    messagingSenderId: "326583901736"

};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// -------------------- Multi-user connection code --------------------------------//

var player1 = null;
var player2 = null;

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function (snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#watchers").text(snap.numChildren());
});

// -----------------------   End connetion section ----------------------------


// At the page load and subsequent value changes, get a snapshot of the local data.
// This callback allows the page to stay updated with the values in firebase node "clicks"
database.ref("trains").on("value", function (snapshot) {

    // Print the local data to the console.
    console.log(snapshot.val());


    // todo: load in train schedule


    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});



//  On Click event associated with the add-train function
$(document).on("click", "#add-train", function (event) {

    // prevent form from submitting
    event.preventDefault();

    console.log("Submitting answers");

    // todo: change to default to false after input validation coded
    dataValidated = true;


    // Todo: check if input data makes sense
    if (dataValidated) {
        var newRow = $("<tr>");

        // create row elements
        var newName = $("<td>");
        var newDestination = $("<td>");
        var newStartTime = $("<td>");
        var newFreq = $("<td>");
        var newNextArrival = $("<td>");
        var newTimeToArrival = $("<td>");

        // add content from input form
        newName.append($("#tName").val());
        newDestination.append($("#tDestination").val());
        newStartTime.append($("#tStartTime").val());
        newFreq.append($("#tFreq").val());
        newTimeToArrival.append("##");
        newNextArrival.append("##:##");


        newRow.append(newName);
        newRow.append(newDestination);
        newRow.append(newStartTime);
        newRow.append(newFreq);
        newRow.append(newNextArrival);
        newRow.append(newTimeToArrival);

        // add row to dom
        $("#trainSchedules").append(newRow);
    }
    else {

    }







})
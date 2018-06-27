var config = {

};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// -------------------- Multi-user connection code --------------------------------//

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



// At the page load and subsequent value changes, get a snapshot of the local data.
// This callback allows the page to stay updated with the values in firebase node "clicks"
database.ref("/clicks").on("value", function(snapshot) {

    // Print the local data to the console.
    console.log(snapshot.val());
  
  
  // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
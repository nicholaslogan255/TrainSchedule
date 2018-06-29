
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyCHNBdbp9D_Ut7fJB3jlxBBV1iVpuqTR94",
  authDomain: "myfirstfirebase-57571.firebaseapp.com",
  databaseURL: "https://myfirstfirebase-57571.firebaseio.com",
  projectId: "myfirstfirebase-57571",
  storageBucket: "myfirstfirebase-57571.appspot.com",
  messagingSenderId: "326583901736"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFreq = $("#Frequency-input").val().trim();
  var trainStart = moment($("#start-time-input").val().trim(), "HH:mm").format("HH:mm");

  // flag to check for errors
  var dataValidated = true;
  var errorMsg = ""; // message for user if error


  console.log("Raw Data: " + trainName);
  console.log("Raw Data: " + trainDest);
  console.log("Raw Data: " + trainFreq);
  console.log("Raw Data: " + trainStart);

  if (trainName === "" || trainDest === "" || trainFreq === "false" || trainStart === "") {
    $("#userMessage").text("Please enter all fields");
    dataValidated = false;
  }

  var temp = isNaN(trainFreq)
  console.log("isNaN: "+ temp);

  // check if train freq is a positive number
  if (parseInt(trainFreq) < 1 || isNaN(trainFreq)) {
    $("#userMessage").text("Train Frequency be a valid number");
    dataValidated = false;

  }

  if (trainStart === "Invalid date") {
    $("#userMessage").text("Please enter a valid start time");
    dataValidated = false;
  }



  if (dataValidated) {
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      frequency: trainFreq,
      start: trainStart
    };

    // Logs everything to console
    console.log("input: " + newTrain.name);
    console.log("input: " + newTrain.destination);
    console.log("input: " + newTrain.frequency);
    console.log("input: " + newTrain.start);

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#Frequency-input").val("");
    $("#start-time-input").val("");

    $("#userMessage").text("Train Entered Successfully!"); // update user message
    $("#myModal").modal(); // show the modal

  }
  else {
   
    $("#myModal").modal();
  }


});

//  Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFreq = childSnapshot.val().frequency;
  var trainStart = childSnapshot.val().start;

  // Prettify the train times
  trainStartTime = moment(trainStart, "HH:mm");

  // train Info
 
  console.log("freq: " + trainFreq);
  console.log("start: " + trainStartTime);

  console.log("Current Time: " + moment().format("HH:mm"));

  // find the minutes since first train in minutes
  var timeSinceStart = moment().diff(trainStartTime, "minutes");
  console.log("min after start: " + timeSinceStart);

  var minToNextTrain = (trainFreq) - (timeSinceStart % trainFreq);
  console.log(minToNextTrain);

  // Calculate the total billed rate
  var nextTrainTime = moment().add(minToNextTrain, "minutes")
  console.log("Next Train: " + nextTrainTime)

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrainTime.format("HH:mm")),
    $("<td>").text(minToNextTrain),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});



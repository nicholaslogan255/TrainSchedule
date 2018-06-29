
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
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFreq = $("#Frequency-input").val().trim();
    var trainStart = moment($("#start-time-input").val().trim(), "MM/DD/YYYY").format("X");

    //empName empRole empRate empStart
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      frequency: trainFreq,
      start: trainStart
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log("input: "+newTrain.name);
    console.log("input: "+newTrain.destination);
    console.log("input: "+newTrain.frequency);
    console.log("input: "+newTrain.start);
  
    //alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#Frequency-input").val("");
    $("#start-time-input").val("");
  });
  
  //  Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFreq = childSnapshot.val().frequency;
    var trainStart = childSnapshot.val().start;

    // Prettify the train times
    trainFreqTime = moment(trainFreq, "minutes");
    trainStartTime = moment(trainStart, "HH:mm");
  
    // train Info
    console.log("Fire: "+trainName);
    console.log("Fire: "+trainDest);
    console.log("Fire: "+trainFreqTime.format("MM"));
    console.log("Fire: "+trainStartTime);


    // Current Time
    //var currentTime = moment();
  
    // find the minutes since first train in minutes
    var timeSinceStart = moment().diff(trainStartTime,"minutes");
 
    var minToNextTrain = trainFreqTime - (timeSinceStart % trainFreqTime);
    console.log(minToNextTrain);
  
    // Calculate the total billed rate
    var nextTrainTime = moment().add( minToNextTrain,"HH:mm")
    console.log(nextTrainTime.format("HH:mm"));
  


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
  

  
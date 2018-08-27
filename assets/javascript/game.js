// Variable Declarations
// Crystal Images Arr
var crystalImageArr = [
  "assets/images/blue-glass-sphere-1194419.jpg",
  "assets/images/crystal-ball-3-1545513.jpg",
  "assets/images/green-glass-sphere-1196476.jpg",
  "assets/images/keep-em-flowin-1568309.jpg"
];

// Global Variable
var targetNumber = 0;
var counter = 0;
var wins = 0;
var losses = 0;
var gameComplete = false;

// Set target number for game and display
function setTargetNumber() {
  // Get target number and display
  targetNumber = Math.floor(Math.random() * 101) + 19;
  $("#gameTarget").text(targetNumber);
}

// Random number function for crystals
function randNumb() {
  return Math.floor(Math.random() * 12 + 1);
}

// Function Definitions

// Start the game
// First set and display target number
// Build crystal image display and assign random numbers
function gameStart() {
  // Get target number and display
  setTargetNumber();

  // load crystals and assign random numbers
  for (var i = 0; i < crystalImageArr.length; i++) {
    // for each iteration we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be givin the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal will be given a src link to the image crystal image
    imageCrystal.attr("src", crystalImageArr[i]);

    // Each imageCrystal will have a height of 100px
    imageCrystal.attr("height", "100px")

    // Each imageCrystal will be given a data attribute called data-crystalVale
    imageCrystal.attr("data-crystalvalue", randNumb());

    // Lastly, each crystal image (with all its classes and attributes) will get added to the page
    $("#crystals").append(imageCrystal);
  }
}

// Restart the game:
// Reset target number and display
// Assign new random numbers to crystals
// Reset and display game counter
// reset game complete indicator
function gameRestart() {
  setTargetNumber();

  $("img.crystal-image").each(function() {
    $(this).attr("data-crystalvalue", randNumb());
  })


  // reset game counter
  counter = 0;
  $("#gameScore").text(counter);

  // reset game complete
  gameComplete = false;
}

// Game Logic
// Start the game
// Respond to click on crystals
//  Calculate counter
// 
gameStart();

// This time, our click event applies to every single crystal on the page. Not just one.
$(".crystal-image").on("click", function() {
  // Determining the crystal's value requires us to extract the value from the data attribute.
  // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
  // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
  // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter.//#endregion
  var crystalValue = ($(this).attr("data-crystalvalue"));
  crystalValue = parseInt(crystalValue);

  // We then add the crystalValue to the user's "counter" which is a global variable.
  // Every click, from every crystal adds to the global counter.
  counter += crystalValue;

  // All of the same game win-lose logic applies. So the rest remains unchanged.
  $("#gameScore").text(counter);

  if (counter === targetNumber) {
    wins++;
    $("#totalScore").html("You Won!!<br><br>Wins: " + wins + "<br><br>Losses: " + losses);
    gameComplete = true;
  }
  else if (counter >= targetNumber) {
    losses++;
    $("#totalScore").html("You Lost!!<br><br>Wins: " + wins + "<br><br>Losses: " + losses);  
    gameComplete = true;
  }

  if (gameComplete) {
    gameRestart();
  }
});

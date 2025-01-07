const gamePattern = [];
let userClickedPattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  userClickedPattern = [];

  var randomnum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomnum];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$('[class*="btn"]').on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

let gameStarted = false;
let level = 0;

$("body").on("click", function () {
  if (!gameStarted) {
    resetGame();
    addLevel();
    nextSequence();
    gameStarted = true;
  }
});

function addLevel() {
  level++;
  $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        addLevel();
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("failure");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Click Anywhere to Restart");
    startOver();
  }
}

function startOver() {
  gamePattern.length = 0;
  level = 0;
  gameStarted = false;
}

function resetGame() {
  $("#level-title").text("Level 0");
}

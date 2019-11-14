
var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {

  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSounds(userChosenColor);

  animatedPress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    playSounds('wrong');
    $(document.body).addClass("game-over");
    $("#level-title").text("Game over, Press Any Key To Continue");
    setTimeout(function(){ $(document.body).removeClass("game-over"); }, 200);
    startOver();
  }
}

function nextSequence(){

  level ++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColor[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSounds(randomChosenColor);
}

function playSounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatedPress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() { $("#" + currentColor).removeClass("pressed"); }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

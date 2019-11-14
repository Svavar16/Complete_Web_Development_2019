
// the function that makes the sound.
function soundOfSilence(e){
  switch(e){
  case "w":
    var tom1 = new Audio("sounds/tom-1.mp3");
    tom1.play();
    break;

  case "a":
    var tom2 = new Audio("sounds/tom-2.mp3");
    tom2.play();
    break;

  case "s":
    var tom3 = new Audio("sounds/tom-3.mp3");
    tom3.play();
    break;

  case "d":
    var tom4 = new Audio("sounds/tom-4.mp3");
    tom4.play();
    break;

  case "j":
    var snare = new Audio("sounds/snare.mp3");
    snare.play();
    break;

  case "k":
    var crash = new Audio("sounds/crash.mp3");
    crash.play();
    break;

  case "l":
    var kickbass = new Audio("sounds/kick-bass.mp3");
    kickbass.play();
    break;

  default: // just in case if something where to happen
    console.log(this);
  }
}

// button flashing

function buttonAnimation(e){
  var activeButton = document.querySelector("." + e); // get the active button
  activeButton.classList.add("pressed"); // add the class pressed into the button
  setTimeout(function(){ // and after some delay, it will be removed
    activeButton.classList.remove("pressed");
  }, 100); // after 1 millisecond
}

// button pressed

var button_length = document.querySelectorAll(".drum").length; // getting the length of the .drum class
for(var i = 0; i < button_length; i++){ // for as long as i is not at the button_length, then it will loop through
  document.querySelectorAll(".drum")[i].addEventListener("click", function() { // the evvent listener, where we find what button is being pushed
    var buttonInnerHtml = this.innerHTML; // getting the innerHTML of the button
    soundOfSilence(buttonInnerHtml); // play the sound
    buttonAnimation(buttonInnerHtml);
  });
}

// keydown pressed

// getting the event listener
document.addEventListener("keydown", function(e){// the keydown listener
  var keydownInnerHTML = e.key; // get the key value and put it into an var
  soundOfSilence(keydownInnerHTML); // play the sound
  buttonAnimation(keydownInnerHTML);
});

var rannumb1 = Math.random();
rannumb1 = Math.floor(rannumb1 * 6) + 1;
var rannumb2 = Math.random();
rannumb2 = Math.floor(rannumb2 * 6) + 1;

var image1 = "images/dice" + rannumb1 + ".png";

document.querySelectorAll("img")[0].setAttribute("src", image1);


var image2 = "images/dice" + rannumb2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", image2);


if(rannumb1 > rannumb2){
  document.querySelector(".container h1").innerHTML = "Player 1 Wins";
}
else if(rannumb2 > rannumb1){
  document.querySelector(".container h1").innerHTML = "Player 2 Wins";
}
else if(rannumb1 == rannumb2){
  document.querySelector(".container h1").innerHTML = "Nobody wins";
}

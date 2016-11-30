var score = 0;

function questionOne() {
  var correct = document.getElementById("a")
  if (correct.checked === true) {
    score ++;
    alert("correct! your score is now " + score)
  }
  else {
    alert("Nope that is not the answer, the correct answer is Bruce Wayne.")
  }
}

function questionTwo() {
  var correct = document.getElementById("d")
  if (correct.checked === true) {
    score ++;
    alert("correct! your score is now " + score)
  }
  else {
    alert("You are wrong.")
  }
}

function questionThree() {
  var correct = document.getElementById("g")
  if (correct.checked === true) {
    score ++;
    alert("correct! your score is now " + score)
  }
  else {
    alert("No! the correct answer is 40.")
  }
}




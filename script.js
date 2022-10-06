


// todo: add event listener for starting timer
// todo: add event listener for buttons
// todo: tie event listener to correct/incorrect answers
// Listen for a click event on toggle switch
// answer.addEventListener("click", function() {
    
// }



// todo: fix timer code to span all pages

// Selects element by class
var timeEl = document.querySelector(".time");

// Selects element by id
var mainEl = document.getElementById("main");

var secondsLeft = 60;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}


setTime();

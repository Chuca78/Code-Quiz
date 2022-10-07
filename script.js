
// todo: add event listener for starting timer
// btn-start.addEventListener("click", function() {
//     console.log("start clicked")


// todo: fix timer code to span all pages


// todo: integrate event listeners to include scoring
// todo: integrate event listeners to include timer reduction for wrong answers
let container = document.querySelector('#container');
function eventController(event) {
  alert(event.target.className);
}
container.addEventListener('click', eventController, false)


// todo: add high score function



// timer function

// Selects element by class
var timeEl = document.querySelector(".time");
// Selects element by id
var secondsLeft = 5;
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";
    if(secondsLeft < 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      alert("Time is up!")
      // Calls function to create and append image
      sendMessage();
    }
  }, 1000);
}
setTime();

const quizSection = document.querySelectorAll(".quiz-section");
// const START_SECTION = document.getElementById("start");
const startButton = document.getElementById("start-button");
const quizQuestion = document.getElementById("quiz-questions");
const timeRemaining = document.getElementById("time-remaining");
const questions = document.getElementById("question");
const choices = document.getElementById("choices");
const choiceStatus = document.querySelectorAll(".choice-status");
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const end = document.getElementById("end");
const endTitle = document.getElementById("end-title");
const score = document.getElementById("score");
const initialInput = document.getElementById("initials");
const submitScore = document.getElementById("submit-score");
const errorMessages = document.getElementById("error-message");

class Question {
  constructor(question, choices, indexOfCorrectChoice) {
    this.question = question;
    this.choices = choices;
    this.indexOfCorrectChoice = indexOfCorrectChoice;
  }
}
const question1 = new Question("Commonly used data types DO NOT include: ", 
  ["strings", "booleans", "alerts", "numbers"], 2);
const question2 = new Question("The condition in an if / else statement is enclosed within ____.", 
  ["quotes", "parentheses", "curly brackets", "square brackets"], 1);
const question3 = new Question("Arrays in JavaScript can be used to store ____.", 
  ["numbers and strings", "other arrays", "booleans", "all of the above"], 3);
const question4 = new Question("String values must be enclosed within _____ when being assigned to variables.", 
  ["commas", "curly brackets", "quotes", "parentheses"], 2);
const question5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is: ", 
  ["console.log", "terminal/bash", "for loops", "JavaScript"], 0);
const questionList = [question1, question2, question3, question4, question5];

let currentQuestion = 0;
let totalTime = 60;
let totalTimeInterval;
let choiceStatusTimeout; 

startButton.addEventListener('click', startGame);
choices.addEventListener('click', processChoice);
submitScore.addEventListener('submit', processInput);

function startGame() {
  showElement(quizSection, quizQuestion);
  displayTime();  
  displayQuestion();
  startTimer();
}

function showElement(siblingList, showElement) {
  for (element of siblingList) {
    hideElement(element);
  }
  showElement.classList.remove("hidden");
} 

function hideElement(element) {
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");
  }
}

function displayTime() {
  timeRemaining.textContent = totalTime;
}

function startTimer() {
  totalTimeInterval = setInterval(function() {
    totalTime--;
    displayTime();
    checkTime();

  }, 1000);
}

function checkTime() {
  if (totalTime <= 0) {
    totalTime = 0;
    endGame();
  }
}

function displayQuestion() {
  questions.textContent = questionList[currentQuestion].question;
  displayChoiceList();
}

function displayChoiceList() {
  choices.innerHTML = "";
  questionList[currentQuestion].choices.forEach(function(answer, index) {
    const li = document.createElement("li");
    li.dataset.index = index;
    const button = document.createElement("button");
    button.textContent = (index + 1) + ". " + answer;
    li.appendChild(button);
    choices.appendChild(li);
  });
}

function processChoice(event) {
  const userChoice = parseInt(event.target.parentElement.dataset.index);
  resetChoiceStatusEffects();
  checkChoice(userChoice);
  getNextQuestion();
}

function resetChoiceStatusEffects() {
  clearTimeout(choiceStatusTimeout);
  styleTimeRemainingDefault();
}

function styleTimeRemainingDefault() {
  timeRemaining.style.color = "#4616E8";
}

function styleTimeRemainingWrong() {
  timeRemaining.style.color = "red";
}

function checkChoice(userChoice) {
  if (isChoiceCorrect(userChoice)) {
    displayCorrectChoiceEffects();
  } else {
    displayWrongChoiceEffects();
  }
}

function isChoiceCorrect(choice) {
  return choice === questionList[currentQuestion].indexOfCorrectChoice;
}

function displayWrongChoiceEffects() {
  deductTimeBy(10);

  styleTimeRemainingWrong();
  showElement(choiceStatus, incorrect);

  choiceStatusTimeout = setTimeout(function() {
    hideElement(incorrect);
    styleTimeRemainingDefault();
  }, 1000);
}

function deductTimeBy(seconds) {
  totalTime -= seconds;
  checkTime();
  displayTime();
}

function displayCorrectChoiceEffects() {
  showElement(choiceStatus, correct);
  choiceStatusTimeout = setTimeout(function() {
    hideElement(correct);
  }, 1000);
}

function getNextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questionList.length) {
    endGame();
  } else {
    displayQuestion();
  }
}

function endGame() {
  clearInterval(totalTimeInterval);
  showElement(quizSection, end);
  displayScore();
  setEndHeading();
}

function displayScore() {
  score.textContent = totalTime;
}

function setEndHeading() {
  if (totalTime === 0) {
    endTitle.textContent = "Time is up!";
  } else {
    endTitle.textContent = "All done!";
  }
}

function processInput(event) {
  event.preventDefault();
  const initials = initialInput.value.toUpperCase();

  if (isInputValid(initials)) {
    const score = totalTime;
    const highScoreEntry = getNewHighScoreEntry(initials, score);
    saveHighScoreEntry(highScoreEntry);
    window.location.href= "./high-scores.html";
  }
}

function getNewHighScoreEntry(initials, score) {
  const entry = {
    initials: initials,
    score: score,
  }
  return entry;
}

function isInputValid(initials) {
  let errorMessage = "";
  if (initials === "") {
    errorMessage = "Please enter initials";
    displayFormError(errorMessage);
    return false;
  } else if (initials.match(/[^a-z]/ig)) {
    errorMessage = "Please enter only letters"
    displayFormError(errorMessage);
    return false;
  } else {
    return true;
  }
}

function displayFormError(errorMessage) {
  errorMessages.textContent = errorMessage;
  if (!initialInput.classList.contains("error")) {
    initialInput.classList.add("error");
  }
}

function saveHighScoreEntry(highScoreEntry) {
  const currentScores = getScoreList();
  placeEntryInHighScoreList(highScoreEntry, currentScores);
  localStorage.setItem('scoreList', JSON.stringify(currentScores));
}

function getScoreList() {
  const currentScores = localStorage.getItem('scoreList');
  if (currentScores) {
    return JSON.parse(currentScores);
  } else {
    return [];
  }
}

function placeEntryInHighScoreList(newEntry, scoreList) {
  const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
  scoreList.splice(newScoreIndex, 0, newEntry);
}

function getNewScoreIndex(newEntry, scoreList) {
  if (scoreList.length > 0) {
    for (let i = 0; i < scoreList.length; i++) {
      if (scoreList[i].score <= newEntry.score) {
        return i;
      }
    } 
  }
  return scoreList.length;
}

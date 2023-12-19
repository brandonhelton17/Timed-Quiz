var questions = [
    {
        //Question 1
        text: "How do you copy an Object in Javascript?",
        answers: [

            "Copy and Paste",
            "Object.assign()",
            "Using spread parameter"
        ],
        correctIndex: 1,
    },
    {
        //Question 2
        text: "What is a element found between quotations?",
        answers: [

            "number",
            "string",
            "method"
        ],
        correctIndex: 1,
    },
    {
        //Question 3
        text: "How do you make content fit to screen size?",
        answers: [

            "API",
            "addEventListener()",
            "@mediaquery"
        ],
        correctIndex: 2,
    },
    {
        //Question 4
        text: "What is an array?",
        answers: [

            "a collection of items stored at contiguous memory locations.",
            "A place to store items of the same type.",
            "Both a and b."
        ],
        correctIndex: 2,
    },

];
//Selectors
var startBtn = document.querySelector("#btnStartQuiz");
var quizsection = document.querySelector("#quiz");
var startSection = document.querySelector("#start");
var timeLeft = document.querySelector("#timeLeft");
var questionText = document.querySelector("#question-text");
var questionAnswers = document.querySelector("#question-answers")
var highScore = document.querySelector("#highScores")
//Initial Values
var totalTimeLeft = 75;
var timePenalty = 10;
var questionIndex = 0;
var quizInterval;
var totalCorrect = 0;
var gameStarted = false;

function displayTimeLeft() {
    totalTimeLeft--;
    timeLeft.textContent = totalTimeLeft;
}

function endgame() {
    gameStarted = false;
}

function displayNextQuestion() {
    questionAnswers.innerHTML = "";

    var question = questions[questionIndex];
    questionText.textContent = question.text;

    for (var i = 0; i < question.answers.length; i++) {
        var answerChoice = question.answers[i];
        var liEl = document.createElement("li");
        liEl.textContent = answerChoice;
        liEl.setAttribute("data-index", i);
        questionAnswers.appendChild(liEl);
        questionAnswers.setAttribute("data-correct-index", question.correctIndex);
    }
}

function checkAnswer(answerIndex) {
    var currentQuestion = questions[questionIndex];
    if (currentQuestion.correctIndex === parseInt(answerIndex)) {
        totalCorrect++;
    } else {
        timeLeft -= timePenalty;
    }
}

function answerClickHandler(event) {
    if (event.target.matches("li")) {

        questionIndex++;

        if (totalTimeLeft && questionIndex < questions.length) {
            var clickedAnswerIndex = event.target.dataset.index;
            checkAnswer(clickedAnswerIndex);
            displayNextQuestion();
        } else {
            endgame();
        }

    }
}

function showScore() {
        quizsection.style.display = 'none';
        highScore.style.display = 'flex';
       console.log("TOTAL TIME LEFT:", totalTimeLeft);
        
}
    
function quizIntervalFunction() {
    if (totalTimeLeft > 0 && questionIndex < questions.length) {
        displayTimeLeft();
    } else {
        clearInterval(quizInterval);
        showScore();
    }
}

function startQuiz() {
    gameStarted = true;
    startSection.style.display = 'none';
    quizsection.style.display = 'flex';

    quizInterval = setInterval(quizIntervalFunction, 1000);
    displayNextQuestion();
}

function init() {
    startBtn.addEventListener("click", startQuiz);
    questionAnswers.addEventListener("click", answerClickHandler);
}

init();
//init questions
var questions = [{
        question: "Commonly used data types do NOT include:",
        answers: [
            "string",
            "boolean",
            "alert",
            "integer"
        ],
        correct: "3"
    },
    {
        question: "The conditional in an if/else statement is enclosed in: ",
        answers: [
            "brackets",
            "parentheses",
            "curly braces",
            "quotations"
        ],
        correct: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: [
            "numbers and strings",
            "other arrays",
            "objects",
            "all of the above"
        ],
        correct: "4"
    },
    {
        question: "What are the primitive types in JavaScript?",
        answers: [
            "string, number, bigint, boolean, undefined, and symbol",
            "array, number, char, pointer, null, and symbol",
            "string, integer, bigint, boolean, undefined, and object",
            "char, number, string, boolean, null, and symbol"
        ],
        correct: "1"
    },
]
var currentQuestion = 0; //0 based to match array index

//get DOM elements
var quizElBackup = document.getElementById("quiz").innerHTML;
var startElBackup = document.getElementById("startScreen").innerHTML;
var submitElBackup = document.getElementById("submitScore").innerHTML;
var timerEl = document.getElementById("timer");
var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var resultEl = document.getElementById("result");
var timer;

showStart();

function displayNextQuestion() {
    if (currentQuestion != questions.length) {
        var question = questions[currentQuestion];
        questionEl.textContent = question.question;
        for (let index = 0; index < answersEl.children.length; index++) {
            const element = answersEl.children[index];
            element.textContent = `${index+1}. ${question.answers[index]}`;
        }
    } else {
        showScore();
    }
}

function checkResult(clickedId) {
    if (clickedId == questions[currentQuestion].correct) {
        resultEl.textContent = "Right!";
        setTimeout(() => {
            resultEl.textContent = "";
        }, 2000);
    } else {
        resultEl.textContent = "Wrong!";
        setTimeout(() => {
            resultEl.textContent = "";
        }, 2000);
        timerEl.firstElementChild.textContent -= 15;
        if (timerEl.firstElementChild.textContent < 0) {
            timerEl.firstElementChild.textContent = 0;
        }
    }
    currentQuestion++;
    displayNextQuestion();
}

function clearWindow(){
    try {
        document.getElementById("quiz").remove();
    } catch (error) {
        console.log("Quiz section doesn't exist, skipping remove");
    }

    try {
        document.getElementById("startScreen").remove();
    } catch (error) {
        console.log("Start section doesn't exist, skipping remove");
    }

    try {
        document.getElementById("submitScore").remove();
    } catch (error) {
        console.log("Submit section doesn't exist, skipping remove");
    }
}

function showQuiz() {
    clearWindow();

    var temp = document.createElement('section');
    temp.id = "quiz";
    temp.innerHTML = quizElBackup;
    document.getElementById("header").after(temp);
    questionEl = document.getElementById("question");
    answersEl = document.getElementById("answers");
    resultEl = document.getElementById("result");
    timer = setInterval(() => {
        if (timerEl.firstElementChild.textContent <= 0) {
            clearInterval(timer);
            timerEl.firstElementChild.textContent = 0;
            showScore();
            return;
        }
        timerEl.firstElementChild.textContent -= 1;
    }, 1000);
    timerEl.firstElementChild.textContent = 75;
    currentQuestion = 0;
    displayNextQuestion();
}

function showStart() {
    clearWindow();

    var temp = document.createElement('section');
    temp.id = "startScreen";
    temp.innerHTML = startElBackup;
    document.getElementById("header").after(temp);
    timerEl.firstElementChild.textContent = 75;
    currentQuestion = 0;
}

function showScore() {
    clearWindow();

    var temp = document.createElement('section');
    temp.id = "submitScore";
    temp.innerHTML = submitElBackup;
    document.getElementById("header").after(temp);
    document.getElementById("score").textContent = timerEl.firstElementChild.textContent;
    clearInterval(timer);
    currentQuestion = 0;
}

function submitScore() {
    var special = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    var hasSpecial = false;
    for (var i = 0; i < special.length; i++) {
        if (document.getElementById("initials").value.includes(special[i])) {
            hasSpecial = true;
        }
    }
    if (document.getElementById("initials").value == "" || hasSpecial) {
        alert("Please enter a valid name, no special sharacters");
        return
    }
    if (localStorage.getItem("highScores") === null) {
        var scores = [{
            initials: document.getElementById("initials").value,
            score: timerEl.firstElementChild.textContent
        }];
        localStorage.setItem("highScores", JSON.stringify(scores));
    } else {
        var scores = JSON.parse(localStorage.getItem("highScores"));
        scores.push({
            initials: document.getElementById("initials").value,
            score: timerEl.firstElementChild.textContent
        })
        scores.sort((a, b) => b.score - a.score);
        scores.splice(10);
        localStorage.setItem("highScores", JSON.stringify(scores));
    }
    window.location.href = "./highscores.html";
}
// define questions objects
var arTrivia = [
  { question: "What is my favorite color?", option: ["Red", "Blue", "Yellow", "Green"], answer: "Blue" },
  { question: "What is my favorite pet?", option: ["Dog", "Cat", "Bird", "Lizard"], answer: "Lizard" },
  { question: "What is my favorite decade?", option: ["1980", "1990", "2000", "2010"], answer: "1980" },
  { question: "What color is my car?", option: ["Green", "Red", "Black", "White"], answer: "Black" },
  { question: "What is the last day of class?", option: ["1/29/19", "2/2/19", "2/3/19", "2/5/19"], answer: "2/2/19" },
  { question: "How many tables are in the room?", option: ["16", "18", "20", "22"], answer: "22" },
  { question: "How many hours is this class?", option: ["4", "3.5", "3", "2.5"], answer: "3" },
];

// define variables
var timeLeft = 15;
var intervalId;
var curQuestion = -1;
var curAnswer = "";
var gameRunning = false;
var numberRight = 0;
var gameDone = false;
var sortQuestions = [0, 1, 2, 3, 4, 5, 6];

// define jQuery objects
var $counter = $("#counter");
var $question = $("#question");
var $btn1 = $("#btn1");
var $btn2 = $("#btn2");
var $btn3 = $("#btn3");
var $btn4 = $("#btn4");
var $results = $("#results");
var $btnNext = $("#btnNext");

// new game function
function newGame() {
  //console.log(arTrivia[0].question);
  $question.text("Questions will be displayed in this section");
  $btn1.text("Choice one");
  $btn2.text("Choice two");
  $btn3.text("Choice three");
  $btn4.text("Choice four");
  $results.text("The answers will be displayed here along with if you got it correct.");
  curQuestion = -1;
  numberRight = 0;
}

function showQuestion(indx) {
  $question.text(arTrivia[indx].question);
  $btn1.text(arTrivia[indx].option[0]);
  $btn2.text(arTrivia[indx].option[1]);
  $btn3.text(arTrivia[indx].option[2]);
  $btn4.text(arTrivia[indx].option[3]);
  curAnswer = arTrivia[indx].answer;
}

// timer function
function countDown() {
  // decrement the time left
  timeLeft--;
  // show the time left
  $("#counter").text(timeLeft + " seconds");
  if (timeLeft <= 0) {
    clearInterval(intervalId);
    $("#counter").text("Time is up!");
    $("#results").text("The correct answer is " + curAnswer);
    $btnNext.show();
    gameRunning = false;
  }
}

function randomizeQuestion() {
  var randNum = 0;
  for (var i = 0; i < sortQuestions.length; i++) {
    randNum = Math.floor(Math.random() * 7);
    if (randNum !== i) {
      var temp = sortQuestions[i];
      sortQuestions[i] = sortQuestions[randNum];
      sortQuestions[randNum] = temp;
    }
  }
}

// define button click function
$(".answerBtn").on("click", function (event) {
  if (gameRunning) {
    var resultMessage = "";
    var sBtnValue = $(this).text();
    console.log(sBtnValue);
    clearInterval(intervalId);
    if (curAnswer === sBtnValue) {
      resultMessage = "You got it right! The correct answer was " + curAnswer;
      numberRight++;
    } else {
      resultMessage = "Sorry you did not get it right! The correct answer was " + curAnswer;
    }
    $("#results").text(resultMessage);
    gameRunning = false
    if (curQuestion === arTrivia.length - 1) {
      $("#results").append("<br>You got " + numberRight + " out of " + arTrivia.length + " question correct.");
      $btnNext.text("Start");
      gameDone = true;
    }
    $btnNext.show();
  }
});

$(".startBtn").on("click", function (event) {
  if (gameDone) {
    curQuestion = -1;
    numberRight = 0;
    gameDone = false;
    randomizeQuestion();
  }
  if (!gameRunning) {
    curQuestion++;
    showQuestion(sortQuestions[curQuestion]);
    timeLeft = 15;
    $("#counter").text(timeLeft + " seconds");
    intervalId = setInterval(countDown, 1000);
    gameRunning = true;
    $("#results").text("");
    $btnNext.text("Next");
    $btnNext.hide();
  }
});

newGame();

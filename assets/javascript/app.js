var triviaQuestions = [
  {
    question: "Which of these wore number 3 for the Sixers ? ",
    answerList: ["Allen Iverson", "Eric Snow", "Ben Simmons", "Michael Jordan"],
    answer: 0
  },
  {
    question: " In the year 2018-2019 who made it to the All-Star game ? ",
    answerList: [
      "Jimmy Butler & JJ Redick ",
      "Zhaire Smith & Tobias Harris",
      "Ben Simmons & Joel Embiid",
      "Leborn James & Delonte West"
    ],
    answer: 2
  },
  {
    question: " Biggest bust for the 76ers? ",
    answerList: [
      "Greg Oden",
      "Anthony Bennett",
      "Markelle fultz",
      "Brian Scalabrine aka GOAT"
    ],
    answer: 2
  },
  {
    question: "What areana does the 76ers play in ?",
    answerList: [
      "Lincoln Financial Field",
      "Citizens Bank Park",
      "Saigon Cafe",
      "Wells Fargo Center"
    ],
    answer: 3
  },
  {
    question: "What number does Ben Simmons wear ? ",
    answerList: ["21", "25", "3", "11"],
    answer: 1
  },
  {
    question: "Who is Ben Simmons girlfriend? ",
    answerList: ["Kendall Jenner", "Cardi B", "Lady Gaga", "Single"],
    answer: 0
  },
  {
    question: " What number does Joel Embiid wear ? ",
    answerList: ["25", "21", "23", "44"],
    answer: 1
  },
  {
    question: " Who is the coach for the 76ers ?  ",
    answerList: [
      "Phil Jackson",
      "Doug Pederson",
      "Brett Brown",
      "LeBron James"
    ],
    answer: 2
  },
  {
    question: " Who say this famous quote  We Talkin Bout Practice ?  ",
    answerList: [
      "Joel Embiid",
      "Allen Iverson",
      "Jimmy Butler",
      "Tobias Harris"
    ],
    answer: 1
  },
  {
    question: " During the dark age in 76ers what was the motto?  ",
    answerList: [
      "Trust the Process",
      "Winning is a habit, Success is a choice.",
      "Just Do It",
      "Winning is a habit, Success is a choice"
    ],
    answer: 0
  }
];

var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
  correct: "Yes, that's right!",
  incorrect: "No, that's not it.",
  endTime: "Out of time!",
  finished: "Alright! Let's see how well you did."
};

//Start the Game
$("#startBtn").on("click", function() {
  $(this).hide();
  newGame();
});

$("#startOverBtn").on("click", function() {
  $(this).hide();
  newGame();
});

function newGame() {
  $("#finalMessage").empty();
  $("#correctAnswers").empty();
  $("#incorrectAnswers").empty();
  $("#unanswered").empty();
  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
  unanswered = 0;
  newQuestion();
}

function newQuestion() {
  $("#message").empty();
  $("#correctedAnswer").empty();
  answered = true;

  //sets up new questions & answerList
  $("#currentQuestion").html(
    "Question #" + (currentQuestion + 1) + "/" + triviaQuestions.length
  );
  $(".question").html(
    "<h2>" + triviaQuestions[currentQuestion].question + "</h2>"
  );
  for (var i = 0; i < 4; i++) {
    var choices = $("<div>");
    choices.text(triviaQuestions[currentQuestion].answerList[i]);
    choices.attr({ "data-index": i });
    choices.addClass("thisChoice");
    $(".answerList").append(choices);
  }

  //Setting a timer for each question
  countdown();
  //clicking an answer will pause the time and setup answerPage
  $(".thisChoice").on("click", function() {
    userSelect = $(this).data("index");
    clearInterval(time);
    answerPage();
  });
}

function countdown() {
  seconds = 10;
  $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
  answered = true;
  //sets timer to go down
  time = setInterval(showCountdown, 1000);
}

function showCountdown() {
  seconds--;
  $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
  if (seconds < 1) {
    clearInterval(time);
    answered = false;
    answerPage();
  }
}

function answerPage() {
  $("#currentQuestion").empty();
  $(".thisChoice").empty(); //Clears question page
  $(".question").empty();

  var rightAnswerText =
    triviaQuestions[currentQuestion].answerList[
      triviaQuestions[currentQuestion].answer
    ];
  var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

  //checks to see if correct, incorrect, or unanswered
  if (userSelect == rightAnswerIndex && answered == true) {
    correctAnswer++;
    $("#message").html(messages.correct);
  } else if (userSelect != rightAnswerIndex && answered == true) {
    incorrectAnswer++;
    $("#message").html(messages.incorrect);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
  } else {
    unanswered++;
    $("#message").html(messages.endTime);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
    answered = true;
  }

  if (currentQuestion == triviaQuestions.length - 1) {
    setTimeout(scoreboard, 1300);
  } else {
    currentQuestion++;
    setTimeout(newQuestion, 1300);
  }
}

function scoreboard() {
  $("#timeLeft").empty();
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#finalMessage").html(messages.finished);
  $("#correctAnswers").html("Correct Answers: " + correctAnswer);
  $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
  $("#unanswered").html("Unanswered: " + unanswered);
  $("#startOverBtn").addClass("reset");
  $("#startOverBtn").show();
  $("#startOverBtn").html("Start Over?");
}

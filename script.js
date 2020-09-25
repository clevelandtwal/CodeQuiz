// Constants:
const header = $("#jumbotron");
const nameInput = $("#name-field input");
const startButton = $("#start-button");
const nextButton = $("#next-button");
const game = $("#game");
const scoreContainer = $("#score-container");
const questionsContainer = $("#questions-container");
const answersContainer = $("#answers-container");
const timerScoreCard = $("#timer_scorecard");
const timerDiv = $("#timer_scorecard #timer");
const highScore = $("#high-score");
const initialsInput = $("#intials-input");
const currentScore = $("#current-score");


const questions = [
  {
    question: "What is jQuery?",
    answers: [
      { text: "A lightweight Javascript library", correct: true },
      { text: "A free and open-source CSS framework", correct: false },
      { text: "A dynamic computer programming language", correct: false },
      { text: "A cross-platform web browser developed by Google", correct: false },
    ]
  },
  {
    question: "What is HTML?",
    answers: [
      { text: "A web browsing language used to evaluate expressions or do any math", correct: false },
      { text: "A free and open-source CSS framework", correct: false },
      { text: "A dynamic computer programming language", correct: false },
      { text: "Standard markup language for documents designed to be displayed in a web browser", correct: true },
    ]
  },
  {
    question: "What are Cascading style sheets?",
    answers: [
      { text: "A lightweight Javascript library", correct: false },
      { text: "A free and open-source CSS framework", correct: true },
      { text: "A dynamic computer programming language", correct: false },
      { text: "A cross-platform web browser developed by Google", correct: false },
    ]
  },
]

let shuffleQuestions, currentQuestion;
let quizTimer;

// Build divs for questions/answers
buildQuestions(questions);

// Enter Name & start Game
$(startButton).on("click", startQuizGame);

function startQuizGame() {
  // Hide name field and enter button on click
  $(nameInput).addClass("d-none");
  $(startButton).addClass("d-none");
  $(header).addClass("d-none");
  // Shuffle questions and set them equal to the questions array that's been sorted
  shuffleQuestions = questions.sort(() => Math.random());
  // Set currentQuestion to 0 for the start of the game
  currentQuestion = 0;
  // Render game
  $(game).removeClass("d-none");
  // Render first question
  renderQuestion()
  // Start timer
  timer()
}

function buildQuestions(questions) {
  // Build divs for question and answers and insert into page
  // Adds event handlers for when a button is clicked
  questions.forEach((q, qi) => {
    const questionAnswerDiv = $(`<div id=${qi} class=d-none>`);
    questionAnswerDiv.addClass(`question-${qi}`);
    questionAnswerDiv.append(q.question);
    $(questionsContainer).append(questionAnswerDiv)

    q.answers.forEach((a, ai) => {
      const answerButton = document.createElement("button")
      answerButton.setAttribute("id", `${ai}`);
      $(answerButton).addClass("d-none");
      $(answerButton).addClass(`question-${qi} answer-btn btn btn-primary`);
      $(answerButton).append(a.text);

      if (a.correct) {
        answerButton.dataset.correct = a.correct
      }
      answersContainer.append(answerButton)
    });
  });
}

function timer() {
  quizTimer = 120;
  countDown = setInterval(function() {
    timerDiv.text(quizTimer + " seconds");
    quizTimer = quizTimer - 1;
    if (quizTimer <= 0) {
      clearInterval(countDown);
      alert("You blew it!!!");
    }
  }, 1000);
}

function renderQuestion() {
  showQuestion(shuffleQuestions[currentQuestion]);
}

function resetState() {
  scoreContainer.text("");
  nextButton.addClass("d-none");
  questionDiv = document.getElementById(`${currentQuestion}`);
  $(questionDiv).addClass("d-none");

  const answerButtons = document.getElementsByClassName(`answer-btn question-${currentQuestion}`);
  for (i = 0; i < answerButtons.length; i++) {
    $(answerButtons[i]).addClass("d-none");
  }
}

function showQuestion(question) {
  questionDiv = document.getElementById(`${currentQuestion}`);

  $(questionDiv).removeClass("d-none");

  const answerButtons = document.getElementsByClassName(`answer-btn question-${currentQuestion}`);
  for (i = 0; i < answerButtons.length; i++) {
    $(answerButtons[i]).removeClass("d-none");
    answerButtons[i].addEventListener("click", selectAnswer);
  }
}

function selectAnswer(e) {
  // select the targets id which corresponds to the answers array order
  const selectedAnswer = e.target;
  const isCorrect = selectedAnswer.dataset.correct;

  // OnClick of question show second question. if click was correct ? render "Correct" : "Wrong" and remove 10 seconds from the timer
  if (isCorrect) {
    scoreContainer.text("Correct!");
  }
  else {
    scoreContainer.text("Wrong!");
    quizTimer = quizTimer - 10;
  }
  $(nextButton).removeClass("d-none");
}

// When next is click render next question
document.getElementById("next-button").addEventListener("click", () => {
  resetState()
  // Increase currentQuesiton index by 1
  currentQuestion++;
  // Render next question
  if (currentQuestion < questions.length) {
    renderQuestion()
  }
  else {
  // When User finishes the game before the timer ends:
  //      Show time left on clock
  //      Show form for entering initials
  //      Show submit button
    highScore.removeClass("d-none");
    timerScoreCard.addClass("d-none");
    currentScore.text(`Your final score is ${quizTimer} seconds! WTG!`);
    clearInterval(countDown);
    initialsInput.removeClass("d-none");

    document.getElementById("store-score").addEventListener("click", () => {
      // Set scores to localStorage
      const initials = document.getElementById("intials-input");
      const scoreInput = `${initials.value} : ${quizTimer} seconds`;
      localStorage.setItem("score", scoreInput);
    });
  }
});

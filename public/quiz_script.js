//  HERE WE ARE STORING QUESTIONS AND ANSWERS. 10 QUESTIONS IN TOTAL

const questions = [
  {
    question: "Which of the following statements are true?",
    answers: [
      { text: "Node.js is Server-side language", correct: true },
      { text: "Node.js is Client-side language", correct: false },
      {
        text: "Node.js is both Server-side and Client-side language",
        correct: false,
      },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What is the full form of REPL?",
    answers: [
      { text: "Read eval Point Loop", correct: false },
      { text: "research eval program Learn", correct: false },
      { text: "Read earn Point Learn", correct: false },
      { text: "Read eval Print Loop", correct: true },
    ],
  },
  {
    question: "Node.js is written in which language?",
    answers: [
      { text: "c++", correct: false },
      { text: "Java", correct: false },
      { text: "JavaScript", correct: true },
      { text: "c", correct: false },
    ],
  },
  {
    question: "How can we install the node body-parser module?",
    answers: [
      { text: "npm install body-parser", correct: true },
      { text: "node install body-parser", correct: false },
      { text: "node.js install body-parser", correct: false },
      { text: "none of the above", correct: false },
    ],
  },
  {
    question:
      "To include the HTTP server in the node module, what function do we use?",
    answers: [
      { text: "get()", correct: false },
      { text: "createServer()", correct: false },
      { text: "require()", correct: true },
      { text: "none of the above", correct: false },
    ],
  },
  {
    question: "We can kill a process in Node.js using the keyboard shortcut?",
    answers: [
      { text: "ctrl +B", correct: false },
      { text: "ctrl +S", correct: false },
      { text: "ctrl +C", correct: true },
      { text: "ctrl +K", correct: false },
    ],
  },
  {
    question: "NodeJS is supported on which of the following platforms?",
    answers: [
      { text: "Mac", correct: false },
      { text: "Windows", correct: false },
      { text: "unix/Linux", correct: false },
      { text: "All of the Above", correct: true },
    ],
  },
  {
    question: "Which of the following fs module is used to close a file?",
    answers: [
      { text: "fs.close()", correct: true },
      { text: "fs.closefile()", correct: false },
      { text: "fs.closepath()", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question:
      "Applications built on NodeJS can access which of the following types of databases?",
    answers: [
      { text: "NoSQL databases", correct: false },
      { text: "SQL databases", correct: false },
      { text: "Both A and B", correct: true },
      { text: "None of the above ", correct: false },
    ],
  },
  {
    question: "In a Node program, is the event loop ______?",
    answers: [
      { text: "Multi_threaded", correct: false },
      { text: "Single-threaded", correct: true },
      { text: "Multi-processing", correct: false },
      { text: "unprocessed", correct: false },
    ],
  },
];



// TARGETING THE ELEMENTS BY THEIR ID
const questionElement = document.querySelector("#question");
const answerButtonsElement = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

// IF THE PERSON REFRESHES THE PAGE OR STARTS THE QUIZ RESETS THE SCORE AND QUESTION INDEX TO ZERO AND RUNS SHOWQUESTION()  
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";

  showQuestion();
}

// THIS FUNCTION DISPLAYS THE CURRENT QUESTION  AND ANSWERS/OPTIONS TO THE QUESTION
//
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  // THIS LITLLE LINE DOWN HERE CLEARS THE EXISTING CONTENTS IN THE ANSWER BUTTONS 
  answerButtonsElement.innerHTML = "";

  // THIS WILL DISPLAY THE ANSWER BUTTONS FOR THAT CURRENT QUESTION. with the help of loop we created new button element inserted the answers/option
  // after that we gave the button and id and appended the button to answers-buttons

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

  // this will show the next button after selecting answers and submit button on last question 
  if (currentQuestionIndex === questions.length - 1) {
    nextButton.innerHTML = "Submit";
  } else {
    nextButton.innerHTML = "Next";
  }
}


// this function is called in showquestion().. when we displayed the answer to answer buttons we wrote a line button.dataset.correct ...and we gave the value of answer.correct to button.dataset.correct
//here we are checking that if the value of button.dataset.correct is equal to true.. it will set the class for it Correct and score will be updated and increemented and vice versa
// and we targeted that selected anwwer by there class for changing the color of the button 
//next we disabled the answers buttons once the user has selected and answer and displayed the next button 
function selectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

//this function will show the scoore after the quiz has ended
function showScore() {
  // Hiding  the next button
  nextButton.style.display = "none";


  // Displaying  the score... scrore was updated above on select answer funtion. 
  questionElement.innerHTML = `Your score: ${score} out of ${questions.length}`;
  answerButtonsElement.innerHTML = "";

  // Here i provided  a button to restart the quiz right after the score message. and and on click i called start quiz ..which will start the quiz again
  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Restart Quiz";
  restartButton.classList.add("btn", "restart-btn");
  restartButton.addEventListener("click", startQuiz);
  answerButtonsElement.appendChild(restartButton);
}


//so this funtion's name justifies itself.. what this will do is if the current question index is less than question length it will show the next button
//else as soon as the user presses the submit button and currentquestionindex is equal to lenght of question. it will display the score.
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// here we targeted the nextButton. that on click if the current question index is less than question length it will run a function handlenextbutton() which is decribed above ..or it will start the quiz again 
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

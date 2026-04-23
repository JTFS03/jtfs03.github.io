// ==========================
// ELEMENTS
// ==========================
const startBtn = document.getElementById("start-btn")
const startScreen = document.getElementById("start-screen")

const quizContainer = document.getElementById("quiz-container")
const questionEl = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")

const resultContainer = document.getElementById("result-container")
const resultTitle = document.getElementById("result-title")

// ==========================
// DATA (VERY SIMPLE)
// ==========================
const questions = [
  {
    question: "You hear a noise. What do you do?",
    answers: [
      { text: "Run toward it", villain: "x" },
      { text: "Hide and watch", villain: "y" },
      { text: "Think first", villain: "z" }
    ]
  },
]
// score tracker
let scores = {
  Jason: 0,
  Michael: 0,
  Leatherface: 0,
  Ghostface: 0,
  Jigsaw: 0,
  Freddy: 0


}

let currentQuestion = 0

// ==========================
// START QUIZ
// ==========================
startBtn.onclick = () => {
  startScreen.style.display = "none"
  quizContainer.style.display = "block"
  showQuestion()
}

// ==========================
// SHOW QUESTION
// ==========================
function showQuestion() {
  answerButtons.innerHTML = ""

  let q = questions[currentQuestion]
  questionEl.textContent = q.question

  q.answers.forEach(answer => {
    const btn = document.createElement("button")
    btn.textContent = answer.text

    btn.onclick = () => {
      scores[answer.villain]++
      currentQuestion++

      if (currentQuestion < questions.length) {
        showQuestion()
      } else {
        showResult()
      }
    }

    answerButtons.appendChild(btn)
  })
}

// ==========================
// SHOW RESULT
// ==========================
function showResult() {
  quizContainer.style.display = "none"
  resultContainer.style.display = "block"

  let winner = "Jason"

  if (scores.Michael > scores[winner]) winner = "Michael"
  if (scores.Leatherface > scores[winner]) winner = "Leatherface"
  if (scores.Ghostface > scores[winner]) winner = "Ghostface"
  if (scores.Jigsaw > scores[winner]) winner = "Jigsaw"
  if (scores.Freddy > scores[winner]) winner = "Freddy"

  resultTitle.textContent = "You are " + winner
}
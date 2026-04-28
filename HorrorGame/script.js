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

const restartBtn = document.getElementById("restart-btn")

// ==========================
// DATA 
// ==========================
const questions = [
  {
    question: "You notice someone watching you from a distance. What do you do?",
    image: "images/woods.webp",
    answers: [
      { text: "Approach them", villain: "Jason" },
      { text: "Watch back", villain: "Michael" },
      { text: "Yell at them", villain: "Freddy" },
      { text: "Intimidate them", villain: "Leatherface" }
    ]
  },
  {
    question: "You prefer situations where you have:",
    image: "images/face.jpg",
    answers: [
      { text: "Physical control", villain: "Jason" },
      { text: "Time and patience", villain: "Michael" },
      { text: "Psychological edge", villain: "Freddy" },
      { text: "A planned setup", villain: "Jigsaw" }
    ]
  },
  {
    question: "How do you handle pressure?",
    image: "images/eyes.png",
    answers: [
      { text: "Push through", villain: "Jason" },
      { text: "Stay calm", villain: "Michael" },
      { text: "Turn it into a game", villain: "Jigsaw" },
      { text: "Act unpredictably", villain: "Ghostface" }
    ]
  },
  {
    question: "What kind of presence do you have?",
    image: "images/creepy.jpg",
    answers: [
      { text: "Overwhelming", villain: "Leatherface" },
      { text: "Quiet", villain: "Freddy" },
      { text: "Chaotic", villain: "Ghostface" },
      { text: "Strategic", villain: "Jigsaw" }
    ]
  }
]
// ==========================
// STATE
// ==========================
let scores = {
  Jason: 0,
  Michael: 0,
  Leatherface: 0,
  Ghostface: 0,
  Jigsaw: 0,
  FreddyK: 0
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

  // BACKGROUND IMAGE
  document.body.style.backgroundImage = `url(${q.image})`

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

  for (let villain in scores) {
    if (scores[villain] > scores[winner]) {
      winner = villain
    }
  }

  resultTitle.textContent = "You are " + winner
}

// ==========================
// PLAY AGAIN BUTTON
// ==========================
restartBtn.onclick = () => {
  currentQuestion = 0

  scores = {
    Jason: 0,
    Michael: 0,
    Leatherface: 0,
    Ghostface: 0,
    Jigsaw: 0,
    FreddyK: 0
  }

  resultContainer.style.display = "none"
  quizContainer.style.display = "none"
  startScreen.style.display = "block"
}
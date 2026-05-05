// ==========================
// ELEMENTS
// ==========================
const startBtn = document.getElementById("start-btn")
const startScreen = document.getElementById("start-screen")

const quizInner = document.getElementById("quiz-container-inner")
const questionEl = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")

const resultContainer = document.getElementById("result-container")
const resultTitle = document.getElementById("result-title")

const restartBtn = document.getElementById("restart-btn")

// ==========================
// API KEYS
// ==========================
const OMDB_KEY = "c5767079"
const UNSPLASH_KEY = "5sliI8Jpj89Rmg9rfR0gR2eszFlAkCQIK41TN78d1DM"

// ==========================
// DATA 
// ==========================
const questions = [
  {
    question: "You notice someone watching you from a distance. What do you do?",
    answers: [
      { text: "Approach them", villain: "Jason" },
      { text: "Watch back", villain: "Michael" },
      { text: "Yell at them", villain: "Freddy" },
      { text: "Intimidate them", villain: "Leatherface" }
    ]
  },
  {
    question: "You prefer situations where you have:",
    answers: [
      { text: "Physical control", villain: "Jason" },
      { text: "Time and patience", villain: "Michael" },
      { text: "Psychological edge", villain: "Freddy" },
      { text: "A planned setup", villain: "Jigsaw" }
    ]
  },
  {
    question: "How do you handle pressure?",
    answers: [
      { text: "Push through", villain: "Jason" },
      { text: "Stay calm", villain: "Michael" },
      { text: "Turn it into a game", villain: "Jigsaw" },
      { text: "Act unpredictably", villain: "Ghostface" }
    ]
  },
  {
    question: "What kind of presence do you have?",
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
  Freddy: 0
}

let currentQuestion = 0

// ==========================
// START QUIZ
// ==========================
startBtn.onclick = () => {
  startScreen.style.display = "none"
  quizInner.style.display = "block"
  showQuestion()
}

// ==========================
// UNSPLASH BACKGROUND
// ==========================
async function loadBackground() {
  const themes = ["horror", "dark forest", "abandoned house", "nightmare"]
  const randomTheme = themes[Math.floor(Math.random() * themes.length)]

  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${randomTheme}&orientation=landscape&client_id=${UNSPLASH_KEY}`
  )

  const data = await res.json()

  document.body.style.backgroundImage = `url(${data.urls.regular})`
  document.body.style.backgroundSize = "cover"
  document.body.style.backgroundRepeat = "no-repeat"
  document.body.style.backgroundPosition = "center"
}

// ==========================
// SHOW QUESTION
// ==========================
function showQuestion() {
  answerButtons.innerHTML = ""

  let q = questions[currentQuestion]
  questionEl.textContent = q.question

  loadBackground()

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
  quizInner.style.display = "none"
  resultContainer.style.display = "block"

  let winner = "Jason"

  for (let villain in scores) {
    if (scores[villain] > scores[winner]) {
      winner = villain
    }
  }

  resultTitle.textContent = "You are " + winner

  loadVillainInfo(winner)
}

// ==========================
// OMDB API
// ==========================
async function loadVillainInfo(villain) {
  const movieMap = {
    Jason: "Friday the 13th",
    Michael: "Halloween",
    Freddy: "A Nightmare on Elm Street",
    Ghostface: "Scream",
    Jigsaw: "Saw",
    Leatherface: "The Texas Chain Saw Massacre"
  }

  const movie = movieMap[villain]

  const res = await fetch(
    `https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${OMDB_KEY}`
  )

  const data = await res.json()

  const infoDiv = document.getElementById("villain-info")

  if (data.Response === "False") {
    infoDiv.innerHTML = "<p>Info not found.</p>"
    return
  }

  infoDiv.innerHTML = `
    <h3>${data.Title} (${data.Year})</h3>
    <img src="${data.Poster}" style="width:200px;">
    <p>${data.Plot}</p>

    <iframe width="300" height="170"
    src="https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(movie + " trailer")}"
    frameborder="0" allowfullscreen>
    </iframe>
  `
}

// ==========================
// RESTART
// ==========================
restartBtn.onclick = () => {
  currentQuestion = 0

  scores = {
    Jason: 0,
    Michael: 0,
    Leatherface: 0,
    Ghostface: 0,
    Jigsaw: 0,
    Freddy: 0
  }

  resultContainer.style.display = "none"
  quizInner.style.display = "none"
  startScreen.style.display = "block"
}
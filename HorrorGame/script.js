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
// DATA 
// ==========================
const questions = [
  {
    question: "You notice someone watching you from a distance. What do you do?",
    image: "../pics/woods.webp",
    answers: [
      { text: "Approach them", villain: "Jason" },
      { text: "Watch back", villain: "Michael" },
      { text: "Yell at them", villain: "Freddy" },
      { text: "Intimidate them", villain: "Leatherface" }
    ]
  },
  {
    question: "You prefer situations where you have:",
    image: "../pics/face.jpg",
    answers: [
      { text: "Physical control", villain: "Jason" },
      { text: "Time and patience", villain: "Michael" },
      { text: "Psychological edge", villain: "Freddy" },
      { text: "A planned setup", villain: "Jigsaw" }
    ]
  },
  {
    question: "How do you handle pressure?",
    image: "../pics/eyes.png",
    answers: [
      { text: "Push through", villain: "Jason" },
      { text: "Stay calm", villain: "Michael" },
      { text: "Turn it into a game", villain: "Jigsaw" },
      { text: "Act unpredictably", villain: "Ghostface" }
    ]
  },
  {
    question: "What kind of presence do you have?",
    image: "../pics/creepy.jpg",
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
// SHOW QUESTION
// ==========================
function showQuestion() {
  answerButtons.innerHTML = ""

  let q = questions[currentQuestion]
  questionEl.textContent = q.question

  // BACKGROUND
  document.body.style.backgroundImage = `url(${q.image})`
  document.body.style.backgroundSize = "cover"
  document.body.style.backgroundRepeat = "no-repeat"

  // POSITION FIXES
  if (q.image.includes("face.jpg")) {
    document.body.style.backgroundPosition = "top"
  } 
  else if (q.image.includes("creepy.jpg")) {
    document.body.style.backgroundPosition = "50% 30%"
  } 
  else {
    document.body.style.backgroundPosition = "center"
  }

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

  loadVillainInfo(winner) // 🔥 API CALL
}

// ==========================
// API FUNCTION
// ==========================
async function loadVillainInfo(villain) {
  const apiKey = "c5767079"

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
    `https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${apiKey}`
  )

  const data = await res.json()

  const infoDiv = document.getElementById("villain-info")

  if (data.Response === "False") {
    infoDiv.innerHTML = "<p>Info not found.</p>"
    return
  }

  infoDiv.innerHTML = `
    <h3>${data.Title} (${data.Year})</h3>
    <img src="${data.Poster}" style="width:200px; margin:10px 0;">
    <p>${data.Plot}</p>
    <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie)}+trailer" target="_blank">
      Watch Trailer
    </a>
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
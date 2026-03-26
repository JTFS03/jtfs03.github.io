//This is the turn counter displayed at the top of the page
let turns = 0;
const turnCounter = document.getElementById("turnCounter");

//This tracks how many matches have been found
let matches = 0;

//This is the win message
const winMessage = document.getElementById("winMessage");

// start none flipped
let flippedCards = [];

// Hey js this prevents clicking while checking cards
let checking = false;

// Hey js this is what you can click on
const cards = document.querySelectorAll(".card");

// Hey js shuffle the cards on the board
function shuffleCards() {

  const gameBoard = document.getElementById("GameBoard");

  // turn NodeList into array so we can shuffle
  const cardArray = Array.from(cards);

  // random sort
  cardArray.sort(() => Math.random() - 0.5);

  // put them back in new order
  cardArray.forEach(card => {
    gameBoard.appendChild(card);
  });

}

// Hey js shuffle cards when page loads
shuffleCards();

// Hey js if click on a card do this flip
cards.forEach(card => {
  card.addEventListener("click", () => {

    //Hey js if game is checking cards do nothing
    if (checking) return;

    //Hey js if already 2 cards flipped stop
    if (flippedCards.length === 2) return;

    //Hey js if you click same card again do nothing
    if (card.classList.contains("flipped")) return;

    //Hey js flip the card
    card.classList.add("flipped");

    //Hey js store flipped card
    flippedCards.push(card);

    console.log(flippedCards);

    //Hey js if 2 cards flipped run this function called checkMatch
    if (flippedCards.length === 2) {
      checkMatch();
    }

  });
});


// Hey Ive been called BECAUSE 2 cards flipped, this is what im gonna do
function checkMatch() {

  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  //Hey js lock the board while checking
  checking = true;

  //count the turn (2 cards = 1 turn)
  turns++;
  turnCounter.innerText = "Turns: " + turns;

  // Initialize no match
  let match = false;

  // check if both cards share same pair class
  card1.classList.forEach(cls => {
    if (cls.startsWith("pair") && card2.classList.contains(cls)) {
      match = true;
    }
  });

  // Hey js wait a bit then do this
  setTimeout(() => {

    if (match) {
      card1.style.visibility = "hidden";
      card2.style.visibility = "hidden";

      // remove flipped state so game stays clean
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");

      // Hey js if match increase matches count by 1 
      matches++;

      //and if 8 matches then show win message
      if (matches === 8) {
        winMessage.style.display = "block";
      }

    } else {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }

    //Hey js reset flipped cards
    flippedCards = [];

    //Hey js unlock the board so player can click again
    checking = false;

  }, 800);
}
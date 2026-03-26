// start none flipped
let flippedCards = [];

// Hey js this is what you can click on
const cards = document.querySelectorAll(".card");

// Hey js if click on a card do this flip
cards.forEach(card => {
  card.addEventListener("click", () => {

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

  // Initialize no match
 let match = false;
  // check if both cards share same pair class
card1.classList.forEach(cls => {
  if (cls.startsWith("pair") && card2.classList.contains(cls)) {
    match = true;
  }
});
  console.log(match);

}

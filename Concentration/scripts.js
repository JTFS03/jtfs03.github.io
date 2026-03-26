//start none flipped
let flippedCards = [];

//Hey js this is what you can click on
const cards = document.querySelectorAll(".card");

//Hey js if you click on a card do this flip
cards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.add("flipped");
    flippedCards.push(card);

    console.log(flippedCards);
  });
});





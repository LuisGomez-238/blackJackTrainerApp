
let dealerSum = 0;
let yourSum = 0;
let playerHand = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true;

//Starts Game
window.onload = function newGame() {
    buildDeck();
    shuffleDeck();
    startGame();
    trainer();

}

//Builds the array that will serve as our deck
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }

}

//Shuffles that deck
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

//Gives each card a numerical value
function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

//Checks for A card
function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

//Turns the value of an A from 11 to 1
function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}


function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    playerStartingHand();

    //Gives the Dealer their first card
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);

    //Gives the player their first 2 cards
    function playerStartingHand() {
        for (let i = 0; i < 2; i++) {
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./cards/" + card + ".png";
            playerHand += getValue(card);
            yourAceCount += checkAce(card);
            document.getElementById("your-cards").append(cardImg);
        }
    }
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

// Gives Advice based on player starting hand
function trainer() {
    let message = "";

    if (playerHand == 20) {
        message = "Right on you have 20! the only hand that can beat you is 21 so let's stay and hope Dealer busts!";
    }
    else if (playerHand == 21) {
        message = "Hazzzah! 21! No way you can mess this up";
    }
    else if (playerHand >= 17) {
        message = "Dude you'd be crazy to hit on anything over a 17";
    }

    else if (playerHand < 17 & playerHand >= 13) {
        message = "If the dealer is showing anything less than a 7 you should stay, dealer has a high probability of busting if they're showing a 7 or better let's fight for the hand";
    }
    else if (playerHand <= 12) {
        message = "You need to hit on anything under 11 you should also double on any 11 you get when you can";
    }
    document.getElementById("advice").innerText = message;
}



// gives the player another card
function hit() {
    if (!canHit) {
        return;
    }

    let playerHand = yourSum;

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
    if (reduceAce(yourSum + playerHand, yourAceCount) >= 21) {
        canHit = false;
    }

}

//ends game
function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum + playerHand, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    //deals the rest of dealers hand
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    //announces winner
    let message = "";

    if (yourSum > 21) {
        message = "You Lose!";

    }
    else if (dealerSum > 21) {
        message = "You win!";
    }

    else if (yourSum == dealerSum) {
        message = "Push!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

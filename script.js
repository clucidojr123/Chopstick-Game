// Initialize variables/refrences
const TOP_LEFT = document.getElementById("TOP_LEFT");
const TOP_RIGHT = document.getElementById("TOP_RIGHT");
const BOT_LEFT = document.getElementById("BOT_LEFT");
const BOT_RIGHT = document.getElementById("BOT_RIGHT");
const turnMessage = document.getElementById("turn");
const chooseMessage = document.getElementById("action");
const MAX = 5;
let turn = 0;
let endgame = false;
let selectedBorder = "dotted black 2px";
let ogBorder = "solid black 2px";
let botMessage = "It is the bottom player's turn.";
let topMessage = "It is the top player's turn.";
let botEnd = "The bottom player won!";
let topEnd = "The top player won!";
let chooseEnd = "To play again, press the reset game button.";
let chooseOne = "Choose the hand to attack/swap from.";
let chooseTwo = "Choose the hand to attack/swap to.";
let selected = null;

/**
 * Moves the number of "fingers" from one hand to another
 * @param {HTMLElement} to - the hand to move to
 * @param {HTMLElement} from - the hand to move from
 */
function move(to, from) {
    let amt = +to.textContent + +from.textContent;
    to.textContent = amt >= MAX ? "0" : amt;
    if (to.id.substring(0, 3) == from.id.substring(0, 3))
        from.textContent = "0";
    turn += 1;
    turnMessage.textContent = turn % 2 === 0 ? botMessage : topMessage;
    chooseMessage.textContent = chooseOne;
    if (empty("TOP") || empty("BOT")) {
        endgame = true;
        turnMessage.textContent = empty("TOP") ? botEnd : topEnd;
        turnMessage.style.color = "green";
        chooseMessage.textContent = chooseEnd;
    }
}

//For when a hand is selected
BOT_LEFT.addEventListener("click", function () {
    if (!endgame) action(BOT_LEFT);
});
BOT_RIGHT.addEventListener("click", function () {
    if (!endgame) action(BOT_RIGHT);
});
TOP_LEFT.addEventListener("click", function () {
    if (!endgame) action(TOP_LEFT);
});
TOP_RIGHT.addEventListener("click", function () {
    if (!endgame) action(TOP_RIGHT);
});

/**
 * Function to handle the text and styling for selecting a hand
 * @param {HTMLElement} hand
 */
function action(hand) {
    if (hand.id.substring(0, 3) == "BOT") {
        if (turn % 2 === 0 && selected === null && +hand.textContent > 0) {
            selected = hand;
            chooseMessage.textContent = chooseTwo;
            hand.style.border = selectedBorder;
        } else if (selected != null && hand != selected) {
            move(hand, selected);
            selected.style.border = ogBorder;
            selected = null;
        }
        return;
    } else {
        if (turn % 2 === 1 && selected === null && +hand.textContent > 0) {
            selected = hand;
            chooseMessage.textContent = chooseTwo;
            hand.style.border = selectedBorder;
        } else if (selected != null && hand != selected) {
            move(hand, selected);
            selected.style.border = ogBorder;
            selected = null;
        }
        return;
    }
}

/**
 * Checks if one of the players has no remaining "fingers"
 * @param {string} side - the player
 */
function empty(side) {
    if (side === "TOP")
        return TOP_LEFT.textContent === "0" && TOP_RIGHT.textContent === "0"
            ? 1
            : 0;
    else
        return BOT_LEFT.textContent === "0" && BOT_RIGHT.textContent === "0"
            ? 1
            : 0;
}

//Reset the game on button click
document.getElementById("rebutton").addEventListener("click", function () {
    resetGame();
});

/**
 * Resets the game to the initial state
 */
function resetGame() {
    resetHelper(BOT_LEFT);
    resetHelper(BOT_RIGHT);
    resetHelper(TOP_LEFT);
    resetHelper(TOP_RIGHT);
    turn = 0;
    turnMessage.style.color = "black";
    chooseMessage.textContent = chooseOne;
    turnMessage.textContent = botMessage;
    selected = null;
    endgame = false;
}

/**
 * Helper function for the resetGame function
 * @param {HTMLElement} hand - hand to reset
 */
function resetHelper(hand) {
    hand.textContent = "1";
    hand.style.border = ogBorder;
}

"use strict";

// Select HTML elements
const gameContainer = document.querySelector(".game-container");
const levelIndicator = document.querySelector(".level_indicator-container");
const gameMessage = document.querySelector(".game_message-container");
const rollDiceButton = document.querySelector(".button");
const playerDice = document.querySelector(".player_dice");
const cpuDice = document.querySelector(".cpu_dice");

// Create Dice Rolls
const diceRolls = {
  playerDiceRolls: null,
  cpuDiceRolls: null,
};

let plyrDiceRoll;
let cpuDiceRoll;

const generateDiceRolls = () => {
  diceRolls.playerDiceRolls = Array.from({ length: 100 }, () =>
    Math.round(Math.random() * 5 + 1)
  );
  diceRolls.cpuDiceRolls = Array.from({ length: 100 }, () =>
    Math.round(Math.random() * 5 + 1)
  );
  plyrDiceRoll = diceRolls.playerDiceRolls;
  cpuDiceRoll = diceRolls.cpuDiceRolls;
};

generateDiceRolls();

// DISPLAY GAME
let level = 0;

const showDice = (player) => {
  player
    ? (playerDice.innerHTML = plyrDiceRoll[level - 1])
    : (cpuDice.innerHTML = cpuDiceRoll[level - 1]);
};

const showGameResult = (result) => {
  setTimeout(() => {
    gameMessage.innerHTML = `You ${result ? "Win" : "Lose"}!`;
  }, 1000);
  setTimeout(() => {
    if (!result) {
      level = 0;
      generateDiceRolls();
    }
    clearGameDisplay(result);
    rollDiceButton.addEventListener("click", diceRollHandler);
  }, 2500);
};

const clearGameDisplay = (result) => {
  cpuDice.innerHTML = "";
  playerDice.innerHTML = "";
  gameMessage.innerHTML = "";
  if (!result) {
    levelIndicator.innerHTML = "";
  }
};

let player = true;

// Function to display game result
const diceRollHandler = () => {
  level++;
  rollDiceButton.removeEventListener("click", diceRollHandler);
  const result = plyrDiceRoll[level - 1] >= cpuDiceRoll[level - 1];
  clearGameDisplay(result);
  levelIndicator.innerHTML = `Level ${level}`;
  showDice(player);
  setTimeout(() => {
    showDice(!player);
    showGameResult(result);
  }, 1000);
};

// Assign function to display game result
rollDiceButton.addEventListener("click", diceRollHandler);

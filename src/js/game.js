import { WORDS, KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.getElementById(`game`);
const logoH1 = document.getElementById(`logo`);
let triesLeft;
let winCount;

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem(`word`);
  //Первый способ решения
  const wordArray = Array.from(word);

  const placeholdersHTML = wordArray.reduce(
    (placeholdersHTML, letter, i) =>
      placeholdersHTML + `<h1 id="letter_${i}" class="letter">_</h1>`,
    ""
  );
  return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;

  //Второй варинат решения
  //   const _array = Array.from("_".repeat(word.length));

  //   const placeholdersHTML = _array.reduce(
  //     (acc, curr, i) => acc + `<h1 id="letter_${i}" class="letter">${curr}</h1>`,
  //     ""
  //   );
  //   return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;

  //Третий вариант решения
  //   let placeholdersHTML = "";
  //   for (let i = 0; i < word.length; i++) {
  //     placeholdersHTML =
  //       placeholdersHTML + `<h1 id="letter_${i}" class="letter">_</h1>`;
  //   }

  //   return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement(`div`);
  keyboard.classList.add(`keyboard`);
  keyboard.id = `keyboard`;

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
    return (
      acc +
      `<button class="buttonPrimery keyboard-button" id="${curr}">${curr}<button>`
    );
  }, "");

  keyboard.innerHTML = keyboardHTML;

  return keyboard;
};

const createHangmanImg = () => {
  const image = document.createElement(`img`);
  image.src = "images/hg-0.png";
  image.alt = `hangman image`;
  image.classList.add(`hangman-img`);
  image.id = `hangman-img`;

  return image;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem(`word`);
  const inputLetter = letter.toLowerCase();
  //Буквы нет в слове
  if (!word.includes(inputLetter)) {
    const triesCounter = document.getElementById(`tries-left`);
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.getElementById(`hangman-img`);
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame(`lose`);
    }
  } else {
    //Буква есть
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount += 1;
        if (winCount === word.length) {
          stopGame(`win`);
          return;
        }
        document.getElementById(`letter_${i}`).innerHTML =
          inputLetter.toUpperCase();
      }
    });
  }
};

const stopGame = (status) => {
  document.getElementById(`placeholders`).remove();
  document.getElementById(`tries`).remove();
  document.getElementById(`keyboard`).remove();
  document.getElementById(`quit`).remove();

  const word = sessionStorage.getItem(`word`);

  if (status === `win`) {
    //сценарий выигрыша
    document.getElementById(`hangman-img`).src = "images/hg-win.png";
    document.getElementById(
      `game`
    ).innerHTML += `<h2 class="result-header win">You won!</h2>`;
  } else if (status === `lose`) {
    //сценарий пригрыша
    document.getElementById(
      `game`
    ).innerHTML += `<h2 class="result-header lose">You lost :</h2>`;
  }
  //сценарий quit
  else if (status === "quit") {
    logoH1.classList.remove(`logo-sm`);
    document.getElementById(`hangman-img`).remove();
  }

  document.getElementById(
    `game`
  ).innerHTML += `<p>The word was: <span class="result-word">${word}</span></p><button id="play-again" class="buttonPrimery px-5 py-2 mt-5">Play again</button>`;
  document.getElementById("play-again").onclick = startGame;
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;
  logoH1.classList.add(`logo-sm`);
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem(`word`, wordToGuess);

  gameDiv.innerHTML = createPlaceholdersHTML();

  gameDiv.innerHTML += `<p id="tries" class"mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    // console.log(event.target.id);
    if (event.target.tagName.toLowerCase() === `button`) {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);
  gameDiv.appendChild(keyboardDiv);
  gameDiv.insertAdjacentHTML(
    "beforeend",
    `<button id="quit" class="button-secondary px-2 py-1 mt-4">Quit</button>`
  );
  document.getElementById(`quit`).onclick = () => {
    const isSure = confirm(
      "Are you sure you want to quit and lose your progress?"
    );
    if (isSure) {
      stopGame(`quit`);
    }
  };

  //   gameDiv.innerHTML += createKeyboard(); Нужно, чтобы добавился новый элеменет и остались предыдущие
  //   //   gameDiv.innerHTML= gameDiv.innerHTML+..
};

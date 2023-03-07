/*----- constants -----*/
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const WORDBANK = ['jupiter', 'saturn', 'uranus', 'mercury', 'venus']
//background space theme music?

/*----- app's state (variables) -----*/
let guessedWord;
let spaceship;
let usedLetters;

/*----- cached element references -----*/
let startButton = document.getElementById('start');
alphabetContainer = document.getElementById('alphabet');

/*----- event listeners -----*/
startButton.addEventListener('click', init);
alphabetContainer.addEventListener('click', makeMove);

/*----- functions -----*/
function init() {
  // Set spaceship default values to invisible
  spaceship = [
    {body: './img/spaceship', visible:false},
    {cabin: './img/spaceship', visible:false},
    {window: './img/spaceship', visible:false},
    {wings: './img/spaceship', visible:false},
    {fuel: './img/spaceship', visible:false}
  ]

  usedLetters = [];

  //Chooses random word from WORDBANK and saves each letter to the guessedWord array
  const rand = Math.floor(Math.random() * WORDBANK.length);
  guessedWord = (WORDBANK[rand].split(""));

  //Debugging purposes only - display current word
  console.log(WORDBANK[rand]);

  //Calls function render()
  render(); 
}

// Calls all page renders: renderSpaceship, renderGuessedWord, renderAlphabet
function render() {
  // Set all spaceship components to be invisible
  spaceship.forEach(component => {
    document.getElementById(Object.keys(component)[0]).style.display = 'none';
  })

  // Makes Start button invisible
  startButton.style.display = 'none';

  // Function calls further render functions according to current game state: 
  renderGuessedWord();
  renderSpaceship();
  renderAlphabet();

  //Makes spaceman invisible if player used all 5 guesses and makes another unsuccessful turn
  // if (everySpaceshipComponentIsVisible()) {
  //   document.getElementById(spaceman).visibility = false
  // }
}

// get value from spaceship obj and if spaceship component visibility === true show component
function renderSpaceship() {
  for (component of spaceship) {
    //if component visibility === true show component
    if (component.visible) {
      document.getElementById(Object.keys(component)[0]).style.display = 'block';
    }
  }
}

// for each letter in guessed word create elenent span and set innerText=letter if letter is included; else add ' ' to the span
function renderGuessedWord() {
  guessedWord.forEach(letter => {
    //check if span with id not exists then create span
    if(!document.getElementById('span-' + letter)) {
      let span = document.createElement('span');
      span.id = 'span-' + letter;
      document.getElementById('word').appendChild(span);
    }

    if(usedLetters.includes(letter)) {
      document.getElementById('span-' + letter).innerText = letter;
    }
    else {
      document.getElementById('span-' + letter).innerText = '_';
    }
  }) 
}

// renders alphabet on the page and disables clicked letter buttons
function renderAlphabet() {
  ALPHABET.split("").forEach(letter => {
    //check if the button is not on the page then add it
    if (!document.getElementById('letter-' + letter)) {
      const letterBtn = document.createElement('button');
      document.getElementById('alphabet').appendChild(letterBtn);
      letterBtn.innerText = letter;
      letterBtn.id = 'letter-' + letter;
    }

    //check if the letter was clicked then disable it
    if (usedLetters.includes(letter.toLowerCase())) {
      document.getElementById('letter-' + letter).disabled = true
    }
  })
}

// this function is a callback of the alphabetContainer event listener. It gets event from event listener and we can get target to find out which button was clicked
function makeMove(evt) {
  if (evt.target.tagName !=='BUTTON') return
  const letter = evt.target.innerText
  usedLetters.push(letter.toLowerCase());
  render()
}

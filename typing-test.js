const TIME_LIMIT = 60;
const TEXT =
  "سعی نکنید همه چیز را بدانید. شما ممکن است خیلی چیزها را دیده و انجام داده باشید، اما لزوما به این معنی نیست که شما می دانید بهترین است. سعی نکنید به مردم بگویید که چگونه می توانند کارها را به شیوه ای بهتر انجام دهند یا اینکه بهتر می توانند کاری انجام دهند.";

let wpmText = document.getElementById("wpm");
let errorText = document.getElementById("errors");
let timerText = document.getElementById("time");
let accuracyText = document.getElementById("accuracy");

let typeText = document.getElementById("type-text");

let textArea = document.getElementById("textarea");

let timeLeft = 0;
let timeElapsed = 0;
let errors = 0;
let accuracy = 0;
let typedCharacter = 0;
let timer = null;
let hasStarted = false;
let wpm = 0; 

initializeTest({ timeLimit: TIME_LIMIT, text: TEXT });

textArea.addEventListener("input", update);

// hasanzadeh
function initializeTest({ timeLimit, text }) {
  // TODO: Complete this function
  timeLeft = timeLimit;
  timerText.innerText = timeLeft;
  text.split('').forEach(character => {
    let span = document.createElement('SPAN');
    span.innerText = character;
    typeText.appendChild(span);
  });
}

function update() {
  if (!hasStarted) {
    timer = setInterval(updateTimer, 1000);
    hasStarted = true;
  }
  typedCharacter++;
  updateCharactersStatus();
  updateErrors();
  updateAccuracy();
  updateWpm();
}
// hasanzadeh
function updateCharactersStatus() {
  // TODO: Complete this function
  let textchars = typeText.childNodes;
  let userChars = textArea.value;
  for (let i = 0; i < userChars.length; i++) {
    let char = textchars[i].innerText;
    if(char !== userChars[i]) {
      textchars[i].classList = 'incorrect-char';
    } else if (char === userChars[i]) {
      textchars[i].classList = 'correct-char';
    } else if(userChars[i] === '') {
      textchars[i].classList = '';
    }
  }
  errors = document.getElementsByClassName('incorrect-char').length;
}

function updateAccuracy() {
  // TODO: Complete this function
  let typedCharacterFalse = document.getElementsByClassName('incorrect-char').length
  let typedCharacterTrue = document.getElementsByClassName('correct-char').length
  typedCharacter = typedCharacterFalse + typedCharacterTrue
  accuracy = (typedCharacter - typedCharacterFalse) / typedCharacter
  accuracyText.innerText = Math.round(accuracy * 100)
}

function updateErrors() {
  // TODO: Complete this function
  errorText.innerText = errors
}

function updateWpm() {
  // TODO: Complete this function

  // let charTrue = document.getElementByClassName("correct-char").length;
  // let charFalse = document.getElementByClassName("incorrect-char").length;
  // // let allChar = charFalse+charTrue
  // let x =allChar/5
  // let y =x/timeElapsed
  // let wpm=y*60
  //   return wpmText.innerText = `${wpm}`
  // if (timeLeft == 0) {
  wpm = Math.round((((typedCharacter / 5) / timeElapsed) * 60));
  // }
  // updateTimer()
  // wpmText.innerText = `${wpm}`;
}

function updateTimer() {
  // TODO: Complete this functio
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
    timerText.textContent = timeLeft;
  }
  else {
    wpmText.innerText = `${wpm}`;
    finishTest();
  }
}

function finishTest() {
  // TODO: Complete this function
  clearInterval(timer);
  textArea.disabled = true;

  // let wpm = Math.round((((typedCharacter / 5) / timeElapsed) * 60));
  // wpmText.innerText = `${wpm}`;
  
}

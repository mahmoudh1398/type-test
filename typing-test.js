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

initializeTest({ timeLimit: TIME_LIMIT, text: TEXT });

textArea.addEventListener("input", update);

// hasanzadeh
function initializeTest({ timeLimit, text }) {
  // TODO: Complete this function
  document.getElementById('time').innerText = timeLeft;
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
}
// hasanzadeh
function updateCharactersStatus() {
  // TODO: Complete this function
  const charArr = typeText.children;
  let userChar = textArea.value.trim();
  for (let i = 0; i < userChar.length; i++) {
    let char = charArr[i].innerText;
    if(char === userChar[i]) {
      charArr[i].classList = 'correct-char';
    }else if (char !== userChar[i]){
      charArr[i].classList = 'incorrect-char';
      errors = errors++;
    }else {
      charArr[i].classList = '';
    }
  }
  errorText.innerHTML = errors;
}

function updateAccuracy() {
  // TODO: Complete this function
  let typedCharacterFalse = document.getElementsByClassName('incorrect-char').length
  let typedCharacterTrue = document.getElementsByClassName('correct-char').length
  let typedCharacter = typedCharacterFalse + typedCharacterTrue
  let accuracy = (typedCharacter - typedCharacterFalse) / 100
  return Math.round(accuracy)
}

function updateErrors() {
  // TODO: Complete this function
  
}

function updateWpm() {
  // TODO: Complete this function

  let charTrue = document.getElementByClassName("correct-char")
  let charFalse = document.getElementByClassName("incorrect-char")
  let allChar = charFalse+charTrue
  let x =allChar/5
  let y =x/timeElapsed
  let wpm=y*60
  wpmText.innerText = `${wpm}`

}

function updateTimer() {
  // TODO: Complete this function
}

function finishTest() {
  // TODO: Complete this function
}

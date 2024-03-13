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

function initializeTest({ timeLimit, text }) {
  timeLeft = timeLimit;
  timerText.innerText = timeLeft;
  text.split("").forEach((character) => {
    let span = document.createElement("SPAN");
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

function updateCharactersStatus() {
  let textChars = typeText.childNodes;
  let userChars = textArea.value;
  for (let i = 0; i < userChars.length; i++) {
    let char = textChars[i].innerText;
    if (char !== userChars[i]) {
      textChars[i].classList = "incorrect-char";
    } else if (char === userChars[i]) {
      textChars[i].classList = "correct-char";
    } else {
      textChars[i].classList = "";
    }
  }
  errors = document.getElementsByClassName("incorrect-char").length;
}

function updateAccuracy() {
  let typedCharacterFalse =
    document.getElementsByClassName("incorrect-char").length;
  let typedCharacterTrue =
    document.getElementsByClassName("correct-char").length;
  typedCharacter = typedCharacterFalse + typedCharacterTrue;
  accuracy = (typedCharacter - typedCharacterFalse) / typedCharacter;
  accuracyText.innerText = Math.round(accuracy * 100);
}

function updateErrors() {
  errorText.innerText = errors;
}

function updateWpm() {
  wpm = Math.round((typedCharacter / 5 / timeElapsed) * 60);
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
    timerText.textContent = timeLeft;
  } else {
    wpmText.innerText = `${wpm}`;
    finishTest();
  }
}

function finishTest() {
  clearInterval(timer);
  textArea.disabled = true;
}

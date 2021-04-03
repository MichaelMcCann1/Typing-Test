let firstP = document.querySelector('#first');
let currentLetter = document.querySelector('#highlight');
let secondP = document.querySelector('#second');
let accuracyPercentage = document.querySelector('#accPercent')
let grossWPM = document.querySelector('#grossScore')

let hiddenCounter = 0;
let errors = 0;
let accuracyCounterWrong = 0;
let AccurayCounterTotal = 0;
let GrossCounter = 0;
let startTime;
let margin = 20;
let wordLength = 1;

document.addEventListener('keypress', (event) => {
  if (AccurayCounterTotal === 0) {
    startTime = Date.now()
  }
  AccurayCounterTotal++;
  updateAccuracy(accuracyCounterWrong, AccurayCounterTotal);

  if (event.key == currentLetter.textContent) { //if key is correct
    let letter = document.createElement('span');
    letter.textContent = currentLetter.textContent;
    firstP.appendChild(letter)
    currentLetter.textContent = secondP.textContent[0];
    secondP.textContent = secondP.textContent.slice(1);




    if (hiddenCounter === 0) { //if no errors on particular letter
      letter.classList.add('right');
    } else {  //if there were errors
      letter.classList.add('wrong');
      errors++;
    }

    if (event.key === ' ') {
      console.log(wordLength)
      margin = margin - wordLength*.9;
      firstP.style.marginLeft = `${margin}rem`;
      wordLength = 0;
    }

    wordLength++;
    hiddenCounter = 0;
    GrossCounter++;
    updateGrossWPM(GrossCounter, startTime);
  } else { //if key is wrong
    hiddenCounter++;
    accuracyCounterWrong++;
  }
})


function updateAccuracy(errors, total){
  let score = ((total - errors) / total) * 100;
  score = Math.round(score);
  accuracyPercentage.textContent = `${score}%`;
}

function updateGrossWPM(count, startTime){
  let time = Date.now() - startTime;
  time = time/60000;
  gross = ((count/5)/time);
  gross = Math.round(gross);
  grossWPM.textContent = gross;
}
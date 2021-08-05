# Typing-Test

This is a speed typing test I created with vanilla JavaScript. The test begins calculating your typing speed as soon as you press a key on your keyboard. The app will keep track of you Gross Words Per Minute and your typing accuracy. More info on these metrics can be found on this article from [SpeedTypingOnline](https://www.speedtypingonline.com/typing-equations). This app is fully responsive and can work on any screen size.

<img src="https://github.com/MichaelMcCann1/Typing-Test/blob/refactor/TypingTestScreenshot.png" width="500" height="400">

The letter that is shaded gray is the current letter that needs to be typed to move on. You cannot move on to the next letter until you type the current letter correctly. If the user typed a letter correctly on their first try the letter will turn green. If it took them more than one attempt to type the correct letter the letter will turn a red color. The stats will update every time a key is pressed by the user.  

# Code Explanation

## HTML

The following markup is crucial to understanding how this app works. The text for the typing test is stored into three different HTML elements. The `<span>` element with and id of "currentLetter" contains the letter that the user currently has to type correctly to move on. Once a letter is typed correctly it is stored in the "completedLeters" `<p>` element and any remaining letters that have not been typed yet are stored in the "remainingLetters" `<p>` element.

``` html
<div class="sentence">
  <p id="completedLeters"></p>
  <span id="currentLetter"></span>
  <p id="remainingLetters"></p>
</div>
```


## CSS

It is worth showing the styles for the `.sentence` element since it relies on a relatively obscure property. The contents of this element are shown in the previous section. 

The 'white-space' property sets how white space inside an element is handled. The default value is "normal". If I were to not change this value, the text in the `<p id="remainingLetters"></p>` element would wrap to fit the shape of its container. What we want though is for the text to be in a single line as shown in the screenshot above. This can be accomplished by setting white-space to "pre". With a value of "pre", this preserves white space and lines of text are only broken at newline characters such as `<br>`. This prevents the text from wrapping and it preserves any leading white space. 

``` css
.sentence {
  display: flex;
  align-items: center;
  width: 75vw;
  height: 70vh;
  white-space: pre;
  overflow: hidden;
}
```

## JavaScript

### Understanding the variables

The following variables are used to manage the state of the test. 
* `startTime` is the time in ms that the test started. It is used to calculated Words Per Minute (WPM).
* `AccuracyCounterWrong` counts the number of times the wrong key was pressed. It is used for calculating accuracy.
* `AccurayCounterTotal` counts the total number of keys that were pressed regardless of if it was correct or wrong.
* `correctLetterCounter` counts the total number of correct letters that have been typed.
* `currentWordLength` is the length of the current word that is being typed.
*  `currentLetterCorrect` is a Boolean that keeps track if any mistakes have been made typing each letter.

### Starting the test

The test starts by waiting for a keypress event listener from the user. Once a key is pressed for the first time the current time is saved with `startTime = Date.now()`. When a key is pressed there are only two options, either the correct key was pressed, or the wrong key was pressed. For the case where the wrong key is pressed `currentLetterCorrect` is set to false and `AccuracyCounterWrong` is incremented. The accuracy is then updated with the `updateAccuracy()` function. The method for calculating accuracy is given in the article linked earlier.

### If the correct key was pressed

In the case where the correct key is pressed a new `span` element is created that contains the letter that was pressed. That element is then appended to the "completedLetters" tag shown earlier in the markup. The `currentLetter` and `remainingLetters` are then updated. The first letter from `remainingLetters` is moved to the `currentLetter`.

``` javascript
if (event.key == currentLetter.textContent) {
    let letter = document.createElement('span');
    letter.textContent = currentLetter.textContent;
    completedLeters.appendChild(letter)
    currentLetter.textContent = remainingLetters.textContent[0];
    remainingLetters.textContent = remainingLetters.textContent.slice(1);
```

#### Changing the letter's color

Next the color of the typed letter is changed to either red or green. If no mistake was made, then the letter turns green. If there was a mistake the letter turns red. This is controlled via the `currentLetterCorrect` variable. The value will only be false if the wrong key was pressed for each letter as shown earlier.
``` javascript
if (currentLetterCorrect) { //if no errors on particular letter
      letter.classList.add('right');
    } else {  //if there were errors
      letter.classList.add('wrong');
    }
```

#### Updating counters and calculating statistics

Next the following variables are updated and the statistics are calculated. 
``` javascript
currentWordLength++;
currentLetterCorrect = true;
correctLetterCounter++;
updateGrossWPM(correctLetterCounter, startTime);
updateAccuracy(AccuracyCounterWrong, AccurayCounterTotal);
```

#### Shifting the words once a word is completed
Once an entire word is completed the text needs to shift to the left. This makes sure the current letter stays near the middle of the screen. The length of each word is different though so the length of the shift to the left is non-trivial. The `currentWordLength` keeps track of how many characters the current word is. After each word is completed was can multiply the amount of characters in the word by the length of each character. The length of a character for most font types varies. To make this calculation simple I have used a mono-space font. 

We can tell a word has been completed by looking for the user to type the space key. Once the space key is pressed the amount to shift the words is calculated and applied to the margin of the "completedLeters" element. The `currentWordLength` is then set to 0 so it can start counting the length of the next word. 

``` javascript
if (event.key === ' ') { //update position of word once it is completed
      margin = margin - currentWordLength*fontWidth;
      completedLeters.style.marginLeft = `${margin}px`;
      currentWordLength = 0;
    }
```

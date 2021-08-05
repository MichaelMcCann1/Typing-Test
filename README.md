# Typing-Test

This is a speed typing test I created with vanilla JavaScript. The test begins tracking your typing speed as soon as you press a key on your keyboard. The app will keep track of you Gross Words Per Minute and your typing accuracy. More info on these metrics can be found on this article from [SpeedTypingOnline](https://www.speedtypingonline.com/typing-equations).

The letter that is shaded gray is the current letter that needs to be typed to move on. You cannot move on to the next letter if until you type the current letter correctly. If the user typed a letter correctly on their first try the letter will turn green. If it took them more than one attempt to type the correct letter the letter will turn a red color. The stats will update every time a key is pressed by the user.  

# Code Explination

## HTML

The following markup is crucial to understanding how this app works. The text for the typing test is stored into three different HTML elements. The span element with and id of "currentLetter" contains the letter that the user has to type. Any already typed out letters are stored in the "completedLeters" p element and any remaining letters are stored in the "remainingLetters" p element.

```html
<p id="completedLeters"></p>
<span id="currentLetter"></span>
<p id="remainingLetters"></p>
```

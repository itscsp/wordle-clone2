"use strict";var pressedLetter,letters,lettersPettern=/[A-Za-z]/,animationCompleted=!1,isTyping=!0,currentGuessCount=1,currentGuess=document.querySelector("#guess"+currentGuessCount),wordList=null,solutionWord=void 0,completeWordlist=void 0,updateLetters=function(e){letters=currentGuess.dataset.letters;var t=(currentGuess.dataset.letters=letters+e).length;updateTail(t,e)};document.addEventListener("keyup",(function(e){var t=e.key,s=lettersPettern.test(t);if(1===t.length&&s&&currentGuess.dataset.letters.length<=4&&isTyping)console.log("is letter"),updateLetters(t);else if("Backspace"==e.key&&""!=currentGuess.dataset.letters)deleteFromLetters();else if(5==currentGuess.dataset.letters.length&&"Enter"===e.key){if(validWord())for(var r=function(e){setTimeout((function(){revealTile(e,checkLetter(e))}),500*e)},n=0;n<6;n++)r(n)}}));var checkWin=function(){return solutionWord==currentGuess.dataset.letters},updateTail=function(e,t){var s=document.querySelector("#guess"+currentGuessCount+"Tile"+e);s.innerText=t,s.classList.add("has-letter")},deleteFromLetters=function(){var e=currentGuess.dataset.letters,t=e.slice(0,-1);currentGuess.dataset.letters=t,deleteFromTiles(e.length)},deleteFromTiles=function(e){var t=document.querySelector("#guess"+currentGuessCount+"Tile"+e);t.innerText="",t.classList.remove("has-letter")},checkLetter=function(e){var t=currentGuess.dataset.letters.charAt(e);return t===solutionWord.charAt(e)?"correct":solutionWord.includes(t)?"present":"absent"},revealTile=function(e,t){e<5&&flipTile(e,t),console.log(e),5===e&&(checkWin()?(setTimeout((function(){alert("Brillent! \n You Win The Match")}),1500),jumpTiles()):(currentGuessCount+=1,currentGuess=document.querySelector("#guess"+currentGuessCount),isTyping=!0,currentGuessCount>6&&setTimeout((function(){showSolution()}),500)))},showSolution=function(){alert("You Last the game \n Solution Word : "+solutionWord)},flipTile=function(e,t){var s=document.querySelector("#guess"+currentGuessCount+"Tile"+(e+1));s.classList.add("flip-in"),setTimeout((function(){s.classList.add(t),s.classList.remove("flip-in"),s.classList.add("flip-out")}),500),setInterval((function(){s.classList.remove("flip-out")}),1e3)},jumpTiles=function(){for(var e=function(e){var t=document.querySelector("#guess"+currentGuessCount+"Tile"+(e+1));setTimeout((function(){t.classList.add("jump")}),250*e)},t=0;t<5;t++)e(t)};function getRandomNumber(e){var t=new XMLHttpRequest;t.open("GET",e,!1),t.onreadystatechange=function(){if(4===t.readyState&&(200===t.status||0==t.status)){wordList=t.responseText.split("\r\n");var e=Math.floor(Math.random()*wordList.length-1);completeWordlist=t.responseText,solutionWord=wordList[e]}},t.send(null)}function validWord(){return!!completeWordlist.includes(currentGuess.dataset.letters)||(alert("Not in Word List"),!1)}getRandomNumber("./words.txt");
//# sourceMappingURL=script.js.map
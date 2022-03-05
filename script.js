/*
- if keypress is a letter
- update "letters" attribute
  - update tile markup based on "letters" value

- if keypress is backspace key
  - delete last letter in "letters"
	  - update tile markup based on "letters"

*/

const lettersPettern = /[A-Za-z]/;
let pressedLetter;
let  animationCompleted = false;
let isTyping = true;

let currentGuessCount = 1;
let currentGuess = document.querySelector("#guess" + currentGuessCount);

let wordList = null; // containing all word in array format
let solutionWord = undefined; //getting random word from getRandomNumber()
let completeWordlist = undefined; // containing all words

// update "letters"
let letters;
const updateLetters = (letter) => {

  letters = currentGuess.dataset.letters;
  let tileNumber = (currentGuess.dataset.letters = letters + letter).length;
  updateTail(tileNumber, letter);
};

// letters typing events (lette)
document.addEventListener("keyup", (e) => {
  let keypress = e.key;
  let isLetter = lettersPettern.test(keypress);

  if (
    keypress.length === 1 &&
    isLetter &&
    currentGuess.dataset.letters.length <= 4 && isTyping
  ) {
    console.log('is letter')
    updateLetters(keypress);
  } else if (e.key == "Backspace" && currentGuess.dataset.letters != "") {
    deleteFromLetters();
  } else if (currentGuess.dataset.letters.length == 5 && e.key === "Enter") {
    let wordvalid = validWord();

    if (wordvalid) {
      //if word is valid then loop run
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          revealTile(i, checkLetter(i));
        }, i*500);
      }



    }
  }
});


const checkWin = () => {
  return solutionWord == currentGuess.dataset.letters ? true : false;
};


// updating tail

const updateTail = (tileNumber, letter) => {
  let currentTail = document.querySelector("#guess"+currentGuessCount+"Tile" + tileNumber);
  // currentTail.dataset.letter = letter
  currentTail.innerText = letter;
  currentTail.classList.add('has-letter');
};

//Backspace -- delete last letters

const deleteFromLetters = () => {
  // remove last letter from data.letters
  let oldLetters = currentGuess.dataset.letters;

  let newLetters = oldLetters.slice(0, -1);
  currentGuess.dataset.letters = newLetters;

  deleteFromTiles(oldLetters.length);
};

// Backspace -- delete last tile markup
const deleteFromTiles = (len) => {
  //remove markup from last tile
  let currentTail = document.querySelector("#guess"+currentGuessCount+"Tile" + len);
  // currentTail.dataset.letter = letter
  currentTail.innerText = "";

  currentTail.classList.remove('has-letter'); // remove class if he press backspace
};

/* Check letter to solution
 */
const checkLetter = (positions) => {

  if(positions < 5){

    let guessedLetter = currentGuess.dataset.letters.charAt(positions);
    let solutionLetter = solutionWord.charAt(positions);

    // 1. check if letter is matching with solutionWord ("Correct")
    if (guessedLetter === solutionLetter) {
      return 'correct'
    } else {
      return solutionWord.includes(guessedLetter)
        ?  'present'
        :  'absent';
    }
  }

};



const revealTile = (i,status) => {
  if(i < 5){
    flipTile(i,status);
  }

  console.log(i)


    if(i === 5){
      if(checkWin()){
        setTimeout(() => {
          alert('Brillent! \n You Win The Match')
        }, 1500)
        jumpTiles();
      }else{

        currentGuessCount = currentGuessCount + 1;
        currentGuess = document.querySelector("#guess" + currentGuessCount);
        isTyping = true;

        if(currentGuessCount > 6){
          setTimeout(() => {
            showSolution();
          }, 500)
        }
      }
    }


}

const showSolution = () => {
    alert("You Last the game \n Solution Word : "+solutionWord)
}




// Flip in and out animation

const flipTile = (i, status) => {
  let currentElement = document.querySelector("#guess"+currentGuessCount+"Tile" + (i + 1));

  currentElement.classList.add('flip-in')


  setTimeout(() => {
    currentElement.classList.add(status);
    currentElement.classList.remove('flip-in');
    currentElement.classList.add('flip-out');
  }, 500)


  setInterval(() => {
    currentElement.classList.remove("flip-out")


  }, 1000)


}

//jump animation if win
const jumpTiles = () => {
  for(let i=0; i < 5; i ++){
    let currentTile = document.querySelector('#guess'+currentGuessCount+"Tile" + (i + 1))
    setTimeout(() => {
      currentTile.classList.add('jump');
    }, i*250)
  }
}


/*************
Generate random Solution Word
************* */

function getRandomNumber(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        wordList = rawFile.responseText.split("\r\n");
        let randomIndex = Math.floor(Math.random() * wordList.length - 1);

        completeWordlist = rawFile.responseText;

        solutionWord = wordList[randomIndex];
      }
    }
  };
  rawFile.send(null);
}

getRandomNumber("./words.txt");

// check if user inputed word is exists in our list
function validWord() {
  if (completeWordlist.includes(currentGuess.dataset.letters)) {
    return true;
  } else {
    alert("Not in Word List");
    return false;
  }
}





  // switch(status){
  //   case 'correct':
  //     currentElement.classList.add("correct");
  //     break;
  //   case 'present':
  //     currentElement.classList.add("present")
  //     break;
  //   case 'absent':
  //     currentElement.classList.add("absent");
  //     break;
  //   default:
  //     console.error("Some thing is wrong")
  // }
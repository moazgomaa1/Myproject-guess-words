let gameName = "Guess The Game";
document.title = gameName;
document.querySelector("h1").innerText = gameName;
document.querySelector("footer").innerText = `${gameName} - Developed by MAGiC`;
//setiing up game variables
let numberOfTries = 6;
let numberOfLetter = 6;
let currentTry = 1;
// game logic Array
let WordToGuess = "";
let words = ["PUZZLE", "GUITAR", "PYTHON", "HANDLE", "PUZZLY", "MYSTER", "PUZZLY", "PUZZLE"];
WordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
// call div message
let messageArea = document.querySelector(".message");
// number of hint
let numberOfHints = 2;
// call hint button
let hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", provideHint);
// add number of hints to button
hintButton.innerText = `Hint (${numberOfHints})`;
// reset game 

let restartGame = function () {
  guessButton.innerHTML = "Restart Game";
  guessButton.disabled = false;
  if (guessButton.disabled === false) {
    guessButton.addEventListener("click", function () {
      window.location.reload();
    });
  };
}



function generateInputs() {
    
    const inputsContainer = document.querySelector(".inputs");
    for (let i = 1; i <= numberOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        if (i != 1) {
            tryDiv.classList.add("disabled-inputs");
        }
        for (let j = 1; j <= numberOfLetter; j++) {
            const inputBox = document.createElement("input");
            inputBox.type = "text";
            inputBox.maxLength = 1;
            inputBox.id = `try-${i}-letter-${j}`;
            tryDiv.appendChild(inputBox);
            
        }
        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();
    // disable all inputs except the first try
    const disabledInputs = document.querySelectorAll(".disabled-inputs input");
    disabledInputs.forEach(input => {
        input.disabled = true;
    });
    // add event listeners to inputs
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            input.value = input.value.toLowerCase();
            const nextInput = allInputs[index + 1];
            if (nextInput && input.value) {
                nextInput.focus();
            }

        });
        input.addEventListener("keydown", function (event) {
            const currentIndex = Array.from(allInputs).indexOf(event.target);
            if (event.key === "ArrowRight") { 
                const nextInput = currentIndex + 1;
                if (nextInput < allInputs.length) {
                    allInputs[nextInput].focus();
                }

               

            }
             if (event.key === "ArrowLeft") {
               const nextInput = currentIndex - 1;
               if (nextInput >= 0) {
                 allInputs[nextInput].focus();
               }
             }
            
        });
    });


}
let guessButton = document.querySelector(".check");

if (guessButton.disabled === false) {
  guessButton.addEventListener("click", handleGuess);
  function handleGuess() {
    let successGuess = true;

    
    for (let i = 1; i <= numberOfLetter; i++) {
      const inputField = document.querySelector(
        `#try-${currentTry}-letter-${i}`
      );
      let Letter = inputField.value.toLowerCase();
      const correctLetter = WordToGuess[i - 1];
      if (Letter === correctLetter) {
        inputField.classList.add("in-place");
      } else if (WordToGuess.includes(Letter) && Letter != "") {
        inputField.classList.add("not-in-place");
        successGuess = false;
      } else if (Letter !== correctLetter && Letter != "") {
        inputField.classList.add("no");
        successGuess = false;

     
      }
      if (Letter === "") {
        messageArea.innerText = "Please fill all letters!";
        successGuess = null;
        return;
      }
    }
    // win in game and lose
    if (successGuess) {
      messageArea.innerHTML = `You Win! <br> <span>The word was "${WordToGuess.toUpperCase()}"</span>`;

      if (numberOfHints > 0) {
        messageArea.innerHTML += `<br><span>You had ${numberOfHints} hint(s) left!</span>`;
        hintButton.disabled = true;
        
      }
      let tryAlles = document.querySelectorAll(".inputs > div");
      tryAlles.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

      guessButton.disabled = true;
      restartGame();
    } else {
      
      document
        .querySelector(`.try-${currentTry}`)
        .classList.add("disabled-inputs");
      const allInputsCurrentTry = document.querySelectorAll(
        `.try-${currentTry} input`
      );
      allInputsCurrentTry.forEach((input) => (input.disabled = true));

      currentTry += 1;
      
      if (currentTry <= numberOfTries) {
        document
          .querySelector(`.try-${currentTry}`)
          .classList.remove("disabled-inputs");
        const allesInputs = document.querySelectorAll(
          `.try-${currentTry} input`
        );

        allesInputs.forEach((input) => (input.disabled = false));
        allesInputs[0].focus();
        messageArea.innerText = `Try Again! You have ${
          numberOfTries - currentTry + 1
        } tries left.`;
      }
     
      if (  successGuess === null) {
        
      } else if (currentTry > numberOfTries) {
        messageArea.innerHTML = `You Lose! <br> <span>The word was "${WordToGuess.toUpperCase()}"</span>`;
        guessButton.disabled = true;
        restartGame();
      }

      
    }
  }
} else  {
  restartGame();
} 

function provideHint() {
  numberOfHints--;
  const enabledInputs = document.querySelectorAll(`.try-${currentTry} input`);
  const emptyInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  hintButton.innerText = `Hint (${numberOfHints})`;
  if (numberOfHints < 1) {
    hintButton.disabled = true;

    messageArea.innerText = "No more hints available!";
  }
  // choose a random letter from the word
  const randomIndex = Math.floor(Math.random() * numberOfLetter);
  const randomInput = enabledInputs[randomIndex];
  const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
  if (indexToFill !== -1) {
    randomInput.value = WordToGuess[indexToFill];
      randomInput.classList.add("hinted-letter");
      randomInput.classList.add("in-place");
  }


}


  

window.onload = function() {
    generateInputs();
}

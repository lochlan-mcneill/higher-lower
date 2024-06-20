guessMe = 5                                                             //Creates the global guessMe variable, originally used for testing.
let guess = document.getElementById('guess')                            //Gets the element for the guess input.
let reset = document.getElementById('reset')                            //Gets the element for the reset button.
let placeholder = document.getElementById('placeholder')                //Gets the element for the "Too high!"/"Too low" text.
rbgRed = 252                                                            //Sets the default RGB Red.
rgbBlue = 3                                                             //Sets the default RGB blue.
let attempts = document.getElementById('attempts')                      //Gets the element for the attempts.
let attemptsleft = 3                                                    //Sets the number of attempts left.

/**
 * @function newNum
 * Sets the number to a random integer between 1 and 10.
 */
function newNum() {
    guessMe = 1 + Math.floor(Math.random() * 10)                        //Sets the number to a random integer between 1 and 10.
}

/**
 * @function guessWrong
 * Tells the user if they are wrong or if they have no guesses left.
 */
function guessWrong() {                                                 //When the guess is Wrong:
    hotterColderColour = 'rgb('+rbgRed+', '+0+', '+rgbBlue+')'          //Gets the RGB values from the guessIsHigh or guessIsLow functions and makes it a RGB string.
    placeholder.style.color = hotterColderColour                        //Sets the colour for the "Too high!" and "Too low!" messages
    attemptsleft--                                                      //Lower the number of attempts left by 1.
    attempts.innerHTML = "Attempts:  " + attemptsleft                   //Set the attempts left HTML to the number of remaining attempts.
    if (attemptsleft == 0) {                                            //If there are no more attempts, then do the following:
        attempts.innerHTML = "No more attempts"                         //Ses the attempts left HTML to "No more attempts"
        numIn.disabled = true                                           //Disables the number input box.
        guess.disabled = true                                           //Disables the guess button.
        alert("The Number was: " + guessMe)                             //Displays an alert showing what the number was.
    }
}

/**
 * @function guessIsHigh    Called when the guess is too high
 * @param {number} numIn    The number entered by the user.
 * @param {number} guessMe  The randomly generated number to guess.
 */
function guessIsHigh(numIn, guessMe) {                                  //If the guess is too high:
    for (i=0; numIn > guessMe; numIn--) {                               // For each number the guess is higher than the random number:
    rbgRed -= 28                                                        //Lower the amount of red.
    rgbBlue += 28                                                       //Raise the amount of blue.
    }
    guessWrong()                                                        //Run the guessWrong function.
}

/**
 * @function guessIsLow     Called when the guess is too low
 * 
 * @param {number} numIn    The number entered by the user.
 * @param {number} guessMe  The randomly generated number to guess.
 */
function guessIsLow(numIn, guessMe) {                                   //If the guess is too low:
    for (i=0; numIn < guessMe; numIn++) {                               //For each number the guess is lower than the random number:
    rbgRed -= 20                                                        //Lower the amount of red.
    rgbBlue += 20                                                       //Raise the amount of blue.
    }
    guessWrong()                                                        //Run the guessWrong function.
}

numIn.addEventListener('keydown', (e) => {                              //When a key is pressed:
    let numIn = Number(document.getElementById('numIn').value)          //Gets the value in the number input box.
    if (e.key === "Enter") {                                            //If that key is the Enter key,.
        guessMade()                                                     //Run the guessMade function.
    }
})

guess.addEventListener('click', () => {                                 //When the guess button is clicked:
    guessMade()                                                         //Run the guessMade function.
})

function guessMade() {
    let numIn = Number(document.getElementById('numIn').value)          //Gets the value in the number input box.
    if(numIn) {                                                         //Checks there is a number.
        if (isNaN(numIn)) {                                             //Only necessary due to mobile.
            placeholder.innerHTML = ("Input must be a number!")         //Tells the user the input must be a number.
            placeholder.style.color = 'red'                             //Sets the text colour to red.
        }
        else {
            rbgRed = 252                                                //Sets the default RGB Red.
            rgbBlue = 3                                                 //Sets the default RGB blue.
            if (attemptsleft > 0) {                                     //If the user still has attempts remaining:
                if (numIn === guessMe) {                                //If the guess is correct:
                    placeholder.innerHTML = ("Correct!")                //Tells the user it is correct.
                    placeholder.style.color = 'green'                   //Sets the correct text to green.
                }
                else if (numIn > guessMe) {                             //If the guess is too high:
                    placeholder.innerHTML = ("Too high!")               //Tells the user it is too high.
                    guessIsHigh(numIn, guessMe)                         //Runs the guessIsHigh function.
                }
                else if (numIn < guessMe) {                             //If the guess is too low:
                    placeholder.innerHTML = ("Too low!")                //Tells the user it is too low.
                    guessIsLow(numIn, guessMe)                          //Runs the guessIsLow function.
                }
            }
        }
    }
}

reset.addEventListener('click', () => {                                 //When the resrt button is clicked:
    attemptsleft = 3                                                    //Resets the attempts left to 3
    placeholder.innerHTML = ""                                          //Resets the "Too high!" or "Too low!" placeholder.
    attempts.innerHTML = "Attempts: 3"                                  //Resets the attempts display to 3.
    numIn.disabled = false                                              //Enables the number input box.
    guess.disabled = false                                              //Enables the guess button.
    newNum()                                                            //Starts a new game.
})

newNum()                                                                //Called to start the game by generating a new random number.
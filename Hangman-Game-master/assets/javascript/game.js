/* GAME STRUCTURE:
- Have a predetermined list of words
- Pick a random word from the list
- The user guesses letters and tries to guess the word
- Check that the letters are valid
- Keep track of all letters already guessed
- Show letters guessed correctly with progress
- Finish when player guesses word or runs out of guesses.*/

// GLOBAL VARIABLES
// ================

	// Array that contains all the possible words to be guessed.
	var strangerThings = ["eleven", "demogorgon", "mouthbreather", "upsidedown", "eggos", "barb", "madmax", "pollywog", "digdug", "hawkins", "demodogs"];
	// Empty variable to store the current word to be guessed as a string.
	var currentWord = "";
	// Empty variable to hold the actual letters in the currentWord
	var currWrdLtrs = [];
	// Variable that holds the number of blanks "_" in the currentWord
	var numBlanks = 0;
	// Empty array to store the answer as it displays for the user
	var answerDisplay = [];
	// Empty array to hold all the wrong guesses, and display to userGuess
	var wrongLtrs = [];

	//Game Stats
	var wins = 0;
	var losses = 0;
	var guessesLeft = 9;

// FUNTIONS
// ========

	//Create a function that starts a new game
	function newGame () {

		//Computer selects a word from the array
		currentWord = strangerThings[Math.floor(Math.random() * strangerThings.length)];
			console.log("The current word chosen is: " + currentWord); // Testing via Console.Log

		//Grab the current word and break it apart into each individual letter
		currWrdLtrs = currentWord.split("");
			console.log("The current word's letters are: " + currWrdLtrs); // Testing via Console.Log

		//Grab the current word and get the number of letters in it
		numBlanks = currWrdLtrs.length;
			console.log("The number of letters in the current word is: " + numBlanks); // Testing via Console.Log

		//Reset game variables needed to be cleared before each new game starts
		guessesLeft = 9;
		wrongLtrs = [];
		answerDisplay = [];

			//Reset the images
			if (guessesLeft = 9) {
				document.getElementById("elevenImg").removeAttribute("style");
				document.getElementById("mikeImg").removeAttribute("style");
				document.getElementById("willImg").removeAttribute("style");
				document.getElementById("dustinImg").removeAttribute("style");
				document.getElementById("lucasImg").removeAttribute("style");
				document.getElementById("madMaxImg").removeAttribute("style");
				document.getElementById("steveImg").removeAttribute("style");
				document.getElementById("chiefHopperImg").removeAttribute("style");
			}

		//Add the correct number of blanks to the answerDisplay that corresponds with the length of the currentWord
		for (i = 0; i < numBlanks; i++) {
			answerDisplay.push("_");
			console.log(answerDisplay); // Testing via Console.Log
		}

		//Change HTML elements to display current information
		document.getElementById("theWord").innerHTML = answerDisplay.join(" ");
		document.getElementById("remGuesses").innerHTML = "Number of Guesses Remaining: " + " " + guessesLeft;
		document.getElementById("wins").innerHTML = "Wins: " + " " + wins;
		document.getElementById("losses").innerHTML = "Losses: " + " " + losses;

	}

	function checkLtrs(letter) {

		//Check if the letter pressed is an actual letter
		if (event.keyCode >= 65 && event.keyCode <= 90) { //If the letter pressed IS part of the alphabet, then run the comparison:

					//Check if the letter guessed is one of the letters in the word
					var correctLetter = false;

					for ( var i = 0; i < numBlanks; i++) {
						if(currentWord[i] == letter) {
							correctLetter = true;
						}
					}

					//Check where the correct letter is located on the word, then add to html
					if(correctLetter) {
						for ( var i = 0; i < numBlanks; i++) {
							if(currentWord[i] == letter) {
								answerDisplay[i] = letter;
							}
						}
					}

					//If the letter isn't part of the word
					else {
						wrongLtrs.push(letter);
						guessesLeft--
					}

					//testing via console
					console.log(answerDisplay);
					
		} else { //If user input is not a letter from the alphabet
			// Alert the user
			alert("Please be sure to select a letter from the Alphabet (from a to z)");
		}
	}

	function roundComplete() {
		console.log("Win count: " + wins +  " | Loss Count: " + losses + " | Guesses Left: " + guessesLeft)

		//Update HTML with Game Stats
		document.getElementById("remGuesses").innerHTML = "Number of Guesses Remaining: " + " " + guessesLeft;
		document.getElementById("theWord").innerHTML = answerDisplay.join(" ");
		document.getElementById("guessedLetters").innerHTML = "Letters Already Guessed:" + " " + wrongLtrs.join(" ");


		//Check if the user won
		if (currWrdLtrs.toString() == answerDisplay.toString()) {
			wins++;
			alert("CONTRATULATIONS! You guessed '" + currentWord + "' correctly. Try another round?");
			console.log("YOU WIN!");

			// Update the wins in the HTML doc
			document.getElementById("wins").innerHTML = "Wins: " + " " + wins;

			//Start New Game and clear letters already guessed
			newGame();
			document.getElementById("guessedLetters").innerHTML = "Letters Already Guessed:" + " " + " ";

		} else if (guessesLeft == 0) { //Check if user lost
			losses++;
			alert("OH NO! You have 0 guesses left, and all your friends are now in the upsidedown. The correct word was '" + currentWord + "'. Do you want to try again?")
			console.log("You Lost!");

			// Update the wins in the HTML doc
			document.getElementById("losses").innerHTML = "Losses: " + " " + losses;

			//Start New Game
			newGame();
			document.getElementById("guessedLetters").innerHTML = "Letters Already Guessed:" + " " + " ";

		}
	}




// MAIN PROCESS
//=============

	//Call function to start the game for the first time
	newGame();

	//Get input from user on what keys are being pressed
	document.onkeyup = function(event) {
		//Create a variable to hold all the letters that have been guessed
		var ltrsGuessed = String.fromCharCode(event.keyCode).toLowerCase();
			console.log("You Guessed the letter: " + ltrsGuessed); // Testing via Console.Log

		//Run the check letters function
		checkLtrs(ltrsGuessed);
		roundComplete();

		//Game interation with the images (Guesses Left, as displayed by images)
		if (guessesLeft <= 8) {
			document.getElementById("elevenImg").style.transform = "rotate(180deg)";
			document.getElementById("elevenImg").style.opacity = "0.25";
		}

		if (guessesLeft <= 7) {
			document.getElementById("mikeImg").style.transform = "rotate(180deg)";
			document.getElementById("mikeImg").style.opacity = "0.25";
		}

		if (guessesLeft <= 6) {
			document.getElementById("willImg").style.transform = "rotate(180deg)";
			document.getElementById("willImg").style.opacity = "0.25";
		}

		if (guessesLeft <= 5) {
			document.getElementById("dustinImg").style.transform = "rotate(180deg)";
			document.getElementById("dustinImg").style.opacity = "0.25";
		}

		if (guessesLeft <= 4) {
			document.getElementById("lucasImg").style.transform = "rotate(180deg)";
			document.getElementById("lucasImg").style.opacity = "0.25";
		}

		if (guessesLeft <= 3) {
			document.getElementById("madMaxImg").style.transform = "rotate(180deg)";
			document.getElementById("madMaxImg").style.opacity = "0.25";
		}

		if (guessesLeft <= 2) {
			document.getElementById("steveImg").style.transform = "rotate(180deg)";
			document.getElementById("steveImg").style.opacity = "0.25";
		}

		if (guessesLeft <= 1) {
			document.getElementById("chiefHopperImg").style.transform = "rotate(180deg)";
			document.getElementById("chiefHopperImg").style.opacity = "0.25";
		}

	}











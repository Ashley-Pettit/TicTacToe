
//Please note the code is still a work in progress! Not best practice yet! :)

//Fix if parent of difficulty clicked but not on a direct child >> app still launches == bad. 
//Add testing
//Wireframe the front end with a bootstrap style design

$(document).ready(function() {
    gameBoard = setUpBoard();
    $('.game_options').click(function(e) {
        if (app.gameOptionsAlreadyclicked === false) { //prevents a rare bug if gameoptions is dblclicked
            difficulty = e.target.id;
            who_starts();
            countdownAnimation();
            app.gameOptionsAlreadyclicked = true;
            console.log("Loading " + difficulty + " computer");
        }
    });

    $(".game_table").click(function(e) {
        var IDOfCellClicked = e.target.id;
        playerMove(IDOfCellClicked);
    });
    
    $('#play_again').click(function() {
        clearBoard();
    });

    $('#home').click(function() {
        location.reload();
    });
});
     

//App simply stores information as an object to avoid global variable use. 
//It acts to allow 'class' type variables.
var app = {}; 
app.turn = 0;
app.round = 1;
app.player1Score = 0;
app.player2Score = 0;
app.isRoundInProgress = true;
app.gameOptionsAlreadyclicked = false;

function countdownAnimation() {

    //How could this animation be optimised? Are so many elements really needed?
	$('.game_control').fadeOut(200); //Careful for doubleclicks - should build functionality to avoid
	$('#play_lets').delay(200).fadeIn(500).delay(4360).fadeOut(500); // In at 500 Out at 10,000
	$('#play5').delay(501).fadeIn(500).fadeOut(500); // In at 500 out at 2000
	$('#play4').delay(1520).fadeIn(500).fadeOut(500); // In at 2000 out at 3500
	$('#play3').delay(2530).fadeIn(500).fadeOut(500); // In at 3500 out at 5000
	$('#play2').delay(3540).fadeIn(500).fadeOut(500); // in at 5000 out at 6500
	$('#play1').delay(4550).fadeIn(500).fadeOut(500); // in at 6500 out at 8000
	$('#play_is').delay(5560).fadeIn(500);  // in at 8000, does not go out
	$('#begun').delay(5560).fadeIn(1500); // in at 10,000 - Does not go out
	$('#play_happening').delay(5570).fadeIn(1500); // in at 10,000 - Does not go out
	$('.game_table').delay(5570).fadeIn(1500); // in at 10,000 - Does not go out
    $('#whos_turn_is_it').delay(5570).empty().fadeIn(1500).text(currentPlayer + " It's your turn");
	$('#home').delay(5570).fadeIn(1500);
	$('#score').delay(5570).fadeIn(1500);
    $('#play_is').append(startingPlayer); //Leave this as append
	if (difficulty === "human") {
		$('#title_score1').text("Human 1 Score");
		$('#title_score2').text("Human 2 Score");
	}
	else {
		$('#title_score1').text("Computer Score");
		$('#title_score2').text("Human Score");
	}
}


function setUpBoard() { //How else could this be done more efficently?
    var gameBoard = new Array(9);
    for (var i = 0; i < gameBoard.length; i++) {
        gameBoard[i] = null;
    }
    return gameBoard;
}


function who_starts() { //Could this be written shorter?
    var randomPlayer = Math.floor(Math.random() * 2 + 1);
    if (difficulty !== "human") {
        if (randomPlayer === 1) {
            startingPlayer = "The Computer of Doom! (X)";
            currentPlayer = 'X';
            AIPlay();
        } else {
            startingPlayer = "The Human! (O)";
            currentPlayer = 'O';
        }
    } else {
        if (randomPlayer === 1) {
            startingPlayer = "Human Number 1! (X)";
            currentPlayer = 'X';
        } else {
            startingPlayer = "Human Number 2! (O)";
            currentPlayer = 'O';
        }
    }
}


function changePlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    $('#whos_turn_is_it').text(currentPlayer + " It's your turn");
}


function changeStartingPlayer() {
	if (startingPlayer === "The Computer of Doom! (X)") {
	   startingPlayer = "The Human! (O)";
	   currentPlayer = 'O';
    }
    else if (startingPlayer === "The Human! (O)") {
        startingPlayer = "The Computer of Doom! (X)";
        currentPlayer = 'X';
	}
    else if (startingPlayer === "Human Number 1! (X)") {
        startingPlayer = "Human Number 2! (O)";
        currentPlayer = 'O';
    }
    else if (startingPlayer === "Human Number 2! (O)") {
        startingPlayer = "Human Number 1! (X)";
        currentPlayer = 'X';
    }
}



function playerMove(IDOfCellClicked) {
    if (app.isRoundInProgress === true) {
        if (gameBoard[IDOfCellClicked] === null) { // checks if position on board has already been played
            gameBoard[IDOfCellClicked] = currentPlayer; // UPDATING THE ARRAY
            $('#' + IDOfCellClicked).prepend(currentPlayer);
            app.turn++;
            if (checkForWin()) {
            	roundWon();
            }
        	else if (checkForDraw()){
			    roundDrew();
        	}
            else {
                changePlayer();
                app.isRoundInProgress = false; //PLAYER CANNOT PLAY WHILE AI IS "THINKING"
                setTimeout(function() {
                app.isRoundInProgress = true;
                AIPlay();
            },  500);
            }
        }
    }
}


function clearBoard() {
    app.round++;
    $('#won').empty();
    app.isRoundInProgress = true;
	changeStartingPlayer();
	$('#play_again').fadeOut(1000);
    for (var i = 0; i < 9; i++) { // Clearing the array
        gameBoard[i] = null;
    }
	$('.game_table td').empty().css("background-color", "white"); //Clear the table visuals and cell highlighting
    $('#play_is').text(startingPlayer + " will start this round.");
    $('#whos_turn_is_it').fadeIn(1500).text(currentPlayer + " It's your turn");
    $('#begun').text("The game continues! Round " + app.round);
    if (currentPlayer === "X") {
        AIPlay();
    }
}


function checkForWin() {

    // check col win
    for (var i = 0; i < 3; i++) {
        if (gameBoard[i] === currentPlayer && gameBoard[i + 3] === currentPlayer && gameBoard[i + 6] === currentPlayer) {
            winningCells = [i, i+3, i+6]; //For CSS coloring
            return true;
        } //THIS LINE OFTEN ERRORS????
    }
    // check row win
    for (var j = 0; j < 9; j += 3) {
        if (gameBoard[j] === currentPlayer && gameBoard[j + 1] === currentPlayer && gameBoard[j + 2] === currentPlayer) {
            winningCells = [j, j+1, j+2];
            return true;
        }
    }
    // check diagonal win
    for (var k = 0; k <= 2; k += 2) {
        if (gameBoard[k] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[8 - k] === currentPlayer) {
            winningCells = [k, 4, 8-k];
            return true;
        }
    }
    return false;
}


function checkForDraw() {
    //if all elements are not null then unless a win, it must be a draw
	for (var i = 0; i < 9; i++) {
		if (gameBoard[i] === null) {
			return false;
		}
	}
	return true;
}


function roundDrew() {
    $('#won').text("It's a draw!").fadeIn(100);
    endRound();
}


function roundWon() {
    $('#won').text(currentPlayer + " Takes The Round!").fadeIn(100);
    console.log("winning cells where " + winningCells);
    updateScore();
    endRound();
    for (var i = 0; i < 3; i++) { //Look into using .each or similar rather than a for loop
        $("#" + winningCells[i]).css("background-color", "red");
    }
}


function endRound(){
    $('#whos_turn_is_it').fadeOut(0);
    app.isRoundInProgress = false;
    $('#play_again').fadeIn(1500); //Ideally this should be next round as id
}


function updateScore() {
    if (currentPlayer === 'X') {
        app.player1Score++;
        $('#score1').text(app.player1Score);
    } else if (currentPlayer === 'O') {
        app.player2Score++;
        $('#score2').text(app.player2Score);
    }
}


//SEPERATE THIS INTO A DIFFERENT FILE CALLED AI.JS


function AIPlay() {
    if (difficulty === "easy" && app.isRoundInProgress === true) {
        AIEasy();
    }
    else if (difficulty === "intermediate" && app.isRoundInProgress === true) {
        AIIntermediate();
    }
    app.turn++;
}


function isComputerAbleToWin () {
    //The computer plays in any open cell. It then checks if that cell will cause it to win.
    //If the cell will cause a win return the id of that cell otherwise clear the cell.
    for (var x = 0; x < 9; x++) {
        if (gameBoard[x] === null) {
            gameBoard[x] = currentPlayer;
            if (checkForWin()) {
                $('#' + x).prepend(currentPlayer);
                return true;
            }
            else {
                gameBoard[x] = null;
            }
        }
    }
    return false;
}

function doesComputerNeedToBlock () {
    //The computer plays as the human in any open cell. It then checks if that cell will cause a human win.
    //If the cell will cause a human win return the id of that cell. Then clear the cell.
    for (var p = 0; p < 9; p++) {
        changePlayer();
        if (gameBoard[p] === null) {
            gameBoard[p] = currentPlayer;
            if (checkForWin()) {
                gameBoard[p] = null;
                humanAbleToWinAt = p;
                changePlayer();
                return true;
            }
            else {
                changePlayer();
                gameBoard[p] = null;
            }
        }
        else {
            changePlayer();
        }
    }
}


function playRandomly(){
    var findingFreeCell = true;
    while(findingFreeCell) {
        var randomMove = Math.floor(Math.random() * 9); // COME UP WITH A RANDOM NUMBER 0-8
        if (gameBoard[randomMove] === null) {
            gameBoard[randomMove] = currentPlayer; // Updating the array
            $('#' + randomMove).prepend(currentPlayer);
            findingFreeCell = false;
            if (checkForWin()) {
                roundWon();
            }
            else if (checkForDraw()){
                roundDrew();
            }
            changePlayer();
            console.log("Computer played randomly");
        }
    }
}

function AIEasy() {
    var randomMove = Math.floor(Math.random() * 9); // COME UP WITH A RANDOM NUMBER 0-8
    if (isComputerAbleToWin()) {
        roundWon();
        console.log("Computer played to win");
    }
    else {
      playRandomly();
    }
}


function AIIntermediate() {
    if (isComputerAbleToWin()) {
        roundWon();
        console.log("computer played to win");
    }
    else if (doesComputerNeedToBlock()) {
        //computer plays in blocking cell
        gameBoard[humanAbleToWinAt] = currentPlayer; // Updating the array
        $('#' + humanAbleToWinAt).prepend(currentPlayer);
        console.log("computer played to block human win");
        changePlayer();
        if (checkForDraw()){ //In case computer draws whilist blocking human win
            roundDrew();
        }
    }
    else {
      playRandomly();
    }
}

function getARandomOption(arrayOfOptions) {
  //This function is used to randomise a selection of possible moves for the AI
    for (var i = arrayOfOptions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arrayOfOptions[i];
        arrayOfOptions[i] = arrayOfOptions[j];
        arrayOfOptions[j] = temp;
    }
    return arrayOfOptions[0];
}



//  function AIHardDefending() { 
//  //This is loaded when the computer plays 2nd. The computer is aiming to draw. 
//   if (isComputerAbleToWin()) {
//         //computer plays in winning cell
//       roundWon();
//       console.log("computer played to win");
//   }
//   else if (doesComputerNeedToBlock()) {
//       //computer plays in blocking cell
//       gameBoard[humanAbleToWinAt] = currentPlayer; // Updating the array
//       $('#' + humanAbleToWinAt).prepend(currentPlayer);
//       console.log("computer played to block human win");
//       changePlayer();
//       if (checkForDraw()){ //Necessary in case computer draws whilist blocking human win
//           roundDrew();
//       }
//   }
//   else if (gameBoard[4] === null) {
//       gameBoard[4] = currentPlayer;
//       $('#' + 4).prepend(currentPlayer);
//       console.log("Computer took the center to be defensive");
//   }
//   else if (app.turn == 2 && gameBoard[4] == 'O') {
//     //Looking for if human going for 'type 1' two way win. Play any corner cell
//     var possibilities = [0,2,6,8]
//     var randomCorner = getARandomOption(possibilities)
//     $('#' + randomCorner).prepend(currentPlayer); //Add a randomizer here to occasionally play 5
//     console.log("Computer played in a random corner to block a possible setup of a type 1 two way win");
//   }
//   else if (app.turn == 4 && gameBoard[0] == 'O' && gameBoard[8]) == 'O' || (app.turn == 3 && gameBoard[2] == 'O' && gameBoard[6] == 'O'){
//     //Looking for if human going for 'type 2' two way win () (Two opposing corners)
//     var possibilities = [1,3,5,7]
//     var randomSide = getARandomOption(possibilities)
//     $('#' + randomSide).prepend(currentPlayer); //Add a randomizer here to occasionally play 5
//     console.log("Computer played T4 to block a possible setup of a type 2 two way win");
//   }
//   else if (app.turn == 4 && gameBoard[0] == 'O' && gameBoard[8] == 'O') {
//     //   Looking for if human going for 'type 3' two way win. (A corner wtih a middle 3 units away)
//     // This gets complex as there are 8 scenarios to consider all leading to two way wins


// // //NOTATION
// // TURN 2
// // Type 1 - Occurs where center is taken on turn 1
// // Computer must play a corner or is open to a two way win. Plays any of the 4 corners.
// // TURN 4
// // //  Type2 two way win => Occurs where the opposite corners are taken on the 3rd turn
// // //  Type3 two way win => Occurs where a corner is taken as well as the opposite side
// // //  All other winning types are blocked by intermediate level play
// // Each different scenario has diferent 'safe cells'

//   }


//     else {
//         playRandomly()
//     }
// }


// function AI_hard_agressive() { 
// //This is loaded when the computers turn is first. The computer aims to setup moves were the player will lose.
//     if (isComputerAbleToWin()) {
//         //computer plays in winning cell
//         roundWon();
//         console.log("computer played to win");
//     }
//     else if (doesComputerNeedToBlock()) {
//         //computer plays in blocking cell
//         gameBoard[humanAbleToWinAt] = currentPlayer; // Updating the array
//         $('#' + humanAbleToWinAt).prepend(currentPlayer);
//         console.log("computer played to block human win");
//         changePlayer();
//         if (checkForDraw()){ //Necessary in case computer draws whilist blocking human win
//             roundDrew();
//         }
//     }
//     else if (app.turn === 1) {
//         var possibilities = [0, 0, 0, 1, 2, 2, 2, 3, 4, 4, 4, 4, 5, 6, 6, 7, 7, 8, 8, 8];
//         // Using weighting to make a center or corner play more likely => greater chance of winning :)
//         var AIPlayingAt = getARandomOption(possibilities)
//         gameBoard[AIPlayingAt] = currentPlayer;
//         $('#' + AIPlayingAt).prepend(currentPlayer);
//         console.log("Computer made a weighted play to play at cell " + AIPlayingAt);
//     }
//     else if (app.turn === 3 && (gameBoard[1] == 'O' || gameBoard[3] == 'O' || gameBoard[5] == 'O' || gameBoard[7] == 'O')) { //THIS SYNTAX IS INCORRECT
//         // The player was silly and played in a side cell
//         var possibilities = [];
//         var AIPlayingAt = getARandomOption(possibilities)
//         gameBoard[AIPlayingAt] = currentPlayer;
//         $('#' + AIPlayingAt).prepend(currentPlayer);
//         console.log("Computer made a weighted play to play at cell " + AIPlayingAt);
//     }




//     //var randomMove = Math.floor(Math.random() * 3); // The computer has 3 possible opening moves which are then rotated by a 25 degrees leading to 12 possible opening plays

//     // TURN 1

//     // Option 1-1 - COMPUTER PLAYER A CORNER CELL
//     // Option 1-2 - COMPUTER PLAYS A SIDE CELL
//     // Option 1-3 - COMPUTER PLAYS IN MIDDLE
//     //var random_orientation = Math.floor(Math.random() * 4); // After finding out what type of cell to play. Then randomly orient the play
//     //if (randomMove = 1) {

//     // TURN 3

//     //IF TURN 1 = OPTION 1

//         //OPTION 1-1 - The computer will play in the center(Preferenced)
//         //OPTION 1-2 - The computer will play either the side cell which is 3 units ahead of the current cell (Attempting to force a 2 way win situation) OR
//         //OPTION 1-3 - The computer plays in the opposite corner - Again attempting to try to force a 2 way win situation.
//         // NOTE - The computer does not play turn 2 in either of the matching side cells. This is considered a poor move (As their is less opportunity to win)
//         // Likewise playing either side cell next to the played corner cell is also considered a poor move.

//     // IF TURN 1 = OPTION 2

//     //OPTION (T3)2-1 - The computer takes the center (Preferenced)
//     //OPTION (T3)2-2 - The computer takes a corner cell which must be on the opposite side of the board. There are two of these.

//     // IF TURN 1 = OPTION 3

//     // OPTION (T3)3-1 - The computer takes any free corner. There are 4.
//     // Playing a side cell is considered a poor move.


//     // TURN 5

//     // The computer attempts a win (Preferenced)
//     // The computer blocks a player win (2nd preferenced)

// // OTHER SCENARIOS

// // Has side and corner. if player plays in cells +1 or +2 of the corner cell the computer forces a two way win by playing -1 from the it's middle cell.
// // HAS side and corner. Only 2 more situations exist which are player played in cells -1 or +1 of middle cell. No win is possible. Random play

// // Has corner and corner. The computer simply blocks any win condition of the player. The player will have win conditions in all directions. The computer must block them. If this leads to a corner play the
// // computer will win on TURN 7

// // Has corner and middle but can't win. The computer blocks any player win if it has to.
// //After this there are 2 cells. They are -3 or + 1 of the corner cell. Playing either will result in a 2 way win condition.

// // TURN 7
// // Attempts win. Blocks losss. If none is possible then random play as game will draw no matter what is played.

// //TURN 9

// // Very simple. The computer plays the remaining cell.

// }


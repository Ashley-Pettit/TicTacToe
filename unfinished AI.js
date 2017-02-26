
        // var findingFreeCell = true;
        // while(findingFreeCell === true)
        //     var options = [0,2,6,8];
        //     var computerToPlayAt = getARandomOption(options);
        //     if (gameBoard(computerToPlayAt) === null) {
        //         gameBoard[computerToPlayAt] = app.currentPlayer;
        //         $('#' + computerToPlayAt).prepend(app.currentPlayer);
        //         changePlayer();
        //         console.log("Computer took a random corner to prevent middle triangle win");
        //         findingFreeCell = false;
        //     }
        //     
//  function AIHardDefending() {
//     console.log(app.turn);
//  //This is loaded when the computer plays 2nd. The computer is aiming to draw.
//   if (isComputerAbleToWin()) {
//         //computer plays in winning cell
//       launchWin();
//       console.log("computer played to win");
//   }
//   else if (doesComputerNeedToBlock()) {
//       //computer plays in blocking cell
//       gameBoard[humanAbleToWinAt] = app.currentPlayer; // Updating the array
//       $('#' + humanAbleToWinAt).prepend(app.currentPlayer);
//       console.log("computer played to block human win");
//       changePlayer();
//       if (checkForDraw()){ //Necessary in case computer draws whilist blocking human win
//           roundDrew();
//       }
//   }
//   else if (gameBoard[4] === null) {
//     gameBoard[4] = app.currentPlayer;
//     $('#' + 4).prepend(app.currentPlayer);
//     changePlayer();
//     console.log("Computer took the center to be defensive");
//   }
//   else if (app.turn == 2 && gameBoard[4] == 'O') {
//     //Looking for if human going for 'type 1' two way win. Play any corner cell
//     //var possibilities = [0,2,6,8];
//     //var randomCorner = getARandomOption(possibilities);
//     var randomCorner = 0; // TEMPORARY JUST TO GET IT WORKING
//     $('#' + randomCorner).prepend(app.currentPlayer); //Add a randomizer here to occasionally play 5
//     console.log("Computer played in a random corner to block a possible setup of a type 1 two way win");
//     changePlayer();
//   }
//   else if ((app.turn == 4 && (gameBoard[0] == 'O' && (gameBoard[8] == 'O')) || (app.turn == 3 && gameBoard[2] == 'O' && gameBoard[6] == 'O'))){
//     //Looking for if human going for 'type 2' two way win () (Two opposing corners)
//     //var possibilities = [1,3,5,7];
//     //var randomSide = getARandomOption(possibilities);
//     var randomside = 3; //TEMPORARY TO GET WORKING
//     $('#' + randomSide).prepend(app.currentPlayer); //Add a randomizer here to occasionally play 5
//     console.log("Computer played T4 to block a possible setup of a type 2 two way win");
//     changePlayer();
//   }
//  // else if (app.turn == 4 && gameBoard[0] == 'O' && gameBoard[8] == 'O') {
//  //    Looking for if human going for 'type 3' two way win. (A corner wtih a middle 3 units away)
//  //    This gets complex as there are 8 scenarios to consider all leading to two way wins
//     else {
//         playRandomly();
//     }
// }

// NOTATION
// TURN 2
// Type 1 - Occurs where center is taken on turn 1
// Computer must play a corner or is open to a two way win. Plays any of the 4 corners.
// TURN 4
// //  Type2 two way win => Occurs where the opposite corners are taken on the 3rd turn
// //  Type3 two way win => Occurs where a corner is taken as well as the opposite side
// //  All other winning types are blocked by intermediate level play
// Each different scenario has diferent 'safe cells'




// function AI_hard_agressive() {
// //This is loaded when the computers turn is first. The computer aims to setup moves were the player will lose.
//     if (isComputerAbleToWin()) {
//         //computer plays in winning cell
//         launchWin();
//         console.log("computer played to win");
//     }
//     else if (doesComputerNeedToBlock()) {
//         //computer plays in blocking cell
//         gameBoard[humanAbleToWinAt] = app.currentPlayer; // Updating the array
//         $('#' + humanAbleToWinAt).prepend(app.currentPlayer);
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
//         gameBoard[AIPlayingAt] = app.currentPlayer;
//         $('#' + AIPlayingAt).prepend(app.currentPlayer);
//         console.log("Computer made a weighted play to play at cell " + AIPlayingAt);
//     }
//     else if (app.turn === 3 && (gameBoard[1] == 'O' || gameBoard[3] == 'O' || gameBoard[5] == 'O' || gameBoard[7] == 'O')) { //THIS SYNTAX IS INCORRECT
//         // The player was silly and played in a side cell
//         var possibilities = [];
//         var AIPlayingAt = getARandomOption(possibilities)
//         gameBoard[AIPlayingAt] = app.currentPlayer;
//         $('#' + AIPlayingAt).prepend(app.currentPlayer);
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

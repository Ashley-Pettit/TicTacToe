$(document).ready(function() {
    initialize();
});

//rewriting code here

//variables for event listeners here - should attach to docu.ready


//END NEW CODE

function initialize() { // Turning on all clickable features and loading page
    difficulty_selected();
    is_round_in_progress = true;
    countdown_animation();
    game_board = set_up_board();
    player_move();
    clear_board();
    home();
    player1_score = 0;
    player2_score = 0;
    round = 1;
}


function countdown_animation() {

    $('.game_options').click(function() {

		who_starts();  // NOTE THIS IS HERE BECAUSE GAME DIFFICULTY MUST BE CLICKED BEFORE CAN WORK OUT WHO STARTS
		$('.game_control').fadeOut(200);
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
        $('#whos_turn_is_it').delay(5570).empty().fadeIn(1500).prepend(current_player + " It's your turn");
		$('#home').delay(5570).fadeIn(1500);
		$('#score').delay(5570).fadeIn(1500);
		if (difficulty === "human") {
			$('#title_score1').prepend("Human 1 Score");
			$('#title_score2').prepend("Human 2 Score");
		}
		else {
			$('#title_score1').prepend("Computer Score");
			$('#title_score2').prepend("Human Score");
		}
    
    });
}


function difficulty_selected() { // NOTE USE OF GLOBAL VARIABLE DUE TO DOCUMENT.READY
    $('#human').click(function() {
        difficulty = "human";
    });
    $('#easy').click(function() {
        difficulty = "easy";
        console.log("loading easy computer");
    });
    $('#med').click(function() {
        difficulty = "intermediate";
        console.log("loading intermediate computer")
    });
    $('#hard').click(function() {
        difficulty = "intermediate";
        console.log("loading intermediate computer")
    });
}


function set_up_board() {
    var game_board = new Array(9);
    for (var i = 0; i < game_board.length; i++) {
        game_board[i] = null;
    }
    return game_board;
}


function who_starts() {
    var random_player = Math.floor(Math.random() * 2 + 1);
    if (difficulty !== "human") {
        if (random_player === 1) {
            starting_player = "The Computer of Doom! (X)";
            current_player = 'X';
            AI_play();
        } else {
            starting_player = "The Human! (O)";
            current_player = 'O';
        }
    } else {
        if (random_player === 1) {
            starting_player = "Human Number 1! (X)";
            current_player = 'X';
        } else {
            starting_player = "Human Number 2! (O)";
            current_player = 'O';
        }
    }
    $('#play_is').append(starting_player);
}


function change_player() {
    if (current_player === 'X') {
        current_player = 'O';
    } else {
        current_player = 'X';
    }
    $('#whos_turn_is_it').empty().prepend(current_player + " It's your turn");
}


function change_starting_player() {
	if (starting_player === "The Computer of Doom! (X)") {
		starting_player = "The Human! (O)";
		current_player = 'O';
    }
    else if (starting_player === "The Human! (O)") {
		starting_player = "The Computer of Doom! (X)";
		current_player = 'X';
	}
    else if (starting_player === "Human Number 1! (X)") {
        starting_player = "Human Number 2! (O)";
        current_player = 'O';
    }
    else if (starting_player === "Human Number 2! (O)") {
        starting_player = "Human Number 1! (X)";
        current_player = 'X';
    }
}



function player_move() {

    $("td").click(function(e) {
		id_cell_just_clicked = e.target.id;
        if (is_round_in_progress === true) {
            if (game_board[id_cell_just_clicked] === null) { // checks if position on board has already been played
                game_board[id_cell_just_clicked] = current_player; // UPDATING THE ARRAY
                $('#' + id_cell_just_clicked).prepend(current_player);
                if (check_for_win()) {
                	round_won();
                }
            	else if (check_for_draw()){
					round_drew();
            	}            
                else {    
                    change_player();
                    is_round_in_progress = false; //PLAYER CANNOT PLAY WHILE AI IS "THINKING"
                    setTimeout(function() {
                        is_round_in_progress = true;
                        AI_play();
                        //APPLY CLASS TO PLAYED CELL .HIGHLIGHT
                    }, 500); 
                }
            }
        }
    });
}


function clear_board() {
    $('#play_again').click(function() {
        round++
        $('#won').empty();
        is_round_in_progress = true;
		change_starting_player();
		$('#play_again').fadeOut(1000);
        for (var i = 0; i < 9; i++) { // Clearing the array 
            game_board[i] = null;
        }
    	$('.game_table td').empty(); //Clear the table visuals
        $('#play_is').empty().append(starting_player + " will start this round.");
        $('#whos_turn_is_it').empty().fadeIn(1500).prepend(current_player + " It's your turn");
        $('#begun').empty().append("The game continues! Round " + round); // in at 10,000 - Does not go out
        if (current_player === "X") {
            AI_play();
        }
    });
}


function check_for_win() {

    // check col win

    for (var i = 0; i < 3; i++) {
        if (game_board[i] === current_player && game_board[i + 3] === current_player && game_board[i + 6] === current_player) {
            // drawLine("vertical")
            return true;
        }
    }
    // check row win
    for (var j = 0; j < 9; j += 3) {
        if (game_board[j] === current_player && game_board[j + 1] === current_player && game_board[j + 2] === current_player) {
            // drawLine("horizontal")
            return true;
        }
    }
    // check diagonal win
    for (var k = 0; k <= 2; k += 2) {
        if (game_board[k] === current_player && game_board[4] === current_player && game_board[8 - k] === current_player) {
            // drawLine("diagonal")
            return true;
        }
    }
    return false;
}



function check_for_draw() {
	for (var i = 0; i < 9; i++) {
		if (game_board[i] === null) {
			return false;
		}
	}
	return true;
}



function round_won() {
    $('#won').prepend(current_player + " Takes The Round!").fadeIn(100);
    update_score();
    endRound()
}


function round_drew() {
    $('#won').prepend("It's a draw!").fadeIn(100);
    endRound()
}

function endRound(){
    $('#whos_turn_is_it').fadeOut(0);
    is_round_in_progress = false;
    $('#play_again').fadeIn(1500);
}

function AI_play() {
    if ((difficulty === "easy") && (is_round_in_progress === true)) {
        AI_easy();
    }
    else if ((difficulty === "intermediate") && (is_round_in_progress === true)) {
        AI_Intermediate();
    }
}


function is_computer_able_to_win () {
    //The computer plays in any open cell. It then checks if that cell will cause it to win.
    //If the cell will cause a win return the id of that cell otherwise clear the cell.
    for (var x=0;x<9; x++) { 
        if (game_board[x] === null) {
            game_board[x] = current_player;
            if (check_for_win()) {
                $('#' + x).prepend(current_player);
                return true;
            }
            else {
                game_board[x] = null;    
            }
        }
    }
    return false;
}

function does_computer_need_to_block () {
    //The computer plays as the human in any open cell. It then checks if that cell will cause a human win.
    //If the cell will cause a human win return the id of that cell. Then clear the cell.
    for (var p=0;p<9; p++) { 
        change_player();
        if (game_board[p] === null) {
            game_board[p] = current_player;
            if (check_for_win()) {
                game_board[p] = null;
                humanAbleToWinAt = p;
                change_player();
                return true;
            }
            else {
                change_player();
                game_board[p] = null;
            }
        }
        else { 
            change_player();
        }
    }
}
 

function AI_easy() {
    var random_move = Math.floor(Math.random() * 9); // COME UP WITH A RANDOM NUMBER 0-8
    if (is_computer_able_to_win()) {
        //computer plays in winning cell
        round_won();
        console.log("computer played to win");
    }
    else {
        var findingFreeCell = true
        while(findingFreeCell) {
            var random_move = Math.floor(Math.random() * 9); // COME UP WITH A RANDOM NUMBER 0-8
            if (game_board[random_move] === null) {
                game_board[random_move] = current_player; // Updating the array
                $('#' + random_move).prepend(current_player);
                findingFreeCell = false
                if (check_for_win()) {
                    round_won();
                }
                else if (check_for_draw()){
                    round_drew();
                }
                change_player();
                console.log("computer played randomly");
            }
        }
    }
}


function AI_Intermediate() {
    if (is_computer_able_to_win()) {
          //computer plays in winning cell
        round_won();
        console.log("computer played to win");
    }
    else if (does_computer_need_to_block()) {
        //computer plays in blocking cell
        game_board[humanAbleToWinAt] = current_player; // Updating the array
        $('#' + humanAbleToWinAt).prepend(current_player);
        console.log("computer played to block human win");
        change_player();
        if (check_for_draw()){ //Necessary in case computer draws whilist blocking human win
            round_drew();
        } 
    }
    else {
        var findingFreeCell = true
        while(findingFreeCell) {
            var random_move = Math.floor(Math.random() * 9); // COME UP WITH A RANDOM NUMBER 0-8
            if (game_board[random_move] === null) {
                game_board[random_move] = current_player; // Updating the array
                $('#' + random_move).prepend(current_player);
                findingFreeCell = false;
                if (check_for_win()) {
                    round_won();
                }
                else if (check_for_draw()){
                    round_drew();
                }
                change_player();
                console.log("computer played randomly")
            }
        }
    }
}


function AI_hard_agressive() {
// This AI occurs when hard is selected and the AI has the starting turn. As the starting player the computer agressively attempts to force 2 win scenarios. 
	//var random_move = Math.floor(Math.random() * 3); // The computer has 3 possible opening moves which are then rotated by a 25 degrees leading to 12 possible opening plays
	
	// TURN 1

	// Option 1-1 - COMPUTER PLAYER A CORNER CELL
	// Option 1-2 - COMPUTER PLAYS A SIDE CELL
	// Option 1-3 - COMPUTER PLAYS IN MIDDLE
	//var random_orientation = Math.floor(Math.random() * 4); // After finding out what type of cell to play. Then randomly orient the play
	//if (random_move = 1) { 

    // TURN 3

	//IF TURN 1 = OPTION 1  

		//OPTION 1-1 - The computer will play in the center(Preferenced)
		//OPTION 1-2 - The computer will play either the side cell which is 3 units ahead of the current cell (Attempting to force a 2 way win situation) OR
		//OPTION 1-3 - The computer plays in the opposite corner - Again attempting to try to force a 2 way win situation.  
		// NOTE - The computer does not play turn 2 in either of the matching side cells. This is considered a poor move (As their is less opportunity to win)
		// Likewise playing either side cell next to the played corner cell is also considered a poor move.

	// IF TURN 1 = OPTION 2

	//OPTION (T3)2-1 - The computer takes the center (Preferenced)
	//OPTION (T3)2-2 - The computer takes a corner cell which must be on the opposite side of the board. There are two of these. 

	// IF TURN 1 = OPTION 3

	// OPTION (T3)3-1 - The computer takes any free corner. There are 4. 
	// Playing a side cell is considered a poor move. 


	// TURN 5

	// The computer attempts a win (Preferenced)
	// The computer blocks a player win (2nd preferenced)

// OTHER SCENARIOS

// Has side and corner. if player plays in cells +1 or +2 of the corner cell the computer forces a two way win by playing -1 from the it's middle cell. 
// HAS side and corner. Only 2 more situations exist which are player played in cells -1 or +1 of middle cell. No win is possible. Random play

// Has corner and corner. The computer simply blocks any win condition of the player. The player will have win conditions in all directions. The computer must block them. If this leads to a corner play the
// computer will win on TURN 7

// Has corner and middle but can't win. The computer blocks any player win if it has to. 
//After this there are 2 cells. They are -3 or + 1 of the corner cell. Playing either will result in a 2 way win condition. 

// TURN 7 
// Attempts win. Blocks losss. If none is possible then random play as game will draw no matter what is played. 

//TURN 9

// Very simple. The computer plays the remaining cell. 

}


// function AI_hard_defending() {
//     if (is_computer_able_to_win()) {
//           //computer plays in winning cell
//         round_won();
//         console.log("computer played to win");
//     }
//     else if (does_computer_need_to_block()) {
//         //computer plays in blocking cell
//         game_board[humanAbleToWinAt] = current_player; // Updating the array
//         $('#' + humanAbleToWinAt).prepend(current_player);
//         console.log("computer played to block human win");
//         change_player();

//     }
//     else if (game_board[4] === null) { //A very defensive play
//         game_board[4] = current_player; 
//         $('#' + 4).prepend(current_player);
//         console.log("Computer took the center");
//     }
//     else if        //Looking for if human is setting up a two way win
// Unconsidered scenarios are 
// 1 - human has 0, 8. Computer has 4. Computer should play 3 or 5
// 2 - human has 2, 6. Computer has 4. Computer should should 3 or 5
// 3 - human has a corner and a side(that aren't inline else block will trigger). 
// 3 - Computer has 4. Computer plays the corner nearest the side piece 

// after 3 >> computer can play simply. win>block>random and will win or tie the game
// after 1 or 2 the computer can play win>block>random and will win or tie the game
// 
// If center is taken first
// computer takes 0, 2, 6 or 8 (a corner) 
// The next round is only a threat if the player takes opposite corner
// if player has opposite corner > the computer takes either of the leftover corners forcing the human to block
// the game will now win or tie
// 

//     if (check_for_win()) {
//         round_won();    
//     }
//     else if (check_for_draw()){
//         round_drew();
//     }
//     change_player();
// }


function home() {
    $('#home').click(function() {
        location.reload();
    });
}


function update_score() {
    if (current_player === 'X') {
        player1_score++;
        $('#score1').empty().prepend(player1_score);
    } else if (current_player === 'O') {
        player2_score++;
        $('#score2').empty().prepend(player2_score);
    }
}

function drawLine(direction) {
    if (direction === horizontal) {

    }
    else if (direction === vertical) {

    }
    else if (direction === diagonal) {

    }
    return
}



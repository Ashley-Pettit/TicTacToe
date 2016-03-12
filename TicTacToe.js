$(document).ready(function() {
    initialize();
});


function initialize() { // Turning on all clickable features and loading page
    difficulty_selected();
    is_round_in_progress = true;
    countdown_animation();
    game_board = set_up_board();
    td_clicked();
    clear_board();
    home();
    player1_score = 0;
    player2_score = 0;
}


function countdown_animation() {

    $('.game_options').click(function() {

    // Try 2 DELAYS - Need to reduce delay times and neaten code.

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
		$('#play_again').delay(5570).fadeIn(1500);
        $('#whos_turn_is_it').delay(5570).empty().fadeIn(1500).prepend(current_player + " It's your turn");
		$('#home').delay(5570).fadeIn(1500);
		$('#score').delay(5570).fadeIn(1500);
		$('#title_score1').prepend("Computer Score");
		$('#title_score2').prepend("Human Score");
    //
    });
}


function difficulty_selected() { // NOTE USE OF GLOBAL VARIABLE DUE TO DOCUMENT.READY
    $('#human').click(function() {
        difficulty = "human";
    });
    $('#easy').click(function() {
        difficulty = "easy";
    });
    $('#med').click(function() {
        difficulty = "easy";
    });
    $('#hard').click(function() {
        difficulty = "easy";
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
            starting_player = "The Computer of Doom! (As X)";
            current_player = 'X';
            AI_play();
        } else {
            starting_player = "The Human! (As O)";
            current_player = 'O';
        }
    } else {
        if (random_player === 1) {
            starting_player = "Human Number 1! (As X)";
            current_player = 'X';
        } else {
            starting_player = "Human Number 2! (As O)";
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
	if (starting_player === "The Computer of Doom! (As X)") {
		starting_player = "The Human! (As O)";
		current_player = 'O';
    } 
    else if (starting_player === "The Human! (As O)") {
		starting_player = "The Computer of Doom! (As X)"; 
		current_player = 'X';
	}
    else if (starting_player === "Human Number 1! (As X)") {
    	starting_player = "Human Number 2 (O)";
        current_player = 'O';
    } 
    else if (starting_player === "Human Number 2! (As O)") {
    	starting_player = "Human Number 1 (X)";
        current_player = 'X';
    } 
}


function td_clicked() {

    $('.game_table td').click(function() {
        if (is_round_in_progress === true) {
            var col = $(this).parent().children().index($(this)); // Jake's complex thingo that works well :P
            var row = $(this).parent().parent().children().index($(this).parent());
            if (game_board[row * 3 + col] === null) { // checks if position on board has already been played
                game_board[row * 3 + col] = current_player; // UPDATING THE ARRAY
                update_board(); // UPDATE THE VISUAL BOARD
                check_for_win();
                check_for_draw();
                change_player();
                AI_play(); // AI PLAYS STRAIGHT AFTER
            }
        }
    });
}


function update_board() { // HOW CAN WE REMOVE HARD CODING??? ONLY PREPEND IF NEW DATA EXISTS? At the moment it's removing all data, then putting data back in. => Hacky
    $('.game_table td').empty();

   // for (var i = 0; i<9;i++) => How do you get jquery to insert class based on a variable
    $('#0').prepend(game_board[0]);
    $('#1').prepend(game_board[1]);
    $('#2').prepend(game_board[2]);
    $('#3').prepend(game_board[3]);
    $('#4').prepend(game_board[4]);
    $('#5').prepend(game_board[5]);
    $('#6').prepend(game_board[6]);
    $('#7').prepend(game_board[7]);
    $('#8').prepend(game_board[8]);
}


function clear_board() {
    $('#play_again').click(function() {
    	$('#won').empty();
        is_round_in_progress = true;
		change_starting_player();
        for (var i = 0; i < 9; i++) { // Clearing the array 
            game_board[i] = null;
        }
        update_board();
    	$('#play_is').empty().append(starting_player + " will start this round."); 
    	$('#whos_turn_is_it').empty().fadeIn(1500).prepend(current_player + " It's your turn");
    	$('#begun').empty().append("The game continues!"); // in at 10,000 - Does not go out
    	if (current_player === "X") {
    		AI_play();
    	}
    });
}


function check_for_win() {

    // check col win

    for (var i = 0; i < 3; i++) {
        if (game_board[i] === current_player && game_board[i + 3] === current_player && game_board[i + 6] === current_player) {
            round_won();
            return;
        }
    }
    // check row win
    for (var j = 0; j < 9; j += 3) {
        if (game_board[j] === current_player && game_board[j + 1] === current_player && game_board[j + 2] === current_player) {
            round_won();
            return;
        }
    }
    // check diagonal win
    for (var k = 0; k <= 2; k += 2) {
        if (game_board[k] === current_player && game_board[4] === current_player && game_board[8 - k] === current_player) {
            round_won();
            return;
        }
    }

}


function check_for_draw() {
    if (is_round_in_progress === true) {
        var isAtLeastOneNull = game_board.some(function(p) {
            return p === null;
        });
        if (!isAtLeastOneNull) {
            round_drew();
            return (is_round_in_progress = false)
        }
    }
}


function round_won() {
    $('#won').prepend(current_player + " Takes The Round!").fadeIn(100);
    $('#whos_turn_is_it').fadeOut(0);
    is_round_in_progress = false;
    update_score();
    update_board();
    AI_playing = false;
}


function round_drew() {
    $('#won').prepend("It's a draw!").fadeIn(100); // THIS CODE SHOULDN'T BE HERE
    $('#whos_turn_is_it').fadeOut(0);
    is_round_in_progress = false;
    update_board();
    AI_playing = false;
}


function AI_play() {

    if ((difficulty === "easy") && (is_round_in_progress === true)) {
        AI_easy();
    }
}
 

function AI_easy() { //Make me a little harder. If can win make it win
    var AI_playing = true;
    while (AI_playing) {
        var random_move = Math.floor(Math.random() * 9); // COME UP WITH A RANDOM NUMBER 0-8
        if (game_board[random_move] === null) {
            game_board[random_move] = current_player; // Updating the array
            update_board();
            check_for_win();
            check_for_draw();
            change_player();
            AI_playing = false;
            break;
        }
    }
}


function AI_Intermediate() {

}


function AI_hard_agressive() {
	var AI_playing = true;
	while (AI_playing) {
	var random_move = Math.floor(Math.random() * 3); // The computer has 3 possible opening moves which are then rotated by a 25 degrees leading to 12 possible opening plays
	// PLAY 1 - COMPUTER PLAYER A CORNER CELL
	// PLAY 2 - COMPUTER PLAYS A SIDE CELL
	// PLAY 3 - COMPUTER PLAYS IN MIDDLE
	var random_orientation = Math.floor(Math.random() * 4) // After finding out what type of cell to play. Then randomly orient the play
	if (random_move = 1) { 
		//If computer played on first turn on a corner cell it has three possible next moves. 
		//OPTION 1 (Preferenced) - The computer will play in the center -  The computer will now win in 1-2 moves
		//OPTION 2 - The computer will play either the side cell which is 3 units ahead of the current cell (Attempting to force a 2 way win situation) OR
		//OPTION 3 - The computer plays in the opposite corner - Again attempting to try to force a 2 way win situation.  
	}
		//If the computer did option 1 


	}
}


function AI_hard_defending() {

}


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




/*


//CODE NOT YET IN USE 





function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

*/
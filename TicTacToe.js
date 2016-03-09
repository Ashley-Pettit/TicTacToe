$(document).ready(function() {
	initialize();
});


function initialize() {
	is_round_in_progress = true;
	countdown_animation();
	who_starts();
	game_board = set_up_board();
	td_clicked(game_board);
	clear_board();
}


function countdown_animation () {  

	$('.game_options').click(function() {

// WITHOUT DELAYS - FOR TESTING
/*

		$('.game_control').fadeOut(500);
		$('#play_lets').delay().fadeIn(750).delay().fadeOut(750); // In at 500 Out at 10,000
		$('#play5').delay().fadeIn(750).fadeOut(750); // In at 500 out at 2000
		$('#play4').delay().fadeIn(750).fadeOut(750); // In at 2000 out at 3500
		$('#play3').delay().fadeIn(750).fadeOut(750); // In at 3500 out at 5000
		$('#play2').delay().fadeIn(750).fadeOut(750); // in at 5000 out at 6500
		$('#play1').delay().fadeIn(750).fadeOut(750); // in at 6500 out at 8000
		$('#play_is').delay().fadeIn(750);  // in at 8000, does not go out
		$('#play_happening').delay().fadeIn(1500); // in at 10,000 - Does not go out
		$('.game_table').delay().fadeIn(1500); // in at 10,000 - Does not go out
		$('#play_again').delay().fadeIn(1500);
		$('#whos_turn_is_it').delay(100).fadeIn(1500).prepend(current_player + " It's your turn");
*/

 //  WITH DELAYS - Need to reduce delay times and neaten code.

		$('.game_control').fadeOut(500);
		$('#play_lets').delay(500).fadeIn(750).delay(8070).fadeOut(750); // In at 500 Out at 10,000
		$('#play5').delay(501).fadeIn(750).fadeOut(750); // In at 500 out at 2000
		$('#play4').delay(2020).fadeIn(750).fadeOut(750); // In at 2000 out at 3500
		$('#play3').delay(3530).fadeIn(750).fadeOut(750); // In at 3500 out at 5000
		$('#play2').delay(5040).fadeIn(750).fadeOut(750); // in at 5000 out at 6500
		$('#play1').delay(6550).fadeIn(750).fadeOut(750); // in at 6500 out at 8000
		$('#play_is').delay(8060).fadeIn(750);  // in at 8000, does not go out
		$('#play_happening').delay(10080).fadeIn(1500); // in at 10,000 - Does not go out
		$('.game_table').delay(10080).fadeIn(1500); // in at 10,000 - Does not go out
		$('#play_again').delay(10080).fadeIn(1500);
		$('#whos_turn_is_it').delay(10080).fadeIn(1500).prepend(current_player + " It's your turn");


	});
}


function td_clicked(game_board){
	
	$('.game_table td').click(function() {
		if (is_round_in_progress === true) {
			var col = $(this).parent().children().index($(this));
			var row = $(this).parent().parent().children().index($(this).parent());
			// checks if position on board has already been played
			if (game_board[row * 3 + col] === null) {
				game_board[row * 3 + col] = current_player;   // UPDATING THE ARRAY
				update_board();
				if (check_for_win(game_board, current_player)) {
					$('#won').prepend(current_player + " Takes The Round!").fadeIn(100);
					$('#whos_turn_is_it').fadeOut(0);
					is_round_in_progress = false;
				}
				change_player();
		//		AI_play("beginner");
			}
		}
	});
}


function set_up_board() {
	var game_board = new Array(9);
	for (var i = 0; i < game_board.length; i++) {
		game_board[i] = null;
	}
	return game_board;
}


function update_board () { // HOW CAN WE REMOVE HARD CODING??? ONLY PREPEND IF NEW DATA EXISTS? At the moment it's removing all data, then putting data back in. => Hacky
	$('.game_table td').empty();
	$('#A1').prepend(game_board[0]);
	$('#A2').prepend(game_board[1]);
	$('#A3').prepend(game_board[2]);
	$('#B1').prepend(game_board[3]);
	$('#B2').prepend(game_board[4]);
	$('#B3').prepend(game_board[5]);
	$('#C1').prepend(game_board[6]);
	$('#C2').prepend(game_board[7]);
	$('#C3').prepend(game_board[8]);
}


function who_starts() {
	var starting_player = Math.floor(Math.random()*2 + 1);
	if (starting_player === 1) {
		starting_player = "The Human!";
		current_player = 'X';
	}
	else {
		starting_player = "The Computer!";
		current_player = 'O';
	}
	$('#play_is').append(starting_player);
}


function change_player() {
	if (current_player === 'X') {
		current_player = 'O';
	}
	else {
		current_player = 'X';
	}
	$('#whos_turn_is_it').empty().prepend(current_player + " It's your turn");
}

function check_for_win(game_board, player){

	// check col win
	for(var i = 0; i < 3; i++){
		if (game_board[i] === player && game_board[i + 3] === player && game_board[i + 6] === player) {
			return true;
		}
	}
	// check row win
	for(var j = 0; j < 9; j +=3 ){
		if (game_board[j] === player && game_board[j + 1] === player && game_board[j + 2] === player){
			return true;
		}
	}
	// check diagonal win
	for (var k = 0; k <= 2; k+=2){
		if (game_board[k] === player && game_board[4] === player && game_board[8 - k] === player){
			return true;
		}
	}

	// check draw
	var isAtLeastOneNull = game_board.some(function(p) { return p === null; }); 
	if (!isAtLeastOneNull) { 
		alert("It's a draw");
		return true;
	}

	// if no win player has not won
	return false;
}


function clear_board() {
	$('#play_again').click(function() {
		alert("TIME FOR THE NEXT ROUND!");
		for (var i = 0; i < 9; i++) {
			game_board[i] = null;
			$('.game_table td').empty();
		}
		is_round_in_progress = true;
		$('#whos_turn_is_it').empty().delay(100).fadeIn(1500).prepend(current_player + " It's your turn");
		$('#won').empty();
	});
}


function AI_play (difficulty) {
	if (difficulty === "beginner") {
			for(var i = 0; i < 9; i++){
				if (game_board[i] === null) {
					game_board[row * 3 + col] = current_player; // Updating the array
					update_board();
					break;
				}
			}
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
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
	player1_score = 0
	player2_score = 0
}

function initialize_backend() { // Turning on all clickable features and loading page
	difficulty_selected();
	is_round_in_progress = true;
	countdown_animation();
	game_board = set_up_board();
	td_clicked();
	clear_board();
	home();
	player1_score = 0
	player2_score = 0
}


function countdown_animation () {  

	$('.game_options').click(function() {

// WITHOUT DELAYS - FOR TESTING
		who_starts();  // NOTE THIS IS HERE BECAUSE GAME DIFFICULTY MUST BE CLICKED BEFORE CAN WORK OUT WHO STARTS
		$('.game_control').fadeOut(500);
		$('#play_lets').delay().fadeIn(750).delay().fadeOut(750); // In at 500 Out at 10,000
		$('#play5').delay().fadeIn(750).fadeOut(750); // In at 500 out at 2000
		$('#play4').delay().fadeIn(750).fadeOut(750); // In at 2000 out at 3500
		$('#play3').delay().fadeIn(750).fadeOut(750); // In at 3500 out at 5000
		$('#play2').delay().fadeIn(750).fadeOut(750); // in at 5000 out at 6500
		$('#play1').delay().fadeIn(750).fadeOut(750); // in at 6500 out at 8000
		$('#play_is').delay().fadeIn(750);  // in at 8000, does not go out
		$('#begun').delay().fadeIn(1500); // in at 10,000 - Does not go out
		$('.game_table').delay().fadeIn(1500); // in at 10,000 - Does not go out
		$('#play_again').delay().fadeIn(1500);
		$('#whos_turn_is_it').delay(100).empty().fadeIn(1500).prepend(current_player + " It's your turn"); 
		$('#home').delay().fadeIn(1500);
		$('#score').delay().fadeIn(1500);

/* WITH DELAYS - Need to reduce delay times and neaten code.

		who_starts();  // NOTE THIS IS HERE BECAUSE GAME DIFFICULTY MUST BE CLICKED BEFORE CAN WORK OUT WHO STARTS
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
		$('#home').delay(10080).fadeIn(1500);
		$('#score').delay(10080).fadeIn(1500);

*/
	});
}

function difficulty_selected () { // NOTE USE OF GLOBAL VARIABLE DUE TO DOCUMENT.READY
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
	var starting_player = Math.floor(Math.random()*2 + 1);
	if (difficulty !== "human") {
		if (starting_player === 1) {
			starting_player = "The Computer of Doom! (As X)";
			current_player = 'X';
			AI_play();
		}
		else {
			starting_player = "The Human! (As O)";
			current_player = 'O';
		}
	}
	else {
		if (starting_player === 1) {
			starting_player = "Human Number 1! (As X)";
			current_player = 'X';
		}
		else {
			starting_player = "Human Number 2! (As O)";
			current_player = 'O';
		}
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


function td_clicked(){
	
	$('.game_table td').click(function() {
		if (is_round_in_progress === true) {
			var col = $(this).parent().children().index($(this)); // Jake's complex thingo that works well :P
			var row = $(this).parent().parent().children().index($(this).parent());
			if (game_board[row * 3 + col] === null) { // checks if position on board has already been played
				game_board[row * 3 + col] = current_player;   // UPDATING THE ARRAY
				update_board(); // UPDATE THE VISUAL BOARD
				check_for_win(game_board);
				check_for_draw(game_board);
				change_player();
				AI_play(); // AI PLAYS STRAIGHT AFTER
			}
		}
	});
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


function clear_board() {
	$('#play_again').click(function() {
		alert("TIME FOR THE NEXT ROUND! SWAPPING STARTING PLAYER");
		for (var i = 0; i < 9; i++) { // Clearing the array 
			game_board[i] = null;
		}
		update_board();
		is_round_in_progress = true;
		$('#whos_turn_is_it').empty().fadeIn(1500).prepend(current_player + " It's your turn");
		$('#won').empty();
		if (current_player === "X") {
			AI_play();
		}
	});
}


function check_for_win (){

	// check col win
	for(var i = 0; i < 3; i++){
		if (game_board[i] === current_player && game_board[i + 3] === current_player && game_board[i + 6] === current_player) {
			round_won();
		}
	}
	// check row win
	for(var j = 0; j < 9; j +=3 ){
		if (game_board[j] === current_player && game_board[j + 1] === current_player && game_board[j + 2] === current_player){
			round_won();
		}
	}
	// check diagonal win
	for (var k = 0; k <= 2; k+=2){
		if (game_board[k] === current_player && game_board[4] === current_player && game_board[8 - k] === current_player){
			round_won();
		}
	}

}

function check_for_draw () {
	if 	(is_round_in_progress === true) {
		var isAtLeastOneNull = game_board.some(function(p) { return p === null; }); 
		if (!isAtLeastOneNull) { 
			round_drew();
		}
	}
}


function round_won(){
	$('#won').prepend(current_player + " Takes The Round!").fadeIn(100);
	$('#whos_turn_is_it').fadeOut(0);
	is_round_in_progress = false;
	update_score();
	update_board();
}

function round_drew() {
	$('#won').prepend("It's a draw!").fadeIn(100); // THIS CODE SHOULDN'T BE HERE
	$('#whos_turn_is_it').fadeOut(0);
	is_round_in_progress = false;
	update_board();
}


function AI_play () {

	if (difficulty === "easy" && is_round_in_progress === true) {
		AI_easy();
	}
}

function AI_easy (){ // THIS LOGIC IS INCORRECT!!!! 
	for (var i = 0; i < 9; i++) {
		var random_move = Math.floor(Math.random()*9); // COME UP WITH A RANDOM NUMBER 0-8
		if (game_board[random_move] === null) {
			game_board[random_move] = current_player; // Updating the array
			update_board();
			check_for_win();
			check_for_draw ();
			change_player();
			break;
		}
	}
}

function AI_Intermediate () {

}

function AI_hard_agressive () {

}

function AI_hard_defending () {

}


function home() {
	$('#home').click(function() {
    location.reload();
	});
}


function update_score() {
	if (current_player === 'X') {
		player1_score++;
		$('#score1').empty().prepend(player1_score)
	} 
	else if (current_player === 'O') {
		player2_score++;
		$('#score2').empty().prepend(player2_score)
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
// THIS CODE IS FOR PAGE LOADUP

$(document).ready(function() {
		
// THIS IS WHAT HAPPENS WHEN DIFFICULTIY IS CLICKED

$('.game_options').click(function() {
	$('.game_control').fadeOut (1);
    $('.game_in_play').fadeIn(2000);
});




function who_starts() {
	var starting_player = Math.floor(Math.random()*2 + 1);
	if (starting_player === 1) {
		starting_player = "The Human!";
		current_player = 'X';
	}
		else {
			starting_player = "The Computer of DOOM!";
			current_player = 'O';
	}
	$('#play').append(starting_player);
}

who_starts();

$('.game_table td').click(function() {
	$(this).prepend(current_player);
	change_player();
	});

function change_player() {
	if (current_player === 'X') {
		current_player = 'O';
	}
	else {
		current_player = 'X';
	}
}




var board = {
	A1 : null, A2 : null, A3 : null,
	B1 : null, B2 : null, B3 : null,
	C1 : null, C2 : null, C3 : null
};

function clear_board() {
	for (var i =0; i <= 9; i++) {
		board[i] = null;
	}

}


$('.clear_board').click(function() {
	clear_board();
});













}); //DO NOT DELETE - THIS LINES UP WITH DOCUMENT.READY










/*








// THIS DECIDES WHO'S TURN IT IS





function change_player (whos_turn) {
	if (whos_turn === player_1) {
		whos_turn = player_2;
	}
	else { 
		whos_turn = player_1;
	}
	}
}


// THIS IS WHAT HAPPENS IMMEDIDATELY AFTER A USER CLICK

function play (whos_turn, cell_played) {
	while (match_running === true) {
		if (this.cell_played === false) {
			change_player(whos_turn);
		}
	)}
}


		    $('td.game').click(function() {
			if (whos_turn === player_1) {
		        $(this).prepend("X"); // COULD PUT AN IMAGE HERE
		    	this.cell_played = true;
		    	board.this = "X";
		    }
			else if (whos_turn(player) === player_2) {
				$(this).prepend("O");
				this.cell_played = true;
				board.this = "O";
			}



// WIN CONDITIONS


function horizontal_win () {
	if ((A1 === "X" + A2 === "X" + A3 === 'X') || (B1 === "X" + B2 === "X" + B3 === 'X') || (C1 === "X" + C2 === "X" + C3 === "X")) {
	    return win
	}
}

function vertical_win () {
    if ((A1 === "X" + B1 === "X" + C1 === 'X') || (A2 === "X" + B2 === "X" + C2 === 'X') || (A3 === "X" + B3 === "X" + C3 === "X")) {
		return win
}

function diagonal_win () {
    if ((A1 === "X" + B2 === "X" + C3 === 'X') || (C1 === "X" + B2 === "X" + A3 === 'X')) {
	   store_score.this.player += 1 
	   return win

}


// CHECKING FOR ANY WIN CONDITIONS OF MATCH

function is_match_won () {
	if (horizontal win() === true || vertical_win() === true || diagonal_win = true);
		console.log (player + " has taken the match! The score is " + player_1_score + " to " + player_2_score);
		match_running = false;
		console.log("Let's start the next round. Click roll to see who will start");
}



//STORE SCORE - DO LATER


function store_score() {
	var player_1_score;
	var player_2_score;


// CHECKING FOR HIT AMOUNT OF MATCHES. GAME ENDS. 

function game_won() {  // DO LATER. MAKE 1 ROUND WORK FIRST

}





*/


//DONT EDIT THIS.

initialize();
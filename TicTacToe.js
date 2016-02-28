// THIS CODE IS FOR PAGE LOADUP

$(document).ready(function() {
		
// THIS IS WHAT HAPPENS WHEN DIFFICULTIY IS CLICKED

$('.game_options').click(function() {
	$('.game_control').fadeOut (500);
    $('.game_table').delay(500).fadeIn(750);
    $('#play_lets').delay(500).fadeIn(750).delay(8060).fadeOut(750); // In at 500 Out at 10,000
    $('#play5').delay(501).fadeIn(750).fadeOut(750); // In at 500 out at 2000
    $('#play4').delay(2010).fadeIn(750).fadeOut(750); // In at 2000 out at 3500
    $('#play3').delay(3520).fadeIn(750).fadeOut(750); // In at 3500 out at 5000
    $('#play2').delay(5030).fadeIn(750).fadeOut(750); // in at 5000 out at 6500
    $('#play1').delay(6540).fadeIn(750).fadeOut(750); // in at 6500 out at 8000
    $('#play_is').delay(8050).fadeIn(750);  // in at 8000, does not go out
    $('#play_happening').delay(10070).fadeIn(1500); // in at 10,000 - Does not go out
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
	$('#play_is').append(starting_player);
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

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
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
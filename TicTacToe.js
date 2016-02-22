// GAME SETUP



$(document).ready(function() {
	alert("Attached JavaScript file functional"); // TEMPORARY
	
	
// THIS IS THE ANIMATION OF THE PAGE
	
	$('.game_control').click(function() {
    	$('.game_control').fadeOut (1);
    	$('.setdifficulty').fadeOut (1);
    	$('#gameroll').fadeIn(2000);
    	$('#gametable').fadeIn(2000);	
    	$('#gameroll').append('<p>The starting player is...</p>').fadeIn(2000);	
    	$('#gameroll').append(who_starts.starting_player).fadeIn(2000);
	)}


function initialize() {
	var match_running = true;
	play(who_starts); //Launch play and input the result of calling who_starts 
}

board = {
	A1 : null, A2 : null, A3 : null,
	B1 : null, B2 : null, B3 : null,
	C1 : null, C2 : null, C3 : null
};

function clearboard
for (var row = 0; row <= 7 ; row += 1) {
	for (var col = 0; col <= 7; col ++) {
		board[row][col] = null;
	}
}



$('#roll').click(function() {
	match_running = true;
	play (who_starts);
)}

// THIS DECIDES WHO'S TURN IT IS


function who_starts () {
	var starting_player = Math.floor(Math.random()*2 + 1);
	if (starting_player === 1) {
		starting_player = player_1;
		return player_1;
	}
	else {
		return player_2;
	}
}


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








//DONT EDIT THIS.

)};
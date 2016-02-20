// GAME SETUP

// Underneath ready is everything that should occur as soon as the page finishes loading. 
$(document).ready(function() {
	alert("Attached JavaScript file functional");
	$('td#difficulty').click(function() {
	$('#difficulty').fadeOut (1);
	$('.setdifficulty').fadeOut (1);
	$('#gameroll').fadeIn (2000);
	$('#gametable').fadeIn (2000);	
	$('#gameroll').append('<p>The starting player is...</p>').fadeIn (2000);	
	$('#gameroll').append(starting_player).fadeIn(2000);
});
});


function mode_selected() {

}


function initialize() {
	board = {
		A1 : null, A2 : null, A3 : null,
		B1 : null, B2 : null, B3 : null,
		C1 : null, C2 : null, C3 : null
	};
	console.log(who_starts);
	play(who_starts);
}

function who_starts (){
	var starting_player = Math.floor(Math.random()*2 + 1);
	if (starting_player === 1) {
		starting_player = player_1;
		return "Player 1";
	}
	else {
		starting_player = player_2;
		return "Player 2";
	}
}

function play (starting_player, cell_played) {
	if (cell_played = false) {
	    $('td.game').click(function() {
		if (starting_player == "Player 1") {
	        $(this).prepend("X");
	    	this.cell_played = true;
	    	board.
	    };
		else if (starting_player == "Player 2") {
			$(this).prepend("O");
			this.cell_played = true;
		}
	}
	else { 		//Can't be played here. Ignore user action
    
	}
}

function change_player () {
	if turn = player1 {
		turn = player2;
	}
	else { 
		turn = player1;
	}
	}
}

function horizontal_win () {
	if (A1 + A2 + A3 = 'X')
};

function vertical_win () {
	if 
};

function diagonal_win () {
	if 
}; 

function has_won () {
	if 
};



function store_score() {

};










/*
function computer_move()
var computer_move = Math.floor(Math.random()*9 + 1);
switch(computer_move) {
    case (computerMove === 1 ):
        $('#box1').prepend("O");
		break;
    case (computerMove === 1 ):
        $('#box2').prepend("O");
		break;
	case (computerMove === 1):
		$('#box3').prepend("O");	 
        break;
    default:
	break


starting_player = "The Computer of Doom!";

*/

// GAME SETUP

$(document).ready(function() {
		alert("ARE YOU READY FOR THIS! - P.s. JQUERY is loaded...");
   
   $('td#difficulty').click(function() {
		$('#difficulty').fadeOut (1);
		$('.setdifficulty').fadeOut (1);
		$('#gameroll').fadeIn (2000);
		$('#gametable').fadeIn (2000);	
		$('#gameroll').append('<p>The starting player is...</p>').fadeIn (2000);	
		$('#gameroll').append(startingPlayer).fadeIn(2000);
});

var startingPlayer = Math.floor(Math.random()*2 + 1);
if (startingPlayer === 1) {
	startingPlayer = "The Computer of Doom!";
}
else {
	startingPlayer = "The Human!";
}	

var cellPlayed = false;
    $('td.game').click(function() {
	if (!CellPlayed) {
        $(this).prepend("X");
		CellPlayed = true;
}} 
);

var computerMove = Math.floor(Math.random()*9 + 1);
switch(expression) {
    case (computerMove === 1 && computerTurn):
        $('#box1').prepend("O");
		break;
    case (computerMove === 1 && computerTurn):
        $('#box2').prepend("O");
		break;
	case (computerMove === 1 && computerTurn):
		$('#box3').prepend("O");	 
        break;
    default:
	break
}
});
// GAME SETUP

$(document).ready(function() {
		alert("ARE YOU READY FOR THIS! - P.s. JQUERY is loaded...");
   
   $('td#difficulty').click(function() {
		$('#difficulty').fadeOut (1);
		$('.setdifficulty').fadeOut (1);
		$('#gameroll').fadeIn (2000);
		$('#gametable').fadeIn (2000);	
		$('#gameroll').append('<p>The starting player is...</p>').fadeIn (2000);	
		$('#gameroll').append(startingPlayer).fadeIn(2000)
});

	var startingPlayer = Math.floor(Math.random()*2 + 1);
if (startingPlayer === 1) {
	startingPlayer = "The Computer of Doom!";
}
else {
	startingPlayer = "The Human!";
}	

var locked = false
if (5>3) {
$('td.game').click(function() {
	$(this).prepend("X");
}
else {
};
});
});





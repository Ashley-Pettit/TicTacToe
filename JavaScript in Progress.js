$('button').click(function) {
$('body').html("<div class ="heading">Ash's Tic Tac Toe </div>
	 <script src="js.js"></script>
<!-- SET THE DIFFICULTY 
Beginner >> The computer will play randomly unless a 3 in a row to win is available.
Intermediate >> After 3 moves the computer plays randomly however, will go for 3 in a row if possible and will block 3 in a row
I'm a Boss >> The computer plays perfectly and never loses. Will play defensive if not starting and will be agressive if starting
I want to Lose >> Unlocked after winning Average >> The computer occasionally plays twice and 'cheats' :P. 
-->
	<div class = "setdifficulty">Choose your difficulty </div>
		<table id="difficulty">
			<tr>
				<td id="difficulty" style= "border-color:green">Beginner</td>
				<td id="difficulty" style= "border-color:orange">Intermediate</td>
				<td id="difficulty" style = "border-color:red">Take on the BOSS!!</td>
				<td id="difficulty" style = "border-color:red; display:none">I want to lose!</td>
			</tr>
		</table>
		<p class = "setdifficulty"> Beat boss difficulty and win a $1,000 prize! </p>
<!-- GAME BOX -->
<div id="gameroll" class ="heading" style = "display:none"> LET'S PLAY! Rolling to see who goes first.... </div>
<!-- JS INSERTS COUNT ELEMENT HERE -->
	
	
	<div>
		<table id="game" style="display:none">
			<tr>
				<td id = "Box1" class="game">Box1</td>
				<td id = "Box2" class="game">Box2</td>
				<td id = "Box3" class="game">Box3</td>
			</tr>
			<tr>
				<td id = "Box4" class="game">Box4</td>
				<td id = "Box5" class="game">Box5</td>
				<td id = "Box6" class="game">Box5</td>
			</tr>
			<tr>
				<td id = "Box7" class="game">Box5</td>
				<td id = "Box8" class="game">Box5</td>
				<td id = "Box9" class="game">Box5</td>
			</tr>
		</table>
	</div>
	
<!-- IMAGES -->
	<div style = "display:none">
		<img id="xo" src="http://www.rsc.org/learn-chemistry/wiki/images/a/a5/X.png"> 
		<img id="xo" src="http://1.bp.blogspot.com/HNFMQvUB5dM208mI3b_xSMK9FMp4FP-HzrtGI4acXZGJ87wTUK3kow7yS4PzefZott0=w300">
		</div>
});

<button>Restart</button>"); 

//Restart button end




/*


$('#gameroll').after ();
/*

// GAME ROLL
/*
		For (i = 5; i>=0; i--)
		$('#gameroll').after ("<p id = counter> i </p>");
		// wait 1 sec
		$('#id').fadeOut ('slow');
		if (i=1 &&)
		// wait 1 sec
	
		$('#gameroll').fadeOut(slow);
		else if (startingplayer === computer) 
				$('#gameroll').after (<p>i....</p>);
		()	
    });

/*
// EASY COMPUTER



	$('td.game').click(function() {
	$(this).css(visibility, visible);
	});


	
	
	


locked = true


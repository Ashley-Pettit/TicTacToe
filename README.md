**The original Tic Tac Toe game bought back to life.**

Play veruses a human or 3 levels of AI. Beat the Boss level in a match to 3 rounds and we will give you $1000*!

Beat the hard level in a match to 3 rounds and I'll be very impressed but won't give you any money! :P

For a bit of a laugh or to make someone a little frustrated click the ? button and see what happens!

Built in JavaScript/Jquery with an interactive front-end interface. 


**HOW TO RUN**

To run the program click ![Download here](https://github.com/Ashley-Pettit/TicTacToe/archive/master.zip"Download ZIP")


Save it to your computer then just run the Game.Html file. 

Alternatively the game will soon be hosted! Stay tuned! 

*No code tampering or exploiting bugs!

![Example of Gameplay](https://github.com/Ashley-Pettit/TicTacToe/blob/master/Images/TicTacToe.png?raw=true"")

**SPOILOR ALERT (HOW THE AI WORKS) - Play the game before reading below!** 

*The beginner AI is designed to play very simply*

It will first check to see if there is any free cell on the board that will cause it to win. If there is such a cell the computer will take this cell. 

If there is no winning cell available the computer runs playRandomly() which generates a random number from 0-8 to determine where it should play. It will then check if this cell is free. If it is it will play there. If not it will continue while findingFreeCell === True

*The intermediate AI is slightly smarter and a touch tricky to beat*

The computer first plays as the beginner AI would. Again it first checks if it can win as the first step. 

The difference between intermediate and beginner is that the intermediate AI will check if the player is going to be able to win next turn. It does this by pretending it is the player via the function changePlayer() and then playing as the player in every cell via a for loop. If any cell would trigger checkForWin() returns true then the id of that cell is stored in an object called app. The computer then plays in this cell to avoid the player from winning. 

*Big spoiler - This means the only way to beat the intermediate computer is via setting up what I called a "two way win" where the player can win in two places in the following turn*  

*The Boss AI*

The boss AI is actually broken down into two totally seperate code sections. As many people know to win TicTacToe as the 2nd player is virtually impossible. Thus when playing second you should simply aim to draw. 

That is exactly what this computer does when playing 2nd. It plays 'defensively' and simply aims to draw if not win the game. The boss cannot lose as TicTacToe is a simple game where if both players play perfectly its always a draw.  

This is in constrast to when the computer plays first. When it plays first it plays "Aggressively". A perfect player will still tie however, the computer is designed to use weighted plays and to setup "Two way wins" that will often cause a player error and a computer victory. 


*The Cheating AI*

The cheating AI was difficult to program and was my last thing to add to the program. It's simply for fun or to annoy your friends by pretending they didn't see somewhere the computer could win!

It's logic is rather complicated. It's pretty hard coded however, this was by design as I wanted it to 'cheat' very subtley such that it wasn't too obvious the computer was cheating. 

One of the core logic pieces to the Cheating AI is that it looks to see if the player is going to be able to setup a "two way win" in the following turn. If it sees this happening it will play twice in a row very quickly and win the game. (Cheeky devil!). 

This however, only happens after turn > 5 and thus it is possible to beat the cheating AI! I could have made it impossible yet it made it far too obvious the AI was cheating. Also it's quite funny what happens if the player actually "wins." Spoiler > even winning you won't win. The computer will take every cell and give you an annoying taunt via an alert box declaring it wins rather than you do. 

**Challenges**

Initially many DOM elements would overlap. This was overcome by appending or prepending elements and containing them in the one 'container' div. I did look into bootstrap however, I decided it wasn't necessary.

Initially I had around 15 event listeners! This was cut down massively by attaching the listener to the parent object and then using JQuery target.id to work out which child was selected.  

Determining how the AI would play was initially easy however, the computer was far too easy and predictable. In the first design the computer played via a for loop play 0-8. As you'd expect the computer was so boring that it played cells in sequence 0-8. 

This was overcome initially via simply a Math.random. I then looked to improve on this used weighted plays via a function called getRandomMove(). This function takes in an array and returns a random element of the array. This allows for weighting and inputting only 'safe' cells which would later be used for the advanced 'agressive' AI.  

Other improvements were mainly just around trying to keep the code DRY. One example was playRandomly(). This code used to run in each computer. I found it was much easier to extract this into a function and have the comptuer simply call playRandomly() if it can't win or draw. 

**THINGS I'M PROUD OF IN THE SOLUTION**

I really like the solution of how to make the beginner or intermediate computer play. The code for the easy or intermediate AI is actually very short. I quite liked the solution of using the checkForWin() function to see if a win was coming and to take it or to block it. 

Initially the checkForWin() function was only designed to actually check to see if someone had won! 

The solution should now display well in the vast majority of resolutions! This took a while 

I also do like how the checkForWin() function works. I initially was planning on hard coding the 8 win scenarios however, it was much more efficent to run 3 loops that simply check for Row/Col/Diag win. For each the logic is actually very simple with an example being for row i, i+3, i+6 must be a win. Where i=0, 1, or 2.



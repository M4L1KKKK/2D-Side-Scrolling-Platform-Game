/*

The Game Project



Game project 7

*/


var gameChar_x;
var gameChar_y;
var enemies;
var floorPos_y;
var canyon;
var collectables;


var isLeft;
var isRight;
var isPlummeting;
var isFalling;

var trees_x;
var treePos_y;
var clouds;
var mountains;
var cameraPosX = 0;
var platforms;

var gameScore = 0;
var GameOver = false;

var flagpole;
var lives;
var allcoin_collected;
var isFrozen;

var jumpSound;
var fell_in_water;
var coincollect_sound;
var wingame_sound;
var lose_sound;
var bgmusic;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);

    fell_in_water = loadSound('assets/fellinwater.mp3')
    fell_in_water.setVolume(0.1);

    coincollect_sound = loadSound('assets/coincollect.wav')
    coincollect_sound.setVolume(0.1);

    wingame_sound = loadSound('assets/wingame.wav')
    wingame_sound.setVolume(1);

	lose_sound = loadSound('assets/lose.mp3')
	lose_sound.setVolume(1);

	bgmusic = loadSound('assets/bgmusic.mp3')
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	lives = 3

	bgmusic.setVolume(0.5);
	bgmusic.loop();

	startGame();
}

function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	isLeft = false;
	isFalling = false;
	isPlummeting = false;
	isRight = false;

	trees_x = [-400,-100,390,470,1200,1550];
	treePos_y = floorPos_y;
	clouds = [];
	mountains = [];
	collectables = [];
	canyon = [];
	platforms = [];
	platforms.push(createPlatforms(-570,floorPos_y  - 50,50));
	platforms.push(createPlatforms(-700,floorPos_y  - 50,50));
	platforms.push(createPlatforms(30,floorPos_y  - 50,50));
	platforms.push(createPlatforms(270,floorPos_y  - 50,100));
	platforms.push(createPlatforms(60,floorPos_y  - 120,200));
	platforms.push(createPlatforms(-1100,floorPos_y  - 70,270))

	enemies = [];
	enemies.push(new Enemy(-1200, floorPos_y - 10, 150));
	enemies.push(new Enemy(-100, floorPos_y - 10, 150));
	enemies.push(new Enemy(1000, floorPos_y - 10, 250));
	enemies.push(new Enemy(1400, floorPos_y - 10, 350));
	enemies.push(new Enemy(1900, floorPos_y - 10, 250));

	canyon = [
		{x_pos: -1000, width:200},
		{x_pos: -700, width:200},
		{x_pos: 100, width:180},
		{x_pos: 876, width:80},
		{x_pos: 1800, width:80},
	];

	collectables = [
		{x_pos: -750, y_pos: 415, size:50, isFound: false},//collectable6
		{x_pos: -1300, y_pos: 415, size:50, isFound: false},//collectable5
		{x_pos: 400, y_pos: 415, size:50, isFound: false}, //collectable1
		{x_pos: 50, y_pos: 415, size: 50, isFound: false}, //collectable2
		{x_pos: 1000, y_pos: 415, size: 50, isFound: false},//collectable3
		{x_pos: 1600, y_pos: 415, size: 50, isFound: false},//collectable4
	];
	
	clouds = [
			{x_pos: 2300, y_pos: 100, width: 80},
			{x_pos: 2000, y_pos: 100, width: 80},
			{x_pos: 1700, y_pos: 100, width: 80},
			{x_pos: 1350, y_pos: 100, width: 80},
			{x_pos: 900, y_pos: 100, width: 80},
			{x_pos: 600, y_pos: 100, width: 80},
			{x_pos: 200, y_pos: 100, width: 80}, 
			{x_pos: 450,y_pos: 80, width: 80}, 
			{x_pos: 900, y_pos:100, width:80}, 
			{x_pos: -200, y_pos: 100, width: 80},
			{x_pos: -450, y_pos: 100, width: 80},
			{x_pos: -700, y_pos: 100, width: 80},
			{x_pos: -980, y_pos: 100, width: 80},
			{x_pos: -1200, y_pos: 100, width: 80},
			{x_pos: -1500, y_pos: 100, width: 80},
			{x_pos: -1800, y_pos: 100, width: 80},
	];

	mountains = [
			{ x_pos: 550, y_pos: 432, width: 200 }, // mountain 1
			{ x_pos: 630, y_pos: 432, width: 160 },// mountain 2
			{ x_pos: 650, y_pos: 432, width: 220 }, //mountain 3
			{ x_pos: 1300, y_pos: 432, width: 220 } //m4
	];

	flagpole = {isReached: false, x_pos: 2400}
}

function stopGame()
{
	// Character movement logic
if (!isFrozen) { 
    if (isLeft == true) 
	{
        gameChar_x -= 0 ;
    }
    if (isRight == true) 
	{
        gameChar_x += 0;
    }
}
push();
strokeWeight(5);
stroke(100);
line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y-250);

noStroke();
if(flagpole.isReached)
{
	fill(245,215,66);
	rect(flagpole.x_pos, floorPos_y - 250, 50,50)
	if (isFrozen) 
	{
		push();
		translate(-cameraPosX, 0);
		fill(0, 150, 0); // Green background
		rect(0, 0, width, height);
		fill(255);
		textSize(60);
		textAlign(CENTER, CENTER);
		text("You Win!", cameraPosX + width / 2, height / 2);
		textSize(30);
		text("Level Complete, Congratulations!", cameraPosX + width / 2, height / 2 + 50);
		pop();
		return;
	}
}
else
{
	fill(255,0,0);
	rect(flagpole.x_pos, floorPos_y - 50, 50,50)
}
pop();
}


function draw()
{
	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue

	noStroke();
	fill(0,120,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
	fill(0,180,0);
	rect(0, floorPos_y, width,10);

	checkPlayerDie();
	displayLives();
	stopGame();	
	
	//without assistance
	//camera update
	cameraPosX = gameChar_x - width / 2;
    push();
    translate(-cameraPosX, 0);

	//trees
	drawTrees();

	//clouds
	drawClouds();

	//mountains
	drawMountains();

	//draw the canyon
	drawCanyon(canyon);

	//platforms
	for (var i = 0; i < platforms.length; i++)
	{
		platforms[i].draw()
	}

	//collectable
	for(var i = 0; i < collectables.length; i++)
	{
		drawCollectable(collectables[i]);
		checkCollectable(collectables[i]);
	}

	//checking whether character is over canyon and not jumping
	for ( var i = 0; i < canyon.length; i++)
	{
		drawCanyon(canyon[i]);
		checkCanyon(canyon[i]);
	}
	drawFlagpole();
	checkFlagpole();

	for (var i = 0; i < enemies.length; i++)
		{
			enemies[i].draw();

			var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);

			if (isContact)
			{
				if (lives > 0)
				{
					lives--;
					gameScore = 0;

					for (var j = 0; j < collectables.length; j++)
					{
						collectables[j].isFound = false;
					}
					gameChar_x = width / 2
					gameChar_y = floorPos_y;
					
				} 
					if ( lives <= 0)
					{
					GameOver = true;
					}
			}
		}
		
	//GameOver Screen
	if (GameOver) 
	{
        if(!lose_sound.isPlaying())
        {
			lose_sound.play();
        }
		background(0);
		fill(255);
		textAlign(CENTER, CENTER);
		textSize(60);
		text("Game Over!", gameChar_x , height/2);
		textSize(25);
		text("refresh the game to startover", gameChar_x , height/2 + 40);
		return;
	}

	if (GameOver)
	{
		bgmusic.stop();
	}

	//checking for GameOver condition
	if (gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width && gameChar_y > floorPos_y + 100)
		{
			GameOver = true;
			return;
		}
	//Character
	drawCharacter();
	
	pop();
	//Score Counter
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text("Score: " + gameScore, 20, 30);

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	
	//Gravity
	if(gameChar_y < floorPos_y)
	{
		var isContact = false;
		for (var i = 0; i < platforms.length; i ++)
		{
			if(platforms[i].checkContact(gameChar_x, gameChar_y) == true)
			{
				isContact = true;
				gameChar_y = platforms[i].y
				isFalling = false;
				break;
			}
		}
		if(isContact == false)
		{
		gameChar_y += 2;
		isFalling = true;
		}
	}
	else
	{
		isFalling = false;
	}
	 
	if(flagpole.isReached == false)
	{
		checkFlagpole();
	}
	

	//character movement
	if (isLeft == true)
	{
		gameChar_x -= 5;
	}
	if (isRight == true)
	{
		gameChar_x += 5;
	}
}


//this function is done without assistance
function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	
	if(keyCode == 77) //M key
	{
		if(bgmusic.isPlaying())
		{
			bgmusic.pause();
		} else {
			bgmusic.play();
		}
	}

	if(isFrozen || isPlummeting) 
	{
		return;
	}

	if (keyCode == 65)
		{
			console.log("left key, a")
			isLeft = true;
		}
		else if (keyCode == 68)
		{
			console.log("right key, d")
			isRight = true;
		}
		else if (keyCode == 87 && !isFalling)
		{
			gameChar_y -= 100; //jump
			jumpSound.play();
		}
		
}

//this function is done without assistance
function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
if (isFrozen || isPlummeting) 
{
	return;
}
	
	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	if (keyCode == 65)
	{
		console.log("left key, a")
		isLeft = false;
	}
	else if (keyCode == 68)
	{
		console.log("right key, d")
		isRight = false;
	}	
}

function drawCharacter() {
	//the game character
	if(isLeft && isFalling)
	{
			// add your jumping-left code
		fill(140,250,150); //headcolor
		ellipse(gameChar_x-5, gameChar_y - 50,20,20);
		fill(255,0,0); // body
		rect(gameChar_x-10, gameChar_y - 40,20,30);
		fill(0); // feet
		rect(gameChar_x-11, gameChar_y-10,5,10); //leftfeet
		rect(gameChar_x+0 ,gameChar_y-10,5,10); //rightfeet
	
	}
		else if(isRight && isFalling)
	{
			// add your jumping-right code
		fill(140,250,150); //headcolor
		ellipse(gameChar_x+5, gameChar_y - 50,20,20);
		fill(255,0,0); // body
		rect(gameChar_x-10, gameChar_y - 40,20,30);
		fill(0); // feet
		rect(gameChar_x-2, gameChar_y-10,5,10); //leftfeet
		rect(gameChar_x+7 ,gameChar_y-10,5,10); //rightfeet
	
	}
		else if(isLeft)
	{
			// add your walking left code
		fill(140,250,150); //headcolor
		ellipse(gameChar_x-5, gameChar_y - 42,20,20);
		fill(255,0,0); // body
		rect(gameChar_x-10, gameChar_y - 32,20,30);
		fill(0); // feet
		rect(gameChar_x-12, gameChar_y-9,5,10); //leftfeet
		rect(gameChar_x +2 ,gameChar_y-9,5,10);	//rightfeet
	
	}
		else if(isRight)
	{
			// add your walking right code
		fill(140,250,150); //headcolor
		ellipse(gameChar_x+5, gameChar_y - 42,20,20);
		fill(255,0,0); // body
		rect(gameChar_x-10, gameChar_y - 32,20,30);
		fill(0); // feet
		rect(gameChar_x+2, gameChar_y-9,5,10); //leftfeet
		rect(gameChar_x+10 ,gameChar_y-9,5,10);
	
	}
		else if(isFalling || isPlummeting)
	{
			// add your jumping facing forwards code
		fill(140,250,150); //headcolor
		ellipse(gameChar_x, gameChar_y - 50,20,20);
		fill(255,0,0); // body
		rect(gameChar_x-10, gameChar_y - 40,20,30);
		fill(0); // feet
		rect(gameChar_x-12, gameChar_y-10,5,10); //leftfeet
		rect(gameChar_x +7 ,gameChar_y-10,5,10);	//rightfeet
	
	}
		else
	{
			// add your standing front facing code
		fill(140,250,150); //headcolor
		ellipse(gameChar_x, gameChar_y - 42,20,20);
		fill(255,0,0); // body
		rect(gameChar_x-10, gameChar_y - 32,20,30);
		fill(0); // feet
		rect(gameChar_x-7, gameChar_y-9,5,10); //leftfeet
		rect(gameChar_x +2 ,gameChar_y-9,5,10);	//rightfeet
	}
}
function drawClouds()
	{
		for(var c = 0; c < clouds.length; c++)
			{
				fill(255);
				ellipse(clouds[c].x_pos, clouds[c].y_pos, clouds[c].width, clouds[c].width);
				ellipse(clouds[c].x_pos - 30, clouds[c].y_pos, clouds[c].width - 20, clouds[c].width - 20);
				ellipse(clouds[c].x_pos + 30, clouds[c].y_pos, clouds[c].width - 20, clouds[c].width - 20);
			}
	}

	function drawMountains()
	{
		for (var m = 0; m < mountains.length; m++) 
			{
				fill(125, 83, 32); 
				  triangle(mountains[m].x_pos, mountains[m].y_pos, 
					mountains[m].x_pos + mountains[m].width / 2, mountains[m].y_pos - 150, 
					mountains[m].x_pos + mountains[m].width, mountains[m].y_pos); 
			}
	}
	function drawTrees() {
		for (var i = 0; i < trees_x.length; i++) 
			{
				fill(139, 69, 19); // brown trunk
				rect(trees_x[i] + 30, treePos_y - 100, 15, 100); // smaller tree trunk
				fill(0, 155, 0); // green leaves
				triangle(trees_x[i] - 20, treePos_y - 20, trees_x[i] + 37.5, treePos_y - 100, trees_x[i] + 95, treePos_y - 20); // bottom leaves
				triangle(trees_x[i] - 15, treePos_y - 70, trees_x[i] + 37.5, treePos_y - 130, trees_x[i] + 90, treePos_y - 70); // top leaves
			}		
	}

	function drawCollectable(t_collectables)
	{
		var allcoin_collected  = true;
		if (!t_collectables.isFound)
			{
				fill(255, 215, 0); // golden color
				ellipse(t_collectables.x_pos, t_collectables.y_pos+5, t_collectables.size-25, t_collectables.size-25); // main jewel body
				allcoin_collected = false;
			}
	}
	
	function drawCanyon(t_canyon)
	{
		fill(100, 155, 255); // same as sky color to represent depth
		rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height-floorPos_y);
		
		fill(52,131,235);
		rect(t_canyon.x_pos, floorPos_y+50, t_canyon.width, height-floorPos_y);
	}

	function checkCollectable(t_collectable)
	{
			 //Collectable detect	
			
			 if (!t_collectable.isFound && dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 28 && gameChar_y >= floorPos_y - 15)  //&& dist(gameChar_x, gameChar_y, enemy1.x_pos, enemy1.y_pos) > enemy1.size / 2) 
			{
			 	t_collectable.isFound = true;
			 	gameScore += 1;

            	if(!coincollect_sound.isPlaying())
             	{
                	coincollect_sound.play();
            	}
			}
	}
	
	function checkCanyon(t_canyon)
	{
		if (gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y)
			{
				isPlummeting = true;
				isLeft = false;
				isRight = false;

                if (!fell_in_water.isPlaying())
                {
                    fell_in_water.play();
                }
			}
			if (lives < 0 ) 
			{
				GameOver = true;
			}
				
			//check whether "isPlummeting" is true
			if(isPlummeting)
			{
				gameChar_y += 1;
			}
	}	

	function drawFlagpole()
	{
		push();
		strokeWeight(5);
		stroke(100);
		line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y-250);
		
		noStroke();
		if(flagpole.isReached)
		{
			fill(245,215,66);
			rect(flagpole.x_pos, floorPos_y - 250, 50,50)
		}
		else
		{
			fill(255,0,0);
			rect(flagpole.x_pos, floorPos_y - 50, 50,50)
		}
		pop();
	}

	function checkFlagpole()
	{
		if (dist(gameChar_x, gameChar_y, flagpole.x_pos, floorPos_y) < 20) {
			if (gameScore === collectables.length) {
				flagpole.isReached = true;
				collectables.isFound = true;
				isFrozen = true;

                if(!wingame_sound.isPlaying())
                {
                    wingame_sound.play();
                }
				fill(255);
				return;
			} else {
				text("Go back and collect all the coins!", width/2, height/2);
			}
			
		}
	}
function checkPlayerDie() 
{
	if (gameChar_y > height)
	{
		lives--;
		gameScore = 0;
	 if (lives > 0 )
	{
		startGame();
	} else {
		GameOver = true; 
	}
	}
}

function displayLives()
{
	
	textSize(20);
	textAlign(LEFT,TOP);
	fill(0);
	text("Lives :", 20,10);

    for (var i = 0; i < lives; i++)
	{	 
		fill(255, 0, 0);
        ellipse(100 + i * 30, 20, 20, 20); //DRAW Lives
    }
}

function Enemy(x,y,range)
{
	this.x = x;
	this.y = y;
	this.range = range;

	
	this.currentX = x;
	this.inc = 1;

	this.update = function()
	{
		this.currentX += this.inc;

		if(this.currentX >= this.x + this.range)
		{
			this.inc = -1;
		}
		else if (this.currentX < this.x)
		{
			this.inc = 1;
		}
	}
	this.draw = function()
		{
			this.update()
			//Body 
   			fill(255,70,80); 
   			rect(this.currentX - 10, this.y - 15, 20, 30); // body height

			// Head 
			fill(200, 0, 0); 
			rect(this.currentX - 12, this.y - 23, 24, 20, 5); 

			// Eyes 
			fill(0); 
			rect(this.currentX - 5, this.y - 20, 6, 6); // Left eye
			rect(this.currentX + 5, this.y - 20, 6, 6); // Right eye

			// Mouth 
			fill(0);
			rect(this.currentX - 6, this.y - 10, 12, 3); // 

			// Legs 
			fill(150, 0, 0); 
			rect(this.currentX - 7, this.y+3, 6, 15); // Left leg 
			rect(this.currentX + 2, this.y+3, 6, 15); // Right leg 
		}

		this.checkContact = function(gc_x, gc_y)
		{
			var d = dist(gc_x, gc_y, this.currentX, this.y)

			if (d < 20)
			{
				return true;
			}
			return false;
		}
}

function createPlatforms(x,y, length)
{
	var p = 
	{
		x : x,
		y : y,
		length: length,
		draw: function() 
			{
				fill(0);
				rect(this.x, this.y, this.length, 20);
			},

		checkContact: function(gc_x, gc_y)
		{
			if (gc_x > this.x && gc_x < this.x + this.length || gc_y < this.y && gc_y + 1 >= this.y)
			{
				var d = this.y - gc_y;
				if (d >= 0 && d < 5)
					{
						return true;
					}
			}
			return false;
		}
	}
	return p;
}


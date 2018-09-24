// Game Plan bitchezzzz

// Setup my 4 crystals (value - randomly generated every round between 1-12, color)

// Set up scores and stats (reset score, reset target, update stats)

// When crystal is clicked, add its value to score

// If score = target, you win! If score > target, you lose

// Display appropriate result message every round, and reset

// reset -> new random target, and each crystal has a random value



// Counters
var wins = 0;
var losses = 0;
var target = 0;
var score = 0;
var myRound;



function startGame() {
	var images = ['https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto,fl_lossy/wp-cms/uploads/2017/05/i-2-crystals-collection.jpg',
	 'http://cdn.simplesite.com/i/84/80/285134157457817732/i285134164429863020._szw480h1280_.jpg', 
	 'http://solawakening.com/wp-content/uploads/2011/12/fantasy-crystal-field.jpg', 
	 'https://upload.wikimedia.org/wikipedia/commons/1/14/Quartz%2C_Tibet.jpg'];

	// random value generated for target each round
	target = Math.floor(Math.random() * 21) + 99;
	$("#target").html("Target: " + target);

	// Reset my score
	score = 0;
	// Update HTML elements
	$("#score").html("Score: " + score);
	$("#wins").html("Wins: " + wins);
	$("#losses").html("Losses: " + losses);


	// Create 4 crystals with random values
	for (var i = 0; i < 4; i++) {
		//random value generated for each crystal between 1 and 12
		var random_value = Math.floor(Math.random() * 12) + 1;

		var crystal = $("<div>");
		crystal.attr({
			"class": 'crystal',
			"data-value": random_value
		});
		crystal.css({
			"background-image":"url('" + images[i] + "')",
			"background-size":"cover"
		});

		//crystal.html(random_value);				//remove this at the end
		$("#panel-crystal").append(crystal);
	}

	console.log('New Round!');

	// Highlight on mouseover
	$(".crystal").on("mouseover", function() {
		$(this).css("border", "2px solid #4D9ED1");
		//console.log('haha');
	});

	// Remove highlight on mouseout
	$(".crystal").on("mouseout", function() {
		$(this).css("border", "0px");
		//console.log('haha');
	});

	$(".crystal").on('click', function() {

		playClickSound();

		// get the value of the crystal that was clicked and convert it to an int
		var crystalVal = parseInt($(this).attr("data-value"));

		// add value to the total score
		score += crystalVal;

		// Update score
		$("#score").html("Score: " + score);

		checkResult();
	});
}


function resetGame() {
	// remove crystals
	$("#panel-crystal").empty();
	// restart game
	startGame();
}

// Check to see if player won or lost
function checkResult() {
	if (score > target) {
		playLossSound();
		losses++;
		$("#losses").html("Losses: " + losses);
		console.log("you just lost, time to reset");
		resetGame();
	}
	else if (score === target){
		playWinSound();
		wins++;
		$("#wins").html("Wins: " + wins);
		console.log("you won, time to reset");
		resetGame();
	}
}


function playClickSound() {
	var mySound = document.createElement("audio");
	mySound.src = "assets/audio/ting.mp3";
	mySound.volume = 0.5;
	mySound.autoPlay = false;
	mySound.preLoad = true;

	if (mySound.paused) {
		mySound.play();
	} 
	else {
		mySound.currentTime = 0;
	}
}

function playWinSound() {
	var winSound = document.createElement("audio");
	winSound.src = "assets/audio/tada.mp3";
	winSound.volume = 0.5;
	winSound.autoPlay = false;
	winSound.preLoad = true;

	winSound.play();
}

function playLossSound() {
	var lossSound = document.createElement("audio");
	lossSound.src = "assets/audio/sad.mp3";
	lossSound.volume = 0.4;
	lossSound.autoPlay = false;
	lossSound.preLoad = true;

	lossSound.play();
}



startGame();










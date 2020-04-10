	import * as System from '/br-engine/br-engine.js';
System.set({
	screenWidth: 192,
	screenHeight: 192,
	ticsPerSec: 24,
});

// Player {

//Player sprites
System.loadSprite('sword_right_0', 'sword_right_0.png');
System.loadSprite('sword_left_0', 'sword_left_0.png');
System.loadSprite('sword_right_1', 'sword_right_1.png');
System.loadSprite('sword_left_1', 'sword_left_1.png');
System.loadSprite('sword_right_2', 'sword_right_2.png');
System.loadSprite('sword_left_2', 'sword_left_2.png');
System.loadSprite('sword_walking_right_0', 'sword_walking_right_0.png');
System.loadSprite('sword_walking_left_0', 'sword_walking_left_0.png');
System.loadSprite('sword_falling_right_0', 'sword_falling_right_0.png');
System.loadSprite('sword_falling_left_0', 'sword_falling_left_0.png');
System.loadSprite('sword_jumping_right_0', 'sword_jumping_right_0.png');
System.loadSprite('sword_jumping_left_0', 'sword_jumping_left_0.png');

// Creates the player
let createPlayer = () => {
	let player = {
		pos: System.vec2(),
		speed: System.vec2(),
		dir: 'right',
		jumped: false,
		frame: 0,
	}
	return player;
}

let player = createPlayer();

// Draws the player sprite
let drawPlayer = () => {
	System.drawSprite("sword_" + player.dir + '_' + player.frame, player.pos.x, player.pos.y);
}

//
let frameWork = () => {
	if (player.speed.y > 0) {
		player.frame = 2;
	} else if (player.speed.y < 0) {
		player.frame = 1;
	} else {
		player.frame = 0;
	}
}

// Translate the keyboard keys to player movement
let readKeys = () => {
	if (player.speed.y === 0){
		if (System.key('w')||System.key('up')) {
			player.speed.y += 20;
		}
	}
	if (System.key('a')||System.key('left')) {
		player.speed.x --;
		player.dir = 'left';
	} if (System.key('s')||System.key('down')) {
		player.speed.y --;
	} if (System.key('d')||System.key('right')) {
		player.speed.x ++;
		player.dir = 'right';
	}
}

// Everything involving player position / speed// 
let upadePlayerPos = (friction, maxSpeed, gravity) => {
	player.pos.x += player.speed.x;
	player.pos.y += player.speed.y;
	if (player.pos.y < 0) {
		player.speed.y = 0;
		player.pos.y = 0;
	};
	if (player.speed.x > 0) {
		player.speed.x -= friction;
	};
	if (player.speed.x < 0) {
		player.speed.x += friction;
	};
	if (player.speed.y > 0) {
		player.speed.y -= friction;
	};
	if (player.speed.y < 0) {
		player.speed.y += friction;
	};
	if (player.speed.x < -maxSpeed) {
		player.speed.x = -maxSpeed;
	};
	if (player.speed.x > maxSpeed) {
		player.speed.x = maxSpeed;
	};
	if (player.speed.y < -maxSpeed) {
		player.speed.y = -maxSpeed;
	};
	if (player.speed.y > maxSpeed) {
		player.speed.y = maxSpeed;
	};
};

// Every Player function
let playerWork = () => {
	frameWork();
	readKeys();
	upadePlayerPos(0.25, 2, 3);	
	console.log(player.frame);
}

// } Player

// World(?) {

// } World(?)

// Defines how the game is rendered
System.setRender(() => {
	System.clear();
	drawPlayer();
});

// Defines what happens every tic
System.setTic(() => {
	// Runs every tic
	playerWork();
	System.render();
});

System.ready(() => {
	// Will run when everything is ready (sprites are loaded)
	// Before the tics and renders start
});
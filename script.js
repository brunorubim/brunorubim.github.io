import * as System from '/br-engine/br-engine.js';
System.set({
	screenWidth: 176,
	screenHeight: 176,
	ticsPerSec: 24,
});

// Player {

//Player sprites
System.loadSprite('red', 'red.png');
System.loadSprite('player_rising_right_0', 'player_rising_right_0.png');
System.loadSprite('player_rising_left_0', 'player_rising_left_0.png');
System.loadSprite('player_falling_right_0', 'player_falling_right_0.png');
System.loadSprite('player_falling_left_0', 'player_falling_left_0.png');
System.loadSprite('player_idle_right_0', 'player_idle_right_0.png');
System.loadSprite('player_idle_right_1', 'player_idle_right_1.png');
System.loadSprite('player_idle_left_0', 'player_idle_left_0.png');
System.loadSprite('player_idle_left_1', 'player_idle_left_1.png');
System.loadSprite('player_walking_right_0', 'player_walking_right_0.png');
System.loadSprite('player_walking_right_1', 'player_walking_right_1.png');
System.loadSprite('player_walking_right_2', 'player_walking_right_2.png');
System.loadSprite('player_walking_right_3', 'player_walking_right_3.png');
System.loadSprite('player_walking_right_4', 'player_walking_right_3.png');
System.loadSprite('player_walking_right_5', 'player_walking_right_2.png');
System.loadSprite('player_walking_right_6', 'player_walking_right_1.png');
System.loadSprite('player_walking_right_7', 'player_walking_right_0.png');
System.loadSprite('player_walking_left_0', 'player_walking_left_0.png');
System.loadSprite('player_walking_left_1', 'player_walking_left_1.png');
System.loadSprite('player_walking_left_2', 'player_walking_left_2.png');
System.loadSprite('player_walking_left_3', 'player_walking_left_3.png');
System.loadSprite('player_walking_left_4', 'player_walking_left_3.png');
System.loadSprite('player_walking_left_5', 'player_walking_left_2.png');
System.loadSprite('player_walking_left_6', 'player_walking_left_1.png');
System.loadSprite('player_walking_left_7', 'player_walking_left_0.png');
System.loadSprite('block', 'block.png');
System.loadSprite('room', 'room.png');

// Creates the player
let createPlayer = () => {
	let player = {
		pos: System.vec2(64, 64),
		speed: System.vec2(),
		fakeSpeed: System.vec2(),
		state: 'idle',
		dir: 'right',
		atTheGround: true,
		// rising: true,
		frame: 0,
		tic: 0,
	}
	return player;
}

let player = createPlayer();

let playerAnimation = () => {
	if (player.speed.x === 0 && player.atTheGround) {
		player.state = 'idle';
	}
	if (player.speed.y > 0 && !player.atTheGround) {
		player.state = 'rising';
	}
	if (player.speed.y < 0 && !player.atTheGround) {
		player.state = 'falling';
	}
	if (player.state === 'walking'){
		player.frame = Math.floor(player.tic/3)%8;
	} else if (player.state === 'idle'){
		player.frame = Math.floor(player.tic/12)%2;
	} else if (player.state === 'rising') {
		player.frame = 0;
	} else if (player.state === 'falling') {
		player.frame = 0;
	}
	if (player.tic > 24) {
		player.tic = 0;
	}
	player.tic ++;
	console.log(player.state, player.dir);
};

// Draws the player sprite
let drawPlayer = () => {
	System.drawSprite("player" + '_' + player.state + '_' + player.dir + '_' + player.frame, player.pos.x, player.pos.y);
}

// Translate the keyboard keys to player movement
let readKeys = () => {
	if (player.atTheGround) {
		if (System.key('w')||System.key('up')) {
			player.speed.y += 10;
			player.atTheGround = false;
		}
	}
	if (System.key('a')||System.key('left')) {
		player.speed.x --;
		player.state = 'walking';
		player.dir = 'left';
	} if (System.key('s')||System.key('down')) {
		player.speed.y --;
	} if (System.key('d')||System.key('right')) {
		player.speed.x ++;
		player.state = 'walking';
		player.dir = 'right';
	}
}

let playerJump = () => {
}

// Updates the player speed with gravity
let updateGravity = (gravity) => {
	player.speed.y -= gravity;
}

// Adds colision to thewalls
let wallColision = () => {
	if (player.pos.y <= 0) {
		player.pos.y = 0;
		player.speed.y = 0;
		player.atTheGround = true
	};
	if (player.pos.y >= 176) {
		player.pos.y = 176;
		player.speed.y = 0;
	};
	if (player.pos.x <= 0) {
		player.pos.x = 0;
		player.speed.x = 0;
	};
	if (player.pos.x >= 160) {
		player.pos.x = 160;
		player.speed.x = 0;
	};
};


// Applys friction ma duuude 
let applyFriction = (speed, friction) => {
	let val = speed.x;
	let abs = Math.abs(val);
	if (abs < friction) {
		speed.x = 0;
	} else {
		speed.x = (abs - friction)*(val/abs);
	}
}

let updatePhysics = (friction, maxSpeed) => {
	if (player.speed.x < -maxSpeed) {
		player.speed.x = -maxSpeed;
	};
	if (player.speed.x > maxSpeed) {
		player.speed.x = maxSpeed;
	};
	// if (player.speed.y < -maxSpeed) {
	// 	player.speed.y = -maxSpeed;
	// };
	// if (player.speed.y > maxSpeed) {
	// 	player.speed.y = maxSpeed;
	// };
	applyFriction(player.speed, friction);
	updateGravity(1.25);
	player.pos.x += player.speed.x;
	player.pos.y += player.speed.y;
};

// Every Player function
let playerTic = () => {
	updatePhysics(0.5, 5);
	playerAnimation();
}

// } Player

// Block {

let blocks = [];

class Block {
	constructor(x, y) {
		this.pos = System.vec2(x, y);
	}
};

let addBlock = (x, y) => {
	let block = new Block(x, y);
	blocks.push(block);
}

let drawBlock = (x, y) => {
	System.drawSprite('block', (x - 1) * 16, (y - 1) * 16);
}

let drawAllBlocks = () => {
	for (let i = 0; i < blocks.length; i++) {
		let block = blocks[i];
		drawBlock(block.pos.x, block.pos.y);
	}
}

// } Block

// Room {

let loadRoom = () => {
	addBlock(32, 32);
}

let drawRoom = () => {
	// System.drawSprite('room', 0, 0);
}

// } Room

// Defines how the game is rendered
System.setRender(() => {
	System.clear();
	drawRoom();
	drawPlayer();
	drawAllBlocks();
});

// Defines what happens every tic
System.setTic(() => {
	// Runs every tic
	readKeys();
	playerTic();
	wallColision();
	addBlock();
	System.render();
});

System.ready(() => {
	// Will run when everything is ready (sprites are loaded)
	// Before the tics and renders start
});
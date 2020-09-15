import * as System from '/br-engine/br-engine.js';
System.set({
	screenWidth: 272,
	screenHeight: 240,
	ticsPerSec: 24,
});

// Player {

//Player sprites
System.loadSprite('player', 'player.png');

// Creates the player
let createPlayer = () => {
	let player = {
		pos: System.vec2(128, 112),
		speed: System.vec2(0, 0),
	}
	return player;
}

let player = createPlayer();

//Teleports the player to the other wall

let walls = (l, r, u, d) => {
	if (player.pos.x < 0) {
		if (!l){
			player.pos.x = 256
			room.x -= 1
		} else {
			player.pos.x = 0
			player.speed.x = 0
		}
	}
	if (player.pos.x > 256) {
		if (!r){
			player.pos.x = 0
			room.x += 1
		} else {
			player.pos.x = 256
			player.speed.x = 0
		}
	}
	if (player.pos.y > 224) {
		if (!u){
			player.pos.y = 0
			room.y += 1
		} else {
			player.pos.y = 224
			player.speed.y = 0
		}
	}
	if (player.pos.y < 0) {
		if (!d){
			player.pos.y = 224
			room.y -= 1
		} else {
			player.pos.y = 0
			player.speed.y = 0
		}
	}
}

// Draws the player sprite
let drawPlayer = () => {
	System.drawSprite("player", player.pos.x, player.pos.y);
}

// Physics os the Player
let playerPhysics = () => {
	player.pos.x += player.speed.x;
	player.pos.y += player.speed.y;
}

// Friction
let friction = (x) => {
	if (player.speed.x > 0) {
		player.speed.x -= x
	}
	if (player.speed.x < 0) {
		player.speed.x += x
	}
	if (player.speed.y > 0) {
		player.speed.y -= x
	}
	if (player.speed.y < 0) {
		player.speed.y += x
	}
}

// Translate the keyboard keys to player movement
let readKeys = (x) => {
	if (System.key('w')||System.key('up')) {
		player.speed.y += x;
	} if (System.key('a')||System.key('left')) {
		player.speed.x -= x;
	} if (System.key('s')||System.key('down')) {
		player.speed.y -= x;
	} if (System.key('d')||System.key('right')) {
		player.speed.x += x;
	}
}


let playerWorks = () => {
	playerPhysics();
	friction(0.5);
}

// } Player

// Room {

let room = System.vec2(0, 0);

let roomWorks = () => {
	if (room.x == 0 && room.y == 0) {
		walls();
	}
	if (room.x == -1 && room.y == 0) {
		walls(1, 0, 0, 0);
	}
	if (room.x == 1 && room.y == 0) {
		walls(0, 1, 0, 0);
	}
	if (room.x == 0 && room.y == -1) {
		walls(0, 0, 0, 1);
	}
	if (room.x == 0 && room.y == 1) {
		walls(0, 0, 1, 0);
	}
	if (room.x == -1 && room.y == -1) {
		walls(1, 0, 0, -1);
	}
	if (room.x == 1 && room.y == 1) {
		walls(0, 1, 1, 0);
	}
	if (room.x == 1 && room.y == -1) {
		walls(0, 1, 0, 1);
	}
	if (room.x == -1 && room.y == 1) {
		walls(1, 0, 1, 0);
	}
	// console.log(room)
}

//} Room

// Colision {

// } Colision

// Background {

// Background Sprites
System.loadSprite('grass', 'grass.png');

let drawBackground = () => {
	System.drawSprite('grass', 0, 0);
}

//} Background

// Defines how the game is rendered
System.setRender(() => {
	System.clear();
	drawBackground();
	drawPlayer();
});

// Defines what happens every tic
System.setTic(() => {
	// Runs every tic
	readKeys(3);
	playerWorks();
	roomWorks();
	System.render();
});

System.ready(() => {
	// Will run when everything is ready (sprites are loaded)
	// Before the tics and renders start
});
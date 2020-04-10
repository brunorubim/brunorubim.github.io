import * as System from '/br-engine/br-engine.js';
System.set({
	screenWidth: 192,
	screenHeight: 196,
	ticsPerSec: 24,
});

//game

let game = {
	paused: false,
}

//josh

class Josh {
	
}

let josh = {
	pos: System.vec2((12 - 1) * 16, (6 - 1) * 16),
	speed: System.vec2(0, 0),
	state: 'down',
	deltaY: 6,
}

let esc = 'no';
let pause = 'unpaused';

let readKeys = (n) => {
	if (!game.paused){
		if (josh.pos.x % 16 === 0 && josh.pos.y % 16 === 0) {
			josh.speed.x = 0;
			josh.speed.y = 0;
			if (System.key('a')||System.key('left')) {
				josh.speed.x = -n;
				josh.state = 'left'
			}
			if (System.key('d')||System.key('right')) {
				josh.speed.x = n;
				josh.state = 'right'
			}
			if (System.key('w')||System.key('up')) {
				josh.speed.y = n;
				josh.state = 'up'
			}
			if (System.key('s')||System.key('down')) {
				josh.speed.y = -n;
				josh.state = 'down'
			}
		}
	}
	if (System.key('escape')) {
		if (esc === 'no') {
			esc ='yes';
			if (game.paused) {
				game.paused = false;
				pause = 'unpaused'
			} else {
				game.paused = true;
				pause = 'paused'
			}
		}
	} else {
		esc = 'no';
	}
}

let drawJosh = () => {
	System.drawSprite('josh_' + josh.state, josh.pos.x, josh.pos.y + josh.deltaY);
}
let updatePos = () => {
	if (!game.paused) {
		// x+ y+
		if (josh.speed.x > 0 && josh.speed.y > 0 && checkColision(josh.pos.x + 16, josh.pos.y + 16) && checkColision(josh.pos.x + 16, josh.pos.y)) {
			josh.speed.x = 0;
		}
		if (josh.speed.x > 0 && josh.speed.y > 0 && checkColision(josh.pos.x + 16, josh.pos.y + 16) && checkColision(josh.pos.x, josh.pos.y + 16)) {
			josh.speed.y = 0;
		}
		if (josh.speed.x > 0 && josh.speed.y > 0 && checkColision(josh.pos.x + 16, josh.pos.y + 16)) {
			josh.speed.x = 0;
			josh.speed.y = 0;
		}
		// x- y+
		if (josh.speed.x < 0 && josh.speed.y > 0 && checkColision(josh.pos.x - 16, josh.pos.y + 16) && checkColision(josh.pos.x - 16, josh.pos.y)) {
			josh.speed.x = 0;
		}
		if (josh.speed.x < 0 && josh.speed.y > 0 && checkColision(josh.pos.x - 16, josh.pos.y + 16) && checkColision(josh.pos.x, josh.pos.y + 16)) {
			josh.speed.y = 0;
		}
		if (josh.speed.x < 0 && josh.speed.y > 0 && checkColision(josh.pos.x - 16, josh.pos.y + 16)) {
			josh.speed.x = 0;
			josh.speed.y = 0;
		}
		// x- y-
		if (josh.speed.x < 0 && josh.speed.y < 0 && checkColision(josh.pos.x - 16, josh.pos.y - 16) && checkColision(josh.pos.x - 16, josh.pos.y)) {
			josh.speed.x = 0;
		}
		if (josh.speed.x < 0 && josh.speed.y < 0 && checkColision(josh.pos.x - 16, josh.pos.y - 16) && checkColision(josh.pos.x, josh.pos.y - 16)) {
			josh.speed.y = 0;
		}
		if (josh.speed.x < 0 && josh.speed.y < 0 && checkColision(josh.pos.x - 16, josh.pos.y - 16)) {
			josh.speed.x = 0;
			josh.speed.y = 0;
		}
		// x+ y-
		if (josh.speed.x > 0 && josh.speed.y < 0 && checkColision(josh.pos.x + 16, josh.pos.y - 16) && checkColision(josh.pos.x + 16, josh.pos.y)) {
			josh.speed.x = 0;
		}
		if (josh.speed.x > 0 && josh.speed.y < 0 && checkColision(josh.pos.x + 16, josh.pos.y - 16) && checkColision(josh.pos.x, josh.pos.y - 16)) {
			josh.speed.y = 0;
		}
		if (josh.speed.x > 0 && josh.speed.y < 0 && checkColision(josh.pos.x + 16, josh.pos.y - 16)) {
			josh.speed.x = 0;
			josh.speed.y = 0;
		}
		if (josh.speed.x > 0) {
			if (checkColision(josh.pos.x + 16, josh.pos.y)) {
				josh.speed.x = 0;
			}
		}
		if (josh.speed.y > 0) {
			if (checkColision(josh.pos.x, josh.pos.y + 16)) {
				josh.speed.y = 0;
			}
		}
		if (josh.speed.x < 0) {
			if (checkColision(josh.pos.x - 16, josh.pos.y)) {
				josh.speed.x = 0;
			}
		}
		if (josh.speed.y < 0) {
			if (checkColision(josh.pos.x, josh.pos.y - 16)) {
				josh.speed.y = 0;
			}
		}
		josh.pos.add(josh.speed);
	}
}

//room


let clearRoom = () => {
	colisionMap = {};
}

let roomName = 'black';
let roomX = 0;
let roomY = 0;
let room = '' + roomName + '_' + roomX + '_' + roomY;

let drawRoom = () => {
	room = '' + roomName + '_' + roomX + '_' + roomY;
	drawAllSensors();
	drawAllBoxes();
	drawAllBlocks();
	drawAllDoors();
	if (room === 'black_0_0') {
	}
	if (room === 'test_0_0') {
	}
}

let updateRoom = () => {
	if (josh.pos.x > 191) {
		josh.pos.x = 1	
		roomX ++;
		clearRoom();
	}
	if (josh.pos.x < 0) {
		josh.pos.x = 191
		roomX ++;
		clearRoom();
	}
}

let loadRoom = () => {
	clearRoom();
	if (room === 'black_0_0') {
		addBlock(1, 1, 'wall_l_0');
		addBlock(2, 1, 'wall_hor');
		addBlock(3, 1, 'wall_hor');
		addBlock(4, 1, 'wall_hor');
		addBlock(5, 1, 'wall_l_3');
		addBlock(10, 1, 'wall_l_0');
		addBlock(11, 1, 'wall_hor');
		addBlock(12, 1, 'wall_l_3');
		addBlock(1, 2, 'wall_c_2');
		addBlock(5, 2, 'wall_l_1');
		addBlock(6, 2, 'w');
		addBlock(7, 2, 'wall_l_3');
		addBlock(10, 2, 'wall_ver');
		addSensor(11, 2);
		addBlock(12, 2, 'wall_ver');
		addDoor(1, 3, sensors[0]);
		addBlock(7, 3, 'wall_ver');
		addBlock(8, 3, 'wall_l_0');
		addBlock(9, 3, 'wall_hor');
		addBlock(10, 3, 'wall_l_2');
		addBlock(12, 3, 'wall_ver');
		addBlock(1, 4, 'wall_c_0');
		addBlock(5, 4, 'wall_c_0');
		addBlock(7, 4, 'wall_ver');
		addBlock(8, 4, 'wall_ver');
		addBox(10, 4);
		addBlock(12, 4, 'wall_ver');
		addBlock(1, 5, 'wall_l_1');
		addBlock(2, 5, 'wall_hor');
		addBlock(3, 5, 'd');
		addBlock(4, 5, 'wall_hor');
		addBlock(5, 5, 'wall_l_2');
		addBlock(7, 5, 'wall_ver');
		addBlock(8, 5, 'wall_ver');
		addBlock(10, 5, 'wall_c_0');
		addBlock(12, 5, 'wall_ver');
		addBlock(2, 6, 'wall_ver');
		addBlock(7, 6, 'wall_l_1');
		addBlock(8, 6, 'wall_ver');
		addBlock(2, 7, 'wall_ver');
		addBlock(4, 7, 'wall_l_0');
		addBlock(5, 7, 'wall_hor');
		addBlock(6, 7, 'a');
		addBlock(7, 7, 'wall_l_2');
		addBlock(8, 7, 'wall_ver');
		addBlock(10, 7, 'wall_l_0');
		addBlock(11, 7, 'wall_hor');
		addBlock(12, 7, 'wall_hor');
		addBlock(2, 8, 'wall_ver');
		addBlock(4, 8, 'wall_ver');
		addBlock(8, 8, 'wall_ver');
		addBlock(10, 8, 'wall_ver');
		addBlock(2, 9, 'wall_ver');
		addBlock(4, 9, 'wall_ver');
		addBlock(8, 9, 'wall_ver');
		addBlock(10, 9, 'wall_ver');
		addBlock(2, 10, 'wall_ver');
		addBlock(4, 10, 'wall_l_1');
		addBlock(5, 10, 'wall_hor');
		addBlock(6, 10, 'wall_hor');
		addBlock(7, 10, 'wall_hor');
		addBlock(8, 10, 'wall_l_2');
		addBlock(10, 10, 'wall_ver');
		addBlock(2, 11, 'wall_ver');
		addBlock(10, 11, 'wall_ver');
		addBlock(10, 12, 'wall_l_2');
		addBlock(2, 12, 'wall_l_1');
		addBlock(3, 12, 'wall_hor');
		addBlock(4, 12, 'wall_hor');
		addBlock(5, 12, 'wall_hor');
		addBlock(6, 12, 'wall_hor');
		addBlock(7, 12, 'wall_hor');
		addBlock(8, 12, 'wall_hor');
		addBlock(9, 12, 's');
	}
	if (room === 'test_0') {
		addSensor(3, 6);
		addSensor(4, 8);
		// addFan(9, 4, 'left', 3, sensors[0]);
		// addFan(9, 6, 'down', 3, sensors[0]);
	}
}

//block


let blocks = [];

class Block {
	constructor(x, y, type) {
		this.known = true;
		this.pos = System.vec2(x, y);
		this.type = type;
	}
}

let addBlock = (x, y, type) => {
	let block = new Block(x, y, type);
	blocks.push(block);
	addColision(x, y);
}

let drawBlock = (x, y, block) => {
	System.drawSprite(block, (x - 1) * 16, (y - 1) * 16);
}

let drawAllBlocks = () => {
	for (let i = 0; i < blocks.length; i++) {
		let block = blocks[i];
		drawBlock(block.pos.x, block.pos.y, block.type);
	}
}


let drawBackground = () => {
	System.drawSprite('background_' + roomName, 0, 0);
	// System.drawSprite('' + roomX, 0, 208);
}

//colision

const colisionOutline = () => {
	for (let pos in colisionMap) {
		let [x, y] = pos.split(',');
		System.drawRect(x, y, 16, 16, `#a00`);
	} 
}

let colisionMap = {};

let addColision = (x, y) => {
	let pos = (x - 1) * 16 + ',' + (y - 1) * 16;
	colisionMap[pos] = true;
}

let removeColision = (x, y) => {
	let pos = (x - 1) * 16 + ',' + (y - 1) * 16;
	colisionMap[pos] = false;
}

let checkColision = (x, y) => {
	let pos = x + ',' + y;
	return colisionMap[pos] === true;
};

//door

let doors = [];

class Door {
	constructor(x, y, sensor) {
		this.pos = System.vec2(x, y);
		this.sensor = sensor;
		this.state = 'closed';
	}
	update() {
		if (this.sensor.activated) {
			this.state = 'open';
			removeColision(this.pos.x, this.pos.y);
		} else {
			this.state = 'closed'; 
			addColision(this.pos.x, this.pos.y);
		}
	}
}

let addDoor = (x, y, sensor) => {
	let door = new Door(x, y, sensor);
	doors.push(door);
	return door;
}

let drawDoor = (door) => {
	let {x, y} = door.pos;
	let {state} = door;
	let name = 'door_' + state;
	System.drawSprite(name, (x - 1) * 16, (y - 1) * 16);
}

let drawAllDoors = () => {
	for (let i = 0; i < doors.length; i++) {
		let door = doors[i];
		drawDoor(door);
	}
}

let updateDoors = () => {
	for (let i=0; i<doors.length; i++) {
		doors[i].update();
	}
}

//box


let boxes = []

class Box {
	constructor (x, y) {
	this.pos = System.vec2(x, y)	
	}
}

let addBox = (x, y) => {
	let box = new Box (x, y);
	addColision(x, y);
	boxes.push(box);
}

let drawBox = (box) => {
	let {x, y} = box.pos;
	System.drawSprite('box', (x - 1) * 16, (y - 1) * 16);	
}

let drawAllBoxes = () => {
	for (let i = 0; i < boxes.length; i++) {
		let box = boxes[i];
		drawBox(box);
	}	
}

//sensor

let sensors = [];

class Sensor {
	constructor(x, y) {
		this.known = true;
		this.activated = false;
		this.pos = System.vec2(x, y);
	}
}

let addSensor = (x, y) => {
	let sensor = new Sensor(x, y);
	sensors.push(sensor);
}

let drawSensor = (sensor) => {
	let {x, y} = sensor.pos;
	System.drawSprite('sensor_' + (sensor.activated? 'on': 'off'), (x - 1) * 16, (y - 1) * 16);
}

let drawAllSensors = () => {
	for (let i = 0; i < sensors.length; i++) {
		let sensor = sensors[i];
		drawSensor(sensor);
	}	
}

let checkSensors = () => {
	for (let i = 0; i < sensors.length; i++) {
		let sensor = sensors[i];
		let x2 = (sensor.pos.x - 1) * 16;
		let y2 = (sensor.pos.y - 1) * 16;
		if (josh.pos.x <= x2 + 7 && josh.pos.x >= x2 - 7 && josh.pos.y <= y2 + 7 && josh.pos.y >= y2 - 7) {
			sensor.activated = true;
			// josh.deltaY = 5;
		} else {
			sensor.activated = false;
		}
	}
}

//scroll


let scrolls = []

class Scroll {
	constructor(x, y, subject) {
		this.pos = System.vec2(x, y);
		this.subject = subject
	}
	learn() {
		
	}
}

//render

let render = []

System.loadSprite('a', 'a.png');
System.loadSprite('background_black', 'background_black.png');
System.loadSprite('box', 'box.png');
System.loadSprite('d', 'd.png');
System.loadSprite('door_closed', 'door_closed.png');
System.loadSprite('door_open', 'door_open.png');
System.loadSprite('josh_down', 'josh_down.png');
System.loadSprite('josh_left', 'josh_left.png');
System.loadSprite('josh_right', 'josh_right.png');
System.loadSprite('josh_up', 'josh_up.png');
System.loadSprite('paused', 'paused.png');
System.loadSprite('s', 's.png');
System.loadSprite('scroll', 'scroll.png');
System.loadSprite('sensor_off', 'sensor_off.png');
System.loadSprite('sensor_on', 'sensor_on.png');
System.loadSprite('w', 'w.png');
System.loadSprite('wall_ver', 'wall_ver.png');
System.loadSprite('wall_hor', 'wall_hor.png');
System.loadSprite('wall_t_0', 'wall_t_0.png');
System.loadSprite('wall_t_1', 'wall_t_1.png');
System.loadSprite('wall_t_2', 'wall_t_2.png');
System.loadSprite('wall_t_3', 'wall_t_3.png');
System.loadSprite('wall_l_0', 'wall_l_0.png');
System.loadSprite('wall_l_1', 'wall_l_1.png');
System.loadSprite('wall_l_2', 'wall_l_2.png');
System.loadSprite('wall_l_3', 'wall_l_3.png');
System.loadSprite('wall_c_0', 'wall_c_0.png');
System.loadSprite('wall_c_1', 'wall_c_1.png');
System.loadSprite('wall_c_2', 'wall_c_2.png');
System.loadSprite('wall_c_3', 'wall_c_3.png');

//end

// Defines how the game is rendered
System.setRender(() => {
	System.clear();
	drawBackground();
	// colisionOutline();
	drawRoom();
	drawJosh();
	if (pause === 'paused') {
		System.drawSprite('paused', 0, 0);
	}
});

// Defines what happens every tic
System.setTic(() => {
	// Runs every tic
	updatePos();
	checkColision();
	readKeys(1);
	updatePos();
	checkSensors();
	updateDoors();
	updateRoom();
	console.log(josh.pos)
	System.render();
});

System.ready(() => {
	// Will run when everything is ready (sprites are loaded)
	// Before the tics and renders start
	loadRoom();
});
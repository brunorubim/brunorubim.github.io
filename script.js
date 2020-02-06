import * as System from '/br-engine/br-engine.js';
System.set({
	screenWidth: 192,
	screenHeight: 192,
	ticsPerSec: 24,
});

System.loadSprite('background_test', 'background_test.png');
System.loadSprite('background_black', 'background_black.png');
System.loadSprite('0', '0.png');
System.loadSprite('1', '1.png');

//josh

let josh = {
	pos: System.vec2((6 - 1) * 16, (7 - 1) * 16),
	speed: System.vec2(0, 0),
	state: 'down',
	deltaY: 4,
}

System.loadSprite('josh_up', 'josh_up.png');
System.loadSprite('josh_down', 'josh_down.png');
System.loadSprite('josh_right', 'josh_right.png');
System.loadSprite('josh_left', 'josh_left.png');

let readKeys = (n) => {
	if (josh.pos.x % 16 === 0 && josh.pos.y % 16 === 0) {
		josh.speed.x = 0;
		josh.speed.y = 0;
		if (System.key('w')||System.key('up')) {
			josh.speed.y = n;
			josh.state = 'up'
		}
		if (System.key('a')||System.key('left')) {
			josh.speed.x = -n;
			josh.state = 'left'
		}
		if (System.key('s')||System.key('down')) {
			josh.speed.y = -n;
			josh.state = 'down'
		}
		if (System.key('d')||System.key('right')) {
			josh.speed.x = n;
			josh.state = 'right'
		}
	}
}

let drawJosh = () => {
	System.drawSprite('josh_' + josh.state, josh.pos.x, josh.pos.y + josh.deltaY);
}
let updatePos = () => {

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

//room

let clearRoom = () => {
	colisionMap.length = 0;
}

let roomName = 'test';
let roomNumber = 0;
let room = '' + roomName + '_' + roomNumber;

let drawRoom = () => {
	if (room === 'black_0') {
		drawAllBlocks();
	}
	if (room === 'test_0') {
		drawAllBlocks();
		drawAllButtons();
		drawAllFans();
		drawWire(6, 4, 'l', 0);
		drawWire(7, 4, 'hor', 0);
		drawWire(8, 4, 'end', 2);
		drawWire(6, 5, 'ver', 0);
		drawWire(4, 6, 'end', 0);
		drawWire(5, 6, 'hor', 0);
		drawWire(7, 6, 'hor', 0);
		drawWire(6, 6, 't', 0);
		drawWire(8, 6, 'end', 2);
	}
}

let loadRoom = () => {
	clearRoom();
	if (room === 'black_0') {
		addBlock(6, 5, 's');
		addBlock(4, 7, 'a');
		addBlock(8, 7, 'd');
		addBlock(6, 9, 'w');
		addBlock(1, 1, 'wall_3');
	}
	if (room === 'test_1') {
		addButton(3, 6);
		addButton(4, 8);
		addFan(9, 4, 3, buttons[0]);
		addFan(9, 6, 3, buttons[0]);
	}
}

//block

System.loadSprite('w', 'w.png');
System.loadSprite('a', 'a.png');
System.loadSprite('s', 's.png');
System.loadSprite('d', 'd.png');
System.loadSprite('wall_1', 'wall_1.png');
System.loadSprite('wall_2', 'wall_2.png');
System.loadSprite('wall_3', 'wall_3.png');
System.loadSprite('wall_4', 'wall_4.png');
System.loadSprite('wall_5', 'wall_5.png');
System.loadSprite('wall_6', 'wall_6.png');

let blocks = [];

class Block {
	constructor(x, y, type) {
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
	console.log(blocks);
}


let drawBackground = () => {
	System.drawSprite('background_' + roomName, 0, 0);
	// System.drawSprite('' + roomNumber, 0, 208);
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


let checkColision = (x, y) => {
	let pos = x + ',' + y;
	return colisionMap[pos] === true;
};

//goal

System.loadSprite('goal', 'goal.png');

let addGoal = (x, y) => {
	let win = false;	
	if (josh.pos.x === (x - 1) * 16 && josh.pos.y === (y - 1) * 16){
		win = true;
		roomNumber ++;
	}
}

//boxes

let addBox = (x, y) => {
}

//wires

System.loadSprite('wire_ver_0', 'wire_ver.png');
System.loadSprite('wire_hor_0', 'wire_hor.png');
System.loadSprite('wire_end_0', 'wire_end_0.png');
System.loadSprite('wire_end_1', 'wire_end_1.png');
System.loadSprite('wire_end_2', 'wire_end_2.png');
System.loadSprite('wire_end_3', 'wire_end_3.png');
System.loadSprite('wire_t_0', 'wire_t_0.png');
System.loadSprite('wire_t_1', 'wire_t_1.png');
System.loadSprite('wire_t_2', 'wire_t_2.png');
System.loadSprite('wire_t_3', 'wire_t_3.png');
System.loadSprite('wire_l_0', 'wire_l_0.png');
System.loadSprite('wire_l_1', 'wire_l_1.png');
System.loadSprite('wire_l_2', 'wire_l_2.png');
System.loadSprite('wire_l_3', 'wire_l_3.png');

let wires = [];

class Wire {
	constructor(x, y, type, rptation) {
		this.type = type;
		this.rotation = rotation;
		this.pos = System.vec2(x, y);
	}
}

let drawWire = (x, y, type, rotation) => {
	x = (x - 1) * 16;
	y = (y - 1) * 16;
	System.drawSprite('wire_' + type + '_' + rotation, x, y)
}

//button

let buttons = [];

System.loadSprite('button_off', 'button_off.png');
System.loadSprite('button_on', 'button_on.png');

let addButton = (x, y) => {
	let button = {
		pressed: false,
		pos: System.vec2(x, y),
	};
	buttons.push(button);
}

let drawButton = (button) => {
	let {x, y} = button.pos;
	System.drawSprite('button_' + (button.pressed? 'on': 'off'), (x - 1) * 16, (y - 1) * 16);
}

let drawAllButtons = () => {
	for (let i = 0; i < buttons.length; i++) {
		let button = buttons[i];
		drawButton(button);
	}
}

let checkButtons = () => {
	josh.deltaY = 4;
	for (let i = 0; i < buttons.length; i++) {
		let button = buttons[i];
		let x2 = (button.pos.x - 1) * 16;
		let y2 = (button.pos.y - 1) * 16;
		if (josh.pos.x <= x2 + 7 && josh.pos.x >= x2 - 7 && josh.pos.y <= y2 + 7 && josh.pos.y >= y2 - 7) {
			button.pressed = true;
			josh.deltaY = 5;
		} else {
			button.pressed = false;
		}
	}
}

//fans

System.loadSprite('fan_0', 'fan_0.png');
System.loadSprite('fan_1', 'fan_1.png');
System.loadSprite('fan_2', 'fan_1.png');
System.loadSprite('fan_3', 'fan_1.png');

let fans = []

class Fan {
	constructor(x, y, length, button){
		this.on = false;
		this.pos = System.vec2(x, y);
		this.button = button;
		this.rotation = 0;
		this.length = length;
	}
	spin() {
		this.rotation ++;
		if (this.rotation > 1) {
			this.rotation = 0;
		}
	}
	update() {
		this.on = this.button.pressed;
		if (this.on) {
			this.spin();
		}
	}
}

let addFan = (x, y, length, button) => {
	let fan = new Fan(x, y, length, button);
	fans.push(fan);
	addColision(x, y);
	return fan;
}

let drawFan = (fan) => {
	let {x, y} = fan.pos;
	let {rotation} = fan;
	let name = 'fan_' + rotation;
	System.drawSprite(name, (x - 1) * 16, (y - 1) * 16);
}

let updateFans = () => {
	for (let i=0; i<fans.length; i++) {
		fans[i].update();
	}
}

let drawAllFans = () => {
	for (let i = 0; i < fans.length; i++) {
		drawFan(fans[i]);
	}
}

//end

// Defines how the game is rendered
System.setRender(() => {
	System.clear();
	drawBackground();
	// colisionOutline();
	drawRoom();
	drawJosh();
});

// Defines what happens every tic
System.setTic(() => {
	// Runs every tic
	updatePos();
	checkColision();
	readKeys(1);
	updatePos();
	checkButtons();
	updateFans();
	System.render();
});

System.ready(() => {
	// Will run when everything is ready (sprites are loaded)
	// Before the tics and renders start
	loadRoom();
});
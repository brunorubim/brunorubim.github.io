import * as System from '/br-engine/br-engine.js';
System.set({
	screenWidth: 192,
	screenHeight: 192,
	ticsPerSec: 24,
});

System.loadSprite('background_test', 'background_test.png');
System.loadSprite('josh_up', 'josh_up.png');
System.loadSprite('josh_down', 'josh_down.png');
System.loadSprite('josh_right', 'josh_right.png');
System.loadSprite('josh_left', 'josh_left.png');
System.loadSprite('0', '0.png');
System.loadSprite('1', '1.png');
System.loadSprite('goal', 'goal.png');
System.loadSprite('wall_1', 'wall_1.png');
System.loadSprite('wall_2', 'wall_2.png');
System.loadSprite('wall_3', 'wall_3.png');
System.loadSprite('wall_4', 'wall_4.png');
System.loadSprite('wall_5', 'wall_5.png');
System.loadSprite('wall_6', 'wall_6.png');
System.loadSprite('button_off', 'button_off.png');
System.loadSprite('button_on', 'button_on.png');
System.loadSprite('fan_0', 'fan_0.png');
System.loadSprite('fan_1', 'fan_0.png');
System.loadSprite('fan_2', 'fan_1.png');
System.loadSprite('fan_3', 'fan_1.png');
System.loadSprite('wire_ver_0', 'wire_ver.png');
System.loadSprite('wire_hor_0', 'wire_hor.png');
System.loadSprite('wire_end_0', 'wire_end_0.png');
System.loadSprite('wire_end_1', 'wire_end_1.png');
System.loadSprite('wire_end_2', 'wire_end_2.png');
System.loadSprite('wire_end_3', 'wire_end_3.png');

let josh = {
	pos: System.vec2((6 - 1) * 16, (7 - 1) * 16),
	speed: System.vec2(0, 0),
	state: 'down',
	deltaY: 4,
}

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

let roomName = 'test';
let roomNumber = '1';
let room = '' + roomName + '_' + roomNumber;

let drawBackground = () => {
	System.drawSprite('background_' + roomName, 0, 0);
	// System.drawSprite('' + roomNumber, 0, 208);
}

let colisionMap = {};

let addGoal = (x, y) => {
	let win = false;
	if (josh.pos.x === (x - 1) * 16 && josh.pos.y === (y - 1) * 16){
		win === true;
		roomNumber ++;
	}
}

let addBox = (x, y) => {
	if (josh.pos.x === (x - 1) * 16 && josh.pos.y === (y - 1) * 16){
	}
}

let drawWire = (x, y, type, number) => {
	System.drawSprite('wire_' + type + '_' + number, (x - 1) * 16, (y - 1) * 16);
}

let button = 'off';

let addButton = (x, y) => {
	if (josh.pos.x === (x - 1) * 16 && josh.pos.y === (y - 1) * 16){
		button = 'on';
	} else {
		button = 'off';
	}
}

let drawButton = (x, y) => {
	let pressed = button;
	if (josh.pos.x <= (x - 1) * 16 + 7 && josh.pos.x >= (x - 1) * 16 - 7 &&
	 josh.pos.y <= (y - 1) * 16 + 7 && josh.pos.y >= (y - 1) * 16 - 7){
		button = 'on';
		josh.deltaY = 5;
	} else {
		button = 'off';
		josh.deltaY = 4;
	}
	System.drawSprite('button_' + pressed, (x - 1) * 16, (y - 1) * 16);
}
let fan = 0;

let addFan = (x, y, length) => {
	x = (x - 1) * 16
	y = (y - 1) * 16
	if (button === 'on'){
		if (josh.pos.x === x && josh.pos.y > y) {
			josh.speed.x = 0;
			josh.speed.y = 1 ;
		}
	}
	addColision(x, y);
}

let drawFan = (x, y) => {
	if (button === 'off') {
		fan = 0;
	} 
	if (button === 'on'){
		fan += 1;
	}
	if (fan > 3) {
		fan = 0;
	}
	System.drawSprite('fan_' + fan, (x - 1) * 16, (y - 1) * 16);
}



let addColision = (x, y) => {
	let pos = (x - 1) * 16 + ',' + (y - 1) * 16;
	colisionMap[pos] = true;
}

let drawBlock = (x, y, block) => {
	System.drawSprite(block, (x - 1) * 16, (y - 1) * 16);
}

let checkColision = (x, y) => {
	let pos = x + ',' + y;
	return colisionMap[pos] === true;
};

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

let clearRoom = () => {
	colisionMap.length = 0;
}

let drawRoom = () => {
	clearRoom();
	if (room === 'test_0') {
		drawBlock(6, 6, 'wall_4');
		drawBlock(7, 6, 'wall_1');
		drawBlock(8, 6, 'wall_1');
		drawBlock(9, 6, 'wall_1');
		drawBlock(10, 6, 'wall_5');
		drawBlock(1, 7, 'wall_4');
		drawBlock(2, 7, 'wall_1');
		drawBlock(3, 7, 'wall_1');
		drawBlock(4, 7, 'wall_1');
		drawBlock(5, 7, 'wall_1');
		drawBlock(6, 7, 'wall_6');
		drawBlock(9, 7, 'goal');
		drawBlock(10, 7, 'wall_3');
		drawBlock(10, 8, 'wall_3');
		drawBlock(6, 9, 'wall_5');
		drawBlock(10, 9, 'wall_3');
		drawBlock(6, 10, 'wall_2');
		drawBlock(7, 10, 'wall_1');
		drawBlock(8, 10, 'wall_1');
		drawBlock(9, 10, 'wall_1');
		drawBlock(10, 10, 'wall_6');
		drawBlock(10, 10, 'wall_6');
	}

	if (room === 'test_1') {
		drawButton(3, 6);
		drawWire(4, 6, 'end', 0)
		drawWire(5, 6, 'hor', 0)
		drawWire(6, 6, 'hor', 0)
		drawWire(7, 6, 'hor', 0)
		drawWire(8, 6, 'end', 2)
		drawFan(9, 6);
	}
}

let loadRoom = () => {
	if (room === 'test_0') {
		addColision(6, 6)
		addColision(7, 6)
		addColision(8, 6)
		addColision(9, 6)
		addColision(10, 6)
		addColision(1, 7)
		addColision(2, 7)
		addColision(3, 7)
		addColision(4, 7)
		addColision(5, 7)
		addColision(6, 7)
		addGoal(9, 7);
		addColision(10, 7)
		addColision(10, 8)
		addColision(6, 9)
		addColision(10, 9)
		addColision(6, 10)
		addColision(7, 10)
		addColision(8, 10)
		addColision(9, 10)
		addColision(10, 10)
	}
	if (room === 'test_0') {
		addButton(3, 6);
		addFan(9, 6, 3)

	}
}

const colisionOutline = () => {
	for (let pos in colisionMap) {
		let [x, y] = pos.split(',');
		System.drawRect(x, y, 16, 16, `#a00`);
	} 
}

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
	System.render();
	console.log(button);
});

System.ready(() => {
	// Will run when everything is ready (sprites are loaded)
	// Before the tics and renders start
	loadRoom();
});
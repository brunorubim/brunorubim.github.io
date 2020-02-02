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
System.loadSprite('wire_t_0', 'wire_t_0.png');
System.loadSprite('wire_t_1', 'wire_t_1.png');
System.loadSprite('wire_t_2', 'wire_t_2.png');
System.loadSprite('wire_t_3', 'wire_t_3.png');
System.loadSprite('wire_l_0', 'wire_l_0.png');
System.loadSprite('wire_l_1', 'wire_l_1.png');
System.loadSprite('wire_l_2', 'wire_l_2.png');
System.loadSprite('wire_l_3', 'wire_l_3.png');
System.loadSprite('w', 'w.png');
System.loadSprite('a', 'a.png');
System.loadSprite('s', 's.png');
System.loadSprite('d', 'd.png');

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
let fans = [];
let buttons = [];

let addGoal = (x, y) => {
	let win = false;	
	if (josh.pos.x === (x - 1) * 16 && josh.pos.y === (y - 1) * 16){
		win = true;
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

let addButton = (x, y) => {
	let button = {
		pressed: false,
		pos: System.vec2(x, y),
	};
	buttons.push(button);
}

let drawButton = (button) => {
	let {x, y} = button.pos;
	System.drawSprite('button_' + (button.pressed? `on`: 'off'), (x - 1) * 16, (y - 1) * 16);
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

let addFan = (x, y, length, button) => {
	let fan = {
		on: false,
		pos: System.vec2(x, y),
		button,
		rotation: 0,
		length
	};
	fans.push(fan);
	addColision(x, y);
	return fan;
}

let drawFan = (fan) => {
	let {x, y} = fan.pos;
	let rotation = '0';
	if (fan.button.pressed) {
		rotation = 2;
	}
	System.drawSprite('fan_' + rotation, (x - 1) * 16, (y - 1) * 16);
}

let drawAllFans = () => {
	for (let i = 0; i < fans.length; i++) {
		let fan = fans[i];
		drawFan(fan);
	}
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
		drawAllButtons();
		drawAllFans();
		drawWire(7, 4, 'l', 0)
		drawWire(8, 4, 'end', 2)
		drawWire(7, 5, 'ver', 0)
		drawWire(4, 6, 'end', 0)
		drawWire(5, 6, 'hor', 0)
		drawWire(6, 6, 'hor', 0)
		drawWire(7, 6, 't', 0)
		drawWire(8, 6, 'end', 2)
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
	if (room === 'test_1') {
		addButton(3, 6);
		addButton(4, 8);
		addFan(9, 4, 3, buttons[0]);
		addFan(9, 6, 3, buttons[0]);
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
	checkButtons();
	System.render();
});

System.ready(() => {
	// Will run when everything is ready (sprites are loaded)
	// Before the tics and renders start
	loadRoom();
});
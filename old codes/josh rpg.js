import * as System from '/br-engine/br-engine.js';
System.set({
	screenWidth: 256,
	screenHeight: 256,
	ticsPerSec: 24,
});

System.loadSprite('room_test','room_test.png');
System.loadSprite('room_house_1_1','room_house_0.png');
System.loadSprite('room_house_1_1_over','empty_16x16.png');
System.loadSprite('room_outside_1_1','room_outside_1.png');
System.loadSprite('room_outside_1_1_over','room_outside_1_over.png');

System.loadSprite('door_indicator_up_0','door_indicator_up_0.png');
System.loadSprite('door_indicator_up_1','empty_16x16.png');
System.loadSprite('door_indicator_down_0','door_indicator_down_0.png');
System.loadSprite('door_indicator_down_1','empty_16x16.png');

System.loadSprite('sign', 'sign.png');
System.loadSprite('text_test', 'text_test.png');

for (let i=1; i<=4; i++) {
	System.loadSprite('josh_walking_down_'+i,'josh_walking_down_'+i+'.png');
 	System.loadSprite('josh_walking_left_'+i,'josh_walking_left_'+i+'.png');
 	System.loadSprite('josh_walking_right_'+i,'josh_walking_right_'+i+'.png');
 	System.loadSprite('josh_walking_up_'+i,'josh_walking_up_'+i+'.png');
}
System.loadSprite('josh_static_down_1','josh_static_down_1.png');
System.loadSprite('josh_static_down_2','josh_static_down_1.png');
System.loadSprite('josh_static_down_3','josh_static_down_2.png');
System.loadSprite('josh_static_down_4','josh_static_down_2.png');
System.loadSprite('josh_static_right_1','josh_static_right_1.png');
System.loadSprite('josh_static_right_2','josh_static_right_1.png');
System.loadSprite('josh_static_right_3','josh_static_right_2.png');
System.loadSprite('josh_static_right_4','josh_static_right_2.png');
System.loadSprite('josh_static_up_1','josh_static_up_1.png');
System.loadSprite('josh_static_up_2','josh_static_up_1.png');
System.loadSprite('josh_static_up_3','josh_static_up_2.png');
System.loadSprite('josh_static_up_4','josh_static_up_2.png');
System.loadSprite('josh_static_left_1','josh_static_left_1.png');
System.loadSprite('josh_static_left_2','josh_static_left_1.png');
System.loadSprite('josh_static_left_3','josh_static_left_2.png');
System.loadSprite('josh_static_left_4','josh_static_left_2.png');
System.loadSprite('josh_action_down_1','josh_action_down_2.png');
System.loadSprite('josh_action_down_2','josh_action_down_2.png');
System.loadSprite('josh_action_down_3','josh_action_down_1.png');
System.loadSprite('josh_action_down_4','josh_action_down_1.png');
System.loadSprite('josh_action_left_1','josh_action_left_2.png');
System.loadSprite('josh_action_left_2','josh_action_left_2.png');
System.loadSprite('josh_action_left_3','josh_action_left_1.png');
System.loadSprite('josh_action_left_4','josh_action_left_1.png');
System.loadSprite('josh_action_right_1','josh_action_right_2.png');
System.loadSprite('josh_action_right_2','josh_action_right_2.png');
System.loadSprite('josh_action_right_3','josh_action_right_1.png');
System.loadSprite('josh_action_right_4','josh_action_right_1.png');
System.loadSprite('josh_action_up_1','josh_action_up_2.png');
System.loadSprite('josh_action_up_2','josh_action_up_2.png');
System.loadSprite('josh_action_up_3','josh_action_up_1.png');
System.loadSprite('josh_action_up_4','josh_action_up_1.png');
System.loadSprite('josh_shadow_grass','josh_shadow_grass.png');

let josh = {
	sprite: 'josh_static_down_1',
	pos: System.vec2(144, 112),
	speed: System.vec2(0, 0),
	direction: 'left',
	state: 'static',
	frame: 1,
	lastChangeTic: 0,
}

let colisionMap = {};

let addColision = (x, y) => {
	let pos = x + ',' + y;
	colisionMap[pos] = true;
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

const colisionOutline = () => {
	for (let pos in colisionMap) {
		let [x, y] = pos.split(',');
		System.drawRect(x, y, 16, 16, `#07f`);
	} 
}

let drawJosh = () => {
	let counter = System.mod(System.countTics() - josh.lastChangeTic, 24);
	counter = System.div(counter, 6) + 1;
	josh.sprite = 'josh_' + josh.state + '_' + josh.direction + '_' + counter;
	System.drawSprite(josh.sprite, josh.pos.x, josh.pos.y + 4);	
}


let addDoordown = (x, y) => {
	let doorFrame = 0;
	let counter = System.div(System.countTics(), 12);
	doorFrame = System.mod(counter, 2);
	System.drawSprite('door_indicator_down_' + doorFrame, x, y);
}	

let addDoorup = (x, y) => {
	let doorFrame = 0;
	let counter = System.div(System.countTics(), 12);
	doorFrame = System.mod(counter, 2);
	System.drawSprite('door_indicator_up_' + doorFrame, x, y);
}

let addSign = (x, y, text) => {
	// System.drawSprite('sign', x, y + 4);
	let push = 0
	if (josh.state === 'action') {
		if ((josh.pos.y + 16 === y && josh.direction === 'up') ||
		(josh.pos.x === x && josh.pos.y - 16 === y && josh.direction === 'down') ||
		(josh.pos.x - 16 === x && josh.pos.y === y && josh.direction === 'left') ||
		(josh.pos.x + 16 === x && josh.pos.y === y && josh.direction === 'right')){
			System.drawSprite('text_' + text, 0, 0);
			console.log('potato');
		}
	}
	console.log(josh.pos.x, x);
}

let addChatter = (x, y, text, n, sprite) => {
	let dir = 0
	if (josh.pos.x > 128) {
		dir = 1
	} else {
		dir = 0
	}
	System.drawSprite('sprite', x, y);
	if (josh.pos.x === x && josh.state === 'action') {
		if ((josh.pos.y + 16 === y && josh.direction === 'up') ||
		(josh.pos.x === x && josh.pos.y - 16 === y && josh.direction === 'down') ||
		(josh.pos.x - 16 === x && josh.pos.y === y && josh.direction === 'left') ||
		(josh.pos.x + 16 === x && josh.pos.y === y && josh.direction === 'right')){
			n = 1;
			System.drawSprite('chat_' + text + '_' + n, 0, 0);
		}
	}

}

let roomName = 'house';
let roomNumberX = 1;
let roomNumberY = 1;
let room = roomName + '_' + roomNumberX + '_' + roomNumberY;

let IdunnoDeName = () => {
}

let drawRoom = () => {
	System.drawSprite('room_' + room, 0, 0);
	if (room === 'house_1_1'){
		addDoordown(128, 96);
	}
	if (room === 'outside_1_1'){
		addDoorup(128, 80);
		addSign(176, 96, 'test');
	}
};

let drawRoomOver = () => {
	System.drawSprite('room_' + room + '_over', 0, 0);
};

let loadRoom = () => {
	room = roomName + '_' + roomNumberX + '_' + roomNumberY;
	if (josh.pos.x > 240){
		josh.pos.x = 0;
		roomNumberX += 1;
	}
	if (josh.pos.x < 0){
		josh.pos.x = 240;
		roomNumberX -= 1;
	}
	if (josh.pos.y > 240){
		josh.pos.y = 0;
		roomNumberY += 1;
	}
	if (josh.pos.y < 0){
		josh.pos.y = 240;
		roomNumberY -= 1;
	}
	colisionMap = {};
	if (room === 'test') {
		addColision(160, 100)
	}
	if (roomName === 'house') {
		addColision(80, 144);
		addColision(96, 144);
		addColision(112, 144);
		addColision(128, 144);
		addColision(144, 144);
		addColision(160, 144);
		addColision(80, 128);
		addColision(96, 128);
		addColision(128, 128);
		addColision(144, 128);
		addColision(160, 128);
		addColision(80, 112);
		addColision(96, 112);
		addColision(160, 112);
		addColision(80, 96);
		addColision(144, 96);
		addColision(160, 96);
		addColision(80, 80);
		addColision(96, 80);
		addColision(112, 80);
		addColision(144, 80);
		addColision(160, 80);
		if (josh.pos.y < 90) {
			roomName = 'outside';
		}
	}
	if (room === 'outside_1_1') {
		addColision(96, 128);
		addColision(112, 128);
		addColision(128, 128);
		addColision(144, 128);
		addColision(96, 112);
		addColision(112, 112);
		addColision(128, 112);
		addColision(144, 112);
		addColision(96, 96);
		addColision(112, 96);
		addColision(144, 96);
		addColision(176, 96);
		addColision(176, 48);
		addColision(192, 48);
		addColision(208, 48);
		addColision(224, 48);
		addColision(144, 32);
		addColision(160, 32);
		addColision(176, 32);
		addColision(192, 32);
		addColision(208, 32);
		addColision(224, 32);
		addColision(144, 16);
		addColision(160, 16);
		addColision(176, 16);
		addColision(192, 16);
		addColision(208, 16);
		if (josh.pos.y > 84 && josh.pos.y < 100 && josh.pos.x === 128) {
			roomName = 'house';
		}
	}
};
let readKeys = () => {
	if (josh.pos.x % 16 === 0 && josh.pos.y % 16 === 0) {
		let speed = josh.speed.clone();
		josh.speed.set(0);
		josh.state = 'static';
 		if (System.key('e') || System.key('c')) {
			josh.state = 'action';
		}
		if (System.key('d') || System.key('right')) {
			josh.speed.x = 2;
			josh.state = 'walking';
			josh.direction = 'right';
		}
		if (System.key('a') || System.key('left')) {
			josh.speed.x = -2;
			josh.state = 'walking';
			josh.direction = 'left';  
		}
		if (System.key('s') || System.key('down')) {
			josh.speed.y = -2;
			josh.state = 'walking';
			josh.direction = 'down'; 
		}
		if (System.key('w') || System.key('up')) {
			josh.speed.y = 2;
			josh.state = 'walking';
			josh.direction = 'up'; 
		}
		if (josh.speed.x != speed.x || josh.speed.y != speed.y) {
			josh.lastChangeTic = System.countTics();
		}
	}
	// if (System.key(''))
}

window.addColision = addColision;
window.checkColision = checkColision;

// Defines how the game is rendered
System.setRender(() => {
	System.clear();
	drawRoom();
	drawJosh();
	drawRoomOver();
	
	// colisionOutline();
});

// Defines what happens every tic
System.setTic(() => {
	// Runs every tic
	readKeys();
	updatePos();
	loadRoom();
	IdunnoDeName();
	System.render();
	// console.log(System.countTics(),doorFrame);
});

System.ready(() => {
	// Will run when everything is ready (sprites are loaded)
	// Before the tics and renders start
});
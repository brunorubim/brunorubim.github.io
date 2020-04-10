	import * as System from '/br-engine/br-engine.js';
System.set({
	screenWidth: 256,
	screenHeight: 256,
	ticsPerSec: 24,
});

// Ball

System.loadSprite('blue_ball','blue_ball.png');

// class Ball {
// 	constructor(x, y) {
// 		this.pos = System.vec2(x, y);
// 		this.speed = System.vec2(0, 0);
// 	}
// }

let ball = {
	pos: System.vec2(120, 120),
	speed: System.vec2(0, 0),
	touchingGround: false,
}

let drawBall = () => {
	System.drawSprite('blue_ball', ball.pos.x, ball.pos.y);
}


let updatePos = (friction, maxSpeed) => {
	ball.pos.x += ball.speed.x;
	ball.pos.y += ball.speed.y;
	if (ball.speed.x > 0) {
		ball.speed.x -= friction;
	}
	if (ball.speed.x < 0) {
		ball.speed.x += friction;
	}
	if (ball.speed.y > 0) {
		ball.speed.y -= friction;
	}
	if (ball.speed.y < 0) {
		ball.speed.y += friction;
	}
	// if (ball.speed.x > maxSpeed) {
	// 	ball.speed.x = maxSpeed;
	// }
	// if (ball.speed.x < -maxSpeed) {
	// 	ball.speed.x = -maxSpeed;
	// }
	// if (ball.speed.y > maxSpeed) {
	// 	ball.speed.y = maxSpeed;
	// }
	// if (ball.speed.y < -maxSpeed) {
	// 	ball.speed.y = -maxSpeed;
	// }

}

let readKeys = (n) => {
	if (System.key('a')||System.key('left')) {
		ball.speed.x += -n;
	}
	if (System.key('d')||System.key('right')) {
		ball.speed.x += n;
	}
	if (System.key('w')||System.key('up')) {
		ball.speed.y += n;
		// ball.touchingGround = false;
	}
	if (System.key('s')||System.key('down')) {
		ball.speed.y += -n;
	}
}

let updateGravity = (gravity) => {
	ball.speed.y -= gravity;
}

// Boxes

System.loadSprite('box_yes','box_yes.png');
System.loadSprite('yes','yes.png');
System.loadSprite('box_no','box_no.png');
System.loadSprite('no','no.png');
System.loadSprite('box_...Hi','box_...Hi.png');
System.loadSprite('...Hi','...Hi.png');
System.loadSprite('box_Hello','box_Hello.png');
System.loadSprite('Hello','Hello.png');
System.loadSprite('box_Why?','box_Why.png');
System.loadSprite('Why?','Why.png');
System.loadSprite('box_Where am i?','box_Where_am_i.png');
System.loadSprite('Where am i?','Where_am_i.png');
System.loadSprite('0','3.png');
System.loadSprite('1','2.png');
System.loadSprite('2','1.png');
System.loadSprite('3','0.png');

let boxes = [];

class Box {
	constructor(x, y, type) {
		this.pos = System.vec2(x, y);
		this.type = type;
		this.frame = 0;
		this.answer = false;
		}
	update(){
		if (ball.pos.x > this.pos.x && ball.pos.x < this.pos.x + 32 && ball.pos.y > this.pos.y && ball.pos.y < this.pos.y + 32) {
			this.frame += 1;
			if (Math.floor(this.frame/24)<4){
				System.drawSprite('' + Math.floor(this.frame/24), 110,80);
			} else if (Math.floor(this.frame/24)<5) {
				System.drawSprite(this.type, 110, 80);
				this.answer = true;
			} else {
				boxes = [];
				ball.speed.y = -5
			}
			// console.log(Math.floor(this.frame/24), this.type);
		} else {
			this.frame = 0;
		}
	}
}

let addBox = (x, y, type) => {
	let box = new Box(x, y, type);
	boxes.push(box);
}

let drawBox = (x, y, type) => {
	System.drawSprite('box_' + type, x, y);
}

let drawAllBoxes = () => {
	for (let i = 0; i < boxes.length; i++) {
		let box = boxes[i];
		drawBox(box.pos.x, box.pos.y, box.type);
	}
}

let updateBoxes = () => {
	for (let i=0; i<boxes.length; i++) {
		boxes[i].update();
	}
}


// Dialogue

System.loadSprite('start_dialogue','start_dialogue.png');

class Dialogue {
	constructor(text) {
		this.pos = System.vec2();
		this.speed = System.vec2();
		this.text = text;
		this.frame = 0;
	}
}

let dialogues = [] //?

let addDialogue = (text) => {
	let dialogue = new Dialogue(text);
	dialogues.push(dialogue);
}

let drawDialogue = () => {
	for (let i = 0; i < dialogues.length; i++) {
		let dialogue = dialogues[i];
		System.drawSprite('' + dialogue.text, 0, 0);
		console.log(dialogue.text);
	}
}

// Choices

class Choice {
	 constructor(type, choice1, choice2) {
	 	this.type = type;
	 	this.choice1 = choice1;
	 	this.choice2 = choice2;
	 	this.answer = '';
	 }
}

let choices = [];

let addChoice = (type, choice1, choice2) => {
	let choice = new Choice(type, choice1, choice2);
	choices.push(choice);
	addBox(64, 32, choice1);
	addBox(160, 32, choice2);
}

let updateChoice = () => {
	for (let i=0; i<boxes.length; i++) {
		let box = boxes[i];
		if (box.answer) {
			choices[0].answer = box.type;
		}
	}
}

// Room

System.loadSprite('room','room.png');

let drawRoom = () => {
	System.drawSprite('room', 0, 0);
}


let leftWallColided = false;
let rightWallColided = false;
let downWallColided = false;
let upWallColided = false;
let start = false;

let startGame = () => {
	addDialogue('start_dialogue');
	addChoice('2', 'Why?','Where am i?');
}

let wallColision = () => {
	if (ball.pos.x > 239) {
		ball.speed.x = -ball.speed.x;
	}
	if (ball.pos.x < 2) {
		ball.speed.x = -ball.speed.x;
	}
	if (ball.pos.y > 239) {
		ball.speed.y = -ball.speed.y;
	}
	if (ball.pos.y < 2) {
		ball.speed.y = -ball.speed.y;
	}
	if (ball.pos.x >= 240) {
		ball.pos.x = 240;
		rightWallColided = true;
		console.log('yeees');
	}
	if (ball.pos.x <= 1) {
		ball.pos.x = 1;
		leftWallColided = true;
		console.log('yeees');
	}
	if (ball.pos.y >= 240) {
		ball.pos.y = 240;
		upWallColided = true
		console.log('yeees');
	}
	if (ball.pos.y <= 1) {
		ball.pos.y = 1;
		downWallColided = true
		console.log('yeees');
	}
}

let loadRoom = () => {
	if (upWallColided && leftWallColided && downWallColided && rightWallColided && !start) {
		start = true;
		startGame();
	}
}

// Defines how the game is rendered
System.setRender(() => {
	System.clear();
	drawRoom();
	drawAllBoxes();
	drawDialogue();
	drawBall();
	// colisionOutline();
});

// Defines what happens every tic
System.setTic(() => {
	// Runs every tic
	System.render();
	// updateGravity(1);
	readKeys(0.5);
	updatePos(0.25, 200);
	updateBoxes();
	updateChoice();
	wallColision();
	loadRoom();
});

System.ready(() => {
	// Will run when everything is ready (sprites are loaded)
	// Before the tics and renders start
});
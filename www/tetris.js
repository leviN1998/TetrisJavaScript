const canvas = document.getElementById("tetris");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

const size = 20;

//Formen
const T = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0]
];

//Farben
const blue = "rgb(0,0,255)";
const green = "rgb(0,255,0)";

//zeugs



function init(){
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "rgb(255, 0, 0)"

	klotz = new rect(20, 20);
	klotz.draw(60, 60, "rgb(255, 0, 0)");

	test = new brick(T, 60, 60);
	test.draw();

	boden = new ground(canvas.width, canvas.height);
	boden.draw();
	loop();
	
}

var dropCounter = 0;
var dropInterval = 1000;

var lastTime = 0;
function loop(){
	var deltaTime = performance.now() - lastTime;
	lastTime = performance.now();

	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		dropCounter = 0;
		update();
		render();
	}

	requestAnimationFrame(loop);
}

function update(){
	if (checkCollision(test, boden)) {
		test.canFall = false;
	}
	test.move(0, 1);
}

function render(){
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);

	test.draw();
	boden.draw();
}


function rect(w, h) {
	this.width = w;
	this.height = h;

	this.draw = function(x, y, color){
		context.fillStyle = color;
		context.fillRect(x, y, this.width, this.height);
	};
}

function brick(items, x, y){
	
	this.color = blue;
	this.klotz = new rect(size, size);
	this.x = x;
	this.y = y;
	this.content = items;

	this.canFall = true;

	this.draw = function(){
		for (var i = 0; i < 3; i++) {
			for (var u = 0; u < 3; u++) {
				if (this.content[i][u] == 1) {
					klotz.draw(this.x + u*size, this.y + i*size, this.color);
				}
			}
		}
	};

	this.move = function(xDir, yDir){
		if (this.canFall) {
			this.x += xDir * size;
			this.y += yDir * size;
		}
	};
}

function ground(width, height){
	var m = height/size;
	var xValues = [];
	this.y = (Math.floor(m) * size) - size;
	for (var i = 0; i < (width/size); i++) {
		xValues.push(i*size);
	}
	this.xValues = xValues;
	this.box = new rect(size, size);
	this.color = green;

	this.draw = function(){
		for (var i = 0; i < xValues.length; i++) {
			this.box.draw(this.xValues[i], this.y, this.color);
		}
	}
}

function checkCollision(brick, ground){
	if (brick.y + (3*size) == ground.y) {
		return true;
	}else{
		return false;
	}
}



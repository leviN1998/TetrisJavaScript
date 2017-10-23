const canvas = document.getElementById("tetris");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

const black = "rgb(0,0,255)";

context.fillStyle = black;
context.fillRect(0, 0, canvas.width, canvas.height);


const size = 20;

//Formen
const T = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0]
];

klotz = new rect(20, 20);
klotz.draw(60, 60, "rgb(255, 0, 0)");

test = new brick(T, 60, 60);
test.draw();

function rect(w, h) {
	this.width = w;
	this.height = h;

	this.draw = function(x, y, color){
		context.fillStyle = color;
		context.fillRect(x, y, this.width, this.height);
	};
}

function brick(items, x, y){
	
	this.color = "rgb(255,0,0)";
	this.klotz = new rect(size, size);
	this.x = x;
	this.y = y;
	this.content = items;

	this.draw = function(){
		for (var i = 0; i < 3; i++) {
			for (var u = 0; u < 3; u++) {
				if (this.content[i][u] == 1) {
					klotz.draw(this.x + u*size, this.y + i*size, this.color);
				}
			}
		}
	};
}

var dropCounter = 0;
var dropInterval = 1000;

var lastTime = 0;
function loop(time = 0){
	const deltaTime = time - lastTime;
	lastTime = time;
	
	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		dropCounter = 0;
		//console.log("!");
	}

	update();
	render();
	//requestAnimationFrame(loop);
}

function update(){

}

function render(){

}
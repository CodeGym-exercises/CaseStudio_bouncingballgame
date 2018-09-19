let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let score = 0;
canvas.width = 600;
canvas.height = 500;

let KeyEvent = {
	event: undefined
};


//=============== key event ==========

window.addEventListener('keydown',function(event){
	switch(event.keyCode){
		case 37:
			console.log("left->>37");
			KeyEvent.event = "left";
			break;
		case 39:
			console.log("right->>39");
			KeyEvent.event = "right";
			break;
	}
});




//=============== Class ==============
let Circle = function(x,y,dx,dy,radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	//this.speed = speed;

	this.drawCircle = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
		ctx.fill();
	}
	this.updateAnimation = function(){
		if(this.x>canvas.width-this.radius||
			this.x<0+this.radius){
			this.dx = -this.dx;
			//console.log("run");
		}if(this.y<0+this.radius){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
		//console.log(this.x);
	}
}

let mainObject = function(x,y,width,height,speed){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.speed = speed;

	this.draw = function(){
		ctx.rect(this.x,this.y,this.width,this.height);
		ctx.fill();
	}
	this.updateAnimation = function(k){
		if(this.x>canvas.width-this.width||
			this.x<0){
			this.speed = -this.speed;
		}
		if(k.event=="left"){
			this.x-=this.speed;
		}else if(k.event=="right"){
			this.x+=this.speed;
		}
	}
}

//=============== initialization object ==============

let circle = new Circle(250,50,4,4,20);
let main = new mainObject(350,450,90,10,5);

//====== function ===========

function collision(){
	if(main.x-circle.x<90&&
		main.x-circle.x>-90&&
		main.y-circle.y<20&&
		main.y-circle.y>-20){
			circle.dx = -circle.dx;
			circle.dy = -circle.dy;
		//console.log("work");
		score++;
	}
	//console.log("work");
}

function gameOver(){
	if(circle.y>canvas.height-circle.radius){
		alert("Game over, your score: " + score);	
		circle.x = 250;
		circle.y = 50;
		score=0;
	}
}


function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);

	ctx.font = "25px Arial";
	ctx.fillText("Score: "+score,10,30)

	//console.log("runing")
	circle.drawCircle();
	circle.updateAnimation();
	main.draw();
	main.updateAnimation(KeyEvent);

	collision();
	gameOver();
}
animate();

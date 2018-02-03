function setCanvasSize() {
	canvasEl.width = window.innerWidth * 1;
	canvasEl.height = window.innerHeight * 1;
	canvasEl.style.width = window.innerWidth + 'px';
	canvasEl.style.height = window.innerHeight + 'px';
	canvasEl.getContext('2d').scale(1, 1);
 }


var canvas = document.querySelector('#mycanvas');
let w = 	canvas.width = window.innerWidth; //document.body.clientWidth;
let h = 	canvas.height = window.innerHeight; //document.body.clientWidth;
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
var c = canvas.getContext('2d');

var img = new Image();
img.src = './smoke.jpg';

var position = {x : w/2, y : h/2};


var particles = [];
var random = function(min, max){
	return Math.floor( Math.random()*(max-min +1)+min );
 };


 canvas.onclick = function(e){
	position.x = e.offsetX;
	position.y = e.offsetY;
 }



 function Particle(x, y){
	// console.log('this:',this);
  this.x = x;
  this.y = y;
  this.velY = -2;
  this.velX = random(-5, 5)/10;
  this.size = random(3, 5)/10;
  this.alpha = 1;
  this.update = function(){
		this.x += this.velX; //粒子左右亂飄
		this.y += this.velY; //穩定往上+2
	  	this.velY *=1; //往上的速度慢降
		if(this.alpha < 0){
			this.alpha = 0;
		}
	  	c.globalAlpha = this.alpha; //不知
	  c.save();
	  c.translate(this.x, this.y);
	  c.scale(this.size, this.size);

	//   c.beginPath();
	//   c.arc(0, 0, 2, 0, 2* Math.PI);
	//   c.fillStyle= "#aaa";
	//   c.fill();

	  


	  c.drawImage(img, -img.width/2, -img.height/2);
	  c.restore();

	  this.alpha *=0.999;
	  this.size +=0.01;
  }


}



 var draw = function(){
	var p = new Particle(position.x, position.y); //產生一個粒子
	// console.log('新粒子',p);
	particles.push(p); //加入粒子陣列
	// console.log('particles',particles);
	// //最多只留350個粒子
	while(particles.length > 350) particles.shift();
	
	c.globalAlpha = 1;

	c.fillStyle = '#000';
	c.fillRect(0,0,w,h);
	
	for(var i = 0; i < particles.length; i++)
	{
	  particles[i].update();
	}
 };



 setInterval(draw, 1000/60);

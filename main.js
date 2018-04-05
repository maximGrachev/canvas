var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;
var ballsNumber =200;
var maxSpeed = 5;

function circle(x, y, radius, fillCircle, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.srtokeStyle = color;
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  if (fillCircle) {
    ctx.fill();
  }
  else {
    ctx.stroke();
  }
}

var Ball = function () {
  this.radius = 5;
  this.x = Math.random() * (width - 2 * this.radius);
  this.y = Math.random() * (height - 2 * this.radius);
  this.xSpeed = Math.random() * 2 * maxSpeed - maxSpeed;
  this.ySpeed = Math.random() * 2 * maxSpeed - maxSpeed;
  this.color = 'grey'
};

Ball.prototype.draw = function () {
  circle(this.x, this.y, this.radius, true, this.color);
}

Ball.prototype.move = function () {
  this.x = this.x + this.xSpeed;
  this.y = this.y + this.ySpeed;
}

Ball.prototype.checkCollision = function () {
  if (this.x - this.radius < 0 || this.x + this.radius > width) {
    this.xSpeed = -this.xSpeed;
  }
  if (this.y - this.radius < 0 || this.y + this.radius > height) {
    this.ySpeed = -this.ySpeed;
  }
}

var ball = [];

for (let i = 1; i <= ballsNumber; i++) {
  ball[i] = new Ball();
}

setInterval(function () {
  ctx.clearRect(0, 0, width, height);

  for (let i = 1; i <= ballsNumber; i++) {
    ball[i].draw();
    ball[i].move();
    ball[i].checkCollision();
  }


  ctx.strokeRect(0, 0, width, height);
}, 30)
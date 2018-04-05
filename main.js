var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

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
  this.radius = 10;
  this.x = Math.random() * (width - 2 * this.radius);
  this.y = Math.random() * (height - 2 * this.radius);
  this.xSpeed = 5;
  this.ySpeed = 0;
  this.color = 'grey'
};

Ball.prototype.draw = function () {
  circle(this.x, this.y, this.radius, true, this.color);
}


Ball.prototype.move = function () {
  this.x = this.x + this.xSpeed;
  this.y = this.y + this.ySpeed;

  if (this.x < 0) {
    this.x = width;
  } else if (this.x > width) {
    this.x = 0;
  }
  if (this.y < 0) {
    this.y = height;
  } else if (this.y > height) {
    this.y = 0;
  }
}

Ball.prototype.setDirection = function (direction) {
  if (direction === "up") {
    this.xSpeed = 0;
    this.ySpeed = -5;
  } else if (direction === "down") {
    this.xSpeed = 0;
    this.ySpeed = 5;
  } else if (direction === "left") {
    this.xSpeed = -5;
    this.ySpeed = 0;
  } else if (direction === "right") {
    this.xSpeed = 5;
    this.ySpeed = 0;
  } else if (direction === "space") {
    this.xSpeed = 0;
    this.ySpeed = 0;
  }
}

var ball = new Ball;

var keyNames = {
  32: "space",
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

$("body").keydown(function (event) {
  var direction = keyNames[event.keyCode];
  ball.setDirection(direction);
});

setInterval(function () {
  ctx.clearRect(0, 0, width, height);

  ball.draw();
  ball.move();

  ctx.strokeRect(0, 0, width, height);
}, 30)
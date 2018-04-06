var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
var score = 0;

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

function drawBorder() {
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, blockSize, blockSize);
}

function gameOver() {
  clearInterval(intervalId);
  ctx.font = "60px Arial";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game over", width / 2, height / 2);
}

var Block = function (col, row) {
  this.col = col;
  this.row = row;
}

Block.prototype.drawSquare = function (color) {
  var x = this.col * blockSize;
  var y = this.row * blockSize;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
}

Block.prototype.drawCircle = function (color) {
  var centerX = this.col * blockSize + blockSize / 2;
  var centerY = this.row * blockSize + blockSize / 2;

  circle(centerX, centerY, blockSize / 2, true, color);
}

Block.prototype.equal = function (otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
}

var Snake = function () {
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
  ];
  this.direction = "right";
  this.nextDirection = "right";
}

Snake.prototype.drawSnake = function () {
  for (var i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare('black');
  }
}

Snake.prototype.move = function () {
  var head = this.segment[0];
  var newHead;

  this.direction = this.nextDirection;

  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1);
  } else if (this.direction === "left") {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1);
  }

  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }

  this.segments.unshift(newHead);

  if (newHead.equal(apple.position)) {
    score++;
    apple.move();
  } else {
    this.segment.pop();
  }
}

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



var intervalId = setInterval(function () {
  ctx.clearRect(0, 0, width, height);

  drawScore();
  /*snake.move();
  snake.drow();
  apple.drow();*/
  drawBorder();
  var sampleBlock = new Block(3, 4);
  sampleBlock.drawCircle("LightBlue");

}, 100)
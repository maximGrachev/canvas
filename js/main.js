var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
var score = 0;
var direction = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

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
  let x = this.col * blockSize;
  let y = this.row * blockSize;

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
  for (let i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare('black');
  }
}

Snake.prototype.move = function () {
  let head = this.segments[0];
  let newHead;

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
    this.segments.pop();
  }
}

Snake.prototype.checkCollision = function (head) {
  let leftCollision = (head.col === 0);
  let rightCollision = (head.col === widthInBlocks - 1);
  let topCollision = (head.row === 0);
  let bottomCollision = (head.row === heightInBlocks - 1);

  let wallCollision = leftCollision || rightCollision || topCollision || bottomCollision;

  let selfCollision = false;

  for (let i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }

  return wallCollision || selfCollision;
}

Snake.prototype.setDirection = function (newDirection) {
  if (this.direction === "up" && newDirection === "down") {
    return;
  }
  else if (this.direction === "down" && newDirection === "up") {
    return;
  }
  else if (this.direction === "left" && newDirection === "right") {
    return;
  }
  else if (this.direction === "right" && newDirection === "left") {
    return;
  }

  this.nextDirection = newDirection;
}

var Apple = function () {
  this.position = new Block(10, 10);
}

Apple.prototype.draw = function () {
  this.position.drawCircle('LimeGreen');
}

Apple.prototype.move = function () {
  let newCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  let newRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;

  this.position = new Block(newCol, newRow);

  for (let i = 0; i < snake.segments.length; i++) {
    if (this.position.equal(snake.segments[i])) {
      return this.move();
    }
  }
}

var snake = new Snake();
var apple = new Apple();

$("body").keydown(function (event) {
  let newDirection = direction[event.keyCode];

  if (newDirection !== undefined) {
    snake.setDirection(newDirection);
  }
});

var intervalId = setInterval(function () {
  ctx.clearRect(0, 0, width, height);

  drawScore();
  snake.move();
  snake.drawSnake();
  apple.draw();
  drawBorder();

}, 100)
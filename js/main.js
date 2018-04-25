var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var blockSize = 20;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
var score = 0;
var allFigures = [];
var num = 0;
var figureStoped = false;
var action = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function randomFigure() {

  let randomNum = randomInteger(0, 6);
  let figureType;

  if (randomNum === 0) {
    figureType = 'I';
  }
  else if (randomNum === 1) {
    figureType = 'J'
  }
  else if (randomNum === 2) {
    figureType = 'L'
  }
  else if (randomNum === 3) {
    figureType = 'O'
  }
  else if (randomNum === 4) {
    figureType = 'S'
  }
  else if (randomNum === 5) {
    figureType = 'T'
  }
  else if (randomNum === 6) {
    figureType = 'Z'
  }

  return figureType;
}


function drawBorder() {
  ctx.lineWidth = '3'
  ctx.strokeStyle = "gray";
  ctx.strokeRect(0, 0, width, height);
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, blockSize / 2, blockSize / 2);
}

function gameOver() {
  clearInterval(intervalId);
  ctx.font = "20px Arial";
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

  ctx.lineWidth = '1';
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(x, y, blockSize, blockSize);
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Block.prototype.equal = function (otherBlock) {
  return (this.col === otherBlock.col - 1 || this.col === otherBlock.col + 1) && (this.row === otherBlock.row + 1 || this.row === otherBlock.row - 1);
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var Figure = function (type, x, y, rotation) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.rotation = rotation;

  if (this.type === 'I' && (this.rotation === 0 || this.rotation === 2)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x + 2, this.y),
      new Block(this.x + 3, this.y)
    ]
  }
  else if (this.type === 'I' && (this.rotation === 3 || this.rotation === 1)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x, this.y + 2),
      new Block(this.x, this.y + 3)
    ]
  }
  else if (this.type === 'J' && this.rotation === 0) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x, this.y - 1),
      new Block(this.x + 1, this.y),
      new Block(this.x + 2, this.y)
    ]
  }
  else if (this.type === 'J' && this.rotation === 1) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x, this.y + 2)
    ]
  }
  else if (this.type === 'J' && this.rotation === 2) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 2, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'J' && this.rotation === 3) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y - 1),
      new Block(this.x, this.y - 2)
    ]
  }
  else if (this.type === 'L' && this.rotation === 0) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 2, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y - 1)
    ]
  }
  else if (this.type === 'L' && this.rotation === 1) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x, this.y - 1),
      new Block(this.x, this.y - 2),
      new Block(this.x + 1, this.y)
    ]
  }
  else if (this.type === 'L' && this.rotation === 2) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x + 2, this.y),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'L' && this.rotation === 3) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x, this.y + 2)
    ]
  }
  else if (this.type === 'O' && (this.rotation === 0 || this.rotation === 1 || this.rotation === 2 || this.rotation === 3)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x + 1, this.y + 1)
    ]
  }
  else if (this.type === 'S' && (this.rotation === 0 || this.rotation === 2)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x - 1, this.y + 1)
    ]
  }
  else if (this.type === 'S' && (this.rotation === 1 || this.rotation === 3)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x - 1, this.y - 1),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'T' && this.rotation === 0) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x, this.y - 1)
    ]
  }
  else if (this.type === 'T' && this.rotation === 1) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x, this.y - 1),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'T' && this.rotation === 2) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'T' && this.rotation === 3) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y - 1),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'Z' && (this.rotation === 0 || this.rotation === 2)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x + 1, this.y + 1)
    ]
  }
  else if (this.type === 'Z' && (this.rotation === 1 || this.rotation === 3)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x - 1, this.y + 1),
      new Block(this.x, this.y - 1)
    ]
  }

}

Figure.prototype.checkCollisionLeft = function () {

  let wallCollision;

  for (let i = 0; i < this.segments.length; i++) {
    if (this.segments[i].col === 0) {
      wallCollision = true;
    }
  }

  return wallCollision;
}

Figure.prototype.checkCollisionRight = function () {

  let wallCollision;

  for (let i = 0; i < this.segments.length; i++) {
    if (this.segments[i].col === widthInBlocks - 1) {
      wallCollision = true;
    }
  }

  return wallCollision;
}

Figure.prototype.checkCollisionUp = function () {

  let wallCollision = false;

  for (let i = 0; i < this.segments.length; i++) {
    if (this.segments[i].row === 0) {
      wallCollision = true;
    }
  }

  return wallCollision;
}

Figure.prototype.checkCollisionDown = function () {

  let wallCollision;

  for (let i = 0; i < this.segments.length; i++) {
    if (this.segments[i].row === heightInBlocks - 1) {
      wallCollision = true;
    }
  }

  return wallCollision;
}

Figure.prototype.checkCollision = function () {

  var Collision;

  for (let i = 0; i < this.segments.length; i++) {
    for (let j = 0; j < allFigures.length - 1; j++) {
      for (let k = 0; k < allFigures[j].segments.length; k++) {
        if (this.segments[i].equal(allFigures[j].segments[k])) {
          Collision = true;
        }
      }
    }
  }

  return Collision;
}

Figure.prototype.moveFigure = function (direction) {

  if (direction === "right" && !this.checkCollisionRight() && !this.checkCollisionDown()) {
    this.x = this.x + 1;
  }

  else if (direction === "left" && !this.checkCollisionLeft() && !this.checkCollisionDown()) {
    this.x = this.x - 1;
  }

  else if (direction === "up" && !this.checkCollisionDown()) {
    if (this.rotation < 3) {
      this.rotation++;
    }
    else {
      this.rotation = 0;
    }
  }

  else if (direction === "fall" && !this.checkCollisionDown() && !this.checkCollision()) {
    this.y = this.y + 1;
  }

  else if (direction === "down" && !this.checkCollisionDown() && !this.checkCollision()) {
    this.y = this.y + 1;
  }

  if (this.type === 'I' && (this.rotation === 0 || this.rotation === 2)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x + 2, this.y),
      new Block(this.x + 3, this.y)
    ]
  }
  else if (this.type === 'I' && (this.rotation === 3 || this.rotation === 1)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x, this.y + 2),
      new Block(this.x, this.y + 3)
    ]
  }
  else if (this.type === 'J' && this.rotation === 0) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x, this.y - 1),
      new Block(this.x + 1, this.y),
      new Block(this.x + 2, this.y)
    ]
  }
  else if (this.type === 'J' && this.rotation === 1) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x, this.y + 2)
    ]
  }
  else if (this.type === 'J' && this.rotation === 2) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 2, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'J' && this.rotation === 3) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y - 1),
      new Block(this.x, this.y - 2)
    ]
  }
  else if (this.type === 'L' && this.rotation === 0) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 2, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y - 1)
    ]
  }
  else if (this.type === 'L' && this.rotation === 1) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x, this.y - 1),
      new Block(this.x, this.y - 2),
      new Block(this.x + 1, this.y)
    ]
  }
  else if (this.type === 'L' && this.rotation === 2) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x + 2, this.y),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'L' && this.rotation === 3) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x, this.y + 2)
    ]
  }
  else if (this.type === 'O' && (this.rotation === 0 || this.rotation === 1 || this.rotation === 2 || this.rotation === 3)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x + 1, this.y + 1)
    ]
  }
  else if (this.type === 'S' && (this.rotation === 0 || this.rotation === 2)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x - 1, this.y + 1)
    ]
  }
  else if (this.type === 'S' && (this.rotation === 1 || this.rotation === 3)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x - 1, this.y - 1),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'T' && this.rotation === 0) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x, this.y - 1)
    ]
  }
  else if (this.type === 'T' && this.rotation === 1) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x, this.y - 1),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'T' && this.rotation === 2) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x + 1, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'T' && this.rotation === 3) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y - 1),
      new Block(this.x, this.y + 1)
    ]
  }
  else if (this.type === 'Z' && (this.rotation === 0 || this.rotation === 2)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x, this.y + 1),
      new Block(this.x + 1, this.y + 1)
    ]
  }
  else if (this.type === 'Z' && (this.rotation === 1 || this.rotation === 3)) {
    this.segments = [
      new Block(this.x, this.y),
      new Block(this.x - 1, this.y),
      new Block(this.x - 1, this.y + 1),
      new Block(this.x, this.y - 1)
    ]
  }
}

Figure.prototype.drawFigure = function () {

  if (this.type === "I"){
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare('thistle');
    }
  }
  else if(this.type === "J"){
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare('Teal');
    }
  }
  else if(this.type === "L"){
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare('grey');
    }
  }
  else if(this.type === "O"){
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare('pink');
    }
  }
  else if(this.type === "S"){
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare('olive');
    }
  }
  else if(this.type === "T"){
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare('BurlyWood');
    }
  }
  else if(this.type === "Z"){
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare('Tomato');
    }
  }

  
}

function createFigure() {
  allFigures[num] = new Figure(randomFigure(), 4, -3, randomInteger(0, 3));
  num++;
}

createFigure();

var intervalId = setInterval(function () {
  ctx.clearRect(0, 0, width, height);

  for (let r = 0; r < allFigures.length; r++) {
    allFigures[r].drawFigure();
    allFigures[r].moveFigure('fall');
  }

  if (figureStoped === true) {
    createFigure();
    figureStoped = false;
  }

  drawScore();
  drawBorder();

}, 25)


/*
$("body").keydown(function (event) {
  let newAction = action[event.keyCode];
  
  if (newAction !== undefined) {
    console.log(newAction);
    allFigures[num - 1].moveFigure(newAction);
  }
});
*/
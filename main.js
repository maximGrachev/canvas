var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var x1 = height-0.8*height;
var y1 = width-0.8*width;

var x2 = width-0.2*width;
var y2 = height - 0.2*height;

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

function drawBee(x, y) {
  ctx.lineWidth = 2;
  circle(x, y, 8, true, 'Gold');
  circle(x, y, 8, false, 'black');
  circle(x - 5, y - 11, 5, false, 'white');
  circle(x + 5, y - 11, 5, false, 'white');
  circle(x - 2, y - 1, 2, false, 'black');
  circle(x + 2, y - 1, 2, false, 'black');
}

function updateCoordinate(coordinate) {
  var offset = Math.random() * 10 - 5;
  coordinate += offset;
  if (coordinate > width) {
    coordinate = width;
  }
  if (coordinate < 0) {
    coordinate = 0;
  }
  return coordinate;
};

setInterval(function () {
  ctx.clearRect(0, 0, width, height);

  drawBee(x1, y1);
  x1 = updateCoordinate(x1);
  y1 = updateCoordinate(y1);
  
  drawBee(x2, y2);
  x2 = updateCoordinate(x2);
  y2 = updateCoordinate(y2);
  ctx.strokeRect(0, 0, width, height);
}, 20)
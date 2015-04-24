var app = {};


var w = h = 256;
var svgs = [];

var colors = ['#FFFFFF','#FFFFFF','#FFFFFF','#FF988E','#FF7364','#C92918','#A01507','#FFC58E','#FFB064','#C96F18','#A05107','#BF3277','#D35392','#A7145C','#840644'];

var makeFlower = function() {

  svgs[0] = d3.select('.pattern')
    .append('svg')
    .attr('width', w)
    .attr('height', h);
  
  svgs[1] = d3.select('.pattern')
    .append('svg')
    .attr('width', w)
    .attr('height', h);
  
  for (var i = 0; i < 20; i++) {
    drawRandomPattern(0);
  }
  
  for (var i = 0; i < 20; i++) {
    drawRandomPattern(1);
  }
}

function getRandomColor() {
  var indx = getRandomNumberBetween(0, colors.length - 1);
  return colors[indx];
}


function drawRandomPattern(i) {
  var hX = w / 2;
  var hY = h / 2;
  
  var startAngle = getRandomNumberBetween(0, 10);
  var spread = getRandomNumberBetween(10, 180);
  
  var color = getRandomColor();
  
  var arr = [4, 6, 8, 10, 12, 16];
  var indx = Math.floor(Math.random() * arr.length);
  
  if (spread < 40) {
    indx = Math.floor(Math.random() * arr.length - 3);
  }
  
  var step = 2 * Math.PI / arr[indx];
  var r = getRandomNumberBetween(2, 12);
  
  for(var theta = startAngle;  theta < (2 * Math.PI) + startAngle;  theta += step) {
    svgs[i].append('circle')
      .attr('cx', 128 + (Math.cos(theta) * spread))
      .attr('cy', 128 - (Math.sin(theta) * spread))
      .attr('r', r)
      .attr('fill', color)
      .attr('opacity', getRandomNumberBetween(50, 80) / 100)
  }
}

function getRandomNumberBetween(a, b) {
  return Math.floor(Math.random() * b) + a;
}

makeFlower();
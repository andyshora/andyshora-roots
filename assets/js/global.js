
var w = h = 256;
var svgs = [];

var colors = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FF988E','#FF7364','#C92918','#A01507','#BF3277','#D35392','#A7145C','#840644'];


var makeFlower = function(elm, size) {

  console.log('makeFlower', size);

  svgs[0] = d3.select(elm)
    .append('svg')
    .attr('width', size)
    .attr('height', size);
  
  svgs[1] = d3.select(elm)
    .append('svg')
    .attr('width', size)
    .attr('height', size);
  
  for (var i = 0; i < 20; i++) {
    drawRandomPattern(0, size);
  }
  
  // for (var i = 0; i < 50; i++) {
  //   drawRandomPattern(1, size);
  // }
}

function getRandomColor() {
  var indx = getRandomNumberBetween(0, colors.length - 1);
  return colors[indx];
}


function drawRandomPattern(i, maxSize) {
  var hX = w / 2;
  var hY = h / 2;
  
  var startAngle = getRandomNumberBetween(0, 10);
  var spread = getRandomNumberBetween(10, maxSize/2 - 20);
  
  var color = getRandomColor();
  
  var arr = [4, 6, 8, 10, 12, 16];
  var indx = Math.floor(Math.random() * arr.length);
  
  var step = 2 * Math.PI / arr[indx];
  var r = getRandomNumberBetween(2, 4 * (maxSize / 256));
  
  for(var theta = startAngle;  theta < (2 * Math.PI) + startAngle;  theta += step) {
    svgs[i].append('circle')
      .attr('cx', hX)
      .attr('cy', hY)
      .attr('fill', color)
      .attr('opacity', 0)
      .transition()
      .duration(5000)
      .attr('cx', (maxSize / 2) + (Math.cos(theta) * spread))
      .attr('cy', (maxSize / 2) - (Math.sin(theta) * spread))
      .attr('r', r)
      .attr('opacity', getRandomNumberBetween(50, 80) / 100)
  }
}

function getRandomNumberBetween(a, b) {
  return Math.floor(Math.random() * b) + a;
}


var app = {};

app.drawFlowers = function() {

  $('.flower').each(function() {
    var size = $(this).attr('size');
    makeFlower(this, size);
  });

};

app.initAnimations = function() {
  animationsOn = true;
  $('#buildings_wrap,#pods_wrap').show();
  $('#pods').addClass('spin');
  $('#stop_css3').show();
};

app.stopAnimations = function(fade) {
  animationsOn = false;
  $('#pods').removeClass('spin');

  if ((fade!==undefined)&& fade) {
    $('#buildings_wrap').fadeOut(2000);
  } else {
    $('#buildings_wrap').hide();
  }

  $('#stop_css3').hide();
};

app.drawFlowers();
app.initAnimations();


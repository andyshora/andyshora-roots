function loadShapes() {

  var svg1 = d3.select('#shapes-container'); // intro demo
  var svg2 = d3.select('#shapes-container-2'); // simple demo
  var svg3 = d3.select('#shapes-container-3');  // advanced demo
  var svg4 = d3.select('#shapes-container-4');  // advanced demo

  var c1 = svg1.select('#circle-1');
  var c2 = svg1.select('#circle-2');
  var p1 = svg1.select('#path-1');
  var p2 = svg1.select('#path-2');
  var p3 = svg1.select('#path-3');
  var p4 = svg1.select('#path-4');

  // var p5 = svg1.select('#path-5');

  // p5.attr('d', generateSVGSegment(200, 50, 20, 0, 160));

  var r1 = svg2.select('#rect-1');

  var e1 = svg3.select('#eye-1');
  var e1 = svg3.select('#eye-2');
  var m1 = svg3.select('#mouth');

  var pie1 = svg4.select('#pie');

  var DURATION = 4000;

  var tween1 = function() {
    var newRadius = parseInt(c1.attr('r'), 10) === 5 ? 15 : 5;
    c1.transition().duration(DURATION)
      .attr('r', newRadius).each('end', tween1);
  };

  var tween2 = function() {
    c2.transition().duration(DURATION)
      .attrTween('cx', function() {
        return t => 70 + (Math.cos((t * 360) * (Math.PI / 180)) * 20);
      })
      .attrTween('cy', function() {
        return t => 50 + (Math.sin((t * 360) * (Math.PI / 180)) * 20);
      })
      .each('end', tween2);
  };

  var tween3 = function() {
    p1.transition().duration(DURATION)
      .attrTween('d', function() {
        // M x y
        // S x2 y2 x y
        return function(t) { return 'M 120 50 s 20 ' + (t * 30 - 15) + ' 40 0'; };
      })
      .each('end', tween3);
  };

  var tween4 = function() {
    p2.transition().duration(DURATION)
      .attrTween('d', function() {
        return interpolateSVGArc(200, 50, 20, 0, 359.99);
      })
      .each('end', tween4);
  };

  // pie segment
  var tween5 = function() {
    p3.transition().duration(DURATION)
      .attrTween('d', function() {
        return interpolateSVGSegment(270, 50, 20, 0, 359.99);
      })
      .each('end', tween5);
  };

  var tween6 = function() {

    r1.attr('width', 0);

    r1.transition().duration(DURATION)
      .attr('width', 250)
      .each('end', tween6);
  };

  var tween7 = function() {

    m1.transition().duration(DURATION)
      .attrTween('d', function() {
        // M x y
        // S x2 y2 x y
        return function(t) { return 'M 50 200 s 100 ' + (t * 200 - 100) + ' 200 0'; };
      })
      .each('end', tween7);
  };

  // pie segment
  var tween8 = function() {
    pie1.transition().duration(DURATION)
      .attrTween('d', function() {
        return interpolateSVGSegment(150, 175, 100, 0, 270);
      })
      .each('end', tween8);
  };

  tween1();
  tween2();
  tween3();
  tween4();
  tween5();

  // rect example
  tween6();

  // smile example
  tween7();

  // pie example
  tween8();

}

function interpolateSVGArc(x, y, r, startAngle, endAngle) {
  return function(t) {
    return generateSVGArc(x, y, r, startAngle, startAngle + ((endAngle - startAngle) * t));
  }
}

function interpolateSVGSegment(x, y, r, startAngle, endAngle) {
  return function(t) {
    return generateSVGSegment(x, y, r, startAngle, startAngle + ((endAngle - startAngle) * t));
  }
}

function d2r(degs) {
  return degs * (Math.PI / 180);
}

function generateSVGSegment(x, y, r, startAngle, endAngle) {

  startAngle *= (Math.PI / 180);
  endAngle *= (Math.PI / 180);

  var largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;
  var sweepFlag = 1;

  return ['M', x, y, 'L', x + Math.sin(startAngle) * r, y - (Math.cos(startAngle) * r),
          'A', r, r, 0, largeArc, sweepFlag, x + Math.sin(endAngle) * r, y - (Math.cos(endAngle) * r), 'Z'
         ].join(' ');
}

function generateSVGArc(x, y, r, startAngle, endAngle) {

  // convert angles to Radians
  startAngle = d2r(startAngle);
  endAngle = d2r(endAngle);

  if (startAngle > endAngle) {
    var s = startAngle;
    startAngle = endAngle;
    endAngle = s;
  }

  // if arc is > 180 degrees, we must set a large arc flag
  // so the path isnt drawn via shortest path
  var largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

  // path command, start by moving cursor
  var arr = ['M', x + Math.sin(startAngle) * r, y - (Math.cos(startAngle) * r)];

  var rx = r;
  var ry = r;

  var sweepFlag = 1;

  // arc command
  arr = arr.concat(['A', rx, ry, 0, +largeArcFlag, sweepFlag]);

  // arc end position
  arr = arr.concat([x + Math.sin(endAngle) * r, y - (Math.cos(endAngle) * r)]);

  return arr.join(' ');
}

window.onload = loadShapes();
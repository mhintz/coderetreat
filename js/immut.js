var chai = require('chai');
var assert = chai.assert;

var BOARD_SIDE = 40;

function randomState() {
  return Math.round(Math.random());
}

function range(n) {
  return (new Array(n)).join('-').split('-').map(function(_, i) { return i; });
}

function getBoard(side) {
  return range(side).map(function() { return range(side).map(randomState); });
}

function withinOne(a, b) { return Math.abs(a - b) === 1; }
function same(a, b) { return a === b; }
function isNeighbor(xA, yA, xB, yB) { return (withinOne(xA, xB) && withinOne(yA, yB)) || (same(xA, xB) && withinOne(yA, yB)) || (withinOne(xA, xB) && same(yA, yB)); }

function countNeighbors(myX, myY, board) {
  return board.reduce(function(boardSum, row, otherX) {
    var rowTotal = row.reduce(function(rowSum, value, otherY) {
      return rowSum + (+isNeighbor(myX, myY, otherX, otherY) * value);
    }, 0);

    return boardSum + rowTotal;
  }, 0);
}

function aliveToAlive(v, n) { return +(v && n > 1 && n < 4); }
function deadToAlive(v, n) { return +(!v && n == 3); }
function nextState(v, n) { return +(aliveToAlive(v, n) || deadToAlive(v, n)); }

function nextValue(val, x, y, board) {
  var n = countNeighbors(x, y, board);
  return nextState(val, n);
}

function generateNextStep(board) {
  return board.map(function(row, x) {
    return row.map(function(value, y) {
      return nextValue(value, x, y, board);
    });
  });
}

var DISP_VAL = {
  0: ".",
  1: "#"
}

function display(board) {
  var str = board.map(function(row) {
    return row.map(function(v) { return DISP_VAL[v]; }).join(' ');
  }).join('\n');
  console.log(str);
}

var count = 0;

function update(board) {
  console.log(range(BOARD_SIDE).map(function() { return '-'; }).join(''), count++);
  display(board);
  return setTimeout(function(nextboard) {
    update(nextboard);
  }, 200, generateNextStep(board));
}

function runTests() {
  assert(range(100).length === 100, 'range works');
  assert(getBoard(100).length === 100, 'get board has correct num of rows');
  assert(getBoard(100).every(function(row) { return row.length === 100; }), 'get board has correct num of columns');
  assert(isNeighbor(1, 1, 0, 0));
  assert(isNeighbor(1, 1, 0, 1));
  assert(isNeighbor(1, 1, 0, 2));
  assert(isNeighbor(1, 1, 1, 0));
  assert(!isNeighbor(1, 1, 1, 1)); // Not
  assert(isNeighbor(1, 1, 1, 2));
  assert(isNeighbor(1, 1, 2, 0));
  assert(isNeighbor(1, 1, 2, 1));
  assert(isNeighbor(1, 1, 2, 2));
  assert(!isNeighbor(1, 1, 2, 3));
  assert(!isNeighbor(1, 1, 20, 20));
  

}

runTests();

update(getBoard(BOARD_SIDE));



// [x - 1][y - 1]
// [x][y - 1]
// [x + 1][y - 1]
// [x - 1][y]
// [x + 1][y]
// [x - 1][y + 1]
// [x][y + 1]
// [x + 1][y + 1]








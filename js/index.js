var BOARD_SIDE = 500;
var SPEED = 200;

function range(n) {
  var ret = [];
  for (var i = 0; i < n; i++) {
    ret.push(i);
  }
  return ret;
}

function createBoard() {
  return range(BOARD_SIDE).map(function(x) {
    return range(BOARD_SIDE).map(function(y) {
      return Math.round(Math.random());
    });
  });
}

function drawBoard(board) {
  var printed = "";
  board.forEach(function(column) {
    printed += column.map(function(val) {
      return val === 1 ? "#" : "-";
    }).join('');
    printed += "\n";
  });

  console.log(printed);
}

var mainBoard = createBoard();

function idx(i) { return i < 0 ? BOARD_SIDE + i : i % BOARD_SIDE; }

function countNeighbors(x, y, board) {
  return (
    board[idx(x - 1)][idx(y - 1)] + // Above left
    board[idx(x)][idx(y - 1)] + // Above
    board[idx(x + 1)][idx(y + 1)] + // Above right
    board[idx(x - 1)][idx(y)] + // Left
    board[idx(x + 1)][idx(y)] + // Right
    board[idx(x - 1)][idx(y + 1)] + // Lower left
    board[idx(x)][idx(y + 1)] + // Lower
    board[idx(x + 1)][idx(y + 1)] // Lower right
  );
}

function getState(current, neighbors) {
  if (current) {
    return neighbors >= 2 && neighbors <= 3 ? 1 : 0;
  } else {
    return neighbors === 3 ? 1 : 0;
  }
}

function tick(board) {
  var newBoard = createBoard();
  for (var x = 0; x < board.length; ++x) {
    var column = board[x];
    for (var y = 0; y < column.length; ++y) {
      newBoard[x][y] = getState(column[y], countNeighbors(x, y, board));
    }
  }
  return newBoard;
}

setInterval(function() {
  mainBoard = tick(mainBoard);
  drawBoard(mainBoard);
}, SPEED);

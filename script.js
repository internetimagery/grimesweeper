
function build_board(width, height) {
	// { COL: { ROW: VAL } }
	var row = {};
	for (var i = 0; i < width; ++i) {
		var col = {};
		for (var j = 0; j < height; ++j) {
			col[j] = 0;
		}
		row[i] = col;
	}
	return row;
}

function populate_board(board, num_bombs) {
	// Get all keys from the board so we can pick some to be bombs
	var keys = [];
	for (var row in board) {
		for (var col in board[row]) {
			keys.push([row, col]);
		}
	}
	num_bombs = keys.length > num_bombs ? num_bombs : keys.length;

	// Pick our bombs...
	var bombs = [];
	for (var i = 0; i < num_bombs; ++i) {
		while (true) {
			var bomb_index = keys.length * Math.random() << 0;
			if (!(bomb_index in bombs)) {
				bombs.push(bomb_index);
				break
			}
		}
	}

	// Place our bombs..
	for (var bomb_index of bombs) {
		var bomb = keys[bomb_index];
		board[bomb[0]][bomb[1]] = -1;
	}
}

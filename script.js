
function build_board(width, height) {
	// { COL: { ROW: VAL } }
	var row = new Map();
	for (var i = 0; i < width; ++i) {
		var col = new Map();
		for (var j = 0; j < height; ++j) {
			col.set(j, 0);
		}
		row.set(i, col);
	}
	return row;
}

function populate_board(board, num_bombs) {
	// Get all keys from the board so we can pick some to be bombs
	var keys = [];
	for (var [row, cols] of board.entries()) {
		for (var [col, val] of cols.entries()) {
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
		board.get(bomb[0]).set(bomb[1], -1);
	}

	// Update our numbers
	for (var [row, cols] of board.entries()) {
		for (var [col, val] of cols.entries()) {
			if (val == -1) {
				// Already a bomb, skip it
				continue;
			}
			var num_bombs = get_number(row, col, board);
			board.get(row).set(col, num_bombs);
		}
	}
}


function get_number(row_index, col_index, board) {
	var bomb_count = 0;
	for (var row = row_index - 1; row <= row_index + 1; ++row) {
		if (row < 0) {
			continue;
		}
		for (var col = col_index - 1; col <= col_index + 1; ++col) {
			if (col < 0) {
				continue;
			}
			var bomb = is_bomb(row, col, board);
			if (bomb) {
				if (row == row_index && col == col_index) {
					return -1;
				}
				++bomb_count;
			}
		}
	}
	return bomb_count;
}


function is_bomb(row_index, col_index, board) {
	if (!board.has(row_index)) {
		return false;
	}
	var row = board.get(row_index);
	if (!row.has(col_index)) {
		return false;
	}
	var val = row.get(col_index);
	return val == -1;
}



function build_reference(board, rows) {
	// Build out our reference structure
	// bigger than the initial board.

	// First get all real values we need from the board.
	// So we can be sure they have a reference.
	var vals = new Set();
	var board_size = 0;
	for (var [row, cols] of board.entries()) {
		for (var [col, val] of cols.entries()) {
			vals.add(val);
			++board_size;
		}
	}

	// Take all our values. Then add a bunch more to break things
	// up and make the connections less obvious.
	var entries = Array.from(vals);
	var quad_entries = 1.2 * board_size;
	var total_entries = quad_entries - quad_entries % 3;
	for (var i = vals.size; i < total_entries; ++i) {
		var j = vals.size * Math.random() << 0;
		entries.push(entries[j]);
	}
	shuffleArray(entries);

	if (rows < 1 || rows > 25) {
		throw "Invalid row count";
	}
	var reference = new Map();
	var col_num = entries.length / 3;
	var col_index = 0;
	for (var row_index = 0; row_index < rows; ++row_index) {
		var row = String.fromCharCode(row_index + 65);
		var cols = new Map();
		reference.set(row, cols);
		for (var col = 0; col < col_num; ++col) {
			cols.set(col, entries[col_index]);
			++col_index;
		}
	}
	return reference;

}


function build_relation(board, reference) {
	// Build relationship between board and reference
	var reference_vals = new Map();
	var reference_keys = new Array();
	for (var [row, cols] of reference.entries()) {
		for (var [col, val] of cols.entries()) {
			// reference_vals holds indexes to the reference_keys, pointing to values.
			// reference_keys holds positions pointing to the reference chart position.
			if (reference_vals.has(val)) {
				reference_vals.get(val).push(reference_keys.length);
			} else {
				reference_vals.set(val, [reference_keys.length]);
			}
			var key = new Array(row, col);
			reference_keys.push(key);
		}
	}

	// Build relationship between board items and reference items
	var relation = new Map();
	for (var [row, cols] of board.entries()) {
		var relation_cols = new Map();
		relation.set(row, relation_cols);
		for (var [col, val] of cols.entries()) {
			// Pick from one of the repeated values in the reference chart
			var options = reference_vals.get(val);
			var opt = options[options.length * Math.random() << 0];

			// Backtrack the reference items to get our third number.
			// Clamp to reasonable number so people don't have to count too many numbers.
			var backtrack_num = Math.min(8, opt) * Math.random() << 0;

			var pos = reference_keys[opt - backtrack_num];
			console.log(opt);
			console.log(backtrack_num);
			console.log(pos);
			relation_cols.set(col, [pos[0], pos[1], backtrack_num]);
		}
	}
	return relation;
}


function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

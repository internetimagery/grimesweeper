

function build_reference(board, rows) {
	// Build out our reference structure
	// bigger than the initial board.

	// First get all real values we need from the board.
	// So we can be sure they have a reference.
	var vals = new Set();
	for (var [row, cols] of board.entries()) {
		for (var [col, val] of cols.entries()) {
			vals.add(val);
		}
	}

	// Take all our values. Then add a bunch more to break things
	// up and make the connections less obvious.
	var entries = Array.from(vals);
	var quad_entries = 4 * entries.length;
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
	for (var [row, cols] of reference.entries()) {
		for (var [col, val] of cols.entries()) {
			if (reference_vals.has(val)) {
				reference_vals.get(val).push([row, col]);
			} else {
				reference_vals.set(val, new Array([row, col]));
			}
		}
	}

	var relation = new Map();
	for (var [row, cols] of board.entries()) {
		var relation_cols = new Map();
		relation.set(row, relation_cols);
		for (var [col, val] of cols.entries()) {
			var options = reference_vals.get(val);
			var opt = options[options.length * Math.random() << 0];
			relation_cols.set(col, opt);
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

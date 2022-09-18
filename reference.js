

function build_reference(board) {
	// Build out our reference structure
	// slightly bigger than the initial board.

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

	var reference = new Map();
	var col_num = entries.length / 3;
	var col_index = 0;
	for (var row of "ABC") {
		var cols = new Map();
		reference.set(row, cols);
		for (var col = 0; col < col_num; ++col) {
			cols.set(col, entries[col_index]);
			++col_index;
		}
	}
	return reference;

}


function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

	//var vals = new Map();
	//for (var [row, cols] of board.entries()) {
	//	for (var [col, val] of cols.entries()) {
	//		if (!vals.has(val)) {
	//			var keys = new Array();
	//			vals.set(val, keys);
	//		} else {
	//			var keys = vals.get(val);
	//		}
	//		keys.push([row, col]);
	//	}
	//}

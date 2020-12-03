const knapsack = (items, W) => {
	let item = 0;
	let weight = 0;
	let max_before = 0;
	let max_after = 0;
	let number_of_items = items.length;
	let matrix_weight = new Array(number_of_items + 1);
	let matrix_to_keep = new Array(number_of_items + 1);
	let solution_array = [];

	for (item = 0; item < number_of_items + 1; item++) {
		matrix_weight[item] = new Array(W + 1);
		matrix_to_keep[item] = new Array(W + 1);
	}

	for (item = 0; item <= number_of_items; item++) {
		for (weight = 0; weight <= W; weight++) {

			if (item === 0 || weight === 0) {
				matrix_weight[item][weight] = 0;
			}

			else if (items[item - 1].w <= weight) {
				max_after = items[item - 1].b + matrix_weight[item - 1][weight - items[item - 1].w];
				max_before = matrix_weight[item - 1][weight];

				if (max_after > max_before) {
					matrix_weight[item][weight] = max_after;
					matrix_to_keep[item][weight] = 1;
				}
				else {
					matrix_weight[item][weight] = max_before;
					matrix_to_keep[item][weight] = 0;
				}
			}

			else {
				matrix_weight[item][weight] = matrix_weight[item - 1][weight];
			}
		}
	}

	weight = W;
	item = number_of_items;
	for (item; item > 0; item--) {
		if (matrix_to_keep[item][weight] === 1) {
			solution_array.push(items[item - 1]);
			weight = weight - items[item - 1].w;
		}
	}

	console.log("Max Benefit: ", matrix_weight[number_of_items][W]);
	console.log("Max Benefit From: ", solution_array)
}

// Call Function with 4 items and W=6
knapsack([{ w: 1, b: 2 }, { w: 3, b: 4 }, { w: 2, b: 3 }, { w: 4, b: 11 }], 6);

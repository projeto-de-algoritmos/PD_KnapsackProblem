let count = 1;

class Bank {
	id = ""
	peso = 0
	valor = 0

	constructor(id, peso, valor) {
		this.id = id;
		this.peso = peso;
		this.valor = valor;
	}
}

let banks = [];

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

	mostrarResultado(matrix_weight, number_of_items, W, solution_array);
}

function mostrarResultado(matrix_weight, number_of_items, W, solution_array) {
	const resultado = document.getElementById("resultado");

	const h6 = document.createElement("h6");
	const bank = document.createTextNode(`O máximo de dinheiro que conseguirá levar considerando os caixas disponíveis é ${ matrix_weight[number_of_items][W] }`);
	h6.appendChild(bank);

	const hloco = document.createElement("h6");
	const ban = document.createTextNode(`Você deverá levar malotes dos seguintes caixas eletrônicos: ${ banks.filter(item => solution_array.find(i => i.w === item.peso)).map(item => item.id).join(', ') }`);
	hloco.appendChild(ban);

	resultado.appendChild(h6);
	resultado.appendChild(hloco);
}

function adicionarBanco() {
	const peso = document.getElementById("peso").value;
	const valor = document.getElementById("valor").value;

	if (!peso.length || !valor.length) {
		alert("Você deve preencher o peso e o valor do malote!!");
		return;
	}

	if (banks.find(bank => bank.peso === peso)) {
		alert("Já existe um caixa eletrônico com malotes deste peso!!");
		return;
	}

	banks.push(new Bank(`Caixa Eletrônico ${ count }`, parseInt(peso), parseInt(valor)));

	const bancos = document.getElementById("bancos");

	const h6 = document.createElement("h6");
	const bank = document.createTextNode(`Caixa eletrônico ${ count } \t Peso do malote: ${ peso }\tValor do malote: ${ valor }`);
	h6.appendChild(bank);
	count++;

	bancos.appendChild(h6);

	document.getElementById("peso").value = "";
	document.getElementById("valor").value = "";
}

function finalizar() {
	if (!banks.length) {
		alert("Você deve adicionar no mínimo 1 banco!!");
		return;
	}

	const mochila = document.getElementById("mochila").value;
	if (!mochila.length) {
		alert("Você deve adicionar um peso para sua mochila!!");
		return;
	}

	knapsack(banks.map(item => ({ id: item.id, w: item.peso, b: item.valor })), parseInt(mochila));
}

function mostrarCorpo() {
	const data = document.getElementById("data");
	const description = document.getElementById("description");
	data.style.display = "block";
	description.style.display = "none";
}

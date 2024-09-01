main();

function main() {
	let display = document.querySelector("#display");
	let clearBtn = document.querySelector("#clear");
	let changeSignBtn = document.querySelector("#changeSign");
	let buttons = document.querySelectorAll(".number");
	let operands = document.querySelectorAll(".operand");
	let operateBtn = document.querySelector("#operate");
	let decimalBtn = document.querySelector("#decimal");
	let firstNum, operand, secondNum;

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", () => {
			if (firstNum && operand && !secondNum) display.textContent = "";

			let num = display.textContent.concat(buttons[i].value);
			display.textContent = num;

			if (!operand) firstNum = parseFloat(num);
			else secondNum = parseFloat(num);
		});
	}

	for (let i = 0; i < operands.length; i++) {
		operands[i].addEventListener("click", () => {
			if (firstNum && secondNum && operand) {
				document.getElementById("operate").click();
				operand = operands[i].value;
			} else {
				operand = operands[i].value;
			}
		});
	}

	clearBtn.addEventListener("click", () => {
		display.textContent = "";
		firstNum = secondNum = operand = null;
	});
	changeSignBtn.addEventListener("click", () => {
		if (secondNum) secondNum = changeSign(secondNum);
		else firstNum = changeSign(firstNum);
		display.textContent = changeSign(display.textContent);
	});
	operateBtn.addEventListener("click", () => {
		if (operand == "divide" && secondNum == 0) {
			display.textContent = "not possible";
			firstNum = secondNum = operand = null;
		} else {
			firstNum = operate(firstNum, secondNum, operand, display);
			display.textContent = firstNum;
			secondNum = operand = null;
		}
	});
	decimalBtn.addEventListener("click", () => {
		if (!display.textContent.includes(".")) {
			display.textContent = display.textContent.concat(".");
		}
	});
}

function operate(firstNum, secondNum, operand) {
	let num;
	switch (operand) {
		case "add":
			num = add(firstNum, secondNum);
			break;
		case "subtract":
			num = subtract(firstNum, secondNum);
			break;
		case "multiply":
			num = multiply(firstNum, secondNum);
			break;
		case "divide":
			num = divide(firstNum, secondNum);
			break;
		case "modulo":
			num = modulo(firstNum, secondNum);
			break;
		default:
			break;
	}
	return num;
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function modulo(a, b) {
	return a % b;
}

function changeSign(a) {
	return parseFloat(a) * -1;
}
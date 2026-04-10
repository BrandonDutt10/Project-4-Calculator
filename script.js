const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

let currentValue = "0";
let previousValue = null;
let operator = null;

function updateScreen() {
  screen.textContent = currentValue;
}

function handleNumber(num) {
  if (currentValue === "0") {
    currentValue = num;
  } else {
    currentValue += num;
  }
}

function handleOperator(op) {
  previousValue = parseFloat(currentValue);
  operator = op;
  currentValue = "0";
}

function calculate() {
  const current = parseFloat(currentValue);

  if (previousValue === null || operator === null) return;

  if (operator === "add") {
    currentValue = previousValue + current;
  } else if (operator === "subtract") {
    currentValue = previousValue - current;
  } else if (operator === "multiply") {
    currentValue = previousValue * current;
  } else if (operator === "divide") {
    currentValue = current === 0 ? "Error" : previousValue / current;
  }

  operator = null;
  previousValue = null;
  currentValue = currentValue.toString();
}

function clearAll() {
  currentValue = "0";
  previousValue = null;
  operator = null;
}

function backspace() {
  currentValue = currentValue.slice(0, -1) || "0";
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number) {
      handleNumber(number);
    } else if (action === "clear") {
      clearAll();
    } else if (action === "backspace") {
      backspace();
    } else if (action === "equals") {
      calculate();
    } else {
      handleOperator(action);
    }

    updateScreen();
  });
});

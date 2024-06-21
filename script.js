function add(firstNum, secondNum) {
  return (firstNum + secondNum);
}

function subtract(firstNum, secondNum) {
  return (firstNum - secondNum);
}

function multiply(firstNum, secondNum) {
  return (firstNum * secondNum);
}

function divide(firstNum, secondNum) {
  return (firstNum / secondNum);
}

let firstNumber,
    operator,
    secondNumber;

function operate(firstNum, operator, secondNum) {
  if (operator === "+") {
    return add(firstNum, secondNum);
  }
  else if (operator === "-") {
    return subtract(firstNum, secondNum);
  }
  else if (operator === "*") {
    return multiply(firstNum, secondNum);
  }
  else if (operator === "/") {
    return divide(firstNum, secondNum);
  }
  else {
    return undefined;
  }
}

const displayAnswer = document.querySelector(".display > .answer");
let equation = null;

const btn = document.querySelector(".buttons");
btn.addEventListener("click", (e) => {
  const btnValue = e.target.value;
  if (btnValue === "AC") {
    displayAnswer.textContent = "";
    equation = displayAnswer.textContent;
  }
  else if (btnValue === "=") {
    console.log(equation);
  }
  else {
    displayAnswer.textContent += btnValue;
    equation = displayAnswer.textContent;
  }
})
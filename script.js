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

const allBtns = document.querySelectorAll(".calc-button");
allBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnValue = e.target.value;

    // Clear the display if user presses a numeric key after displaying the answer of a previous calculation
    if (displayAnswer.textContent.includes("=")) {
      if (btnValue === "+" || btnValue === "-" || btnValue === "*" || btnValue === "/") {
        displayAnswer.textContent = displayAnswer.textContent.slice(1);
      }
      else {
        displayAnswer.textContent = "";
      }
    }

    // Handle different key presses
    if (btnValue === "AC") {
      displayAnswer.textContent = "";
      equation = displayAnswer.textContent;
    }
    else if (btnValue === "C") {
      const length = displayAnswer.textContent.length;
      displayAnswer.textContent = displayAnswer.textContent.slice(0, length - 1);
      equation = displayAnswer.textContent;
    }
    else if (btnValue === "=") {
      switch(displayAnswer.textContent) {
        case "":
        case null:
          break;

        default:
          // Find all the indices where any operator is present
          const eqnArray = Array.from(equation);
          let index = [];
          for (let i = 0; i < eqnArray.length; i++) {
            if (eqnArray[i] == "+" || eqnArray[i] == "-" || eqnArray[i] == "*" || eqnArray[i] == "/") {
              index.push(i);
            }
          }
            
          let total = 0;

          for (let i = 0; i < index.length; i++) {
            // First sign
            if (i === 0) {
              firstNumber = +eqnArray.slice(0, index[i]).join("");
              operator = eqnArray[index[i]];
              secondNumber = +eqnArray.slice(index[i] + 1, index[i + 1]).join("");
              console.log(firstNumber);
              console.log(operator);
              console.log(secondNumber);
            }
            // Last sign
            else if( i === (index.length - 1)) {
              firstNumber = total;
              operator = eqnArray[index[i]];
              secondNumber = +eqnArray.slice(index[i] + 1).join("");
              console.log(firstNumber);
              console.log(operator);
              console.log(secondNumber);
            }
            // All intermediate signs
            else {
              firstNumber = total;
              operator = eqnArray[index[i]];
              secondNumber = +eqnArray.slice(index[i] + 1, index[i + 1]).join("");
              console.log(firstNumber);
              console.log(operator);
              console.log(secondNumber);
            }

            total = operate(firstNumber, operator, secondNumber);
          }

          displayAnswer.textContent = `=${total}`;
      }
    }
    else {
      displayAnswer.textContent += btnValue;
      equation = displayAnswer.textContent;
    }
  });
});

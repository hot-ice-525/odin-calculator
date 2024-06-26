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

let countOfDecimals = 0;

let numbersArray = [];
let operatorsArray = [];
let previousEqn = "";

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
let equation = "";

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

      numbersArray = [];
      operatorsArray = [];
      equation = displayAnswer.textContent;
      previousEqn = "";
    }

    // Handle different key presses
    if (btnValue === "AC") {
      countOfDecimals = 0;
      numbersArray = [];
      operatorsArray = [];
      previousEqn = "";
      displayAnswer.textContent = "";
      equation = displayAnswer.textContent;
    }

    else if (btnValue === "C") {
      const length = displayAnswer.textContent.length;
      if (displayAnswer.textContent[length - 1] === ".") {
        countOfDecimals = 0;
      }
      let clearEqn = displayAnswer.textContent.slice(0, length - 1);

      if (clearEqn.includes(previousEqn)) {
        displayAnswer.textContent = clearEqn;
        equation = displayAnswer.textContent;
      }
    }

    else if (btnValue === "+" ||
          btnValue === "-" ||
          btnValue === "*" ||
          btnValue === "/"
    ) {
      countOfDecimals = 0;
      let length = equation.length;
      let lastDigit = equation[length - 1];
      if (lastDigit === "+" ||
          lastDigit === "-" ||
          lastDigit === "*" ||
          lastDigit === "/"
      ) {
        displayAnswer.textContent = displayAnswer.textContent.slice(0, length - 1) + btnValue;
        operatorsArray.splice((operatorsArray.length - 1), 1, btnValue);
      }
      else {
        let number = equation.replace(previousEqn, "");
        if (number) {
          numbersArray.push(+number);
        }
        operatorsArray.push(btnValue);
        displayAnswer.textContent += btnValue;
      }
      
      equation = displayAnswer.textContent;
      previousEqn = equation;
    }

    else if (btnValue === "=") {
      countOfDecimals = 0;
      switch(displayAnswer.textContent) {
        case "":
        case null:
          break;

        default:
          let lastNumber = equation.replace(previousEqn, "");
          if (lastNumber) {
            numbersArray.push(+lastNumber);
          }

          let error = 0;
          if (operatorsArray.length === (numbersArray.length - 1)) {
            // Follow BODMAS
            // Solve multiplication and division
            for (let i = 0; i < operatorsArray.length; i++) {
              if (operatorsArray[i] === "*" || operatorsArray[i] === "/") {
                firstNumber = numbersArray[i];
                operator = operatorsArray[i];
                secondNumber = numbersArray[i + 1];
                // Throw an error if 0 is in denominator upon divison
                if (operator === "/" && secondNumber === 0) {
                  error = 1;
                  break;
                }
                let answer = operate(firstNumber, operator, secondNumber);
                // Replace first and second number by their answer
                numbersArray.splice(i, 2, answer);
                // Remove the operator from its array
                operatorsArray.splice(i, 1);
                i--;
              }
            }

            if (error === 0) {
              // Solve addition and substraction
              for (let i = 0; i < operatorsArray.length; i++) {
                if (operatorsArray[i] === "+" || operatorsArray[i] === "-") {
                  firstNumber = numbersArray[i];
                  operator = operatorsArray[i];
                  secondNumber = numbersArray[i + 1];
                  let answer = operate(firstNumber, operator, secondNumber);
                  // Replace first and second number by their answer
                  numbersArray.splice(i, 2, answer);
                  // Remove the operator from its array
                  operatorsArray.splice(i, 1);
                  i--;
                }
              }
            }
          }
          else {
            error = 1;
          }

          // Display the answer
          if (error === 0) {
            let total = numbersArray[0];
            let formatTotal = total.toFixed(3);
            let numIntoThousand = formatTotal * 1000;
            /* Round off the result to 3 decimal places if it is a decimal
               with more than 3 decimal places */          
            // We don't need trailing zeros after decimal point
            if (numIntoThousand % 1000 === 0) {
              displayAnswer.textContent = `=${total.toFixed()}`;
            }
            else if (numIntoThousand % 100 === 0) {
              displayAnswer.textContent = `=${total.toFixed(1)}`;
            }
            else if (numIntoThousand % 10 === 0) {
              displayAnswer.textContent = `=${total.toFixed(2)}`;
            }
            else {
              displayAnswer.textContent = `=${total.toFixed(3)}`;
            }
          }
          else {
            displayAnswer.textContent = "Error";
            numbersArray  = [];
            operatorsArray = [];
          }
      }
    }
    
    else {
      if (btnValue === ".") {
        countOfDecimals++;
      }

      // Don't allow the user to enter mulitple decimals
      if (!(btnValue === "." && countOfDecimals > 1)) {
        displayAnswer.textContent += btnValue;
        equation = displayAnswer.textContent;
      }
    }
  });
});
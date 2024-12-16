/*-------------------------------- Constants --------------------------------*/
const numberButtons = document.querySelectorAll(".button.number");
const operatorButtons = document.querySelectorAll(".button.operator");
const equalsButton = document.querySelector(".button.equals");
/*-------------------------------- Variables --------------------------------*/
let inputA = [];
let inputB = [];
let operatorHasBeenSelected = false;
let selectedOperator = "";
let result = 0;
let newCalculation = true;
/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector(".display");
/*----------------------------- Event Listeners -----------------------------*/
numberButtons.forEach((button) => {
  ///listens to which button is pressed by iterating over all of them
  button.addEventListener("click", () => {
    if (result === "dividebyzero") {
      ///in the event the previous result was divide by zero it resets the calculator
      clearDisplay();
      resetAll();
    } else {
      if (newCalculation && !operatorHasBeenSelected) {
        /// if its a new calculation and no operator selected yet add to inputA and display
        inputA.push(button.textContent);
        ///console.log(inputA);
        let buttonPressed = Number(button.textContent);
        addDisplay(buttonPressed);
      } else if (newCalculation && operatorHasBeenSelected) {
        /// if its a new calculation and operator selected alr add to input B and display
        inputB.push(button.textContent);
        ///console.log(inputB);
        let buttonPressed = Number(button.textContent);
        addDisplay(buttonPressed);
      } else if (!newCalculation && operatorHasBeenSelected) {
        /// if its a ongoing calculation using the value of the prior result as input A and operator is selected add to input B and display
        inputB.push(button.textContent);
        ///console.log(inputB);
        let buttonPressed = Number(button.textContent);
        addDisplay(buttonPressed);
      }
    }
  });
});
operatorButtons.forEach((button) => {
  ///listens to which button is pressed by iterating over all of them
  button.addEventListener("click", () => {
    let buttonPressed = button.textContent; ///define buttonPressed using the value of the operator
    if (buttonPressed === "C") {
      ///special case if C is pressed to clear all and reset the display
      clearDisplay();
      resetAll();
      return;
    } else if (!operatorHasBeenSelected) {
      ///otherwise carry on if no operator has been selected prior to this selection
      selectedOperator = button.textContent;
      operatorHasBeenSelected = true; ///set tbe value to true so you cannot select the operator again
      ///console.log(selectedOperator);
      addDisplay(buttonPressed); ///add your operator to the display
    }
  });
});
equalsButton.addEventListener("click", () => {
  /// when the = is pressed
  if (operatorHasBeenSelected) {
    const A = convertToInt(inputA); /// converts the array of inputs into a single string then convers the string into a number
    const B = convertToInt(inputB);
    result = useOperator(selectedOperator, A, B); /// uses the operator on the inputs and returns a result
    ///console.log(result);
    clearDisplay(); /// clears the display to show the result
    if (typeof result != "number") {
      ///if your result is not a number meaning you divide by zero display the error
      addDisplay("Cannot Divide by 0!");
      result = "dividebyzero";
    } else {
      /// else save the result as inputA for the next operation and display the result
      keepResult(result);
      addDisplay(result);
    }
  }
});
/*-------------------------------- Functions --------------------------------*/
function convertToInt(input) {
  ///function to convert the inputs that are in [1,2,3] form to a string "123" then to numbers 123
  const reducedInput = input.join("");
  const numInput = Number(reducedInput);
  return numInput;
}

function useOperator(selectedOperator, A, B) {
  switch (
    selectedOperator ///switch function to select which operator is chosen
  ) {
    case "+":
      return A + B;
    case "-":
      return A - B;
    case "/":
      if (B === 0) {
        return null; ///only one that doesnt return a number as the denominator is zero
      } else {
        return A / B;
      }
    case "*":
      return A * B;
  }
}
function resetAll() {
  /// resets all logic and values back to original state
  inputA = [];
  inputB = [];
  selectedOperator = "";
  operatorHasBeenSelected = false;
  result = 0;
  newCalculation = true;
}
function keepResult(result) {
  /// saves the result to inputA in the original format of a string array etc. ["123"] so that the array methods and number methods function normally
  inputA = [result.toString()];
  inputB = []; /// reset all other values to default
  selectedOperator = "";
  operatorHasBeenSelected = false;
  newCalculation = false; /// keeps newCalculation as false so that inputB is taken as user input
}

function clearDisplay() {
  /// clears the display
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
}
function addDisplay(content) {
  /// adds the content to the display in an inline element <span></span>
  const span = document.createElement("span");
  span.textContent = content;
  display.appendChild(span);
}

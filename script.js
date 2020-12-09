class Calculator {
  constructor(preValText, currValText) {
    this.preValText = preValText;
    this.currValText = currValText;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand + number;
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "×":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  getDisplayNumber(number) {
    const stringNum = number.toString();
    const integerNums = parseFloat(stringNum.split(".")[0]);
    const decimalNums = stringNum.split(".")[1];
    const floatNumber = parseFloat(number);
    let intergerDisplay;
    if (isNaN(intergerDisplay)) {
      intergerDisplay = "";
    } else {
      intergerDisplay = integerNums.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalNums != null) {
      return `${intergerDisplay}.${decimalNums}`;
    }
    if (isNaN(floatNumber)) return "";
    return floatNumber.toLocaleString("en");
  }
  updateDisplay() {
    if (this.currValText.length > 16) return;
    this.currValText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.preValText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )}${this.operation}`;
    } else {
      this.preValText.innerText = "";
    }
  }
}
const numberbtns = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClear = document.querySelector("[data-allclear]");
const preValText = document.querySelector("[data-previous]");
const currValText = document.querySelector("[data-current]");

const calculator = new Calculator(preValText, currValText);

numberbtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operators.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
allClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

function toggleDarkMode() {
  document.querySelector(".cali-grid").classList.toggle("dark");
  document.querySelector(".drkbtn").classList.toggle("btndarkmode");
  document.querySelector("body").classList.toggle("darkbody");

}
var darkBtn = document
  .querySelector(".drkbtn")
  .addEventListener("click", toggleDarkMode);

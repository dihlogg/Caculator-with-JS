const numbers = document.querySelectorAll(".numbers");
const result = document.querySelector(".display span");
const signs = document.querySelectorAll(".sign");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const undos = document.querySelector(".undo");
const percent = document.querySelector(".percent");

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (e) => {
    let atr = e.target.getAttribute("value");
    if (isFirstValue === false) {
      getFirstValue(atr);
    }
    if (isSecondValue === false) {
      getSecondValue(atr);
    }
  });
}

function getFirstValue(el) {
  result.innerHTML = "";
  firstValue += el;
  result.innerHTML = firstValue;
  firstValue = +firstValue;
}

function getSecondValue(el) {
  if (firstValue != "" && sign != "") {
    secondValue += el;
    result.innerHTML = secondValue;
    secondValue = +secondValue;
  }
}

function getSign() {
  for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener("click", (e) => {
      if (firstValue !== "") {
        sign = e.target.getAttribute("value");
        isFirstValue = true;
      }
    });
  }
}
getSign();

equals.addEventListener("click", () => {
  result.innerHTML = "";
  if (firstValue === "") {
    firstValue = "0";
  }
  if (sign === "+") {
    resultValue = firstValue + secondValue;
  }
  if (sign === "-") {
    resultValue = firstValue - secondValue;
  }
  if (sign === "*") {
    resultValue = firstValue * secondValue;
  }
  if (sign === "/") {
    resultValue = firstValue / secondValue;
  }
  result.innerHTML = resultValue;
  firstValue = resultValue;
  secondValue = "";
  isFirstValue = false;
  isSecondValue = false;

  checkResultLength();
});

function checkResultLength() {
  resultValue = JSON.stringify(resultValue);
  if (resultValue.length >= 8) {
    resultValue = JSON.parse(resultValue);
    result.innerHTML = resultValue.toFixed(5);
  }
}

percent.addEventListener("click", () => {
  result.innerHTML = "";
  if (firstValue != "") {
    resultValue = firstValue / 100;
    firstValue = resultValue;
  }
  if (firstValue != "" && secondValue != "") {
    resultValue = resultValue / 100;
  }
  result.innerHTML = resultValue;
});

undos.addEventListener("click", () => {
  resultValue = result.innerHTML.slice(0, -1);
  resultValue = resultValue === "" ? "0" : resultValue;
  result.innerHTML = resultValue;
  firstValue = resultValue;
  firstValue = "";
  isFirstValue = false;
  secondValue = "";
  isSecondValue = false;
  sign = "";
  resultValue = 0;
});

clear.addEventListener("click", () => {
  result.innerHTML = 0;
  firstValue = "";
  isFirstValue = false;
  secondValue = "";
  isSecondValue = false;
  sign = "";
  resultValue = 0;
});

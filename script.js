function main() {
  const lastValue = document.querySelector('#upper-screen');
  const currentValue = document.querySelector('#lower-screen');

  const evalButton = document.querySelector('#eval');
  const clearButton = document.querySelector('#clear');
  const dotButton = document.querySelector('#dot');
  const deleteButton = document.querySelector('#delete');

  const operatorButtons = document.querySelectorAll('.operator');
  const numberButtons = document.querySelectorAll('.number');

  const expression = {
    firstValue: '',
    operator: ''
  };

  numberButtons.forEach(button => button.addEventListener("click", e => handleNumber(e.target.innerText, currentValue)));
  operatorButtons.forEach(button => button.addEventListener("click", e => handleOperator(e.target.innerText, expression, lastValue, currentValue)));
  dotButton.addEventListener("click", () => handleDot(currentValue));

  deleteButton.addEventListener("click", () => handleDelete(currentValue));
  clearButton.addEventListener("click", () => handleClear(expression, lastValue, currentValue));
  evalButton.addEventListener("click", () => handleEval(expression, lastValue, currentValue));
}

function handleNumber(number, currentValue) {
  currentValue.innerText = parseFloat(currentValue.innerText + number);
}

function handleDelete(currentValue) {
  currentValue.innerText = currentValue.innerText.slice(0, -1);
  if (!currentValue.innerText)
    currentValue.innerText = 0;
}

function handleDot(currentValue) {
  if (currentValue.innerText.indexOf('.') === -1)
    currentValue.innerText += '.';
}

function handleClear(expression, lastValue, currentValue) {
  lastValue.innerText = '';
  currentValue.innerText = 0;

  expression.value = '';
  expression.operator = '';
}

function handleOperator(operator, expression, lastValue, currentValue) {
  expression.value = currentValue.innerText;
  expression.operator = operator;
  lastValue.innerText = `${expression.value} ${expression.operator}`;
  currentValue.innerText = 0;
}

function handleEval(expression, lastValue, currentValue) {

}

main();


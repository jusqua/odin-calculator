function main() {
  const lastValue = document.querySelector('#upper-screen');
  const currentValue = document.querySelector('#lower-screen');

  const evalButton = document.querySelector('#eval');
  const clearButton = document.querySelector('#clear');
  const deleteButton = document.querySelector('#delete');

  const dotButton = document.querySelector('#dot');
  const signButton = document.querySelector('#sign');

  const operatorButtons = document.querySelectorAll('.operator');
  const numberButtons = document.querySelectorAll('.number');

  const expression = {
    firstValue: '',
    operator: ''
  };

  numberButtons.forEach(button => button.addEventListener("click", e => handleNumber(e.target.innerText, currentValue)));
  operatorButtons.forEach(button => button.addEventListener("click", e => handleOperator(e.target.innerText, expression, lastValue, currentValue)));

  dotButton.addEventListener("click", () => handleDot(currentValue));
  signButton.addEventListener("click", () => handleSign(currentValue));

  deleteButton.addEventListener("click", () => handleDelete(currentValue));
  clearButton.addEventListener("click", () => handleClear(expression, lastValue, currentValue));
  evalButton.addEventListener("click", () => handleEval(expression, lastValue, currentValue));
}

function handleNumber(number, currentValue) {
  handleError(currentValue);
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

function handleSign(currentValue) {
  if (currentValue.innerText.indexOf('-') === -1)
    currentValue.innerText = '-' + currentValue.innerText;
  else
    currentValue.innerText = currentValue.innerText.slice(1);
}

function handleClear(expression, lastValue, currentValue) {
  lastValue.innerText = '';
  currentValue.innerText = 0;

  expression.value = '';
  expression.operator = '';
}

function handleOperator(operator, expression, lastValue, currentValue) {
  if (handleError(currentValue)) return;
  const currentOperator = operator;

  const firstValue = (lastValue.innerText && lastValue.innerText.indexOf('=') === -1) &&
    handleEval(expression, lastValue, currentValue) || currentValue.innerText;

  if (!firstValue) return;

  expression.value = currentValue.innerText;
  expression.operator = operator;

  lastValue.innerText = `${expression.value} ${expression.operator}`;
  currentValue.innerText = 0;
}

function handleEval(expression, lastValue, currentValue) {
  const firstValue = parseFloat(expression.value);
  const secondValue = parseFloat(currentValue.innerText);
  const operator = expression.operator;
  const operation = getOperation(operator);
  const result = operation(firstValue, secondValue);

  handleClear(expression, lastValue, currentValue);

  if (!isFinite(result) || isNaN(result)) {
    currentValue.innerText = "Zero Division";
    return '';
  }

  currentValue.innerText = result;
  lastValue.innerText = `${firstValue} ${operator} ${secondValue} =`;

  expression.value = secondValue;
  expression.operator = operator;

  return result;
}

function getOperation(operator) {
  switch (operator) {
    case '+':
      return ((a, b) => a + b);
    case '−':
      return ((a, b) => a - b);
    case '✕':
      return ((a, b) => a * b);
    case '÷':
      return ((a, b) => a / b);
    case 'mod':
      return ((a, b) => a % b);
    default:
      return ((a, b) => console.log("Something is wrong..."));
  }
}

function handleError(currentValue) {
  const value = currentValue.innerText;
  if (isFinite(value) && !isNaN(value))
    return false;

  currentValue.innerText = 0;
  return true;
}

main();


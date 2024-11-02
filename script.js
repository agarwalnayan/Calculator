const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyContainer = document.getElementById('history');
const themeToggle = document.getElementById('theme-toggle');

let currentInput = '';
let operator = '';
let firstOperand = '';
let darkMode = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            resetCalculator();
        } else if (value === '=') {
            if (currentInput && firstOperand) {
                const result = calculate(firstOperand, operator, currentInput);
                display.value = result;
                addToHistory(`${firstOperand} ${operator} ${currentInput} = ${result}`);
                currentInput = result; // Set current input to the result for further calculations
                firstOperand = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                firstOperand = currentInput;
                operator = value;
                currentInput = '';
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark', darkMode);
});

function resetCalculator() {
    currentInput = '';
    firstOperand = '';
    operator = '';
    display.value = '';
}

function calculate(first, operator, second) {
    first = parseFloat(first);
    second = parseFloat(second);

    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second !== 0 ? first / second : 'Error';
        default:
            return second;
    }
}

function addToHistory(entry) {
    const historyEntry = document.createElement('div');
    historyEntry.textContent = entry;
    historyContainer.prepend(historyEntry);
    if (historyContainer.children.length > 10) {
        historyContainer.removeChild(historyContainer.lastChild);
    }
}

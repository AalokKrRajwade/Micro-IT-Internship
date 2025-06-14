const display = document.getElementById("display");

function appendValue(value) {
    const operators = ['+', '-', '*', '/'];
    const lastChar = display.value.slice(-1);

    if (operators.includes(value)) {
        if (display.value === "" || operators.includes(lastChar)) {
            return;
        }
    }

    if (value === '.') {
        let lastOperatorIndex = -1;
        for (let i = display.value.length - 1; i >= 0; i--) {
            if (operators.includes(display.value[i])) {
                lastOperatorIndex = i;
                break;
            }
        }
        const currentNumber = display.value.slice(lastOperatorIndex + 1);
        if (currentNumber.includes('.')) {
            return;
        }
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // alternative to eval function
        display.value = Function('"use strict";return (' + display.value + ')')();
    } catch {
        display.value = "Error";
    }
}

document.addEventListener('keydown', (e) => {
    const allowedKeys = '0123456789+-*/.';
    if (allowedKeys.includes(e.key)) {
        appendValue(e.key);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        clearDisplay();
    }
});
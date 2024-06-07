const result = document.querySelector(".result-row");
let inputBuffer = "0";
let total = 0;
let opBuffer;

function handleClickEvent(value) {
    if (isNaN(parseInt(value))) {
        handleOperation(value);
    } else {
        handleNumber(value);
    }
    updateOutput();
}

function handleOperation(value) {
    switch(value) {
        case "C":
            inputBuffer = "0";
            total = 0;
            break;
        case "←":
            if (inputBuffer.length === 1) {
                inputBuffer = "0";
            } else {
                inputBuffer = inputBuffer.toString().substring(0, inputBuffer.toString().length - 1);
            }
            break;
        case "=":
            if (opBuffer === null) {
                return;
            }
            doOperation(parseInt(inputBuffer));
            opBuffer = null;
            inputBuffer = +total;
            total = 0;
            break;
        case "±":
            if (!inputBuffer.toString().startsWith("-")) {
                inputBuffer = "-" + inputBuffer;
            } else {
                inputBuffer = inputBuffer.toString().substring(1, inputBuffer.toString().length);
            }
            break;
        case "+":
        case "−":
        case "x":
        case "÷":
            doMath(value);
            break;
    }
}

function handleNumber(value) {
    if (inputBuffer === "0" || inputBuffer === "-0") {
        inputBuffer = value;
    } else {
        inputBuffer += value;
    }
}

function doMath(value) {
    if (inputBuffer === "0") {
        return;
    }

    const intBuffer = parseInt(inputBuffer);
    if (total === 0) {
        total = intBuffer;
    } else {
        doOperation(intBuffer);
    }

    opBuffer = value;

    inputBuffer = "0";
}

function doOperation(intBuffer) {
    if (opBuffer === "+") {
        total += intBuffer;
    } else if (opBuffer === "−") {
        total -= intBuffer;
    } else if (opBuffer === "x") {
        total *= intBuffer;
    } else {
        total /= intBuffer;
    }
}

function updateOutput() {
    result.innerText = inputBuffer;
}

function init() {
    return document.querySelector(".calculator").addEventListener("click", function (event) {
        handleClickEvent(event.target.innerText);
    });
}
init();

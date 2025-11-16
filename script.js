const getBillValue = () => {
    const value = document.getElementById('bill-input').value;
    return parseFloat(value) || 0;
};

const getTipPercentage = () => {
    const presetTipValue = document.querySelector('.calculator__tip-button--selected')?.dataset?.value;
    const customTipValue = document.getElementById('tip-custom')?.value;
    return presetTipValue || customTipValue || 0;
};

const getNumberOfPeople = () => {
    const value = document.getElementById('people-input')?.value
    return parseInt(value) || 0;
};

const showPersonError = () => {
    document.getElementById('people-input').classList.add('calculator__people-input--error');
    document.querySelector('.calculator__people-label--error').innerText = 'Can’t be zero';
};

const removePersonError = () => {
    document.getElementById('people-input').classList.remove('calculator__people-input--error');
    document.querySelector('.calculator__people-label--error').innerText = '';
};

const showResult = (tipAmount, totalAmount) => {
    document.getElementById('tip-amount').textContent = `$${tipAmount.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
};


const onTipButtonClick = (event) => {
    resetTipButtons();

    event.target.classList.add('calculator__tip-button--selected');

    document.getElementById('tip-custom').value = '';

    calculateTip();
};

const resetTipButtons = () => {
    document.querySelectorAll('.calculator__tip-button').forEach(button => button.classList.remove('calculator__tip-button--selected'));
};

const enableResetButton = () => {
    document.querySelector('.calculator__reset-button').removeAttribute('disabled');
    document.querySelector('.calculator__reset-button').classList.add('calculator__reset-button--active');
}

const disableResetButton = () => {
    document.querySelector('.calculator__reset-button').disabled = true;
    document.querySelector('.calculator__reset-button').classList.remove('calculator__reset-button--active');
}

const onResetClick = (event) => {
    disableResetButton()

    document.getElementById('bill-input').value = '';
    document.getElementById('tip-custom').value = '';
    document.getElementById('people-input').value = '';
    resetTipButtons();
    removePersonError();
    showResult(0, 0);
}

const onPeopleInput = (event) => {
    const input = event.target;
    const value = parseInt(input.value);

    if (value === 0) {
        showPersonError();
        return;
    }

    if ((value > 0 || isNaN(value)) && input.classList.contains('calculator__people-input--error')) {
        removePersonError();
    }

    calculateTip();
}

const calculateTip = () => {
    const billValue = getBillValue();
    const tipPercentage = getTipPercentage();
    const numberOfPeople = getNumberOfPeople();

    // Validation
    if (numberOfPeople === 0) {
        showPersonError()
        showResult(0, 0);
        return;
    }

    const tipAmount = billValue * (tipPercentage / 100);
    const totalAmount = billValue + tipAmount;

    showResult(tipAmount / numberOfPeople, totalAmount / numberOfPeople);
    enableResetButton();
}

document.querySelectorAll('.calculator__tip-button').forEach(button => button.addEventListener('click', onTipButtonClick));
document.getElementById('bill-input').addEventListener('input', () => calculateTip());
document.getElementById('tip-custom').addEventListener('focus', () => resetTipButtons());
document.getElementById('tip-custom').addEventListener('input', () => calculateTip());
document.getElementById('tip-custom').addEventListener('blur', () => calculateTip());
document.getElementById('people-input').addEventListener('input', onPeopleInput);
document.querySelector('.calculator__reset-button').addEventListener('click', onResetClick);
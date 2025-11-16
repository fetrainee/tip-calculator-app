const resetTipButtons = () => {
    document.querySelectorAll('.calculator__tip-button').forEach(button => button.classList.remove('calculator__tip-button--selected'));
};

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

const showResult = (tipAmount, totalAmount) => {
    document.getElementById('tip-amount').textContent = `$${tipAmount.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
};

const calculateTip = () => {
    const billValue = getBillValue();
    const tipPercentage = getTipPercentage();
    const numberOfPeople = getNumberOfPeople();

    // Validation
    if (numberOfPeople === 0) {
        console.error('Number of people cannot be zero');
        showResult(0, 0);
        return;
    }

    const tipAmount = billValue * (tipPercentage / 100);
    const totalAmount = billValue + tipAmount;

    showResult(tipAmount / numberOfPeople, totalAmount / numberOfPeople);
}

const onTipButtonClick = (event) => {
    resetTipButtons();

    event.target.classList.add('calculator__tip-button--selected');

    document.getElementById('tip-custom').value = '';

    calculateTip();
};

document.querySelectorAll('.calculator__tip-button').forEach(button => button.addEventListener('click', onTipButtonClick));
document.getElementById('tip-custom').addEventListener('focus', () => resetTipButtons());
document.getElementById('tip-custom').addEventListener('input', () => calculateTip());
document.getElementById('tip-custom').addEventListener('blur', () => calculateTip());
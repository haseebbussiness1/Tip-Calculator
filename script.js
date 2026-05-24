const billInput = document.getElementById('bill');
const customTipInput = document.getElementById('customTip');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip-btn');
const resetBtn = document.getElementById('resetBtn');

const billError = document.getElementById('billError');
const tipError = document.getElementById('tipError');
const peopleError = document.getElementById('peopleError');

const totalTipEl = document.getElementById('totalTip');
const grandTotalEl = document.getElementById('grandTotal');
const perPersonEl = document.getElementById('perPerson');

let selectedTip = null;

// Tip button click
tipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tipButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedTip = parseFloat(btn.dataset.tip);
    customTipInput.value = '';
    tipError.textContent = '';
    calculate();
  });
});

// Calculate on any input change
billInput.addEventListener('input', calculate);
customTipInput.addEventListener('input', () => {
  tipButtons.forEach(b => b.classList.remove('active'));
  selectedTip = null;
  calculate();
});
peopleInput.addEventListener('input', calculate);

function calculate() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);
  const customTip = parseFloat(customTipInput.value);
  const tip = selectedTip !== null ? selectedTip : customTip;

  let valid = true;

  // Validate bill
  if (billInput.value === '') {
    billError.textContent = '';
  } else if (isNaN(bill) || bill <= 0) {
    billError.textContent = 'Please enter a valid positive bill amount';
    valid = false;
  } else {
    billError.textContent = '';
  }

  // Validate tip
  if (customTipInput.value !== '' && (isNaN(customTip) || customTip < 0)) {
    tipError.textContent = 'Tip must be 0 or more';
    valid = false;
  } else if (customTipInput.value !== '' && customTip > 100) {
    tipError.textContent = 'Tip cannot be more than 100%';
    valid = false;
  } else {
    tipError.textContent = '';
  }

  // Validate people
  if (peopleInput.value === '') {
    peopleError.textContent = '';
  } else if (isNaN(people) || people < 1 || !Number.isInteger(people)) {
    peopleError.textContent = 'Please enter at least 1 person';
    valid = false;
  } else {
    peopleError.textContent = '';
  }

  // If all valid and all filled
  if (
    valid &&
    billInput.value !== '' &&
    peopleInput.value !== '' &&
    (selectedTip !== null || customTipInput.value !== '')
  ) {
    const tipAmount = bill * (tip / 100);
    const grand = bill + tipAmount;
    const per = Math.ceil((grand / people) * 100) / 100;

    totalTipEl.textContent = `Rs ${tipAmount.toFixed(2)}`;
    grandTotalEl.textContent = `Rs ${grand.toFixed(2)}`;
    perPersonEl.textContent = `Rs ${per.toFixed(2)}`;
  } else {
    totalTipEl.textContent = 'Rs 0.00';
    grandTotalEl.textContent = 'Rs 0.00';
    perPersonEl.textContent = 'Rs 0.00';
  }
}

// Reset
resetBtn.addEventListener('click', () => {
  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = '';
  tipButtons.forEach(b => b.classList.remove('active'));
  selectedTip = null;
  billError.textContent = '';
  tipError.textContent = '';
  peopleError.textContent = '';
  totalTipEl.textContent = 'Rs 0.00';
  grandTotalEl.textContent = 'Rs 0.00';
  perPersonEl.textContent = 'Rs 0.00';
});
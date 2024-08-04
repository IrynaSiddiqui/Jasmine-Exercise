window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupInitialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupInitialValues() {
  const values = { amount: 1000, years: 10, rate: 4.5};
  const amountUI = document.getElementById('loan-amount');
  amountUI.value = values.amount; // WHY?? For better User experience?
  const yearsUI = document.getElementById('loan-years');
  yearsUI.value = values.years; 
  const rateUI = document.getElementById('loan-rate');
  rateUI.value = values.rate; 
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentUIValue = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentUIValue));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12; // Convert percentage to decimal  and Convert yearly rate to monthly 
  const n = Math.floor(values.years * 12);
  return (
    (values.amount * monthlyRate) / 
    (1 - Math.pow((1 + monthlyRate), -n))
  ).toFixed(2); // Returns a string with 2 decimal places
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyUI = document.getElementById('monthly-payment');
  monthlyUI.innerText = '$' + monthly;
}

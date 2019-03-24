const reasonInput = document.querySelector('#input-reason');
const amountInput = document.querySelector('#input-amount');
const cancelBtn = document.querySelector('#btn-cancel');
const confirmBtn = document.querySelector('#btn-confirm');
const expensesList = document.querySelector('#expenses-list');
const totalExpensesOutput = document.querySelector('#total-expenses');
const alertController = document.querySelector('ion-alert-controller');

const clear = () => {
    reasonInput.value = '';
    amountInput.value = '';
};

let totalExpenses = 0;

confirmBtn.addEventListener('click', () => {
    const enteredReason = reasonInput.value;
    const enteredAmount = amountInput.value;

    if (enteredReason.trim().length <= 0 || enteredAmount <= 0 || enteredAmount.trim().length <= 0) {
        alertController.create({
            message: 'Please enter valid values!',
            header: 'Invalid inputs',
            buttons: ['OK']
        }).then(alertElement => {
            alertElement.present();
        });

        return;
    }

    console.log(enteredReason, enteredAmount);

    const newItem = document.createElement('ion-item');
    newItem.textContent = enteredReason + ': $' + enteredAmount;
    totalExpenses += +enteredAmount;

    console.log(totalExpenses);

    expensesList.appendChild(newItem);
    totalExpensesOutput.textContent = '$' + totalExpenses;

    clear();
});

cancelBtn.addEventListener('click', clear);

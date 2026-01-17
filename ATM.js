// Get elements
const balanceRadio = document.getElementById("check-balance");
const depositeRadio = document.getElementById("deposite");
const withdrawRadio = document.getElementById("withdraw");
const offerRadio = document.getElementById("offer");
const exitRadio = document.getElementById("exit");
const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");

// Account details
let account_balance = 500;
let loggedIn = false;
let currentUser = "";

// Login function
function login() {
    while (!loggedIn) {
        let username = window.prompt("Enter Your Name:");
        let pin = window.prompt("Enter Your PIN:");

        // User pressed Cancel
        if (username === null || pin === null) {
            alert("Login cancelled. You must login to use the ATM.");
            return; // Exit login function
        }

        username = username.trim();

        // Empty name
        if (username.length === 0) {
            alert("Name cannot be empty.");
            continue;
        }

        // Format username (first letter capital, rest small)
        username =
            username.charAt(0).toUpperCase() +
            username.slice(1).toLowerCase();

        // Check username & PIN
        if (username === "Zaid" && pin === "1234") {
            alert(`Welcome ${username}`);
            loggedIn = true;
            currentUser = username;
        } else {
            alert("Incorrect username or PIN. Try again.");
        }
    }
}

// Call login when the page loads
login();

//  Handle button click
submitBtn.onclick = function () {

    // CHECK BALANCE
    if (balanceRadio.checked) {
        result.textContent = `Hi ${currentUser}, your current balance is ${account_balance}$.`;
    }

    // DEPOSIT MONEY
    else if (depositeRadio.checked) {
        let amount = window.prompt("Enter amount to deposit:");

        if (amount === null) {
            result.textContent = "Deposit cancelled.";
            return;
        }

        amount = Number(amount);

        if (isNaN(amount) || amount <= 0) {
            result.textContent = "Please enter a valid positive number.";
        } else {
            account_balance += amount;
            result.textContent = `Deposit successful! New balance: ${account_balance}$.`;
        }
    }

    // WITHDRAW MONEY
    else if (withdrawRadio.checked) {
        let amount = window.prompt("Enter amount to withdraw:");

        if (amount === null) {
            result.textContent = "Withdrawal cancelled.";
            return;
        }

        amount = Number(amount);

        if (isNaN(amount) || amount <= 0) {
            result.textContent = "Please enter a valid positive number.";
        } else if (amount > account_balance) {
            result.textContent = `Insufficient balance. You only have ${account_balance}$.`;
        } else {
            account_balance -= amount;
            result.textContent = `Withdrawal successful! New balance: ${account_balance}$.`;
        }
    }

    // LUCKY OFFER
    else if (offerRadio.checked) {
        let luckyNumber = Math.floor(Math.random() * 100) + 1;
        let bonus = 0;

        if (luckyNumber >= 1 && luckyNumber <= 30) {
            bonus = 50;
        } else if (luckyNumber >= 31 && luckyNumber <= 70) {
            bonus = 100;
        } else {
            bonus = 200;
        }

        account_balance += bonus;

        result.textContent = `Your lucky number is ${luckyNumber}. You received a bonus of ${bonus}$. New balance: ${account_balance}$.`;
    }

    // EXIT
    else if (exitRadio.checked) {
        result.textContent = `Thank you for using the ATM, ${currentUser}. Final balance: ${account_balance}$.`;
    }

    // NOTHING SELECTED
    else {
        result.textContent = "Please select an option first.";
    }
};

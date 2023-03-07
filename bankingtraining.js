class BankAccount {
    constructor(name, deposit) {
      this._name = name;
      this._balance = deposit;
    }

    get name() {
      return this._name;
    }

    get balance() {
      return this._balance;
    }

    deposit(amount) {
      if (amount > 0) {
        this._balance += amount;
      }
    }
    debit(amount) {
        if (amount > 0 && amount <= this._balance) {
          this._balance -= amount;
        }
      }
    }

    class Bank {
        static accountInfoList = [];

        static createAccount() {
          const name = document.getElementById("account-name").value;
          const deposit = parseFloat(document.getElementById("deposit").value);
          const account = new BankAccount(name, deposit);
          Bank.accountInfoList.push(account);
          Bank.displayAccounts();
        }

        static displayAccounts() {
          let accountsInfo = "";
          for (const account of Bank.accountInfoList) {
            accountsInfo += `Account Name: ${account.name} Balance: $${account.balance.toFixed(
              2
            )}\n`;
          }
          document.getElementById("accounts-info").value = accountsInfo;
        }
        static showTransactionForm(action) {
            const accountSelect = document.getElementById("account-select");
            accountSelect.innerHTML = "";
  
            for (const account of Bank.accountInfoList) {
              const option = document.createElement("option");
              option.value = account.name;
              option.text = account.name;
              accountSelect.add(option);
            }
  
            document.getElementById("transaction-form-title").textContent = action;
            document.getElementById("transaction-amount").value = "";
  
            document.getElementById("transaction-form").style.display = "block";
          }
  
          static closeTransactionForm() {
            document.getElementById("transaction-form").style.display = "none";
          }
          static submitTransaction(action) {
            const accountName = document.getElementById("account-select").value;
            const amount = parseFloat(document.getElementById("transaction-amount").value);
  
            for (const account of Bank.accountInfoList) {
              if (account.name === accountName) {
                if (action === "Deposit") {
                  account.deposit(amount);
                } else if (action === "Debit") {
                  account.debit(amount);
                }
                break;
              }
            }
            Bank.displayAccounts();
            Bank.closeTransactionForm();
          }
        }
  

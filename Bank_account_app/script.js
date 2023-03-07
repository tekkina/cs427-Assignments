class BankAccount {
    constructor(name, initialDeposit) {
      this._name = name;
      this._balance = initialDeposit;
    }
    
    deposit(amount) {
      if (amount > 0) {
        this._balance += amount;
        return true;
      }
      return false;
    }
    
    debit(amount) {
      if (amount > 0 && amount <= this._balance) {
        this._balance -= amount;
        return true;
      }
      return false;
    }
    
    get name() {
      return this._name;
    }
    
    get balance() {
      return this._balance;
    }
    
    set name(name) {
      this._name = name;
    }
    
    set balance(balance) {
      this._balance = balance;
    }
  }
  
  // Bank class definition
  class Bank {
    static accountInfoList = [];
    
    static createAccount() {
      const accountName = document.getElementById("accountName").value;
      const depositAmount = parseFloat(document.getElementById("depositAmount").value);
      
      if (accountName && depositAmount && depositAmount > 0) {
        const account = new BankAccount(accountName, depositAmount);
        this.accountInfoList.push(account);
        this.updateAccountList();
        return true;
      }
      return false;
    }
    
    static updateAccountList() {
      const accountListTextArea = document.getElementById("accountList");
      accountListTextArea.value = "";
    }
}
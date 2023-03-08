class BankAccount {
    constructor(name, initialDeposit,accountNumber) {
      this._name = name;
      this._balance = initialDeposit;
      this._accountNumber = accountNumber;
    }
    
    deposit(amount) {
      if (amount > 0) {
        this._balance += amount;
        return true;
      }
      return false;
    }
    
    withdraw(amount) {
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
    get accountNumber() {
      return this._accountNumber;
    }
    set name(name) {
      this._name = name;
    }
    
    set balance(balance) {
      this._balance = balance;
    }
    set accountNumber(accountNumber) {
      this._accountNumber = accountNumber;
    }
  }


  class Bank {
    static accountInfoList = [];
    static saveData(){
      localStorage.setItem('myObject',JSON.stringify(Bank.accountInfoList));
    }
    static accessCustomerList =()=> JSON.parse(localStorage.getItem('myObject'));
    // static accountName = document.getElementById("accountName").value;
    // static newAccountNumber = document.getElementById("newDepositAccount").value;
    // static depositAmount = parseFloat(document.getElementById("depositAmount").value);
    static accountListTextArea = document.getElementById("accountList");
   
    static cancel(){
      // document.getElementById("accountList").value = "";
      Bank.accountInfoList =[];
      Bank.saveData();
      Bank.renderAccountList();
    }

     static accountExist(number){
      const list = Bank.accessCustomerList().filter(account=>account._accountNumber===number);
      return (list.length>0)
            }

    static createAccount() {
      if(Bank.accountExist(document.getElementById("newDepositAccount").value)){
        alert("account number already exist, please create a different account number");
        return;
      }

     else if (document.getElementById("accountName").value.trim()!=="" && document.getElementById("depositAmount").value >= 100 ) {
        const account = new BankAccount(document.getElementById("accountName").value, parseFloat(document.getElementById("depositAmount").value),document.getElementById("newDepositAccount").value);
        Bank.accountInfoList.push(account);
        Bank.saveData();
        Bank.renderAccountList();
        alert("new account created.")
        return;
      }
     return alert("error, please try again!! please make sure you typed name and '\n' minimumof 100 dollars for initia deposit amount")
    }
    
    static renderAccountList() {
      Bank.accountInfoList =JSON.parse(localStorage.getItem("myObject"));
      Bank.accountListTextArea.innerHTML = "";
      Bank.accountInfoList.forEach((item)=> {
      Bank.accountListTextArea.innerHTML += `account holder name: ${item._name}, account number: ${item._accountNumber},account Balance = ${item._balance} \n `

    });
     document.getElementById("newDepositAccount").value="";
      document.getElementById("accountName").value= "";
      document.getElementById("depositAmount").value= "";
    }
    
}
var createAccountBtn = document.getElementById("btn_1");
 createAccountBtn.addEventListener('click', Bank.createAccount);
 document.getElementById("cancelBtn").addEventListener('click',Bank.cancel);
 Bank.renderAccountList();
 
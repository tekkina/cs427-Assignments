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
    static accountListTextArea = document.getElementById("accountList");
    static initialDeposit = document.getElementById("depositAmount");
    static deposit = document.getElementById("deposit");
    static withdrawal = document.getElementById("withdrawal");
    static accountFinder = document.getElementById("accountfinder");
    static newAccountNumber = document.getElementById("newDepositAccount");
    static accountName = document.getElementById("accountName");

    static inputClear(){
       Bank.newAccountNumber.value="";
       Bank.accountName.value= "";
       Bank.deposit.value= "";
       Bank.accountFinder.value="";
       Bank.withdrawal.value =""; 
     }

    static cancel(){
      Bank.accountInfoList =[];
      Bank.saveData();
      Bank.renderAccountList();
    }

     static accountExist(number){
      const list = Bank.accessCustomerList().filter(account=>account._accountNumber===number);
      return (list.length>0)
            }

    static createAccount() {
      if(parseInt(Bank.newAccountNumber.value.trim())===0 || Bank.newAccountNumber.value.trim()===""){
      alert("error, please try again!! Account number can not be 0 or empty")
       return;
      }
      else if(Bank.accountExist()){
        alert("account number already exist, please create a different account number");
        Bank.inputClear();
        return;
      }

     else if (Bank.accountName.value.trim()!=="" && Bank.initialDeposit.value >= 100 ) {
        const account = new BankAccount(Bank.accountName.value, parseFloat(Bank.initialDeposit.value),
        Bank.newAccountNumber.value);
        account._index = Bank.accessCustomerList().length;
        Bank.accountInfoList =Bank.accessCustomerList();
        Bank.accountInfoList.push(account);
        Bank.saveData();
        Bank.renderAccountList();
        alert("new account created.")
        return;
      }
     alert("error, please try again!! please make sure you typed name and \nminimumof 100 dollars for initia deposit amount");
     Bank.inputClear();
    }
    
    static renderAccountList() {
      Bank.accountInfoList =JSON.parse(localStorage.getItem("myObject"));
      Bank.accountListTextArea.innerHTML = "";
      Bank.accountInfoList.forEach((item)=> {
      Bank.accountListTextArea.innerHTML += `${item._index +1}.  account holder name: ${item._name}, account number: ${item._accountNumber},account Balance = ${item._balance} \n`
    });
    alert("rendering");
   Bank.inputClear();
  }

}

const createAccountBtn = document.getElementById("btn_1");
createAccountBtn.addEventListener('click', Bank.createAccount);
Bank.renderAccountList();
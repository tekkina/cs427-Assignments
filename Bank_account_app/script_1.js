
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
    static deposit = document.getElementById("deposit");
    static withdrawal = document.getElementById("withdrawal");
    static accountFinder = document.getElementById("accountfinder");

    static inputClear(){
       Bank.deposit.value= "";
       Bank.accountFinder.value="";
       Bank.withdrawal.value =""; 
     }

  static invalidEntry(){
    if(parseFloat(Bank.deposit.value)<= 0 || parseFloat(Bank.withdrawal.value)<=0){
      alert(`invalid entry, you have entered to deposit an ivalid amount of dollars \ni.e negative or zero`);
      Bank.inputClear();
      return true;
    }
    return false;
  } 
  static scanAccount(){
    const list = Bank.accessCustomerList();
    const filteredList = list.filter(account => (account._accountNumber == Bank.accountFinder.value));
    return filteredList;
  }
    static depositMoney(){
      if(Bank.invalidEntry()){
      return;
      }
      const scannedAccount = Bank.scanAccount();
      if(scannedAccount.length === 1){
        const deposit = parseFloat(Bank.deposit.value);
    Bank.accountInfoList = Bank.accessCustomerList();
    Bank.accountInfoList[scannedAccount[0]._index]._balance += deposit; 
    Bank.saveData();
     alert("deposit successfully completed.");
     Bank.inputClear();
      return;
      }
      else if(scannedAccount.length >1){
        alert(`multiple account found, ${JSON.stringify(scannedAccount)}, system need to be checked`);
        Bank.inputClear();
        return;
      }
      else{
      alert("account not found in the system, please make sure to write the correct account number");
      Bank.inputClear();
      return;
      }

    }

    static withdraw(){
      if(Bank.invalidEntry()){
      return;
      }
      const scannedAccount = Bank.scanAccount();

      if(scannedAccount.length === 1){
        const originalBalance = parseFloat(scannedAccount[0]._balance);
        const withdraw = parseFloat(Bank.withdrawal.value);

      if(originalBalance < withdraw || originalBalance == 0){
        alert(`you can not withdraw ${withdraw} dollars, you have an account balance of ${originalBalance}`);
        Bank.inputClear();
      return;
     }
     Bank.accountInfoList = Bank.accessCustomerList();
     Bank.accountInfoList[scannedAccount[0]._index]._balance -= withdraw; 
     Bank.saveData();
     alert("withdrawal successfully completed.");
     Bank.inputClear(); 
      return;
      }
      else if(scannedAccount.length >1){
        alert(`multiple account found, ${JSON.stringify(scannedAccount)}`);
        Bank.inputClear();
        return;
      }
      else{
      alert("account not found in the system, please make sure to write the correct account number");
      Bank.inputClear();
      return;
      }

    }
}
const withdrawBtn = document.getElementById("btn_4");
withdrawBtn.addEventListener('click',Bank.withdraw);
const depositBtn = document.getElementById("btn_2");
depositBtn.addEventListener('click',Bank.depositMoney);
 
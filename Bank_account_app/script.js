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
      alert("started here 234");
      if(Bank.invalidEntry()){
      return;
      }
      const scannedAccount = Bank.scanAccount();
      alert("here we 2");
      if(scannedAccount.length === 1){
        const originalBalance = parseFloat(scannedAccount[0]._balance);
        const deposit = parseFloat(Bank.deposit.value);

     Bank.accountInfoList[scannedAccount[0]._index]._balance += deposit; 
     alert("here we 1");
     Bank.saveData();
     Bank.renderAccountList();
     alert("deposit successfully completed.");
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
     Bank.accountInfoList[scannedAccount[0]._index]._balance -= withdraw; 
     Bank.saveData();
     Bank.renderAccountList();
     alert("withdrawal successfully completed.");
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


     static accountExist(number){
      const list = Bank.accessCustomerList().filter(account=>account._accountNumber===number);
      return (list.length>0)
            }

    static createAccount() {

      if(parseInt(Bank.newAccountNumber.value.trim())===0 || Bank.newAccountNumber.value.trim()===""){
      return alert("error, please try again!! Account number can not be 0 or empty")
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
   Bank.inputClear();
  }
}
const createAccountBtn = document.getElementById("btn_1");
 createAccountBtn.addEventListener('click', Bank.createAccount);
 document.getElementById("cancelBtn").addEventListener('click',Bank.cancel);
 document.getElementById("btn_2").addEventListener('click',Bank.depositMoney);
 document.getElementById("btn_4").addEventListener('click',Bank.withdraw);
 Bank.renderAccountList();
 
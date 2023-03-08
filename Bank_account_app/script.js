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

    static inputClear(){
      document.getElementById("newDepositAccount").value="";
       document.getElementById("accountName").value= "";
       document.getElementById("depositAmount").value= "";
       document.getElementById("deposit").value="";
       document.getElementById("accountfinder").value ="";
       document.getElementById("withdrawal").value =""; 
     }

    static cancel(){
      // document.getElementById("accountList").value = "";
      Bank.accountInfoList =[];
      Bank.saveData();
      Bank.renderAccountList();
    }
   
    static deposit(){
    const accountFinder = document.getElementById("accountfinder").value;
      const list = Bank.accessCustomerList();
      let index = 0; 
      list.forEach(account => account._index = index++);
     
      const filteredList = list.filter(account => (account._accountNumber == accountFinder));
      // const filteredList = list.map(account => ({account,_index: index++}))
  
      if(filteredList.length == 1){
     const x = parseFloat(document. getElementById("deposit").value);
     list[filteredList[0]._index]._balance +=x; 
     Bank.accountInfoList = list;
     Bank.saveData();
     Bank.renderAccountList();
     alert("deposit successfully completed.");
      return;
      }

      else{
      alert("account not found in the system, please make sure to write the correct account number");
      Bank.inputClear();
      return;
      }
    }

    static withdraw(){
      const accountFinder = document.getElementById("accountfinder").value;
      const list = Bank.accessCustomerList();
      let index = 0; 
      list.forEach(account => account._index = index++);
     
      const filteredList = list.filter(account => (account._accountNumber == accountFinder));
      // const filteredList = list.map(account => ({account,_index: index++}))
  
      if(filteredList.length == 1){
     const x = parseFloat(document. getElementById("withdrawal").value);
     if(filteredList[0]._balance < x ||filteredList[0]._balance === 0){
      alert(`you can not withdraw ${x} dollars, you have an account balance of ${filteredList[0]._balance}`);
      Bank.inputClear();
      return;
     }
     list[filteredList[0]._index]._balance -=x; 
     Bank.accountInfoList = list;
     Bank.saveData();
     Bank.renderAccountList();
     alert("withdrawal successfully completed.");
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

      if(parseInt(document.getElementById("newDepositAccount").value.trim())==0 || document.getElementById("newDepositAccount").value.trim()===""){
      return alert("error, please try again!! Account number can not be 0 or empty")
      return; 
      }
      else if(Bank.accountExist(document.getElementById("newDepositAccount").value)){
        alert("account number already exist, please create a different account number");
        Bank.inputClear();
        return;
      }

     else if (document.getElementById("accountName").value.trim()!=="" && document.getElementById("depositAmount").value >= 100 ) {
        const account = new BankAccount(document.getElementById("accountName").value, parseFloat(document.getElementById("depositAmount").value),document.getElementById("newDepositAccount").value);
        account._index = Bank.accessCustomerList().length;
        Bank.accountInfoList.push(account);
        Bank.saveData();
        Bank.renderAccountList();
        alert("new account created.")
        return;
      }
     alert("error, please try again!! please make sure you typed name and '\n' minimumof 100 dollars for initia deposit amount");
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
 document.getElementById("btn_2").addEventListener('click',Bank.deposit);
 document.getElementById("btn_4").addEventListener('click',Bank.withdraw);
 Bank.renderAccountList();
 
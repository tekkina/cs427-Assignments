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
   
    static deposit(){
    const accountFinder = document.getElementById("accountfinder").value;
      const list = Bank.accessCustomerList();
      let index = 0; 
      list.forEach(account => account._index = index++)
      const filteredList = list.filter(account => (account._accountNumber == accountFinder));
      // const filteredList = list.map(account => ({account,_index: index++}))
  
      if(filteredList.length > 1){
      alert("error, acount number found being registered more than one time in the system");
      return;
      }

      else if(filteredList.length===0){
      alert("account not found in the system, please make sure to write the correct account number");
      return;
      }
      
     list[filteredList._index]._balance += parseFloat(document. getElementById("deposit").value);
       Bank.accountInfoList =list;
       Bank.saveData();
       Bank.renderAccountList();

    }

    static withdraw(){
      var accountFinder = document.getElementById("accountfinder").value;
      const list = Bank.accessCustomerList();
      let index = 0;
      const filteredList = list.map(account => ({account, _index: index++}))
      .filter(account => (account._accountNumber === accountFinder));

      if(filteredList.length > 1){
      alert("error, acount number found being registered more than one time in the system");
      return;
      }
      else if(filteredList.length===0 || filteredList===null){
      alert("account not found in the system, please make sure to write the correct account number");
      return;
      }

      else if ( Bank.accessCustomerList[filteredList._index]._balance < parseFloat(document. getElementById("withdrawal").value)){
     alert(`the maximum money you can withdraw is ${Bank.accessCustomerList[filteredList.index]._balance}`)
     return;
      }

       Bank.accessCustomerList[filteredList._index]._balance -= parseFloat(document. getElementById("withdrawal").value);
       Bank.saveData();
       Bank.renderAccountList();

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
 document.getElementById("btn_2").addEventListener('click',Bank.deposit);
 document.getElementById("btn_4").addEventListener('click',Bank.withdraw);
 Bank.renderAccountList();
 
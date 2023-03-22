
var todoList = [];

  function saveListData () { 
    localStorage.setItem('myObject', JSON.stringify(todoList));
  }
const accessListData = JSON.parse(localStorage.getItem('myObject'));

const todoListElement = document.querySelector("#myUL");
document.querySelector("#add_button").addEventListener("click", addTodo);
document.querySelector("#myInput").addEventListener("keypress", function(e) {
  if (e.key == 'Enter') {
    addTodo()
  }
});

function addTodo() {
  const todoText = document.querySelector("#myInput").value;
  if (todoText == "")
    alert("You did not enter any item");
  else {
    todoList = accessListData;
    if(todoList!==null){
     const index = todoList.length + 1;
    saveListData();
    const todoObject = {
      id: index,
      todoText: todoText,
      isDone: false,
    };

    todoList.push(todoObject);
    saveListData();
    displayTodos();
  }
}
}

function doneTodo(todoId) {
  const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);

  todoList[selectedTodoIndex].isDone
    ? (todoList[selectedTodoIndex].isDone = false)
    : (todoList[selectedTodoIndex].isDone = true);
  saveListData();
  displayTodos();
}

function deleteItem(x) {
  todoList.splice(todoList.findIndex((item) => item.id == x),1);
  saveListData();
  displayTodos();
}

function displayTodos() {
  todoListElement.innerHTML = "";
  document.querySelector("#myInput").value = "";
  
  todoList = accessListData;
  if(todoList ===null);
  else {
  const n = todoList.length + 1;
   for(let i=0; i < n; i++) {
    const listElement = document.createElement("li");
    const delBtn = document.createElement("i");
    const doneList = document.createElement("i");

    listElement.innerHTML = todoList[i].todoText;
    listElement.setAttribute("data-id", todoList[i].id);
    delBtn.setAttribute("data-id", todoList[i].id);
    doneList.setAttribute("data-id",todoList[i].id);

    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-can");
    delBtn.classList.add("fa-solid");
    delBtn.setAttribute("data-id", todoList[i].id);

    doneList.classList.add("farr");
    doneList.classList.add("fa-solid"); 
    doneList.classList.add("fa-clipboard-check");
    doneList.setAttribute("data-id",todoList[i].id);
 


    if (todoList[i].isDone) {
      listElement.classList.add("checked");
    }

    doneList.addEventListener("click", function (e) {
      const selectedId = e.target.getAttribute("data-id");
      doneTodo(selectedId);
    });

    delBtn.addEventListener("click", function (e) {
      const delId = e.target.getAttribute("data-id");
      deleteItem(delId);
    });
    
    listElement.appendChild(delBtn);
    listElement.appendChild(doneList);
    todoListElement.appendChild(listElement);
  
  };
}
}
displayTodos();

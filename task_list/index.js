const task = document.getElementById('task').value;
const addTaskBtn = document.getElementById('addtask');
const cancelTaskList = document.getElementById('canceltasklist');
const taskList = document.getElementById('tasklist');  
// // const add =()=>{
// //       text[tasklist.value];
// //     };
// //    console.log(text);
// //    document.getElementById("submitBtn").addEventListener("click", () => {
// //     add();
// //     console.log(text)
// //    });
const tasks=[];

function newElement() {
  tasks.push(task);
  var li = document.createElement("li");
  var inputValue = tasks.pop();
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    taskList.appendChild(li);
  }
  document.getElementById("task").value = "";

}
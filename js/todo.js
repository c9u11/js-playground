const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = JSON.parse(localStorage.getItem(TODOS_KEY)) || [];

toDos.forEach(savedToDo => {
  paintToDo(savedToDo);
});

function saveToDo(){
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
  const li = event.target.parentElement;
  console.log(li.id);
  li.remove();
  toDos = toDos.filter((todoObj) => String(todoObj.id) !== li.id);
  saveToDo();
}

function paintToDo(newToDoObj){
  const li = document.createElement("li");
  li.id = newToDoObj.id;
  const span = document.createElement("span");
  span.innerText = newToDoObj.text;
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteToDo)
  li.appendChild(button);
  li.appendChild(span);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event){
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now()
  }
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDo();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
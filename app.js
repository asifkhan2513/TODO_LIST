//Select DOM
const todoInput = document.querySelector(".todo-input");
const priceInput = document.querySelector(".price-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const main = document.querySelector("#main");
const cursor = document.querySelector("#cursor");
const totalSpan = document.getElementById("total");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

//Functions

function addTodo(event) {
  //Prevent natural behaviour
  event.preventDefault();
  
  // Check if inputs are empty
  if (todoInput.value.trim() === '' || priceInput.value.trim() === '') {
    return;
  }

  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  
  //Add price span
  const priceSpan = document.createElement("span");
  priceSpan.innerText = `₹${priceInput.value}`;
  priceSpan.classList.add("price");
  newTodo.appendChild(priceSpan);
  
  todoDiv.appendChild(newTodo);
  
  //Add todo to local storage
  saveLocalTodos(todoInput.value, priceInput.value);
  
  //Completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  
  //Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  
  //Append to list
  todoList.appendChild(todoDiv);
  
  //Update total
  updateTotal();
  
  //Clear input values
  todoInput.value = "";
  priceInput.value = "";
}

function updateTotal() {
  let total = 0;
  const todoItems = document.querySelectorAll(".todo");
  todoItems.forEach(todoItem => {
    if (!todoItem.classList.contains("completed")) {
      const price = todoItem.querySelector(".price");
      total += parseFloat(price.innerText.replace("₹", "")) || 0;
    }
  });
  totalSpan.innerText = total.toFixed(2);
}

function deleteCheck(e) {
  const item = e.target;
  //Delete todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
      updateTotal();
    });
  }
  //Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    updateLocalTodoStatus(todo);
    updateTotal(); // Update total when marking complete/incomplete
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo, price) {
  let todos = getLocalTodos();
  todos.push({ text: todo, price: price, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function removeLocalTodos(todoElement) {
  let todos = getLocalTodos();
  const todoText = todoElement.querySelector('.todo-item').innerText.split("₹")[0].trim();
  todos = todos.filter(todo => todo.text !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = getLocalTodos();
  
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    if (todo.completed) {
      todoDiv.classList.add("completed");
    }
    
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.text;
    newTodo.classList.add("todo-item");
    
    const priceSpan = document.createElement("span");
    priceSpan.innerText = `₹${todo.price}`;
    priceSpan.classList.add("price");
    newTodo.appendChild(priceSpan);
    
    todoDiv.appendChild(newTodo);
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    
    todoList.appendChild(todoDiv);
  });
  
  updateTotal();
}

console.log("tesing");
wrapper.addEventListener("mousemove", (e) => {
  gsap.to("#cursor", {
    x: e.x,
    y: e.y,
  });
});

function updateLocalTodoStatus(todoElement) {
  let todos = getLocalTodos();
  const todoText = todoElement.querySelector('.todo-item').innerText.split("₹")[0].trim();
  todos = todos.map(todo => {
    if (todo.text === todoText) {
      todo.completed = todoElement.classList.contains("completed");
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

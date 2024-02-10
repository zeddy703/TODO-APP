
const buttonElement = document.querySelector("#add-btn");

//OPTION1
let todos = JSON.parse(localStorage.getItem('data')) || [{task: 'learn today', date: '2024/01/24'}];

function saveData() {
  localStorage.setItem('data', JSON.stringify(todos));
}

function addTodo() {
  buttonElement.addEventListener("click", () => {
    const inputElement = document.querySelector("#input-text");
    const inputDate = document.querySelector("#input-date");
    
    const newTodoTask = inputElement.value.trim();
    const newTodoDate = inputDate.value;
    if(newTodoTask && newTodoDate === '') {
      alert('write something...');
      return false;
    }
    if(newTodoTask && newTodoDate !== '') {
       todos.push({task: newTodoTask, date: newTodoDate});
      inputElement.value = '';
      inputDate.value = '';
      renderTodos();
      saveData();
    }
    return true;
  });

  buttonElement.addEventListener('keydown', (event) => {
    if(event.target.key === "ENTER") {
      const inputElement = document.querySelector("#input-text");
    
    const newTodo = inputElement.value.trim();
    if(newTodo === '') {
      alert('write something...')
    }
    if(newTodo !== '') {
       todos.push(newTodo);
      inputElement.value = '';
      renderTodos();
      saveData();
    }
    }
  })
  
}
addTodo();

function renderTodos() {
  const todoContainer = document.querySelector(".todo-container");
  todoContainer.innerHTML = '';
  todos.forEach((todo, index) => {
    const container = document.createElement('div');
    container.setAttribute('class', 'items-container');
    const div_containerTask = document.createElement('div');
    const div_containerDate = document.createElement('div');
    const div_containerButton = document.createElement('div');
    const deleteButton = document.createElement('i');
    deleteButton.setAttribute('class', 'fa-solid fa-trash')
    div_containerTask.innerHTML = `${todo.task}`;
    div_containerDate.innerHTML = `${todo.date}`;
    //deleteButton.innerHTML = 'Delete';
    const div_input = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'checkbox';
    div_input.appendChild(input);
    div_containerButton.appendChild(div_input);
    
    deleteButton.classList.add('delete-btn');
    deleteButton.style.display = 'none';
    div_containerButton.appendChild(deleteButton);
    div_containerButton.style.display = 'flex';
    //div_containerButton.style.flex-direction = "row-reverse";

    deleteButton.addEventListener('click', () => {
      removeTodo(index);
    })
    //pElement.setAttribute('class', 'checked')
    
   container.appendChild(div_containerTask);
   container.appendChild(div_containerDate);
   container.appendChild(div_containerButton);
   todoContainer.appendChild(container);
  // todoContainer.appendChild(div_containerTask);
  //  todoContainer.appendChild(div_containerDate);
    
    //todoContainer.appendChild(div_containerButton);
    input.addEventListener('click', (e) => {
     if(e.target.tagName === 'INPUT') {
      div_containerTask.classList.toggle('checked');
      div_containerDate.classList.toggle('checked');
      //saveData();
     }
    })

    if(todo.date) {
      deleteButton.style.display = 'block';
    }
    saveData();
  })
};

function removeTodo(index) {
  todos.splice(index, 1);
  renderTodos();
   saveData();
}
renderTodos();



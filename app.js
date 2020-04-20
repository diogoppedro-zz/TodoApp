//SELECTORS
const todoInput =  document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//FUNCTIONS
function addTodo(event){
    //Prevents form from submitting
    event.preventDefault();

    //todo <div>
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //CREATE <li>
    const newTodo =  document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);


    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to todo list div
    todoList.appendChild(todoDiv);

    //clear todo input after inserting
    todoInput.value = "";

}


function deleteCheck(e){
    const item = e.target;
    //DELETE todo
    if(item.classList[0] ==="trash-btn"){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        //Event listener waiting on above FALL transition to end and remove Actual HTML element
        todo.addEventListener("transitionend", function(){ 
            todo.remove(); 
        });
        
    }
    
    //Check Mark
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
    
}


function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
                //Check if DOES NOT HAVE CLASS BY !todo.
            case "uncompleted":
                if(!todo.classList.contains ("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}

//LOCAL STORAGE CALL 56:30 VIDEO
function saveLocalTodos(todo){
    //Check if we have anything in local storage
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    
}


function getTodos(){
    
    let todos;
    //Check if we have anything in local storage
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
        todos.forEach(function(todo){

            //todo <div>
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
    
            //CREATE <li>
            const newTodo =  document.createElement("li");
            newTodo.innerText = todo;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);
    
            //Check Mark Button
            const completedButton = document.createElement("button");
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
    
            //Trash Button
            const trashButton = document.createElement("button");
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);
    
            //append to todo list div
            todoList.appendChild(todoDiv);
        });
    }
 

function removeLocalTodos(todo){
    //Check if we have anything in local storage
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else { 
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    
}
            

/* stage: Showing SAved items as <li>
Video:  1hr and 01 mins
link: https://www.youtube.com/watch?v=Ttf3CEsEwMQ&t=1862s

I stopped at checking the local storage 
beign saved but now need to work on the saveLocalTodos() function 


*/

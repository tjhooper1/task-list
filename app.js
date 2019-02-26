//fetches todos from the local storage database
getTodos = () => {
    let todos = [];
    let todosStr =  localStorage.getItem('todo');
    if (todosStr !== null) {
        todos = JSON.parse(todosStr);
    }
    return todos;
}

//adds todo to the local storage database and then also calls the show() function to display in the UI
add = () => {
    let todos = getTodos();
    let task = document.getElementById("task")
    if (task.value === "") {
        alert("Please enter a valid task");
    }else{

        todos.push(task.value)
        
        localStorage.setItem('todo', JSON.stringify(todos));
    
        task.value = "";
    }

    show();
    

}

//This function's just is to show the list of tasks to the UI. It also runs a conditional check on the 
//checkbox inputs to see if they are checked. If they are, the task is marked as complete
show = () => {
    let todos = getTodos();
    let html = '<h3>to be completed</h3><ul>';
    for(let i = 0; i < todos.length; i++) {
        html += '<li>' + todos[i] + '<input type="checkbox" class="checkBox"><button class="remove" id="' + i  + '">Delete</button></li>';
    };
    html += '</ul>';

    document.getElementById("todos").innerHTML = html;

    var buttons = document.getElementsByClassName("remove");
    var checkboxes = document.getElementsByClassName("checkBox");
    

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", function(){
            
           if (checkboxes[i].checked) {
               checkboxes[i].parentElement.style = "text-decoration: line-through;";
               
            }else{
                checkboxes[i].parentElement.style = "text-decoration: none;";
            }
           
        })
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", remove);      
    };
}

//The remove function handles grabbing the id from the current task and using that as a selector to remove it
//from the local storage database. Additionally, the todos array is spliced to remove that current task from the 
//array
function remove() {

    let id = this.getAttribute('id');
    let todos = getTodos();
    
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

}

//the intiating event listener for the add button. It starts by running the add() function
document.getElementById("add").addEventListener("click", add);

//The show function is initially called to automatically display the current tasks in the database to the UI
show();

getTodos = () => {
    let todos = [];
    let todosStr =  localStorage.getItem('todo');
    if (todosStr !== null) {
        todos = JSON.parse(todosStr);
    }
    return todos;
}

add = () => {
    let todos = getTodos();
    let task = document.getElementById("task")
    todos.push(task.value)
    console.log(todos);
    
    localStorage.setItem('todo', JSON.stringify(todos));

    task.value = "";

    show();
    

}

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
            // console.log(checkboxes[i].parentElement);
            
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

function remove() {
    console.log(this);

    let id = this.getAttribute('id');
    let todos = getTodos();
    
    console.log("click");
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

}


document.getElementById("add").addEventListener("click", add);
show();
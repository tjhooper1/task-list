//fetches todos from the local storage database
// let checkboxes = document.querySelectorAll('input[type="checkbox"]');

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
    let html = '<h3 class="mx-auto" style="width: 200px">to be complete</h3><ul class="list-group">';
    for(let i = 0; i < todos.length; i++) {
        html += '<li class="list-group-item">' + todos[i] + '<input name="'+i+'" type="checkbox" class="checkBox ml-10"></li>';
        
    };
    html += '</ul>';

    document.getElementById("todos").innerHTML = html;


    var button = document.getElementById("remove");
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    for (let i = 0; i < checkboxes.length; i++) {
        
        checkboxes[i].addEventListener("click", function() {
            if (checkboxes[i].checked) {
                checkboxes[i].parentElement.classList.add("done");
            } else {
                checkboxes[i].parentElement.classList.remove("done");
            }
        })
        
    }
        

    // variable to store our current state
    var cbstate;
    
    // Get the current state from localstorage
    // State is stored as a JSON string
    cbstate = JSON.parse(localStorage['CBState'] || '{}');

    // Loop through state array and restore checked 
    // state for matching elements
    for(var i in cbstate) {
    var el = document.querySelector('input[name="' + i + '"]');
    if (el) el.checked = true;
        
    }

    // Get all checkboxes that you want to monitor state for
    var cb = document.querySelectorAll('.checkBox');  
    cb.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkbox.parentElement.classList.add("done");
        } 
    })

    // Loop through results and ...
    for(var i = 0; i < cb.length; i++) {

        
        //bind click event handler
        cb[i].addEventListener('click', function(evt) {
            
            // If checkbox is checked then save to state
            if (this.checked) {
                
            cbstate[this.name] = true;
            
            }

        // Else remove from state
            else if (cbstate[this.name]) {
            delete cbstate[this.name];
            }

        // Persist state
            localStorage.CBState = JSON.stringify(cbstate);
        });
    }
    
    button.addEventListener("click", remove);
}

//The remove function removes all state from todos and checkboxes and starts fresh

function remove() {
    
    let todos = getTodos();
    todos = [];
    localStorage.setItem('todo', JSON.stringify(todos));
    let cbstate = JSON.parse(localStorage.getItem('CBState') || '{}');
    cbstate = {};
    localStorage.setItem('CBState', JSON.stringify(cbstate));
    show();
}

//the intiating event listener for the add button. It starts by running the add() function
document.getElementById("add").addEventListener("click", add);

//The show function is initially called to automatically display the current tasks in the database to the UI
show();





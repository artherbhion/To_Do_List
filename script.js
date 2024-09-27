let submit = document.getElementById("submit");
let addtask = document.getElementById("addtask");
let todolist = document.getElementById("todolist");
let donelist = document.getElementById('done');

// Load tasks from localStorage when the page loads
window.onload = function() {
    loadTasks();
};

// Save tasks to localStorage
function saveTasks() {
    let tasks = {
        todo: list,
        completed: completedTasks
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        let tasks = JSON.parse(storedTasks);
        list = tasks.todo || [];
        completedTasks = tasks.completed || [];

        // Render the to-do list
        list.forEach((task, index) => {
            todolist.innerHTML += `<li id="${index}"><button onclick="complete(${index})">${task}</button></li>`;
        });

        // Render the completed list
        completedTasks.forEach((task) => {
            donelist.innerHTML += `<li>${task}</li>`;
        });
    }
}

// Initialize task arrays
let list = [];
let completedTasks = [];

// Event listener for button click to add tasks
submit.addEventListener('click', () => {
    if (addtask.value != '') {
        let id = list.length; // Unique ID for each item
        list.push(addtask.value); 
        todolist.innerHTML += `<li id="${id}"><button onclick="complete(${id})">${addtask.value}</button></li>`;
        addtask.value = '';

        // Save tasks to localStorage
        saveTasks();
    }
});

// Event listener to allow 'Enter' key to trigger the add task button
addtask.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submit.click();
    }
});

// Function to mark a task as complete
function complete(id) {
    donelist.innerHTML += `<li>${list[id]}</li>`;
    document.getElementById(id).style.display = "none"; // Hide the completed task
    completedTasks.push(list[id]);

    // Save tasks to localStorage
    saveTasks();
}

// Clear completed tasks
document.getElementById('clearCompleted').addEventListener('click', () => {
    donelist.innerHTML = ''; // Clear the completed tasks list
    completedTasks = []; // Reset completed tasks array
    saveTasks(); // Update localStorage
});

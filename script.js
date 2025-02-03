// Function to add a new task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item
    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskInput.value}</span>
        <button class="delete-btn" onclick="deleteTask(this)">X</button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";  // Clear input field
    saveTasks(); // Save tasks to local storage
}

// Function to mark task as completed
function toggleTask(task) {
    task.classList.toggle("completed");
    saveTasks();
}

// Function to delete a task
function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li span").forEach(task => {
        tasks.push({ text: task.innerText, completed: task.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleTask(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(this)">X</button>
        `;
        taskList.appendChild(li);
    });
}

// Load tasks when the page loads
window.onload = loadTasks;
// Task array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date()
        };

        tasks.push(newTask);
        taskInput.value = '';
        displayTasks();
    }
}

// Function to display tasks
function displayTasks() {
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    // Clear previous list items
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = `
            <span class="${task.completed ? 'completed-task' : ''}">${task.text}</span>
            <span>${task.createdAt.toLocaleString()}</span>
            <button style="border-radius:5px; padding-right:10px" onclick="markComplete(${task.id})">${task.completed ? 'Incomplete' : 'Complete'}</button>
            <button  style="border-radius:5px;" onclick="editTask(${task.id})">Edit</button>
            <button  style="border-radius:5px;" onclick="deleteTask(${task.id})">Delete</button>
        `;

        if (task.completed) {
            completedTasksList.appendChild(taskElement);
        } else {
            pendingTasksList.appendChild(taskElement);
        }
    });
}

// Function to mark a task as complete or incomplete
function markComplete(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        displayTasks();
    }
}

// Function to edit a task
function editTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        const editedText = prompt('Edit task:', tasks[taskIndex].text);

        if (editedText !== null && editedText.trim() !== '') {
            tasks[taskIndex].text = editedText.trim();
            displayTasks();
        }
    }
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

// Display initial tasks
displayTasks();

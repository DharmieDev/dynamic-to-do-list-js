document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Initialize tasks array
    let tasks = [];

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create and append a task element to the DOM
    function createTaskElement(taskText) {
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        removeButton.onclick = function() {
            // Remove from DOM
            listItem.remove();
            // Update array
            tasks = tasks.filter(task => task !== taskText);
            // Update storage
            saveTasks();
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    // Add a new task (or load from storage)
    function addTask(taskText = null, save = true) {
        const text = taskText !== null ? taskText : taskInput.value.trim();

        if (text === "") {
            if (taskText === null) { // Only alert when user submits empty input
                alert("Please enter a task.");
            }
            return;
        }

        createTaskElement(text);

        if (save) {
            tasks.push(text);
            saveTasks();
        }

        if (taskText === null) {
            taskInput.value = "";
        }
    }

    // Load tasks from localStorage at startup
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks;
        storedTasks.forEach(task => addTask(task, false)); // Don't re-save while loading
    }

    // Event listeners
    addButton.addEventListener("click", function() {
        addTask();
    });

    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Initial load
    loadTasks();
});

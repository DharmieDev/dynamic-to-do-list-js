document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        };

        if (taskText !== "") {
            const listItems = document.createElement("li");
            listItems.textContent = taskText;
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.className = "remove-btn";
            removeButton.onclick = function() {
                listItems.remove();        
            };
            listItems.appendChild(removeButton);
            taskList.appendChild(listItems);
            taskInput.value = "";
        };
        
    };
    

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

document.addEventListener('DOMContentLoaded', addTask);
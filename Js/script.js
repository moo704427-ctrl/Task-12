const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editingIndex = null;
let taskContainer = document.querySelector("tbody");
document.querySelector("#addUpdateTask").textContent = "Add New Task";

// Save Edits In The Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Read Tasks
function displayTasks(tasks) {
    taskContainer.innerHTML = "";

    tasks.forEach((task, taskIndex) => {
        // Task Row
        let taskRow = document.createElement("tr");

        // Task Number
        let taskNumber = document.createElement("td");
        taskNumber.textContent = taskIndex + 1;

        // Task Name
        let taskName = document.createElement("td");
        taskName.textContent = task.taskName;

        // Task Description
        let taskDesc = document.createElement("td");
        taskDesc.textContent = task.taskDesc;

        // Task Status
        let taskStatus = document.createElement("td");
        taskStatus.classList.add("status");
        taskStatus.classList.add(`text-${task.taskStatus ? "success" : "warning"}`);
        taskStatus.textContent = task.taskStatus ? "Completed" : "Waiting";

        // Task Actions
        let actions = document.createElement("td");
        actions.classList.add("actions");

        // Edit Status Button
        let editStatusBtn = document.createElement("button");
        editStatusBtn.classList.add("edit-status-btn");
        editStatusBtn.textContent = "Status";

        // Edit Status
        editStatusBtn.addEventListener("click", () => {
            task.taskStatus = !task.taskStatus;
            saveTasks();
            displayTasks(tasks);
        });

        // Edit Button
        let editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "Edit";

        // Edit Tasks (Update)
        editBtn.addEventListener("click", () => {
            inputTaskName.value = task.taskName;
            inputTaskDesc.value = task.taskDesc;

            editingIndex = taskIndex;

            document.querySelector("#addUpdateTask").textContent = "Update Task";
        });

        // Delete Button
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Delete";

        // Delete Tasks
        deleteBtn.addEventListener("click", () => {
            tasks.splice(taskIndex, 1);
            saveTasks();
            displayTasks(tasks);
        });

        // Append Buttons To Task Actions
        actions.append(editStatusBtn, editBtn, deleteBtn);

        // Append Task Details To Task Row
        taskRow.append(taskNumber, taskName, taskDesc, taskStatus, actions);

        // Append Task Row To Task Container
        taskContainer.append(taskRow);
    });
}
displayTasks(tasks);

// Filter Tasks
function filterTasks(taskCategory) {
    if (taskCategory === "completed") {
        let completedTasks = tasks.filter((task, index) => {
            return task.taskStatus === true;
        });
        displayTasks(completedTasks);
    } else {
        let waitingTasks = tasks.filter((task, index) => {
            return task.taskStatus === false
        });
        displayTasks(waitingTasks);
    }
}

document.querySelector("#all").addEventListener("click", () => {
    displayTasks(tasks);
});
document.querySelector("#completed").addEventListener("click", () => {
    filterTasks("completed");
});
document.querySelector("#waiting").addEventListener("click", () => {
    filterTasks("waiting");
});

// Clear All Tasks
document.querySelector("#clear").addEventListener("click", () => {
    tasks.splice(0);
    localStorage.removeItem("tasks"); // This is Better than clear()
    // localStorage.clear(); => Delete everything in the browser not just tasks
    displayTasks(tasks);
});

// Add Tasks
let inputTaskName = document.querySelector("#taskName");
let inputTaskDesc = document.querySelector("#taskDesc");

document.querySelector("#addUpdateTask").addEventListener('click', () => {
    const name = inputTaskName.value;
    const desc = inputTaskDesc.value;

    let isExist = tasks.find((task, index) => {
        return task.taskName === name;
    });

    if (editingIndex !== null) {
        // Update Task
        tasks[editingIndex].taskName = name;
        tasks[editingIndex].taskDesc = desc;
        saveTasks();

        editingIndex = null;
        document.querySelector("#addUpdateTask").textContent = "Add New Task";
    } else if (isExist) {
        alert("This task name is already uesd please enter another name");
    } else {
        // Add Task
        let newTask = {
            taskName: name,
            taskDesc: desc,
            taskStatus: false
        };

        tasks.push(newTask);
        saveTasks();
    }
    inputTaskName.value = "";
    inputTaskDesc.value = "";

    displayTasks(tasks);

});
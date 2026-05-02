const tasks = [
    { taskName: "Gym", taskDesc: "Play cardio", taskStatus: true },
    { taskName: "Cinema", taskDesc: "Watch movie", taskStatus: false },
    { taskName: "Study", taskDesc: "Do math homework", taskStatus: true }
];

let editingIndex = null;
let taskContainer = document.querySelector("#taskContainer");
document.querySelector("#addUpdateTask").textContent = "Add New Task";

// Read Tasks
function displayTasks(tasks) {
    taskContainer.innerHTML = "";

    tasks.forEach((task, taskIndex) => {
        // Task Row
        let taskRow = document.createElement("div");
        taskRow.classList.add("task-row");

        // Task Number
        let taskNumber = document.createElement("span");
        taskNumber.textContent = taskIndex + 1;

        // Task Name
        let taskName = document.createElement("span");
        taskName.textContent = task.taskName;

        // Task Description
        let taskDesc = document.createElement("span");
        taskDesc.textContent = task.taskDesc;

        // Task Status
        let taskStatus = document.createElement("span");
        taskStatus.classList.add("status");
        taskStatus.classList.add(`text-${task.taskStatus ? "success" : "danger"}`);
        taskStatus.textContent = task.taskStatus ? "completed" : "waiting";

        // Task Actions
        let actions = document.createElement("div");
        actions.classList.add("actions");
        actions.classList.add("bg-transparent");

        // Edit Status Button
        let editStatusBtn = document.createElement("button");
        editStatusBtn.classList.add("edit-status-btn");
        editStatusBtn.textContent = "Status";

        // Edit Status
        editStatusBtn.addEventListener("click", () => {
            task.taskStatus = !task.taskStatus;
            displayTasks(tasks);
        });

        // Edit Button
        let editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "Edit";

        // Edit Tasks
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

document.querySelector("#All").addEventListener("click", () => {
    displayTasks(tasks);
});
document.querySelector("#Completed").addEventListener("click", () => {
    filterTasks("completed");
});
document.querySelector("#Waiting").addEventListener("click", () => {
    filterTasks("waiting");
});

// Add Tasks
let inputTaskName = document.querySelector("#taskName");
let inputTaskDesc = document.querySelector("#taskDesc");

document.querySelector("#addUpdateTask").addEventListener('click', () => {
    const name = inputTaskName.value;
    const desc = inputTaskDesc.value;

    if (editingIndex !== null) {
        // Update Task
        tasks[editingIndex].taskName = name;
        tasks[editingIndex].taskDesc = desc;

        editingIndex = null;
        document.querySelector("#addUpdateTask").textContent = "Add New Task";
    } else {
        // Add Task
        tasks.push({
            taskName: name,
            taskDesc: desc,
            taskStatus: false
        });
    }

    inputTaskName.value = "";
    inputTaskDesc.value = "";

    displayTasks(tasks);
});
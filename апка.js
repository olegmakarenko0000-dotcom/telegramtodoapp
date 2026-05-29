const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span onclick="toggleTask(${index})">
                ${task.text}
            </span>

            <button onclick="deleteTask(${index})">
                ✖
            </button>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
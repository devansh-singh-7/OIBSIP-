document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: taskText,
        completed: false,
        addedAt: new Date().toLocaleString(),
        completedAt: null,
    };

    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.text} (Added: ${task.addedAt})</span>
        <span>
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </span>
    `;

    if (task.completed) {
        li.classList.add('completed');
        li.innerHTML += ` <span>(Completed: ${task.completedAt})</span>`;
        completedTasksList.appendChild(li);
    } else {
        pendingTasksList.appendChild(li);
    }
}

function completeTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector('span').innerText.split(' (')[0];
    
    const completedTask = {
        text: taskText,
        completed: true,
        addedAt: li.innerHTML.match(/Added: (.*?)(?=\))/)[1],
        completedAt: new Date().toLocaleString(),
    };

    li.remove();
    renderTask(completedTask);
}

function editTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector('span').innerText.split(' (')[0];
    const newTaskText = prompt("Edit task:", taskText);
    
    if (newTaskText !== null && newTaskText.trim() !== "") {
        li.querySelector('span').innerText = `${newTaskText} (Added: ${li.innerHTML.match(/Added: (.*?)(?=\))/)[1]})`;
    }
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
}
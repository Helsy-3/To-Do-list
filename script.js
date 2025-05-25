function addTask() {
                const input = document.getElementById("taskInput");
                const task = input.value.trim();
                if (task === "") return;

                const li = createTaskElement(task);
                document.getElementById("taskList").appendChild(li);
                input.value = "";

                saveTasks();
}

function createTaskElement(text, checked = false) {
                const li = document.createElement("li");

                const span = document.createElement("span");
                span.textContent = text;
                span.className = "task-text";
                if (checked) span.classList.add("checked");
                span.onclick = () => {
                                span.classList.toggle("checked");
                                saveTasks();
                };

                const delBtn = document.createElement("button");
                delBtn.textContent = "✖";
                delBtn.className = "delete-btn";
                delBtn.onclick = () => {
                                li.remove();
                                saveTasks();
                };

                li.appendChild(span);
                li.appendChild(delBtn);
                return li;
}

function saveTasks() {
                const tasks = [];
                document.querySelectorAll("#taskList li").forEach(li => {
                                const text = li.querySelector(".task-text").textContent;
                                const checked = li.querySelector(".task-text").classList.contains("checked");
                                tasks.push({ text, checked });
                });
                localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                tasks.forEach(task => {
                                const li = createTaskElement(task.text, task.checked);
                                document.getElementById("taskList").appendChild(li);
                });
}

window.onload = loadTasks;

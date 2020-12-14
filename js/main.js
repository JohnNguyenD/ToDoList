var toDoTask = new ToDoTasks();

function getElement(input) {
  return document.getElementById(input);
}

getElement("addItem").addEventListener("click", function () {
  var taskName = getElement("newTask").value;
  var id = Math.floor(Math.random() * 100);
  var status = "todo";

  var task = new Task(id, taskName, status);
  toDoTask.addTask(task);

  createToDoList(toDoTask.arr);
});

function createToDoList(arr) {
  var todoContent = "";
  var completedContent = "";
  arr.map((item) => {
    if (item.status === "todo") {
      todoContent += `
      <li><p>${item.taskName}</p>
          <button id="deleteButton" onclick="deleteButton('${item.id}')"><i class="fa fa-trash"></i></button>
          <button id="checkButton" onclick="updateButton('${item.id}')"><i class="fa fa-check"></i></button>
      </li>
  `;
    } else {
      completedContent += `
      <li><p>${item.taskName}</p>
          <button id="deleteButton" onclick="deleteButton('${item.id}')"><i class="fa fa-trash"></i></button>
          <button id="checkButton" onclick="updateButton('${item.id}')"><i class="fa fa-check"></i></button>
      </li>
  `;
    }
  });

  getElement("todo").innerHTML = todoContent;

  getElement("completed").innerHTML = completedContent;
}

function deleteButton(id) {
  toDoTask.deleteTask(id);
  createToDoList(toDoTask.arr);
}

function updateButton(id) {
  var taskDetail = toDoTask.getDetailTask(id);

  taskDetail.status = "todo" === taskDetail.status ? "completed" : "todo";
  toDoTask.updateStatus(taskDetail);
  createToDoList(toDoTask.arr);
}

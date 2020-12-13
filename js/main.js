var toDoTask = new ToDoTasks();

function getElement(input) {
  return document.getElementById(input);
}

getElement("addItem").addEventListener("click", function () {
  var taskName = getElement("newTask").value;
  var id = Math.random();
  var status = 0;

  var task = new Task(id, taskName, status);
  toDoTask.addTask(task);

  createToDoList(toDoTask.arr);
  createCompletedTask(toDoTask.arr);
});

function createToDoList(arr) {
  var content = "";
  arr.map((item) => {
    content += `
        <li><p>${item.taskName}</p>
            <button id="deleteButton" onclick="deleteButton('${item.id}')"><i class="fa fa-trash"></i></button>
            <button id="checkButton" onclick="updateButton('${item.id}')"><i class="fa fa-check"></i></button>
        </li>
    `;
  });

  getElement("todo").innerHTML = content;
}

function deleteButton(id) {
  toDoTask.deleteTask(id);
  createToDoList(toDoTask.arr);
}

function updateButton(id) {
  var taskDetail = toDoTask.getDetailTask(id);
  var status = 1;
  var taskName = taskDetail.taskName;
  var id = taskDetail.id;
  var updateTask = new Task(id, taskName, status);
  toDoTask.updateStatus(updateTask);

  // createToDoList(toDoTask.arr);

  createCompletedTask(toDoTask.arr);
}

function createCompletedTask(arr) {
  var content = "";
  arr.map((item) => {
    if (item.status === 1) {
      content += `
      <li><p>${item.taskName}</p>
          <button id="deleteButton" onclick="deleteButton('${item.id}')"><i class="fa fa-trash"></i></button>
      </li>
  `;
      deleteButton(item.id);
    }
  });

  getElement("completed").innerHTML = content;
}

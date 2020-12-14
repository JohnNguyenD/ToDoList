var toDoTask = new ToDoTasks();
var validate = new Validation();

getLocalStorage();

function getElement(input) {
  return document.getElementById(input);
}

getElement("addItem").addEventListener("click", function () {
  var taskName = getElement("newTask").value;
  var id = Math.floor(Math.random() * 100);
  var status = "todo";
  var isEmpty = true;
  var isDuplicated;

  isEmpty = validate.checkEmpty(
    taskName,
    "notiInput",
    "(*) Task can't leave blank"
  );
  console.log(isEmpty);

  isDuplicated = validate.checkDuplicateTask(
    toDoTask.arr,
    taskName,
    "duplicateInput",
    "(*) This task has already been existed"
  );
  console.log(isDuplicated);

  if (!isEmpty || !isDuplicated) return;

  var task = new Task(id, taskName, status);
  toDoTask.addTask(task);

  createToDoList(toDoTask.arr);
  setLocalStorage();
  getElement("newTask").value = "";
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
      <li><p style="color:#25b99a">${item.taskName}</p>
          <button id="deleteButton" onclick="deleteButton('${item.id}')"><i class="fa fa-trash"></i></button>
          <button id="checkButton" onclick="updateButton('${item.id}')" style="color:#25b99a"><i class="fa fa-check"></i></button>
      </li>
  `;
    }
  });

  getElement("todo").innerHTML = todoContent;

  getElement("completed").innerHTML = completedContent;
}

function deleteButton(id) {
  var answer = confirm("Do you wanna delete this task?");
  if (answer == true) {
    toDoTask.deleteTask(id);
    createToDoList(toDoTask.arr);
    alert("Delete Successfully");
    setLocalStorage();
  }
}

function updateButton(id) {
  var taskDetail = toDoTask.getDetailTask(id);

  taskDetail.status = "todo" === taskDetail.status ? "completed" : "todo";
  toDoTask.updateStatus(taskDetail);
  alert("Update status successfully");
  createToDoList(toDoTask.arr);
}

function getLocalStorage() {
  if (localStorage.getItem("ToDoList")) {
    toDoTask.arr = JSON.parse(localStorage.getItem("ToDoList"));
    createToDoList(toDoTask.arr);
  }
}

function setLocalStorage() {
  localStorage.setItem("ToDoList", JSON.stringify(toDoTask.arr));
}

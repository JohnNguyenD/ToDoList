function ToDoTasks() {
  this.arr = [];

  this.addTask = function (task) {
    this.arr.push(task);
  };

  this.findTaskId = function (id) {
    // console.log(typeof id);
    return this.arr.findIndex((item) => {
      return Number(id) === item.id;
    });
  };

  this.deleteTask = function (id) {
    var deleteTask = this.findTaskId(id);

    if (id !== -1) this.arr.splice(deleteTask, 1);
  };

  this.updateStatus = function (task) {
    var updateTask = this.findTaskId(task.id);
    if (updateTask !== -1) {
      this.arr[updateTask] = task;
    }
  };

  this.getDetailTask = function (id) {
    var index = this.findTaskId(id);

    if (index !== -1) return this.arr[index];
  };
}

function Validation() {
  this.checkEmpty = function (input, spanId, message) {
    if (input === "") {
      getElement(spanId).style.display = "block";
      getElement(spanId).innerHTML = message;
      return false;
    } else {
      getElement(spanId).style.display = "none";
      getElement(spanId).innerHTML = "";
      return true;
    }
  };

  this.checkDuplicateTask = function (tasks, input, spanId, message) {
    var isNotDuplicate = true;
    tasks.map((item) => {
      if (item.taskName === input) {
        getElement(spanId).style.display = "block";
        getElement(spanId).innerHTML = message;
        isNotDuplicate = false;
      }
    });
    if (isNotDuplicate) {
      getElement(spanId).style.display = "none";
      getElement(spanId).innerHTML = "";
    }
    return isNotDuplicate;
  };
}

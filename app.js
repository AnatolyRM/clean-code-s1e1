var taskInput = document.getElementById("add-value");
var addButton = document.getElementById("add-btn");
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.className = 'task';

  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = 'task__completed';

  var label = document.createElement("label");
  label.innerText = taskString;
  label.className = 'task__name title';

  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task__name inp";

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "task__btn-edit";

  var deleteButton = document.createElement("button");
  deleteButton.className = "task__btn-delete";
  
  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = "btn-delete__img"
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function () {
  if (!taskInput.value.trim()) return;
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

var editTask = function () {
  var listItem = this.parentNode;

  var editInput = listItem.querySelector('.inp');
  var label = listItem.querySelector(".title");
  var editBtn = listItem.querySelector(".task__btn-edit");
  var containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

//Delete task.
var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function () {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark task incompleted
var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function () {
  console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector(".task__completed");
  var editButton = taskListItem.querySelector(".task__btn-edit");
  var deleteButton = taskListItem.querySelector(".task__btn-delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
function submitTask() {
  //   const form = document.querySelector("form[name='todo-form']");
  const taskName = document.querySelector("input[name='task-name']").value;
  const taskObject = {
    name: taskName,
    status: "notDone",
  };
  addToLocalStorage(taskObject);
  getFromLocalStorage();
}

function addToLocalStorage(taskObject) {
  if (localStorage.getItem("taskList") == undefined) {
    localStorage.setItem("taskList", JSON.stringify([taskObject]));
  } else {
    let list = JSON.parse(localStorage.getItem("taskList"));
    list.push(taskObject);
    localStorage.setItem("taskList", JSON.stringify(list));
  }
}

function getFromLocalStorage() {
  let list = JSON.parse(localStorage.getItem("taskList"));
  document.querySelector("#task-list").innerHTML = "";
  list.forEach((element, index) => {
    displayTask(element, index);
  });
}

getFromLocalStorage();

function displayTask(element, index) {
  console.log(element.name);
  let taskCard = document.createElement("div");
  let taskTitleContainer = document.createElement("div");
  let taskStatusContainer = document.createElement("div");
  taskCard.classList.add("taskCard");
  let taskTitle = document.createTextNode(element.name);
  let taskStatus = document.createTextNode(element.status);
  taskTitleContainer.appendChild(taskTitle);
  taskStatusContainer.appendChild(taskStatus);
  taskCard.appendChild(taskTitleContainer);
  taskCard.appendChild(taskStatusContainer);
  addTaskButtons(taskCard, index, element.status);
  document.querySelector("#task-list").appendChild(taskCard);
}

function addTaskButtons(taskCard, index, status) {
  let doneButton = document.createElement("button");
  if (status == "done") {
    let doneText = document.createTextNode("notDone");
    doneButton.appendChild(doneText);
    doneButton.setAttribute("onclick", "markAsNotDone(" + index + ")");
    taskCard.appendChild(doneButton);
  } else {
    let doneText = document.createTextNode("done");
    doneButton.appendChild(doneText);
    doneButton.setAttribute("onclick", "markAsDone(" + index + ")");
    taskCard.appendChild(doneButton);
  }
  let deleteButton = document.createElement("button");
  let deleteText = document.createTextNode("delete");
  deleteButton.appendChild(deleteText);
  deleteButton.setAttribute("onclick", "removeTask(" + index + ")");
  taskCard.appendChild(deleteButton);
}

function markAsDone(index) {
  console.log(index);
  let list = JSON.parse(localStorage.getItem("taskList"));
  list[index].status = "done";
  localStorage.setItem("taskList", JSON.stringify(list));
  getFromLocalStorage();
}

function markAsNotDone(index) {
  console.log(index);
  let list = JSON.parse(localStorage.getItem("taskList"));
  list[index].status = "notDone";
  localStorage.setItem("taskList", JSON.stringify(list));
  getFromLocalStorage();
}

function removeTask(index) {
  console.log(index);
  let list = JSON.parse(localStorage.getItem("taskList"));
  list.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(list));
  getFromLocalStorage();
}

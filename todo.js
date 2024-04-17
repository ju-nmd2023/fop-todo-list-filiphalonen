function submitTask() {
  //   const form = document.querySelector("form[name='todo-form']");
  const taskName = document.querySelector("input[name='task-name']").value;
  const taskObject = {
    name: taskName,
    status: "notDone",
  };
  addToLocalStorage(taskObject);
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
  list.forEach((element) => {
    displayTask(element);
  });
}

getFromLocalStorage();

function displayTask(element) {
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
  document.querySelector("#task-list").appendChild(taskCard);
}

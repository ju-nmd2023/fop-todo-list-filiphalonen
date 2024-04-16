function submitTask() {
  //   const form = document.querySelector("form[name='todo-form']");
  const taskName = document.querySelector("input[name='task-name']").value;
  addToLocalStorage(taskName);
}

function addToLocalStorage(taskName) {
  if (localStorage.getItem("taskList") == undefined) {
    localStorage.setItem("taskList", JSON.stringify([taskName]));
  } else {
    let list = JSON.parse(localStorage.getItem("taskList"));
    list.push(taskName);
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
  let taskCard = document.createElement("div");
  let taskTitle = document.createTextNode(element);
  taskCard.appendChild(taskTitle);
  document.querySelector("#task-list").appendChild(taskCard);
}

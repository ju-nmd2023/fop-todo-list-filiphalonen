// called when clicking submit
function submitTask() {
  // value of the input
  const taskName = document.querySelector("input[name='task-name']").value;
  // object with name and status
  const taskObject = {
    name: taskName,
    status: "notDone",
  };
  // function for adding in local storage
  addToLocalStorage(taskObject);
  // function for retrieving from local storage to update list
  getFromLocalStorage();
}

// checking if task list already exists, if it does retrieve, update and save. If not just save
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
  // if list doesn't exist exit function
  if (list == undefined) {
    return;
  }
  // clear div list
  document.querySelector("#task-list").innerHTML = "";
  // for each item in list call display function
  list.forEach((element, index) => {
    displayTask(element, index);
  });
}

// retrieve from local storage on page load
getFromLocalStorage();

// element is our task object and index is our id
function displayTask(element, index) {
  // create our task card, title container and status container
  let taskCard = document.createElement("div");
  let taskTextContainer = document.createElement("div");
  let taskTitleContainer = document.createElement("p");
  let taskStatusContainer = document.createElement("p");
  // add our css class to our card
  taskCard.classList.add("taskCard");
  taskTitleContainer.classList.add("taskTitle");
  taskTextContainer.classList.add("taskTextContainer");
  taskStatusContainer.classList.add("taskStatus");

  // create text node for task title and task status
  let taskTitle = document.createTextNode(element.name);
  let taskStatus = document.createTextNode(element.status);
  // append our content to their containers
  taskTitleContainer.appendChild(taskTitle);
  taskStatusContainer.appendChild(taskStatus);
  taskTextContainer.appendChild(taskTitleContainer);
  taskTextContainer.appendChild(taskStatusContainer);
  taskCard.appendChild(taskTextContainer);
  // add buttons. separate function for clarity
  addTaskButtons(taskCard, index, element.status);
  // add card to our list
  document.querySelector("#task-list").appendChild(taskCard);
}

// function for adding buttons, uses the card element, its index and status
function addTaskButtons(taskCard, index, status) {
  let buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("buttonWrapper");
  let doneButton = document.createElement("button");
  // if status is done, create and append not done button and vice-versa
  if (status == "done") {
    let doneText = document.createTextNode("notDone");
    doneButton.appendChild(doneText);
    doneButton.setAttribute("onclick", "markAsNotDone(" + index + ")");
    buttonWrapper.appendChild(doneButton);
  } else {
    let doneText = document.createTextNode("done");
    doneButton.appendChild(doneText);
    doneButton.setAttribute("onclick", "markAsDone(" + index + ")");
    buttonWrapper.appendChild(doneButton);
  }
  // create and add our delete button
  let deleteButton = document.createElement("button");
  let deleteText = document.createTextNode("delete");
  deleteButton.appendChild(deleteText);
  deleteButton.setAttribute("onclick", "removeTask(" + index + ")");
  buttonWrapper.appendChild(deleteButton);
  taskCard.appendChild(buttonWrapper);
}

// function to change status to done
function markAsDone(index) {
  let list = JSON.parse(localStorage.getItem("taskList"));
  list[index].status = "done";
  localStorage.setItem("taskList", JSON.stringify(list));
  getFromLocalStorage();
}

// function to change status to not done
function markAsNotDone(index) {
  let list = JSON.parse(localStorage.getItem("taskList"));
  list[index].status = "notDone";
  localStorage.setItem("taskList", JSON.stringify(list));
  getFromLocalStorage();
}

// function to remove task
function removeTask(index) {
  let list = JSON.parse(localStorage.getItem("taskList"));
  list.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(list));
  getFromLocalStorage();
}

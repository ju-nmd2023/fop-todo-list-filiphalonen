function submitTask() {
  //   const form = document.querySelector("form[name='todo-form']");
  const taskName = document.querySelector("input[name='task-name']").value;
  console.log(taskName);
  addToLocalStorage(taskName);
}

function addToLocalStorage(taskName) {
  localStorage.setItem(taskName, taskName);
}

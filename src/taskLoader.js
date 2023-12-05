import { removeChildren, generateContent } from "./util";
import FormHandler from "./formHandlers.js";
import Storage from "./storage.js";
import * as ProjectLoader from "./projectLoader.js";

const addTaskBtn = document.querySelector("#add-task-btn");
const projectTitleDisplay = document.querySelector(".current-project");
const tasksList = document.querySelector(".tasks-list");

export function loadTask(project, t, isAgg) {
  const task = document.createElement("div");
  task.classList.add("task-container");

  const completed = document.createElement("input");
  completed.type = "checkbox";
  if (t.completed) {
    completed.checked = true;
    task.classList.add("completed");
  } else {
    completed.checked = false;
    task.classList.remove("completed");
  }

  completed.addEventListener("change", (e) => {
    if (completed.checked) {
      Storage.setTaskCompletedTrue(project, t);
      task.classList.add("completed");
    } else {
      Storage.setTaskCompletedFalse(project, t);
      task.classList.remove("completed");
    }
  });

  task.appendChild(completed);
  const titleContainer = document.createElement("div");
  titleContainer.appendChild(generateContent("strong", `${t.title} - `));
  task.appendChild(titleContainer);
  //task.appendChild(generateContent("p", t.title));
  const descriptionContainer = document.createElement("div");
  descriptionContainer.appendChild(generateContent("p", t.description));
  task.appendChild(descriptionContainer);
  //task.appendChild(generateContent("p", t.description));
  //task.appendChild(generateContent("p", t.createdDate));
  const dueDateContainer = document.createElement("div");
  dueDateContainer.appendChild(generateContent("strong", "Due: "));
  //task.appendChild(generateContent("strong", "Due:"));
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = t.dueDate;
  dateInput.addEventListener("input", () => Storage.setDueDate(project, t, dateInput.value));
  dueDateContainer.appendChild(dateInput);
  task.appendChild(dueDateContainer);
  const deleteBtn = document.createElement("button");
  //deleteBtn.innerText = "X";
  deleteBtn.classList.add("delete-task-btn");
  deleteBtn.onclick = () => FormHandler.removeTask(project, t, isAgg);

  task.appendChild(deleteBtn);

  return task;
}

export function showTaskDialog() {
  const taskDialog = document.querySelector("#taskDialog");
  const newTaskForm = document.querySelector("#newTaskForm");
  newTaskForm.onsubmit = FormHandler.taskFormSubmit;

  taskDialog.showModal();
  const cancelBtn = document.querySelector("#task-cancelBtn");
  cancelBtn.addEventListener("click", () => {
    taskDialog.close(cancelBtn.value);
  });

  taskDialog.addEventListener("close", () => {
    FormHandler.taskFormClose();
  });
}

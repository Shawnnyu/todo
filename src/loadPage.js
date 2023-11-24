import { removeChildren, generateContent } from "./util";
import FormHandler from "./formHandlers.js";
import Storage from "./storage.js";
import Task from "./task";

const mainDisplay = document.querySelector(".main-display");
const addTaskBtn = document.querySelector("#add-task-btn");
const projectTitleDisplay = document.querySelector(".current-project");
const projectFormContainer = document.querySelector(".project-form-container");
const tasksList = document.querySelector(".tasks-list");

/*************Projects*************/
export function getCurrentProject() {
  const projectTitleDisplay = document.querySelector(".current-project").firstChild;
  const projectTitle = projectTitleDisplay.innerHTML;
  console.log(`title:  ${projectTitle}`);
  return projectTitle;
}

function loadProject(project, container, isInbox) {
  project.tasks.forEach((t) => {
    container.appendChild(loadTask(project, t, isInbox));
  });
}

export function loadSideBarProjects() {
  const projectContainer = document.querySelector(".projects-container");
  const allProjects = Storage.getAllProjects();
  for (let i = 0; i < allProjects.length; i++) {
    const item = document.createElement("button");
    item.innerText = allProjects[i];
    //fix below
    item.onclick = () => loadProjectFromSidebar(Storage.getProjectObject(allProjects[i]));
    projectContainer.appendChild(item);
  }
}

export function loadSidebarButtons() {
  const addProjectBtn = document.querySelector("#add-project-btn");
  addProjectBtn.addEventListener("click", showProjectForm);
  const inboxBtn = document.querySelector("#inbox-btn");
  inboxBtn.addEventListener("click", loadInbox);
}

export function addProjectToSideBar(project) {
  const projectContainer = document.querySelector(".projects-container");
  const item = document.createElement("button");
  item.innerText = project.title;
  projectContainer.appendChild(item);
}

export function hideProjectForm() {
  console.log("here");
  projectFormContainer.style.display = "none";
}

function showProjectForm() {
  //const projectFormContainer = document.querySelector(".project-form-container");
  projectFormContainer.style.display = "block";
  const projectForm = document.querySelector("#newProjectForm");
  projectForm.onsubmit = (e) => FormHandler.projectFormSubmit(e);
  const cancelBtn = document.querySelector("#project-cancelBtn");
  cancelBtn.onclick = () => {
    projectFormContainer.style.display = "none";
  };
}

export function loadInbox() {
  addTaskBtn.style.display = "none";
  if (projectTitleDisplay.hasChildNodes()) {
    projectTitleDisplay.removeChild(projectTitleDisplay.children[0]);
  }
  removeChildren(tasksList);
  projectTitleDisplay.appendChild(generateContent("h2", "Inbox"));
  const allProjects = Storage.getAllProjects();
  for (let i = 0; i < allProjects.length; i++) {
    const projectTitle = allProjects[i];
    const projectCell = document.createElement("div");
    projectCell.classList.add("project");
    projectCell.appendChild(generateContent("h3", projectTitle));
    const curProject = Storage.getProjectObject(projectTitle);
    loadProject(curProject, projectCell, true);
    tasksList.appendChild(projectCell);
  }
}

/*************Projects*************/

/*************Tasks*************/

export function loadTask(project, t, isInbox) {
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
  task.appendChild(generateContent("p", t.title));
  task.appendChild(generateContent("p", t.description));
  task.appendChild(generateContent("p", t.createdDate));

  const deleteBtn = document.createElement("button");
  //deleteBtn.innerText = "X";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => FormHandler.removeTask(project, t, isInbox);

  task.appendChild(deleteBtn);

  return task;
}

export function loadProjectFromSidebar(project) {
  addTaskBtn.style.display = "block";
  if (addTaskBtn.getAttribute("listener") == true) {
    addTaskBtn.removeEventListener("click");
  }
  //const projectTitleDisplay = document.querySelector(".current-project");
  if (projectTitleDisplay.hasChildNodes()) {
    projectTitleDisplay.removeChild(projectTitleDisplay.children[0]);
  }
  projectTitleDisplay.appendChild(generateContent("h2", project.title));
  removeChildren(tasksList);
  loadProject(project, tasksList, false);
  //const addTaskBtn = document.createElement("button");
  //addTaskBtn.innerText = "Add Task";
  //mainDisplay.appendChild(addTaskBtn);
  addTaskBtn.addEventListener("click", () => showTaskDialog(project.title));
  //console.log(projectTitleDisplay.firstChild.innerText);
}

function showTaskDialog() {
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

/*************Tasks*************/

//refactor

import { removeChildren, generateContent } from "./util";
import FormHandler from "./formHandlers.js";
import Storage from "./storage.js";
import { isThisMonth, isThisWeek, isToday, toDate, parseISO } from "date-fns";
import * as TaskLoader from "./taskLoader.js";
import Task from "./task";

const addTaskBtn = document.querySelector("#add-task-btn");
const projectTitleDisplay = document.querySelector(".current-project");
const projectFormContainer = document.querySelector(".project-form-container");
const tasksList = document.querySelector(".tasks-list");
const projectContainer = document.querySelector(".projects");

const inboxBtn = document.querySelector("#inbox-btn");
const addProjectBtn = document.querySelector("#add-project-btn");
const todayBtn = document.querySelector("#today-btn");
const weekBtn = document.querySelector("#week-btn");
const monthBtn = document.querySelector("#month-btn");
const [...homeBtns] = document.querySelectorAll(".home-nav-btn");

export function getCurrentProject() {
  const projectTitleDisplay = document.querySelector(".current-project").firstChild;
  const projectTitle = projectTitleDisplay.innerHTML;
  return projectTitle;
}

function filterProjects(project, container, filter, isAgg) {
  //need to make a call to storage in case project gets updated
  project = Storage.getProjectObject(project.title);
  project.tasks.forEach((t) => {
    if (filter(t)) {
      container.appendChild(TaskLoader.loadTask(project, t, isAgg));
    }
  });
}

function filterNone(task) {
  return task instanceof Task;
}

function filterToday(task) {
  return isToday(toDate(parseISO(task.getDueDate())));
}

function filterMonth(task) {
  return isThisMonth(toDate(parseISO(task.getDueDate())));
}

function filterWeek(task) {
  return isThisWeek(toDate(parseISO(task.getDueDate())));
}

export function loadInbox() {
  resetBtns();
  inboxBtn.classList.add("active");
  loadToDoList(filterNone, true);
}

export function loadToday() {
  resetBtns();
  todayBtn.classList.add("active");
  loadToDoList(filterToday, true);
}

export function loadWeek() {
  resetBtns();
  weekBtn.classList.add("active");
  loadToDoList(filterWeek, true);
}

export function loadMonth() {
  resetBtns();
  monthBtn.classList.add("active");
  loadToDoList(filterMonth, true);
}

//called once on initial load
export function loadSideBarProjects() {
  const allProjects = Storage.getAllProjects();
  for (let i = 0; i < allProjects.length; i++) {
    const cur = Storage.getProjectObject(allProjects[i]);
    const container = createProjectButton(cur);
    projectContainer.appendChild(container);
  }
}

export function loadSidebarButtons() {
  addProjectBtn.addEventListener("click", showProjectForm);
  inboxBtn.addEventListener("click", loadInbox);
  todayBtn.addEventListener("click", loadToday);
  weekBtn.addEventListener("click", loadWeek);
  monthBtn.addEventListener("click", loadMonth);
}

export function addProjectToSideBar(project) {
  const projectContainer = document.querySelector(".projects");
  const container = createProjectButton(project);
  projectContainer.appendChild(container);
}

export function hideProjectForm() {
  projectFormContainer.style.display = "none";
}

export function loadProjectFromSidebar(project, button) {
  if (button !== undefined) {
    resetBtns();
    button.classList.add("active");
  }

  addTaskBtn.style.display = "block";
  if (addTaskBtn.getAttribute("listener") == true) {
    addTaskBtn.removeEventListener("click");
  }
  if (projectTitleDisplay.hasChildNodes()) {
    projectTitleDisplay.removeChild(projectTitleDisplay.children[0]);
  }
  projectTitleDisplay.appendChild(generateContent("h1", project.title));
  removeChildren(tasksList);
  filterProjects(project, tasksList, filterNone, false);

  addTaskBtn.addEventListener("click", () => TaskLoader.showTaskDialog(project.title));
}

function showProjectForm() {
  projectFormContainer.style.display = "block";
  const projectForm = document.querySelector("#newProjectForm");
  projectForm.onsubmit = (e) => FormHandler.projectFormSubmit(e);
  const cancelBtn = document.querySelector("#project-cancelBtn");
  cancelBtn.onclick = () => {
    projectFormContainer.style.display = "none";
  };
}

function loadToDoList(filter, isAgg) {
  addTaskBtn.style.display = "none";
  if (projectTitleDisplay.hasChildNodes()) {
    projectTitleDisplay.removeChild(projectTitleDisplay.children[0]);
  }
  removeChildren(tasksList);
  projectTitleDisplay.appendChild(generateContent("h1", "Inbox"));
  const allProjects = Storage.getAllProjects();
  for (let i = 0; i < allProjects.length; i++) {
    const projectTitle = allProjects[i];
    const projectCell = document.createElement("div");
    projectCell.classList.add("project");
    projectCell.appendChild(generateContent("h3", projectTitle));
    const curProject = Storage.getProjectObject(projectTitle);
    filterProjects(curProject, projectCell, filter, isAgg);
    tasksList.appendChild(projectCell);
  }
}

function deleteProject(project, child, parent, projectTitle) {
  Storage.deleteProject(project);
  parent.removeChild(child);
  if (projectTitle === "Inbox") {
    loadInbox();
  } else if (projectTitle == project.title) {
    projectTitleDisplay.innerHTML = "";
    removeChildren(tasksList);
    addTaskBtn.style.display = "none";
  }
}

function createProjectButton(project) {
  const container = document.createElement("div");
  const projectBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  deleteBtn.classList.add("delete-project-btn");

  const img = document.createElement("img");
  img.src = "./dist/images/project.svg";
  img.classList.add("project-icon");
  projectBtn.appendChild(img);

  const textNode = document.createTextNode(project.title);
  projectBtn.appendChild(textNode);
  projectBtn.classList.add("project-nav-btn");

  projectBtn.onclick = () => loadProjectFromSidebar(project, projectBtn);
  deleteBtn.onclick = () => deleteProject(project, container, projectContainer, getCurrentProject());
  container.appendChild(projectBtn);
  container.appendChild(deleteBtn);

  container.classList.add("project-nav-container");
  return container;
}

//un-highlights all the buttons
function resetBtns() {
  const [...projectBtns] = document.querySelectorAll(".project-nav-btn");
  homeBtns.forEach((btn) => btn.classList.remove("active"));
  projectBtns.forEach((btn) => btn.classList.remove("active"));
}

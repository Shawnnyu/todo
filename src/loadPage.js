import { removeChildren, generateContent } from "./util";
import FormHandler from "./formHandlers.js";
import Storage from "./storage.js";
import Task from "./task";

export default class LoadPage {
  static projectTitleDisplay = document.querySelector(".current-project");
  static getCurrentProject() {
    const projectTitleDisplay = document.querySelector(".current-project").firstChild;
    const projectTitle = projectTitleDisplay.innerHTML;
    console.log(`title:  ${projectTitle}`);
    return projectTitle;
  }

  static loadProject(project) {
    const display = document.querySelector(".tasks-list");
    removeChildren(display);
    project.tasks.forEach((t) => {
      display.appendChild(this.loadTask(project, t));
    });
  }

  static loadTask(project, t) {
    const task = document.createElement("div");
    task.classList.add("task-container");

    const completed = document.createElement("input");
    completed.type = "checkbox";

    completed.addEventListener("change", (e) => {
      if (completed.checked) {
        t.setCompleted(true);
        task.classList.add("completed");
      } else {
        t.setCompleted(false);
        task.classList.remove("completed");
      }
    });

    task.appendChild(completed);
    task.appendChild(generateContent("p", t.title));
    task.appendChild(generateContent("p", t.description));
    task.appendChild(generateContent("p", t.createdDate));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.onclick = () => FormHandler.removeTask(project, t);

    task.appendChild(deleteBtn);

    return task;
  }

  static loadTaskDisplay(project) {
    //const projectTitleDisplay = document.querySelector(".current-project");
    if (this.projectTitleDisplay.hasChildNodes()) {
      this.projectTitleDisplay.removeChild(this.projectTitleDisplay.children[0]);
    }
    this.projectTitleDisplay.appendChild(generateContent("h2", project.title));
    this.loadProject(project);
    //console.log(this.projectTitleDisplay.firstChild.innerText);
  }

  static loadSidebarButtons() {
    const addProjectBtn = document.querySelector("#add-project-btn");
    addProjectBtn.addEventListener("click", this.showProjectForm);
  }

  static loadTaskButtons() {
    const addTaskBtn = document.querySelector("#add-task-btn");
    addTaskBtn.addEventListener("click", this.showTaskDialog);
  }

  static loadSideBarProjects() {
    const projectContainer = document.querySelector(".projects-container");
    const allProjects = Storage.getAllProjects();
    for (let i = 0; i < allProjects.length; i++) {
      const item = document.createElement("button");
      item.innerText = allProjects[i];
      projectContainer.appendChild(item);
    }
  }

  //todo
  static addProjectToSideBar(project) {}

  static showProjectForm() {
    const projectFormContainer = document.querySelector(".project-form-container");
    projectFormContainer.style.display = "block";
    const projectForm = document.querySelector("#newProjectForm");
    projectForm.onsubmit = (e) => FormHandler.projectFormSubmit(e);
  }

  //refactor
  static showTaskDialog() {
    const taskDialog = document.querySelector("#taskDialog");
    const newTaskForm = document.querySelector("#newTaskForm");
    newTaskForm.onsubmit = FormHandler.taskFormSubmit;
    const cancelBtn = document.querySelector("#cancelBtn");
    taskDialog.showModal();
    cancelBtn.addEventListener("click", () => {
      taskDialog.close(cancelBtn.value);
    });
  }

  //refactor
}

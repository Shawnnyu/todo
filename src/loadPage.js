import { removeChildren, generateContent } from "./util";
import Task from "./task";

export default class LoadPage {
  static projectTitleDisplay = document.querySelector(".current-project");

  static loadProject(project) {
    const display = document.querySelector(".tasks-list");
    removeChildren(display);
    project.tasks.forEach((t) => {
      const task = document.createElement("div");
      task.classList.add("task-container");
      const completed = document.createElement("input");
      completed.type = "checkbox";
      task.appendChild(completed);
      task.appendChild(generateContent("p", t.title));
      task.appendChild(generateContent("p", t.description));
      task.appendChild(generateContent("p", t.createdDate));
      display.appendChild(task);
    });
  }

  static loadTaskDisplay(project) {
    //const projectTitleDisplay = document.querySelector(".current-project");
    this.projectTitleDisplay.appendChild(generateContent("h2", project.title));
    this.loadProject(project);
    console.log(this.projectTitleDisplay.firstChild.innerText);
  }

  static loadSidebarButtons() {
    const addProjectBtn = document.querySelector("#add-project-btn");
    addProjectBtn.addEventListener("click", this.showProjectForm);
  }

  static loadTaskButtons() {
    const addTaskBtn = document.querySelector("#add-task-btn");
    addTaskBtn.addEventListener("click", this.showTaskDialog);
  }

  static showProjectForm() {
    const projectForm = document.querySelector(".project-form-container");
    projectForm.style.display = "block";
  }

  //refactor
  static showTaskDialog() {
    const taskDialog = document.querySelector("#taskDialog");
    const newTaskForm = document.querySelector("#newTaskForm");
    newTaskForm.onsubmit = this.taskFormSubmit;
    const cancelBtn = document.querySelector("#cancelBtn");
    taskDialog.showModal();
    cancelBtn.addEventListener("click", () => {
      taskDialog.close(cancelBtn.value);
    });
  }

  //refactor
  static taskFormSubmit() {
    const newTaskTitle = document.querySelector("#new-title");
    const newTaskDescription = document.querySelector("#new-description");
    const task = new Task(newTaskTitle, newTaskDescription, format(new Date(), "yyyy-MM-dd"), "date", "important", false);
  }
}

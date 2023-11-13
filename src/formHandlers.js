import Page from "./loadPage.js";
import Storage from "./storage.js";
import Task from "./task.js";
import Project from "./project.js";
import { format } from "date-fns";

export default class FormHandlers {
  //refactor
  static taskFormSubmit() {
    const newTaskTitle = document.querySelector("#new-task-title");
    const newTaskDescription = document.querySelector("#new-task-description");
    const task = new Task(newTaskTitle.value, newTaskDescription.value, format(new Date(), "yyyy-MM-dd"), "date", "important", false);
    const currentProject = Storage.getProjectObject(Page.getCurrentProject());
    Storage.addTaskToProject(currentProject, task);
    Page.loadTaskDisplay(currentProject);
  }

  static projectFormSubmit(e) {
    e.preventDefault();
    const newProjectTitle = document.querySelector("#new-project-title");
    const project = new Project(newProjectTitle.value);
    Storage.addProject(project);
    Page.loadSideBarProjects();
    console.log("title: ");
  }

  static removeTask(project, task) {
    Storage.deleteTaskFromProject(project, task);
    Page.loadTaskDisplay(project);
  }
}

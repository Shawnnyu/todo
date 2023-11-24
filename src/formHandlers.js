import * as Page from "./loadPage.js";
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

  static taskFormSubmit1(project) {
    const newTaskTitle = document.querySelector("#new-task-title");
    const newTaskDescription = document.querySelector("#new-task-description");
    const task = new Task(newTaskTitle.value, newTaskDescription.value, format(new Date(), "yyyy-MM-dd"), "date", "important", false);
    const currentProject = Storage.getProjectObject(project);
    Storage.addTaskToProject(currentProject, task);
    Page.loadTaskDisplay(currentProject);
  }

  static taskFormClose() {
    const newTaskTitle = document.querySelector("#new-task-title");
    const newTaskDescription = document.querySelector("#new-task-description");
    [newTaskTitle.value, newTaskDescription.value] = [null, null];
  }

  static projectFormSubmit(e) {
    e.preventDefault();
    const newProjectTitle = document.querySelector("#new-project-title");
    const project = new Project(newProjectTitle.value);
    Storage.addProject(project);

    //remove below
    //Page.loadSideBarProjects();
    Page.addProjectToSideBar(project);
    Page.hideProjectForm();
    console.log("title: ");
  }

  static removeTask(project, task, isInbox) {
    Storage.deleteTaskFromProject(project, task);
    if (isInbox) {
      Page.loadInbox();
    } else {
      Page.loadTaskDisplay(project);
    }
  }
}

//import * as Page from "./loadPage.js";
import Storage from "./storage.js";
import Task from "./task.js";
import Project from "./project.js";
import { format } from "date-fns";
import * as ProjectPage from "./projectLoader";

export default class FormHandlers {
  //refactor
  static taskFormSubmit() {
    const newTaskTitle = document.querySelector("#new-task-title");
    const newTaskDescription = document.querySelector("#new-task-description");
    const newTaskDueDate = document.querySelector("#new-due-date");
    const task = new Task(
      newTaskTitle.value,
      newTaskDescription.value,
      format(new Date(), "yyyy-MM-dd"),
      newTaskDueDate.value == "" ? format(new Date(), "yyyy-MM-dd") : newTaskDueDate.value,
      "important",
      false
    );
    const currentProject = Storage.getProjectObject(ProjectPage.getCurrentProject());
    Storage.addTaskToProject(currentProject, task);
    ProjectPage.loadProjectFromSidebar(currentProject);
  }

  static taskFormClose() {
    const newTaskTitle = document.querySelector("#new-task-title");
    const newTaskDescription = document.querySelector("#new-task-description");
    const newTaskDueDate = document.querySelector("#new-due-date");
    [newTaskTitle.value, newTaskDescription.value, newTaskDueDate.value] = [null, null, null];
  }

  static projectFormSubmit(e) {
    e.preventDefault();
    const newProjectTitle = document.querySelector("#new-project-title");
    const project = new Project(newProjectTitle.value);
    Storage.addProject(project);

    //remove below
    //Page.loadSideBarProjects();
    ProjectPage.addProjectToSideBar(project);
    ProjectPage.hideProjectForm();
    ProjectPage.loadInbox();
    console.log("title: ");
  }

  //refactor into task loader
  static removeTask(project, task, isAgg) {
    Storage.deleteTaskFromProject(project, task);
    if (isAgg) {
      ProjectPage.loadInbox();
    } else {
      ProjectPage.loadProjectFromSidebar(project);
    }
  }
}

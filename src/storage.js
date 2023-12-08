import Project from "./project";
import Task from "./task";

export default class Storage {
  static addProject(project) {
    localStorage.setItem(project.title, JSON.stringify(project.getTasks()));
  }

  static addTaskToProject(project, task) {
    project.addTask(task);
    localStorage.setItem(project.title, JSON.stringify(project.getTasks()));
  }

  static getProjectObject(title) {
    const project = new Project(title);
    const storedTasks = JSON.parse(localStorage.getItem(title));
    for (let i = 0; i < storedTasks.length; i++) {
      const task = new Task(
        storedTasks[i]["title"],
        storedTasks[i]["description"],
        storedTasks[i]["createdDate"],
        storedTasks[i]["dueDate"],
        storedTasks[i]["completed"]
      );
      project.addTask(task);
    }
    return project;
  }

  static getAllProjects() {
    return Object.keys(localStorage);
  }

  static deleteTaskFromProject(project, task) {
    project.removeTask(task);
    localStorage.setItem(project.title, JSON.stringify(project.getTasks()));
  }

  static setTaskCompletedTrue(project, task) {
    task.setCompleted(true);
    localStorage.setItem(project.title, JSON.stringify(project.getTasks()));
  }

  static setTaskCompletedFalse(project, task) {
    task.setCompleted(false);
    localStorage.setItem(project.title, JSON.stringify(project.getTasks()));
  }

  static setDueDate(project, task, date) {
    task.setDueDate(date);
    localStorage.setItem(project.title, JSON.stringify(project.getTasks()));
  }

  static deleteProject(project) {
    localStorage.removeItem(project.title);
  }
}

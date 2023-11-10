import Project from "./project";
import Task from "./task";

function addProject(project) {
  localStorage.setItem(project.title, JSON.stringify(project.getTasks()));
}

function addTaskToProject(project, task) {}

//temp
function getProject(title) {
  return localStorage.getItem(title);
}

function getProjectObject(title) {
  const project = new Project(title);
  const storedTasks = JSON.parse(localStorage.getItem(title));
  for (let i = 0; i < storedTasks.length; i++) {
    const task = new Task(
      storedTasks[i]["title"],
      storedTasks[i]["description"],
      storedTasks[i]["createdDate"],
      storedTasks[i]["dueDate"],
      storedTasks[i]["priority"],
      storedTasks[i]["completed"]
    );
    project.addTask(task);
  }
  return project;
}

export { addProject, getProject, getProjectObject };

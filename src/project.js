export default class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  addTask(task) {
    if (!this.tasks.find((t) => t.title === task.title)) {
      this.tasks.push(task);
    }
  }

  removeTask(task) {
    if (this.tasks.some((t) => t.title === task.title)) {
      this.tasks.splice(
        this.tasks.findIndex((t) => t.title === task.title),
        1
      );
    }
  }
}

export default class Task {
  constructor(title, description, createdDate, dueDate, completed) {
    this.title = title;
    this.description = description;
    this.createdDate = createdDate;
    this.dueDate = dueDate;
    this.completed = completed;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getCreatedDate() {
    return this.createdDate;
  }

  getDueDate() {
    return this.dueDate;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  getCompleted() {
    return this.completed;
  }

  setCompleted(completed) {
    this.completed = completed;
  }
}

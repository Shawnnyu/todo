function loadProject(project) {
  const display = document.querySelector(".tasks-display");
  project.tasks.forEach((t) => {
    let task = document.createElement("div");
    task.innerText = t.title;
    display.appendChild(task);
  });
}

export { loadProject };

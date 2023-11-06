import Task from "./task";
import Project from "./project";
import { format } from "date-fns";
import { loadProject } from "./loadPage";

const t1 = new Task("one", "oneDes", "date", "important", false);
console.log(t1);

const p1 = new Project("project");

p1.addTask(t1);

console.log(p1);

p1.addTask(t1);
console.log(p1);

p1.removeTask(t1);
console.log(p1);

console.log(format(new Date(), "yyyy-MM-dd"));
p1.addTask(t1);
loadProject(p1);

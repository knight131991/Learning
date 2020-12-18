const fs = require("fs");
const path = require("path");

const sections = [
  { name: "task-creator", path: "./src/task-creator/index.html" },
  { name: "task-viewer", path: "./src/task-viewer/index.html" },
];
sections.forEach(({ name, path: sectionPath }) => {
  const data = fs.readFileSync(path.resolve(__dirname, sectionPath), "utf-8");
  const sectionEle = document.createElement("section");
  sectionEle.id = name;
  sectionEle.innerHTML = data;
  sectionEle.classList.add("is-hidden");
  document.getElementById("main-section").appendChild(sectionEle);
});

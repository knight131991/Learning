const fs = require("fs");
const createIconBtn = (src, color = "#0a58ca", hoverColor = "blue") => {
  const svg = fs.readFileSync(src, "utf-8");
  const spanEle = document.createElement("span");
  spanEle.style.color = color;
  spanEle.style.cursor = "pointer";
  spanEle.innerHTML = svg;
  spanEle.addEventListener("mouseenter", (e) => {
    e.target.style.color = hoverColor;
  });
  spanEle.addEventListener("mouseleave", (e) => {
    e.target.style.color = color;
  });
  return spanEle;
};

module.exports = createIconBtn;

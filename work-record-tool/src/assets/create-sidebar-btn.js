const sidebarBtnList = [
  {
    name: "建立新任務",
    id: "create-task-btn",
    sectionId: "task-creator",
    defaultShow: true,
  },
  { name: "任務紀錄", id: "task-viewer-btn", sectionId: "task-viewer" },
];
const sidebarUl = document.getElementById("sidebar-ul");
localStorage.setItem("current-section", "");
localStorage.setItem("active-btn", "");

sidebarBtnList.forEach(({ name, id, sectionId, defaultShow }) => {
  const liEle = document.createElement("li");
  const linkEle = document.createElement("a");
  liEle.classList.add("nav-item");
  linkEle.classList.add("nav-link");
  linkEle.innerText = name;
  linkEle.href = "#";
  linkEle.id = id;
  linkEle.addEventListener("click", (e) => {
    const curSection = localStorage.getItem("current-section");
    const activeBtn = localStorage.getItem("active-btn");
    if (sectionId !== curSection) {
      e.target.classList.add("active");
      activeBtn &&
        document.getElementById(activeBtn).classList.remove("active");

      const selectedSection = document.getElementById(sectionId);
      selectedSection.classList.remove("is-hidden");
      curSection &&
        document.getElementById(curSection).classList.add("is-hidden");
      localStorage.setItem("current-section", sectionId);
      localStorage.setItem("active-btn", id);
    }
  });
  defaultShow && linkEle.click();
  liEle.appendChild(linkEle);
  sidebarUl.appendChild(liEle);
});

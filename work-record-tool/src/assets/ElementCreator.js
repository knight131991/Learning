class ElementCreator {
  constructor() {}

  createEmptyHint() {
    const divEle = document.createElement("div");
    divEle.classList.add(...["d-flex", "justify-content-center"]);
    divEle.style.marginTop = "24px";
    divEle.innerText = "沒有符合的內容";
    return divEle;
  }
}

module.exports = ElementCreator;

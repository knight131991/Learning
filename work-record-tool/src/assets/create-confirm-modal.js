const createConfirmModal = ({ modalId, title, content, onOK = () => {} }) => {
  const modalEle = document.createElement("div");
  modalEle.id = modalId;
  modalEle.classList.add(...["modal", "fade"]);
  modalEle.tabIndex = "-1";
  modalEle.setAttribute("aria-labelledby", "editionModalLabel");
  modalEle.setAttribute("aria-hidden", "true");

  const modalContainer = document.createElement("div");
  modalContainer.classList.add(...["modal-dialog", "modal-dialog-centered"]);
  modalEle.appendChild(modalContainer);

  const modalContent = document.createElement("div");
  modalContent.classList.add(...["modal-content"]);
  modalContainer.appendChild(modalContent);

  const modalHeader = document.createElement("div");
  modalHeader.classList.add(["modal-header"]);
  modalContent.appendChild(modalHeader);

  const titleEle = document.createElement("h5");
  titleEle.classList.add(["modal-title"]);
  titleEle.innerText = title;
  modalHeader.appendChild(titleEle);

  const closeBtn = document.createElement("button");
  closeBtn.classList.add(["close"]);
  closeBtn.setAttribute("data-dismiss", "modal");
  closeBtn.setAttribute("aria-label", "Close");
  modalHeader.appendChild(closeBtn);

  const closeBtnContent = document.createElement("span");
  closeBtnContent.setAttribute("aria-hidden", true);
  closeBtnContent.innerHTML = "&times;";
  closeBtn.appendChild(closeBtnContent);

  const body = document.createElement("div");
  body.classList.add(["modal-body"]);
  modalContent.appendChild(body);

  const bodyContent = document.createElement("span");
  bodyContent.innerText = content;
  body.appendChild(bodyContent);

  const footer = document.createElement("div");
  footer.classList.add(["modal-footer"]);
  modalContent.appendChild(footer);

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add(...["btn", "btn-secondary"]);
  cancelBtn.setAttribute("data-dismiss", "modal");
  cancelBtn.innerText = "取消";
  footer.appendChild(cancelBtn);

  const confirmBtn = document.createElement("button");
  confirmBtn.id = `${modalId}-confirm-button`;
  confirmBtn.classList.add(...["btn", "btn-primary"]);
  confirmBtn.setAttribute("data-dismiss", "modal");
  confirmBtn.innerText = "確認";
  confirmBtn.addEventListener("click", onOK);
  footer.appendChild(confirmBtn);

  return modalEle;
};

module.exports = createConfirmModal;

const modal = document.querySelector(".modal");
const btnOpenModal = document.querySelector(".btn-open-modal");
const close_btn = document.querySelector(".window-close");

btnOpenModal.addEventListener("click", () => {
  modal.style.display = "flex";
});
close_btn.addEventListener("click", () => {
  modal.style.display = "none";
});

$(document).ready(function () {
  $(".modal").draggable({
    handle: ".window-header",
  });
});

// 모달 크기 조절 함수
const window_resize = () => {
  const modal = document.querySelector(".modal");
  const resizers = document.querySelectorAll(".resizer");
  let currentResizer;
  let isResizing = false;
  let prevX, prevY;

  resizers.forEach((resizer) => {
    resizer.addEventListener("mousedown", function (e) {
      currentResizer = e.target;
      isResizing = true;
      prevX = e.clientX;
      prevY = e.clientY;

      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResize);
    });
  });

  function resize(e) {
    if (!isResizing) return;

    const rect = modal.getBoundingClientRect();

    // 각 모서리 별로 크기 조절
    if (currentResizer.classList.contains("se")) {
      modal.style.width = rect.width + (e.clientX - prevX) + "px";
      modal.style.height = rect.height + (e.clientY - prevY) + "px";
    } else if (currentResizer.classList.contains("sw")) {
      modal.style.width = rect.width - (e.clientX - prevX) + "px";
      modal.style.height = rect.height + (e.clientY - prevY) + "px";
      modal.style.left = rect.left + (e.clientX - prevX) + "px";
    } else if (currentResizer.classList.contains("ne")) {
      modal.style.width = rect.width + (e.clientX - prevX) + "px";
      modal.style.height = rect.height - (e.clientY - prevY) + "px";
      modal.style.top = rect.top + (e.clientY - prevY) + "px";
    } else if (currentResizer.classList.contains("nw")) {
      modal.style.width = rect.width - (e.clientX - prevX) + "px";
      modal.style.height = rect.height - (e.clientY - prevY) + "px";
      modal.style.top = rect.top + (e.clientY - prevY) + "px";
      modal.style.left = rect.left + (e.clientX - prevX) + "px";
    }

    prevX = e.clientX;
    prevY = e.clientY;
  }

  function stopResize() {
    isResizing = false;
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
  }
};

// DOM이 로드된 후 함수 실행
window.addEventListener("DOMContentLoaded", window_resize);

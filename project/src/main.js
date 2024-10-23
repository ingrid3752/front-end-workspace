// src/useResizable.js
import { useEffect, useState } from "react";

const Main = (modalRef) => {
  const [isResizing, setIsResizing] = useState(false);
  const [currentResizer, setCurrentResizer] = useState(null);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);

  useEffect(() => {
    const modal = modalRef.current;

    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const rect = modal.getBoundingClientRect();

      // 리사이즈 로직
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

      setPrevX(e.clientX);
      setPrevY(e.clientY);
    };

    const stopResize = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResize);
    };

    // 리사이징이 활성화되어 있을 때 마우스 이벤트 추가
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopResize);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResize);
    };
  }, [isResizing, currentResizer, prevX, prevY, modalRef]);

  const startResize = (e, resizer) => {
    setCurrentResizer(resizer);
    setIsResizing(true);
    setPrevX(e.clientX);
    setPrevY(e.clientY);
    e.stopPropagation(); // 드래그 방지
  };

  return { startResize };
};

export default Main;

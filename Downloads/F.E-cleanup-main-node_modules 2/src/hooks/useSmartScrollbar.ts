import { useEffect, useRef, useState } from "react";

export const useSmartScrollbar = () => {
  const [showScroll, setShowScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const showTemporarily = () => {
    setShowScroll(true);
    clearExistingTimeout();

    // 드래그 중이면 timeout을 설정하지 않음!
    if (!isDragging.current) {
      timeoutRef.current = setTimeout(() => setShowScroll(false), 2000);
    }
  };

  const handleWheel = () => {
    showTemporarily();
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    setShowScroll(true);
    clearExistingTimeout(); // 드래그 중엔 숨기지 않음
  };

  const handleMouseUp = () => {
    isDragging.current = false;

    // 마우스를 놓은 후에만 타이머 시작!
    timeoutRef.current = setTimeout(() => setShowScroll(false), 2000);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return { scrollRef, showScroll, handleWheel };
};

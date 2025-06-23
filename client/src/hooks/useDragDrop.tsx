import { useState, useCallback, useRef } from "react";

export function useDragDrop(onDrag?: (x: number, y: number) => void) {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((event: React.MouseEvent, element: HTMLElement) => {
    if (event.button !== 0) return; // Only left mouse button
    
    setIsDragging(true);
    const rect = element.getBoundingClientRect();
    dragOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging) return;
    
    const x = event.clientX - dragOffset.current.x;
    const y = event.clientY - dragOffset.current.y;
    
    onDrag?.(Math.max(0, x), Math.max(0, y));
  }, [isDragging, onDrag]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
}

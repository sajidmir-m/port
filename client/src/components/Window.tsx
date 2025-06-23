import { useEffect, useRef } from "react";
import { WindowState } from "@/hooks/useWindowManager";
import { useDragDrop } from "@/hooks/useDragDrop";
import WindowContent from "./WindowContent";

interface WindowProps {
  id: string;
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
}

export default function Window({ id, window, onClose, onMinimize, onMaximize, onFocus }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useDragDrop((x, y) => {
    if (windowRef.current && !window.maximized) {
      windowRef.current.style.left = `${x}px`;
      windowRef.current.style.top = `${y}px`;
    }
  });

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (window.minimized) {
    return null;
  }

  const windowStyle = window.maximized ? {
    left: 0,
    top: 0,
    width: '100%',
    height: 'calc(100% - 48px)',
    maxWidth: 'none'
  } : {
    left: window.x,
    top: window.y,
    width: window.width,
    height: window.height
  };

  return (
    <div
      ref={windowRef}
      className="absolute bg-gray-800/90 dark:bg-gray-800/90 light:bg-white/90 backdrop-blur-sm border border-gray-600 dark:border-gray-600 light:border-gray-300 rounded-lg window-shadow min-w-[280px] sm:min-w-96 max-w-[95vw] sm:max-w-4xl"
      style={{
        ...windowStyle,
        zIndex: window.zIndex
      }}
      onClick={onFocus}
    >
      {/* Window Title Bar */}
      <div 
        className="bg-gray-700/90 dark:bg-gray-700/90 light:bg-gray-200/90 border-b border-gray-500 dark:border-gray-500 light:border-gray-400 px-2 sm:px-4 py-2 rounded-t-lg cursor-move flex items-center justify-between"
        onMouseDown={(e) => handleMouseDown(e, windowRef.current!)}
      >
        <div className="flex items-center space-x-2 min-w-0">
          <i className={`${getWindowIcon(window.type)} text-[var(--ubuntu-orange)] text-sm`}></i>
          <span className="text-white dark:text-white light:text-gray-800 font-medium text-sm sm:text-base truncate">{getWindowTitle(window.type)}</span>
        </div>
        <div className="flex space-x-1">
          <button 
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors" 
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            title="Minimize"
          />
          <button 
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors" 
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            title="Maximize"
          />
          <button 
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors" 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            title="Close"
          />
        </div>
      </div>
      
      {/* Window Content */}
      <div className="text-white dark:text-white light:text-gray-800 overflow-y-auto bg-gray-800/50 dark:bg-gray-800/50 light:bg-white/80" style={{ height: 'calc(100% - 44px)' }}>
        <WindowContent type={window.type} />
      </div>
    </div>
  );
}

function getWindowIcon(type: string): string {
  const icons: Record<string, string> = {
    projects: 'fas fa-code',
    about: 'fas fa-user',
    contact: 'fas fa-address-book',
    achievements: 'fas fa-trophy',
    hobbies: 'fas fa-heart',
    terminal: 'fas fa-terminal'
  };
  return icons[type] || 'fas fa-window-maximize';
}

function getWindowTitle(type: string): string {
  const titles: Record<string, string> = {
    projects: 'My Projects',
    about: 'About Me',
    contact: 'Contact Information',
    achievements: 'Achievements & Recognition',
    hobbies: 'Hobbies & Interests',
    terminal: 'Terminal - sajid@ubuntu'
  };
  return titles[type] || 'Window';
}

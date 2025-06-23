import { WindowState } from "@/hooks/useWindowManager";

interface TaskbarProps {
  windows: Record<string, WindowState>;
  currentTime: Date;
  onWindowClick: (id: string) => void;
  onShowApplications: () => void;
}

export default function Taskbar({ windows, currentTime, onWindowClick, onShowApplications }: TaskbarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[var(--ubuntu-gray)] border-t border-[var(--ubuntu-light)] h-12 flex items-center justify-between px-2 sm:px-4 z-30">
      {/* Applications Menu */}
      <div className="flex items-center space-x-2">
        <button 
          onClick={onShowApplications}
          className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 bg-[var(--ubuntu-orange)] rounded hover:bg-opacity-80 transition-colors"
        >
          <i className="fas fa-th-large text-white text-sm"></i>
          <span className="text-white text-xs sm:text-sm hidden sm:inline">Applications</span>
        </button>
      </div>

      {/* Window Buttons */}
      <div className="flex space-x-1 overflow-x-auto max-w-[50%] sm:max-w-[60%]">
        {Object.entries(windows).map(([id, window]) => (
          <button
            key={id}
            className={`px-2 sm:px-3 py-1 bg-[var(--ubuntu-light)] text-white rounded text-xs sm:text-sm hover:bg-opacity-80 transition-colors whitespace-nowrap ${
              window.minimized ? 'opacity-60' : ''
            }`}
            onClick={() => onWindowClick(id)}
          >
            <i className={`${getWindowIcon(window.type)} mr-1`}></i>
            <span className="hidden sm:inline">{getWindowTitle(window.type)}</span>
            <span className="sm:hidden">{getWindowTitle(window.type).substring(0, 8)}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-2 sm:space-x-3 text-[var(--ubuntu-light)]">
        <div className="text-xs sm:text-sm hidden sm:block">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <i className="fas fa-wifi text-xs sm:text-sm"></i>
        <i className="fas fa-volume-up text-xs sm:text-sm"></i>
        <i className="fas fa-battery-full text-xs sm:text-sm"></i>
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
    contact: 'Contact',
    achievements: 'Achievements',
    hobbies: 'Hobbies',
    terminal: 'Terminal'
  };
  return titles[type] || 'Window';
}

import { useState, useEffect } from "react";
import DesktopIcon from "@/components/DesktopIcon";
import Window from "@/components/Window";
import Taskbar from "@/components/Taskbar";
import ApplicationMenu from "@/components/ApplicationMenu";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export default function Desktop() {
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindowManager();
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showApplicationMenu, setShowApplicationMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Removed auto-opening terminal to prevent unwanted reopening after minimize

  const desktopIcons = [
    { id: 'terminal', icon: 'fas fa-terminal', label: 'Terminal', color: 'text-green-400' },
  ];

  return (
    <div className="h-screen w-full overflow-hidden select-none ubuntu-gradient relative">
      {/* Desktop Background */}
      <div className="absolute inset-0" />

      {/* Theme Toggle Button */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className="bg-white/10 dark:bg-black/20 border-white/20 text-white hover:bg-white/20 dark:hover:bg-black/30 px-2 sm:px-3"
        >
          {theme === 'dark' ? (
            <i className="fas fa-sun text-yellow-400 text-sm"></i>
          ) : (
            <i className="fas fa-moon text-blue-400 text-sm"></i>
          )}
          <span className="ml-1 sm:ml-2 text-xs hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </Button>
      </div>

      {/* Enhanced Profile Section */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-12 lg:left-12 z-10">
        <div className="bg-black/30 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/10 shadow-2xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 md:space-x-6 lg:space-x-8 mb-4 sm:mb-6 md:mb-8">
            <img 
              src="/attached_assets/sajidd_1750610941624.jpeg" 
              alt="Sajid Nazir Profile Photo" 
              className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 rounded-full border-3 border-[var(--ubuntu-orange)] shadow-xl object-cover mb-3 sm:mb-0"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">Sajid Nazir</h1>
              <p className="text-[var(--ubuntu-orange)] text-base sm:text-lg md:text-xl lg:text-2xl font-medium">Software Engineer</p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg">Technology Enthusiast</p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 md:mb-4 flex items-center">
              <i className="fas fa-code text-[var(--ubuntu-orange)] mr-2 text-lg md:text-xl lg:text-2xl"></i>
              Core Skills
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <div className="bg-white/10 rounded-lg p-2 sm:p-3 md:p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-1">
                  <i className="fab fa-python text-blue-400 text-sm md:text-base"></i>
                  <span className="text-white font-medium text-xs sm:text-sm md:text-base">Python</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1 sm:h-1.5 md:h-2">
                  <div className="bg-blue-400 h-1 sm:h-1.5 md:h-2 rounded-full w-[90%]"></div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-2 sm:p-3 md:p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-1">
                  <i className="fab fa-react text-cyan-400 text-sm md:text-base"></i>
                  <span className="text-white font-medium text-xs sm:text-sm md:text-base">React</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1 sm:h-1.5 md:h-2">
                  <div className="bg-cyan-400 h-1 sm:h-1.5 md:h-2 rounded-full w-[85%]"></div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-2 sm:p-3 md:p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-1">
                  <i className="fas fa-robot text-green-400 text-sm md:text-base"></i>
                  <span className="text-white font-medium text-xs sm:text-sm md:text-base">AI/ML</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1 sm:h-1.5 md:h-2">
                  <div className="bg-green-400 h-1 sm:h-1.5 md:h-2 rounded-full w-[80%]"></div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-2 sm:p-3 md:p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-1">
                  <i className="fas fa-shield-alt text-red-400 text-sm md:text-base"></i>
                  <span className="text-white font-medium text-xs sm:text-sm md:text-base">Security</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1 sm:h-1.5 md:h-2">
                  <div className="bg-red-400 h-1 sm:h-1.5 md:h-2 rounded-full w-[75%]"></div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-[var(--ubuntu-orange)]/20 text-[var(--ubuntu-orange)] rounded-full text-xs font-medium border border-[var(--ubuntu-orange)]/30">
                Full-Stack Development
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30">
                Machine Learning
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium border border-purple-500/30">
                Cybersecurity
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30">
                IoT Systems
              </span>
            </div>


          </div>
        </div>


      </div>

      {/* Minimal Desktop Icons - Bottom Right */}
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 flex flex-col gap-3 sm:gap-4 z-10">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            color={icon.color}
            onClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Windows */}
      <div className="absolute inset-0 z-20">
        {Object.entries(windows).map(([id, window]) => (
          <Window
            key={id}
            id={id}
            window={window}
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onMaximize={() => maximizeWindow(id)}
            onFocus={() => focusWindow(id)}
          />
        ))}
      </div>

      {/* Application Menu */}
      <ApplicationMenu
        isOpen={showApplicationMenu}
        onClose={() => setShowApplicationMenu(false)}
        onOpenWindow={openWindow}
      />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        currentTime={currentTime}
        onWindowClick={(id) => {
          const window = windows[id];
          if (window.minimized) {
            minimizeWindow(id); // This will restore it
          }
          focusWindow(id);
        }}
        onShowApplications={() => setShowApplicationMenu(true)}
      />
    </div>
  );
}

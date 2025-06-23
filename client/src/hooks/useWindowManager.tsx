import { useState, useCallback } from "react";

export interface WindowState {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  originalPosition?: { x: number; y: number; width: number; height: number };
}

export function useWindowManager() {
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [zIndexCounter, setZIndexCounter] = useState(1000);

  const openWindow = useCallback((type: string) => {
    setWindows(prev => {
      // If window already exists, just focus it
      if (prev[type]) {
        const existingWindow = prev[type];
        if (existingWindow.minimized) {
          return {
            ...prev,
            [type]: {
              ...existingWindow,
              minimized: false,
              zIndex: zIndexCounter + 1
            }
          };
        }
        return {
          ...prev,
          [type]: {
            ...existingWindow,
            zIndex: zIndexCounter + 1
          }
        };
      }

      // Create new window with responsive positioning for all screen sizes
      const offset = Object.keys(prev).length * 30;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Responsive sizing based on screen dimensions
      let windowWidth, windowHeight, windowX, windowY;
      
      if (screenWidth < 640) {
        // Mobile phones
        windowWidth = Math.min(screenWidth - 20, 380);
        windowHeight = Math.min(screenHeight - 100, 400);
        windowX = 10;
        windowY = 10;
      } else if (screenWidth < 1024) {
        // Tablets
        windowWidth = type === 'terminal' ? Math.min(screenWidth * 0.8, 700) : Math.min(screenWidth * 0.7, 600);
        windowHeight = type === 'terminal' ? Math.min(screenHeight * 0.6, 450) : Math.min(screenHeight * 0.7, 550);
        windowX = 50 + offset;
        windowY = 50 + offset;
      } else {
        // Laptops and desktops
        windowWidth = type === 'terminal' ? 800 : 700;
        windowHeight = type === 'terminal' ? 500 : 600;
        windowX = 100 + offset;
        windowY = 80 + offset;
      }
      
      const newWindow: WindowState = {
        type,
        x: windowX,
        y: windowY,
        width: windowWidth,
        height: windowHeight,
        zIndex: zIndexCounter + 1,
        minimized: false,
        maximized: false,
      };

      return {
        ...prev,
        [type]: newWindow
      };
    });

    setZIndexCounter(prev => prev + 1);
  }, [zIndexCounter]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[id];
      return newWindows;
    });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        minimized: !prev[id].minimized
      }
    }));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => {
      const window = prev[id];
      if (window.maximized) {
        // Restore
        return {
          ...prev,
          [id]: {
            ...window,
            maximized: false,
            x: window.originalPosition?.x || window.x,
            y: window.originalPosition?.y || window.y,
            width: window.originalPosition?.width || window.width,
            height: window.originalPosition?.height || window.height,
          }
        };
      } else {
        // Maximize
        return {
          ...prev,
          [id]: {
            ...window,
            maximized: true,
            originalPosition: {
              x: window.x,
              y: window.y,
              width: window.width,
              height: window.height
            },
            x: 0,
            y: 0,
            width: window.type === 'fullscreen' ? window.width : 1200,
            height: window.type === 'fullscreen' ? window.height : 600
          }
        };
      }
    });
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: zIndexCounter + 1
      }
    }));
    setZIndexCounter(prev => prev + 1);
  }, [zIndexCounter]);

  const updateWindow = useCallback((id: string, updates: Partial<WindowState>) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...updates
      }
    }));
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindow
  };
}

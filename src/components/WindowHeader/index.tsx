import React from "react";
import "./index.less";
import { appWindow } from "@tauri-apps/api/window";

const WindowHeader: React.FC = ({}) => {
  const handleMinWindow = () => {
    appWindow.minimize();
  };

  const handleCloseWindow = () => {
    appWindow.close();
  };

  const handleFullScreen = async () => {
    const value = await appWindow.isFullscreen();
    appWindow.setFullscreen(!value);
  };

  return (
    <div className="window-header" data-tauri-drag-region>
      <div className="window-header-btn" onClick={handleCloseWindow}></div>
      <div className="window-header-btn" onClick={handleMinWindow}></div>
      <div className="window-header-btn" onClick={handleFullScreen}></div>
    </div>
  );
};

export default WindowHeader;

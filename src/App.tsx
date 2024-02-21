import "./App.less";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./page/Login/index";
import HomePage from "./page/Home/index";
import React, { useEffect } from "react";
import WindowHeader from "./components/WindowHeader";
import { ConfigProvider, message, theme } from "antd";

const App: React.FC = () => {
  const [_, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = localStorage.getItem("cookieToken");
    if (cookieToken) {
      navigate("/home/search");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorText: "#646464",
          colorPrimary: "#007bff",
        },
        components: {
          Slider: {
            handleActiveColor: "#64bb47",
            handleLineWidth: 1,
            handleLineWidthHover: 1,
            handleSize: 6,
            handleColor: "#64bb47",
            handleSizeHover: 6,
            railBg: "#646464",
            railHoverBg: "#646464",
            trackBg: "#64bb47",
            trackHoverBg: "#64bb47"
          }
        }
      }}
    >
      {contextHolder}
      <div className="window-wrapper">
        <WindowHeader />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home/*" element={<HomePage />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
};

export default App;

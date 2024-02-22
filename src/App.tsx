import "./App.less";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./page/Login/index";
import HomePage from "./page/Home/index";
import React, { useEffect } from "react";
import WindowHeader from "./components/WindowHeader";
import { ConfigProvider, message, theme } from "antd";
import { BaseDirectory, createDir, exists, readBinaryFile, writeBinaryFile } from "@tauri-apps/api/fs";
import { resourceDir } from "@tauri-apps/api/path";

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
    // console.log(BaseDirectory.AppLocalData);
    handleCheckDataFiles();
  }, []);

  const handleCheckDataFiles = async () => {
    // const resourcePath = await resourceDir();

    // const readFile = await readBinaryFile("data\\library.json", {dir: BaseDirectory.Resource}).then(res => {
    //   console.log(res);

    // })
    const localDataDirExist = await exists("data", { dir: BaseDirectory.Resource });
    const localDataExist = await exists("data\\library.json", { dir: BaseDirectory.Resource });

    if (!localDataDirExist) {
      const createDirRes = await createDir("data", { dir: BaseDirectory.Resource });
      console.log(createDirRes);
    }
    if (!localDataExist) {
      const createLocalData = await writeBinaryFile("data\\library.json", new Uint8Array([]), {
        dir: BaseDirectory.Resource,
      });

      console.log(createLocalData);
      
    }
  };

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
            trackHoverBg: "#64bb47",
          },
        },
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

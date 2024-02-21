import { Button } from "antd";
import "./index.less";
import React from "react";
import { RetweetOutlined, SwapOutlined } from "@ant-design/icons";

interface IProps {
  mode: PlayerModeType;
  onClick?: (mode: PlayerModeType) => void;
}

const ModeIcon: React.FC<IProps> = ({ mode }) => {
  switch (mode) {
    case "loop":
      return <RetweetOutlined />;
    case "singer":
      return (
        <div className="signer-icon">
          <RetweetOutlined />
        </div>
      );
    case "random":
      return <SwapOutlined />;
  }
};

const PlayerModeButton: React.FC<IProps> = ({ mode, onClick }) => {
  const handleChangeMode = () => {
    onClick && onClick(mode === "loop" ? "singer" : mode === "singer" ? "random" : "loop");
  };

  return <Button type="text" icon={<ModeIcon mode={mode} />} onClick={handleChangeMode}></Button>;
};

export default PlayerModeButton;

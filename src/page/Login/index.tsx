import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import { checkQRCodeStatus, createQRCode, getQRCodeKey } from "../../api/index";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = ({}) => {
  const [key, setKey] = useState<string>("");
  const [qrImg, setQRImg] = useState<string>("");
  const timeout = useRef<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetQRCodeKey();
  }, []);

  useEffect(() => {
    key.length > 0 && handleGetQRCode();
  }, [key]);

  useEffect(() => {
    qrImg.length > 0 && handleCheckQRCodeStatus();
  }, [qrImg]);

  // 获取二维码key值
  const handleGetQRCodeKey = async () => {
    const res = await getQRCodeKey();

    if (res && res.data.code === 200) {
      setKey(res.data.data.unikey);
    }
  };

  // 获取二维码base64
  const handleGetQRCode = async () => {
    const res = await createQRCode(key);

    if (res.data.code === 200) {
      setQRImg(res.data.data.qrimg);
    }
  };

  // 检查二维码状态
  const handleCheckQRCodeStatus = async () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    const res = await checkQRCodeStatus(key);
    if (res) {
      switch (res.data.code) {
        case 800:
          handleGetQRCodeKey();
          break;
        case 801:
        case 802:
          timeout.current = setTimeout(handleCheckQRCodeStatus, 3000);
          break;
        case 803:
          localStorage.setItem("cookieToken", res.data.cookie);
          navigate("/home");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="qr-code" style={{ backgroundImage: `url(${qrImg})` }}></div>
    </div>
  );
};

export default LoginPage;

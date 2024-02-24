import React, { useEffect, useState } from "react";
import "./index.less";
import { getLoginUserInfo } from "../../api";
import SiderBar from "../../components/SiderBar";
import useGlobalStore from "../../store";
import MusicPlayer from "../../components/MusicPlayer";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./Search";
import UserLibraryModal from "../../components/UserLibraryModal";
import AlbumDetail from "../../components/AlbumDetail";
import ArtistDetail from "../../components/ArtistDetail";

const HomePage: React.FC = ({}) => {
  const [profile, setPropfile] = useState<Profile | undefined>(undefined);
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const { setGlobalState, currentAlbumId, currentArtistId } = useGlobalStore();

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  // 获取用户信息
  const handleGetUserInfo = async () => {
    const res = await getLoginUserInfo();

    if (res.data.code === 200) {
      const { profile, account } = res.data;
      setPropfile(profile);
      setAccount(account);
      setGlobalState({
        userId: account.id,
      });
    }
  };

  return (
    <div className="home-page">
      {account ? (
        <>
          <SiderBar userId={account.id} />
          <MusicPlayer />
          <div className="home-page-content">
            <Routes>
              <Route path="/search" element={<SearchPage />} />
            </Routes>
            <AlbumDetail />
            <ArtistDetail />
          </div>
          <UserLibraryModal />
        </>
      ) : null}
    </div>
  );
};

export default HomePage;

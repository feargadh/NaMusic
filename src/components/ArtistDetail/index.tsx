import React, { useEffect, useState } from "react";
import "./index.less";
import classNames from "classnames";
import useGlobalStore from "../../store";
import { getArtistAlbums, getArtistDetail, getArtistSongs } from "../../api";

const ArtistDetail: React.FC = () => {
  const { currentArtistId, setGlobalState, albumDetailZIndex, artistDetailZIndex } = useGlobalStore();
  const [detail, setDetail] = useState<undefined | ArtistDetailDataInfo>(undefined);
  const [tabkey, setTabkey] = useState<"songs" | "album">("songs");

  useEffect(() => {
    if (currentArtistId) {
      handleGetArtistDetail();
      handleGetArtistSongs()
    }
  }, []);



  const handleGetArtistDetail = async () => {
    const res = await getArtistDetail(currentArtistId!);
    if(res.data.code === 200) {
      setDetail(res.data.data.artist)
    }
    
  };

  const handleGetArtistSongs = async () => {
    const res = await getArtistSongs(currentArtistId!);

    console.log(res);
    
  }

  const handleGetArtistAlbum = async () => {
    const res = await getArtistAlbums(currentArtistId!);

    console.log(res);
    
  }

  return (
    <div
      className={classNames("artist-detail-page", {
        "artist-detail-page-show": typeof currentArtistId !== "undefined",
        "artist-detail-page-hidden": typeof currentArtistId === "undefined",
      })}
      style={{ zIndex: artistDetailZIndex }}
    ></div>
  );
};


export default ArtistDetail
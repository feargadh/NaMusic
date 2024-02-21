import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import useGlobalStore from "../../store";
import { getLyricById } from "../../api";
import classNames from "classnames";
import { useDeepCompareEffect } from "ahooks";

interface IProps {
  currentTime: string;
  isPlaying?: boolean;
}

const LyricItem: React.FC<{
  active: boolean;
  lyric: string;
  translation?: string;
  showTranslation?: boolean;
}> = ({ active, lyric, translation, showTranslation }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    active &&
      divRef.current &&
      divRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
  }, [active]);

  return (
    <div
      ref={divRef}
      className={classNames("music-detail-lyric-item", {
        "music-detail-lyric-item-active": active,
      })}
    >
      <div className="music-detail-lyric-item-content">{lyric}</div>
      {showTranslation ? (
        <div className="music-detail-lyric-item-content">{translation}</div>
      ) : null}
    </div>
  );
};

const MusicDetail: React.FC<IProps> = ({ currentTime, isPlaying }) => {
  const { musicId, musicItem } = useGlobalStore();
  const [lyric, setLyric] = useState<Array<LyricRenderType>>([]);
  const [translationVisible, setTranslationVisible] = useState<boolean>(false);
  const [hasTranslation, setHasTranslation] = useState<boolean>(false);

  useEffect(() => {
    typeof musicId === "number" && handleGetLyric();
  }, [musicId]);

  useDeepCompareEffect(() => {
    const currentIndex = lyric.findIndex((record) => record?.currentTime === currentTime);

    console.log(currentIndex);

    if (currentIndex > -1) {
      console.log("changeActive");

      setLyric((lyric) =>
        lyric.map((record, index) => ({
          ...record,
          active: index === currentIndex,
        }))
      );
    }
  }, [currentTime]);

  const handleGetLyric = async () => {
    const res = await getLyricById(musicId!);

    if (res.data.code === 200) {
      const lyricStr = res.data.lrc.lyric;
      const transStr = res.data.tlyric?.lyric;

      const orgLyric = handleTransStr2Lyric(lyricStr);
      if (transStr) {
        const transLyric = handleTransStr2Lyric(transStr);
        transLyric.forEach(({ currentTime, lyric }) => {
          const index = orgLyric.findIndex((record) => record.currentTime === currentTime);

          if (index > -1) {
            orgLyric[index].translation = lyric;
          }
        });
      }

      setLyric(orgLyric);
      setTranslationVisible(transStr ? true : false);
      setHasTranslation(transStr ? true : false);

      // console.log(orgLyric);
    }
  };

  const handleTransStr2Lyric = (str: string) => {
    return str
      .split("\n")
      .map((record) => {
        if (record.split("[")[1]) {
          const [currentTime, words] = record.split("[")[1].split("]");

          return {
            currentTime: currentTime.split(".")[0],
            lyric: words.trim(),
            active: false,
          };
        }
      })
      .filter((record) => (record ? record.lyric.length > 0 : false)) as LyricRenderType[];
  };

  return (
    <div className="music-detail-wrapper">
      <div
        className={classNames("music-cover", {
          "music-cover-playing": isPlaying,
        })}
        style={{ backgroundImage: `url(${musicItem?.alCoverUrl})` }}
      ></div>

      <div className="music-detail-lyric">
        <div className="music-name">{musicItem?.name}</div>
        {lyric.map((record, index) =>
          record ? (
            <LyricItem
              key={`lyric-${musicId}-${record.currentTime}-${index}`}
              lyric={record.lyric}
              active={record.active}
              translation={record.translation}
              showTranslation={translationVisible}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default MusicDetail;

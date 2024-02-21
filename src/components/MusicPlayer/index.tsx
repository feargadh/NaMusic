import classNames from "classnames";
import useGlobalStore from "../../store";
import "./index.less";
import React, { useEffect, useRef, useState } from "react";
import { getMusicUrlByMusicId } from "../../api";
import { Button, Popover, Slider } from "antd";
import dayjs from "dayjs";
// 时间插件
import duration from "dayjs/plugin/duration";
import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  MutedOutlined,
  MoreOutlined,
  BarsOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import PlayerModeButton from "./PlayerModeButton";
import PlayerPopList from "./PlayerPopList";
import MusicDetail from "./MusicDetail";
dayjs.extend(duration);

const MusicPlayer: React.FC = ({}) => {
  const { musicItem, musicId, playerBack, playerForward, randomNextMusic, currentMusicList } =
    useGlobalStore();
  const [musiclUrl, setMusicUrl] = useState<string | undefined>(undefined);
  const [playerDetail, setPlayerDetail] = useState<PlayerDetail>({
    isPlaying: false,
    currentTime: 0,
    currentTimeFormat: "00:00",
    duration: 0,
    durationFormat: "00:00",
    volume: Number(localStorage.getItem("volume") ?? 0.5),
    mode: (localStorage.getItem("playerMode") as PlayerModeType) ?? "loop",
  });
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const audio = useRef<HTMLAudioElement>(null);
  const isChangingProgress = useRef<boolean>(false);

  useEffect(() => {
    audio.current && (audio.current.volume = playerDetail.volume);
  }, []);

  useEffect(() => {
    if (musicId) {
      handleGetMusicUrl(musicId);
    }
  }, [musicId]);

  useEffect(() => {
    if (musiclUrl && audio.current) {
      audio.current.play();
      setPlayerDetail({
        ...playerDetail,
        isPlaying: true,
      });
    }
  }, [musiclUrl]);

  // 获取音乐url
  const handleGetMusicUrl = async (id: number) => {
    const res = await getMusicUrlByMusicId(id);

    if (res.data.code === 200 && res.data.data.length > 0 && musicItem) {
      const { url, time } = res.data.data[0];
      console.log(time);

      setPlayerDetail({
        ...playerDetail,
        duration: time,
        durationFormat: dayjs.duration(time, "milliseconds").format("mm:ss"),
        url,
      });

      setMusicUrl(url);
    }
  };

  // 播放信息
  const handleChangePlayerInfo = () => {
    if (audio.current && !isChangingProgress.current) {
      setPlayerDetail({
        ...playerDetail,
        currentTimeFormat: dayjs.duration(audio.current.currentTime, "seconds").format("mm:ss"),
        currentTime: audio.current.currentTime * 1000,
      });
    }
  };

  // 播放/暂停
  const handleClickPlayerBtn = () => {
    if (audio.current) {
      setPlayerDetail({
        ...playerDetail,
        isPlaying: !playerDetail.isPlaying,
      });
      if (playerDetail.isPlaying) {
        audio.current.pause();
      } else {
        audio.current.play();
      }
    }
  };

  // 调整音量
  const handleChangeVolume = (value: number | undefined) => {
    if (audio.current && typeof value === "number") {
      const volume = value / 100;
      audio.current.volume = volume;
      setPlayerDetail({
        ...playerDetail,
        volume,
      });
      localStorage.setItem("volume", `${volume}`);
    }
  };

  // 进度调整
  const handleChangeProgress = (currentTime: number | undefined) => {
    if (typeof currentTime === "number") {
      isChangingProgress.current = true;

      setPlayerDetail({
        ...playerDetail,
        currentTime,
        currentTimeFormat: dayjs.duration(currentTime, "milliseconds").format("mm:ss"),
      });
    }
  };

  // 进度条修改完成
  const handleChangeProgressComplete = (currentTime: number | undefined) => {
    isChangingProgress.current = false;
    if (audio.current && typeof currentTime === "number") {
      audio.current.currentTime = currentTime / 1000;
      console.log(playerDetail);
      console.log(currentTime);
    }
  };

  // 更改播放模式
  const handleChangeMode = (mode: PlayerModeType) => {
    setPlayerDetail({
      ...playerDetail,
      mode,
    });
  };

  // 播放结束
  const handleAudioEnded = () => {
    const { mode } = playerDetail;

    switch (mode) {
      case "loop":
        playerForward();
        break;
      case "singer":
        if (audio.current) {
          audio.current.currentTime = 0;
          audio.current.play();
        }
        break;
      case "random":
        randomNextMusic();
        break;
    }
  };

  return (
    <div
      className={classNames("music-player-wrapper", {
        "music-player-wrapper-appear": typeof musicId !== "undefined",
        "music-player-wrapper-full": isFullScreen,
      })}
    >
      <audio
        preload="metadata"
        className="music-audio"
        ref={audio}
        src={musiclUrl}
        onTimeUpdate={handleChangePlayerInfo}
        onEnded={handleAudioEnded}
      />
      {musicItem ? (
        <>
          {isFullScreen ? (
            <MusicDetail
              currentTime={playerDetail.currentTimeFormat}
              isPlaying={playerDetail.isPlaying}
            />
          ) : null}
          <div className="player-bottom-bar">
            {isFullScreen ? null : (
              <div className="music-info-wrapper">
                <div
                  className="music-cover"
                  style={{ backgroundImage: `url(${musicItem.alCoverUrl})` }}
                ></div>
                <div className="music-base">
                  <div className="music-name">{musicItem.name}</div>
                  <div className="music-arname">{musicItem.arName}</div>
                </div>
              </div>
            )}

            <div className="player-info-wrapper">
              <div className="player-action-row">
                <PlayerModeButton mode={playerDetail.mode} onClick={handleChangeMode} />
                <Button type="text" icon={<StepBackwardOutlined />} onClick={playerBack}></Button>
                <Button
                  type="text"
                  icon={playerDetail.isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                  onClick={handleClickPlayerBtn}
                ></Button>
                <Button type="text" icon={<StepForwardOutlined />} onClick={playerForward}></Button>
                <Button type="text" icon={<MoreOutlined />}></Button>
              </div>
              <div className="player-progress-wrapper">
                <label>{playerDetail.currentTimeFormat}</label>
                <Slider
                  className="player-progress"
                  min={0}
                  max={playerDetail.duration}
                  value={playerDetail.currentTime}
                  tooltip={{
                    formatter(value) {
                      return value
                        ? dayjs.duration(value, "milliseconds").format("mm:ss")
                        : undefined;
                    },
                  }}
                  onChange={handleChangeProgress}
                  onChangeComplete={handleChangeProgressComplete}
                />
                <label>{playerDetail.durationFormat}</label>
              </div>
            </div>

            <div className="player-other-action">
              <div className="player-voice-wrapper">
                <MutedOutlined />
                <Slider
                  className="voice-input"
                  value={playerDetail.volume * 100}
                  min={0}
                  max={100}
                  onChange={handleChangeVolume}
                />
              </div>
              <Popover
                content={<PlayerPopList />}
                overlayClassName="player-music-list-wrapper"
                trigger={"click"}
              >
                <Button type="text" icon={<BarsOutlined />}></Button>
              </Popover>
              <Button
                type="text"
                icon={isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                onClick={() => setIsFullScreen(!isFullScreen)}
              ></Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MusicPlayer;

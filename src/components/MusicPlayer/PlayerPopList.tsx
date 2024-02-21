import React, { useEffect, useRef } from "react";
import "./index.less";
import useGlobalStore from "../../store";
import classNames from "classnames";

const PlayerPopListItem: React.FC<{
  record: MusicItemRenderData;
  active: boolean;
  onClick: () => void;
}> = ({ record, active, onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    active &&
      divRef.current &&
      divRef.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [active]);

  return (
    <div
      ref={divRef}
      className={classNames("player-music-list-item", {
        "player-music-list-item-active": active,
      })}
      onClick={onClick}
    >
      <div className="player-music-list-item-name">{record.name}</div>
      <div className="player-music-list-item-arname">{record.arName}</div>
    </div>
  );
};

const PlayerPopList: React.FC = ({}) => {
  const { setGlobalState, currentMusicList, musicId } = useGlobalStore();

  const handleSelectMusic = (record: MusicItemRenderData, index: number) => {
    setGlobalState({
      musicId: record.id,
      musicItem: record,
      currenMusicIndex: index,
    });
  };

  return (
    <div className="player-music-list">
      {currentMusicList.map((record, index) => (
        <PlayerPopListItem
          record={record}
          active={musicId === record.id}
          onClick={() => handleSelectMusic(record, index)}
        />
      ))}
    </div>
  );
};

export default PlayerPopList;

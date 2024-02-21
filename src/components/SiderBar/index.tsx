import "./index.less";
import React, { useEffect, useState } from "react";
import { SearchOutlined, DatabaseOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { getRecentlyMusic } from "../../api";
import useGlobalStore from "../../store";

interface IProps {
  userId: number;
}

const SiderBar: React.FC<IProps> = ({}) => {
  // const [activeKey, setActiveKey] = useState<string>("/search");
  const [recentlyList, setRecentlyList] = useState<ResourceDataType[]>([]);
  const { musicId, setGlobalState } = useGlobalStore();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    handleGetRecently();
  }, []);

  const options = [
    {
      label: "Search",
      icon: <SearchOutlined />,
      path: "/search",
    },
    {
      label: "Your Library",
      icon: <DatabaseOutlined />,
      path: "/library",
    },
  ];

  const handleClickOption = (key: string) => {
    navigate(`/home${key}`);
  };

  // 获取最近播放列表
  const handleGetRecently = async () => {
    const res = await getRecentlyMusic();

    if (res.data.code === 200) {
      setRecentlyList(res.data.data.list);
    }
  };

  const handleSelectMusic = (music: ResourceDataTypeInfo, index: number) => {
    setGlobalState({
      musicId: music.id,
      musicItem: {
        id: music.id,
        name: music.name,
        arName: music.ar[0]?.name,
        alCoverUrl: music.al.picUrl,
        alName: music.al.name,
      },
      currenMusicIndex: index,
      currentMusicList: recentlyList.map(({ data: { id, name, ar, al } }) => ({
        id,
        name,
        arName: ar[0].name,
        alCoverUrl: al.picUrl,
        alName: al.name,
      })),
    });
  };

  return (
    <div className="sider-bar-wrapper">
      {options.map((record) => (
        <div
          key={record.path}
          className={classNames("sider-bar-option", {
            "sider-bar-option-active": pathname.indexOf(record.path) > -1,
          })}
          onClick={() => handleClickOption(record.path)}
        >
          {record.icon}
          {record.label}
        </div>
      ))}

      <div className="sider-bar-recently">
        <label>RECENTLY</label>
        <div className="recently-list">
          {recentlyList.map((record, index) => (
            <div
              key={`sider-bar-recently-${record.resourceId}`}
              className={classNames("recently-list-item", {
                "recently-list-item-active": musicId === record.data.id,
              })}
              onClick={() => handleSelectMusic(record.data, index)}
            >
              <div className="recently-list-item-name">{record.data.name}</div>
              {record.data.ar.length > 0 ? (
                <div className="recently-list-item-arname">{record.data.ar[0].name}</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiderBar;

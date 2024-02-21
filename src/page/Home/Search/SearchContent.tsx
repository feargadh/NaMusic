import React, { useState } from "react";
import "./index.less";
import { Button, Empty, Table, Tabs, TabsProps, Tooltip, message } from "antd";
import { recordIsAlbum, recordIsSong } from "../../../utils";
import dayjs from "dayjs";
import { PlayCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import useGlobalStore from "../../../store";

interface IProps {
  result: SearchResult;
}

const SearchContent: React.FC<IProps> = ({ result }) => {
  const resultIsNotEmpty = result.albums || result.songs || result.artists;
  const [current, setCurrent] = useState<number>(1);
  const [selectedSongIds, setSelectedSongIds] = useState<number[]>([]);
  const { setGlobalState } = useGlobalStore();
  const [messageApi] = message.useMessage();

  const items: TabsProps["items"] = [];

  const commonPagination = {
    current,
    pageSize: 30,
    onChange: (page: number) => setCurrent(page),
    showSizeChanger: false,
  };

  // 播放音乐
  const handlePlaySong = (song: ResourceDataTypeInfo) => {
    setGlobalState({
      musicId: song.id,
      musicItem: {
        alCoverUrl: song.al.picUrl,
        alName: song.al.name,
        arName: song.ar[0]?.name,
        name: song.name,
        id: song.id,
      },
    });
  };

  // 打开用户歌单弹窗
  const handleOpenUserLibraryModal = (songId?: number) => {
    if (typeof songId === "undefined" && selectedSongIds.length === 0) {
      return messageApi.warning("Please choose a song at least");
    }
    setGlobalState({
      libraryModalOpen: true,
      selectedSongIds: typeof songId === "undefined" ? selectedSongIds : [songId],
    });
  };

  // 选择歌曲
  const handleSelectSongs = (songIds: string[]) => {
    setSelectedSongIds(songIds.map((key) => Number(key.split("search-songs-")[1])));
  };

  result.songs &&
    items.push({
      key: "search-songs",
      label: "Songs",
      children: (
        <div className="search-songs-content">
          <div className="search-songs-content-action-row">
            <Button size="small" onClick={() => handleOpenUserLibraryModal()}>
              Add songs to library
            </Button>
          </div>
          <Table
            bordered={false}
            rowSelection={{
              onChange: (selectedKeys) => handleSelectSongs(selectedKeys as string[]),
              selectedRowKeys: selectedSongIds.map((id) => `search-songs-${id}`),
            }}
            rowKey={(record) => `search-songs-${record.id}`}
            size="small"
            dataSource={result.songs}
            pagination={{
              ...commonPagination,
              total: result.songCount,
            }}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                width: 300,
                render: (value) => <div className="search-result-column-1">{value}</div>,
              },
              {
                title: "Album",
                dataIndex: "al",
                width: 240,
                render: (value: Al) => <div className="search-result-column-2">{value.name}</div>,
              },
              {
                title: "Artist",
                dataIndex: "ar",
                render: (value: Ar[]) => <div className="search-result-column-4">{value[0]?.name}</div>,
              },
              {
                title: "Duration",
                dataIndex: "dt",
                render: (value) => (
                  <div className="search-result-column-4">{dayjs.duration(value, "milliseconds").format("mm:ss")}</div>
                ),
              },
              {
                title: "Action",
                dataIndex: "action",
                render: (_, record) => (
                  <div className="search-result-column-action">
                    <Tooltip title="Play">
                      <Button
                        type="text"
                        size="small"
                        icon={<PlayCircleOutlined />}
                        onClick={() => handlePlaySong(record)}
                      ></Button>
                    </Tooltip>
                    <Tooltip title="Add to Library">
                      <Button
                        type="text"
                        size="small"
                        icon={<PlusSquareOutlined />}
                        onClick={() => handleOpenUserLibraryModal(record.id)}
                      ></Button>
                    </Tooltip>
                  </div>
                ),
              },
            ]}
          />
        </div>
      ),
    });

  result.albums &&
    items.push({
      label: "Albums",
      key: "search-albums",
      children: (
        <Table
          bordered={false}
          size="small"
          dataSource={result.albums}
          pagination={{
            ...commonPagination,
            total: result.albumCount,
          }}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              render: (value) => <div className="search-result-column-1">{value}</div>,
            },
            {
              title: "PublishTime",
              dataIndex: "publishTime",
              render: (value) => (
                <div className="search-result-column-2">{dayjs.duration(value, "milliseconds").format("mm:ss")}</div>
              ),
            },
            {
              title: "Artist",
              dataIndex: "artist",
              render: (value: SearchAlbumArtist) => <div className="search-result-column-3">{value.name}</div>,
            },
            {
              title: "Action",
              dataIndex: "action",
              render: (_, record) => (
                <div className="search-result-column-action">
                  <Button size="small" type="text" icon={<PlayCircleOutlined />}></Button>
                </div>
              ),
            },
          ]}
        />
      ),
    });

  return resultIsNotEmpty ? (
    <div className="search-content">
      <Tabs items={items} />
    </div>
  ) : (
    <Empty />
  );
};

export default SearchContent;

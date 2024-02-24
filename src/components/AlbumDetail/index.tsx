import React, { useEffect, useState } from "react";
import "./index.less";
import useGlobalStore from "../../store";
import { getAlbumDetail } from "../../api";
import classNames from "classnames";
import { Button, Table, Tooltip } from "antd";
import { ArrowLeftOutlined, PlayCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const AlbumDetail: React.FC = () => {
  const { currentAlbumId, setGlobalState, albumDetailZIndex, artistDetailZIndex } = useGlobalStore();
  const [detail, setDetail] = useState<AlbumDetail | undefined>();
  const [songs, setSongs] = useState<ResourceDataTypeInfo[]>([]);

  useEffect(() => {
    if (currentAlbumId) {
      handleGetAlbumDetail();
    } else {
      setSongs([]);
      setDetail(undefined);
    }
  }, [currentAlbumId]);

  const handleGetAlbumDetail = async () => {
    const res = await getAlbumDetail(currentAlbumId!);

    if (res.data.code === 200) {
      setDetail(res.data.album);
      setSongs(res.data.songs);
    }
  };

  const handlePlayAblum = () => {
    if (songs.length > 0 && detail) {
      const musicList: MusicItemRenderData[] = songs.map((record) => ({
        id: record.id,
        name: record.name,
        alCoverUrl: detail.picUrl,
        alName: detail.name,
        arName: detail.artist.name,
      }));
      setGlobalState({
        musicId: musicList[0].id,
        currenMusicIndex: 0,
        musicItem: musicList[0],
        currentMusicList: musicList,
      });
    }
  };

  const handlePlaySong = (record: ResourceDataTypeInfo) => {
    if (detail) {
      setGlobalState({
        musicId: record.id,
        musicItem: {
          name: record.name,
          id: record.id,
          alCoverUrl: detail.picUrl,
          alName: detail.name,
          arName: detail.artist.name,
        },
      });
    }
  };

  return (
    <div
      className={classNames("album-detail-page", {
        "album-detail-page-show": typeof currentAlbumId !== "undefined",
        "album-detail-page-hidden": typeof currentAlbumId === "undefined",
      })}
    >
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() =>
          setGlobalState({
            currentAlbumId: undefined,
            albumDetailZIndex: 0,
          })
        }
      ></Button>
      {detail ? (
        <>
          <div className="album-detail" style={{ zIndex: albumDetailZIndex }}>
            <div className="album-cover" style={{ backgroundImage: `url(${detail.picUrl})` }}></div>
            <div className="album-info">
              <div className="album-info-item">
                <label>Album Name:</label>
                <div className="album-name">{detail.name}</div>
              </div>
              <div className="album-info-item">
                <label>Author:</label>
                <div className="album-arname">{detail.artist.name}</div>
              </div>

              <div className="album-info-item">
                <label>Publish Time:</label>
                <div className="album-publish-time">{dayjs(detail.publishTime).format("YYYY-MM-DD")}</div>
              </div>

              <Button type="link" icon={<PlayCircleOutlined />} onClick={handlePlayAblum}>
                Play all songs
              </Button>
            </div>
          </div>
          <div className="album-song-list">
            <Table
              bordered={false}
              // rowSelection={{
              //   onChange: (selectedKeys) => handleSelectSongs(selectedKeys as string[]),
              //   selectedRowKeys: selectedSongIds.map((id) => `search-songs-${id}`),
              // }}
              rowKey={(record) => `search-songs-${record.id}`}
              size="small"
              dataSource={songs}
              pagination={false}
              scroll={{ y: 392 }}
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
                  render: (value: Al) => (
                    <div
                      className="search-result-column-2"
                      onClick={() =>
                        setGlobalState({
                          currentAlbumId: value.id,
                        })
                      }
                    >
                      {value.name}
                    </div>
                  ),
                },
                {
                  title: "Artist",
                  dataIndex: "ar",
                  render: (value: Ar[]) => (
                    <div
                      className="search-result-column-4"
                      onClick={() =>
                        setGlobalState({
                          currentArtistId: value[0]?.id,
                        })
                      }
                    >
                      {value[0]?.name}
                    </div>
                  ),
                },
                {
                  title: "Duration",
                  dataIndex: "dt",
                  render: (value) => (
                    <div className="search-result-column-4">
                      {dayjs.duration(value, "milliseconds").format("mm:ss")}
                    </div>
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
                      {/* <Tooltip title="Add to Library">
                      <Button
                        type="text"
                        size="small"
                        icon={<PlusSquareOutlined />}
                        onClick={() => handleOpenUserLibraryModal(record.id)}
                      ></Button>
                    </Tooltip> */}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AlbumDetail;

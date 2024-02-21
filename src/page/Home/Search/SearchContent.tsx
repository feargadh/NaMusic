import React, { useState } from "react";
import "./index.less";
import { Button, Empty, Table, Tabs, TabsProps, Tooltip } from "antd";
import { recordIsAlbum, recordIsSong } from "../../../utils";
import dayjs from "dayjs";
import { PlayCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";

interface IProps {
  result: SearchResult;
}

const SearchContent: React.FC<IProps> = ({ result }) => {
  const resultIsNotEmpty = result.albums || result.songs || result.artists;
  const [current, setCurrent] = useState<number>(1);

  const items: TabsProps["items"] = [];

  const commonPagination = {
    current,
    pageSize: 30,
    onChange: (page: number) => setCurrent(page),
    showSizeChanger: false,
  };

  result.songs &&
    items.push({
      key: "search-songs",
      label: "Songs",
      children: (
        <Table
          bordered={false}
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
              render: (value) => <div className="search-result-column-1">{value}</div>,
            },
            {
              title: "Album",
              dataIndex: "album",
              render: (value: SearchSongAlbum) => <div className="search-result-column-2">{value.name}</div>,
            },
            {
              title: "Artist",
              dataIndex: "artists",
              render: (value: SearchSongArtist[]) => <div className="search-result-column-4">{value[0]?.name}</div>,
            },
            {
              title: "Duration",
              dataIndex: "duration",
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
                    <Button type="text" size="small" icon={<PlayCircleOutlined />}></Button>
                  </Tooltip>
                  <Tooltip title="Add to Library">
                    <Button type="text" size="small" icon={<PlusSquareOutlined />}></Button>
                  </Tooltip>
                </div>
              ),
            },
          ]}
        />
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

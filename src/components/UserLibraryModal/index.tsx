import { Button, Input, Modal } from "antd";
import useGlobalStore from "../../store";
import "./index.less";
import React, { useEffect, useRef, useState } from "react";
import { createPrivateLibrary, getUserLibrary, updateSongsInLibrary } from "../../api";
import useMessage from "antd/es/message/useMessage";

const UserLibraryModal: React.FC = ({}) => {
  const { libraryModalOpen, selectedSongIds, setGlobalState, userId } = useGlobalStore();
  const [libraryList, setLibraryList] = useState<LibraryItem[]>([]);
  const [creating, setCreating] = useState<boolean>(false);
  const [newLibraryName, setNewLibraryName] = useState<string>("");

  const [hasMore, setHasMore] = useState<boolean>(false);

  const [message] = useMessage();

  const currentOffset = useRef<number>(0);
  const moreBlock = useRef<HTMLDivElement>(null);
  const io = useRef<IntersectionObserver>(
    new IntersectionObserver((enties) => {
      if (enties[0]?.intersectionRatio > 0) {
        handleGetUserLibraryList(currentOffset.current + 1);
      }
    })
  );

  useEffect(() => {
    libraryModalOpen && handleGetUserLibraryList(currentOffset.current);
  }, [libraryModalOpen]);

  useEffect(() => {
    if (hasMore) {
      moreBlock.current && io.current.observe(moreBlock.current);
    } else {
      io.current.disconnect();
    }
  }, [hasMore]);

  const handleGetUserLibraryList = async (offset: number) => {
    if (userId) {
      const res = await getUserLibrary(userId, offset * 30);

      if (res.data.code === 200) {
        const { playlist, more } = res.data;
        setLibraryList((pre) => (offset > 0 ? playlist : pre.concat(playlist)));
        setHasMore(more);
        currentOffset.current = offset;
      }
    }
  };

  const handleCreateLibrary = async () => {
    if (newLibraryName.length > 0) {
      const res = await createPrivateLibrary(newLibraryName);
      if (res.data.code === 200) {
        message.success("Create successfully");
        const { playlist } = res.data;
        // handleGetUserLibraryList(0);
        setLibraryList([playlist].concat(libraryList));
        setCreating(false);
        setNewLibraryName("");
      }
    } else {
      message.warning("Please input new library name");
    }
  };

  const handleAddSongsToLibrary = async (id: number) => {
    debugger;
    const res = await updateSongsInLibrary("add", id, selectedSongIds.toString());

    if (res.data.code === 200) {
      message.success("Add successfully");
      setGlobalState({
        selectedSongIds: [],
        libraryModalOpen: false,
      });
    }
  };

  return (
    <Modal
      title="Choosing A Library"
      width={400}
      open={libraryModalOpen}
      footer={false}
      onCancel={() =>
        setGlobalState({
          libraryModalOpen: false,
        })
      }
    >
      <div className="library-modal-content">
        {creating ? (
          <div className="create-library-form">
            <Input
              size="small"
              placeholder="typing name"
              style={{ width: 176 }}
              value={newLibraryName}
              onChange={({ target: { value } }) => setNewLibraryName(value)}
              onPressEnter={handleCreateLibrary}
            />
            <Button type="primary" size="small" onClick={handleCreateLibrary}>
              Create
            </Button>
            <Button type="primary" size="small" danger onClick={() => setCreating(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="library-modal-list-item" onClick={() => setCreating(true)}>
            <div className="library-modal-list-item-add">Create a new library</div>
          </div>
        )}
        {libraryList.map((record, index) => (
          <div
            key={`library-modal-list-item-${record.id}-${index}`}
            className="library-modal-list-item"
            onClick={() => handleAddSongsToLibrary(record.id)}
          >
            <div
              className="library-modal-list-item-avatar"
              style={{ backgroundImage: `url(${record.coverImgUrl})` }}
            ></div>
            <div className="library-modal-list-item-info">
              <div className="library-modal-list-item-name">{record.name}</div>
              <div className="library-modal-list-item-number">{record.trackCount}</div>
            </div>
          </div>
        ))}
        {hasMore ? <div ref={moreBlock} className="more-block"></div> : null}
      </div>
    </Modal>
  );
};

export default UserLibraryModal;

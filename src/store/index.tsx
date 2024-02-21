import { create, UseBoundStore, StoreApi } from "zustand";

export interface GlobalState {
  userId: number | undefined;
  musicId: number | undefined;
  musicItem: MusicItemRenderData | undefined;
  currentMusicList: MusicItemRenderData[];
  currenMusicIndex: number;
  playerStatus: "playing" | "pause";
  
  randomArray: number[];
  libraryModalOpen: boolean;
  selectedSongIds: number[]
  setGlobalState: (state: Partial<GlobalState>) => void;
  playerBack: () => void;
  playerForward: () => void;
  randomNextMusic: () => void;
}

const useGlobalStore: UseBoundStore<StoreApi<GlobalState>> = create((set) => ({
  userId: undefined,
  musicId: undefined,
  musicItem: undefined,
  playerStatus: "pause",
  currentMusicList: [],
  randomArray: [],
  libraryModalOpen: false,
  selectedSongIds: [],
  currenMusicIndex: -1,
  setGlobalState: (newState: Partial<GlobalState>) => set(newState),
  playerBack: () =>
    set(({ currenMusicIndex, currentMusicList }) => {
      const newIndex = currenMusicIndex === 0 ? currentMusicList.length - 1 : currenMusicIndex - 1;
      return {
        currenMusicIndex: newIndex,
        musicId: currentMusicList[newIndex].id,
        musicItem: currentMusicList[newIndex],
      };
    }),
  playerForward: () =>
    set(({ currenMusicIndex, currentMusicList }) => {
      const newIndex = currenMusicIndex === currentMusicList.length - 1 ? 0 : currenMusicIndex + 1;
      return {
        currenMusicIndex: newIndex,
        musicId: currentMusicList[newIndex].id,
        musicItem: currentMusicList[newIndex],
      };
    }),
  randomNextMusic: () =>
    set(({ currentMusicList, randomArray }) => {
      if (randomArray.length === 0) {
        currentMusicList.forEach((_, index) => randomArray.push(index));
      }
      const nextPlayerIndex = Math.round(Math.random() * (randomArray.length - 1));
      randomArray.splice(nextPlayerIndex, 1);
      const nextMusic = currentMusicList[nextPlayerIndex];
      return {
        musicId: nextMusic.id,
        currenMusicIndex: nextPlayerIndex,
        randomArray,
        musicItem: nextMusic,
      };
    }),
}));

export default useGlobalStore;

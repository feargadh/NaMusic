// import { Response } from "@tauri-apps/api/http";
import http from "../http";

// type TauriHTTPResponse<T = any> = Promise<Response<ApiResponseBaseType<T>>>;

/**
 * @description 获取二维码key值
 */
export const getQRCodeKey = (): HTTPResponse<QRKeyResponse> => {
  return http(`/login/qr/key?timerstamp=${new Date().getTime()}`, {
    method: "GET",
  });
};

/**
 * @description 根据key值生成二维码
 */
export const createQRCode = (key: string): HTTPResponse<QRCodeResponse> => {
  return http(`/login/qr/create`, {
    method: "GET",
    params: {
      timerstamp: `${new Date().getTime()}`,
      key,
      qrimg: true,
    },
  });
};

/**
 * @description 检查二维码状态
 */
export const checkQRCodeStatus = (key: string): HTTPResponse<CheckQRCodeStatusResponse> => {
  return http(`/login/qr/check`, {
    method: "GET",
    params: {
      key,
      timerstamp: `${new Date().getTime()}`,
    },
  });
};

/**
 * @description 获取当前账号信息
 */
export const getLoginUserInfo = (): HTTPResponse<LoginUserResponse> => {
  return http("/user/account", {
    method: "GET",
    params: {},
  });
};

/**
 * @description 获取最近播放音乐
 */
export const getRecentlyMusic = (): HTTPResponse<RecentlyMusicResponse> => {
  return http("/record/recent/song", {
    method: "GET",
  });
};

/**
 * @description 获取用户歌单
 */
export const getUserLibrary = (uid: number, offset?: number): HTTPResponse<LibraryResponse> => {
  return http("/user/playlist", {
    method: "GET",
    params: {
      uid,
      offset,
    },
  });
};

/**
 * @description 根据音乐id获取音乐url
 */
export const getMusicUrlByMusicId = (id: number): HTTPResponse<MusicUrlResponse> => {
  return http("/song/url", {
    method: "GET",
    params: {
      id,
    },
  });
};

/**
 * @description 获取歌词
 */

export const getLyricById = (id: number): HTTPResponse<LyricResponse> => {
  return http("/lyric", {
    method: "GET",
    params: {
      id,
    },
  });
};

/**
 * @description 搜索建议
 */
export const getSearchSuggest = (keywords: string): HTTPResponse<SearchSuggestResponse> => {
  return http("/search/suggest", {
    method: "GET",
    params: {
      keywords,
    },
  });
};

/**
 * @description 搜索
 */
export const getSearchResult = (
  keywords: string,
  type?: 1 | 10 | 100,
  offset?: number
): HTTPResponse<SeacrhResponse> => {
  return http("/cloudsearch", {
    method: "GET",
    params: {
      keywords,
      type,
      offset,
    },
  });
};

/**
 * @description 获取专辑详情
 */
export const getAlbumDetail = (id: number, limit?: number): HTTPResponse<AlbumDetailResponse> => {
  return http("/album", {
    method: "GET",
    params: {
      id,
      limit,
    },
  });
};

/**
 * @description 获取歌手单曲
 */
export const getArtistSongs = (id: number, offset?: number) => {
  return http("/artists", {
    method: "GET",
    params: {
      id,
      offset,
    },
  });
};

/**
 * @description 获取歌手专辑
 */
export const getArtistAlbums = (id: number, offset?: number) => {
  return http("/artist/album", {
    method: "GET",
    params: {
      id,
      offset,
    },
  });
};

/**
 * @description 获取歌手详情
 */
export const getArtistDetail = (id: number): HTTPResponse<ArtistDetailResponse> => {
  return http("/artist/detail", {
    method: "GET",
    params: {
      id,
    },
  });
};

/**
 * @description 添加/删除歌单中的歌曲
 */
export const updateSongsInLibrary = (op: "add" | "del", pid: number, tracks: string) => {
  return http("/playlist/tracks", {
    method: "GET",
    params: {
      op,
      pid,
      tracks,
    },
  });
};

/**
 * @description 新建私人歌单
 */
export const createPrivateLibrary = (name: string): HTTPResponse<CreateLibraryResponse> => {
  return http("/playlist/create", {
    method: "GET",
    params: {
      name,
      privacy: 10,
    },
  });
};

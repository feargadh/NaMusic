declare interface ApiResponseBaseType<T = unknown> {
  data: T;
  code: number;
}

declare interface QRKeyResponse {
  data: {
    code: number;
    unikey: string;
  };
  code: number;
}

declare interface QRCodeResponse {
  code: number;
  data: {
    qrurl: string;
    qrimg: string;
  };
}

declare interface CheckQRCodeStatusResponse {
  code: number;
  message: string;
  cookie: string;
}

declare type HTTPResponse<T> = Promise<{
  data: T;
}>;

declare interface LoginUserResponse {
  code: number;
  account: Account;
  profile: Profile;
}

declare interface Profile {
  userId: number;
  userType: number;
  nickname: string;
  avatarImgId: number;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundUrl: string;
  signature: string;
  createTime: number;
  userName: string;
  accountType: number;
  shortUserName: string;
  birthday: number;
  authority: number;
  gender: number;
  accountStatus: number;
  province: number;
  city: number;
  authStatus: number;
  description?: any;
  detailDescription?: any;
  defaultAvatar: boolean;
  expertTags?: any;
  experts?: any;
  djStatus: number;
  locationStatus: number;
  vipType: number;
  followed: boolean;
  mutual: boolean;
  authenticated: boolean;
  lastLoginTime: number;
  lastLoginIP: string;
  remarkName?: any;
  viptypeVersion: number;
  authenticationTypes: number;
  avatarDetail?: any;
  anchor: boolean;
}

declare interface Account {
  id: number;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  anonimousUser: boolean;
  paidFee: boolean;
}

declare interface RecentlyMusicResponse {
  code: number;
  data: RecentlyMusicResponseData;
  message: string;
}

interface RecentlyMusicResponseData {
  total: number;
  list: ResourceDataType[];
}

interface ResourceDataType {
  resourceId: string;
  playTime: number;
  resourceType: string;
  data: ResourceDataTypeInfo;
  banned: boolean;
  multiTerminalInfo?: MultiTerminalInfo;
}

interface MultiTerminalInfo {
  icon: string;
  osText: string;
}

interface ResourceDataTypeInfo {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: string[];
  pop: number;
  st: number;
  rt?: string;
  fee: number;
  v: number;
  crbt?: any;
  cf: string;
  al: Al;
  dt: number;
  h?: H;
  m?: H;
  l: H;
  a?: any;
  cd: string;
  no: number;
  rtUrl?: any;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: OriginSongSimpleDatum;
  single: number;
  noCopyrightRcmd?: any;
  rtype: number;
  rurl?: any;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
  tns?: string[];
}

interface OriginSongSimpleDatum {
  songId: number;
  name: string;
  artists: Artist[];
  albumMeta: Artist;
}

interface Artist {
  id: number;
  name: string;
}

interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns: string[];
  pic_str?: string;
  pic: number;
}

interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}

declare interface LibraryResponse {
  version: string;
  more: boolean;
  playlist: LibraryItem[];
  code: number;
}

declare interface LibraryItem {
  subscribers: any[];
  subscribed: boolean;
  creator: Creator;
  artists?: any;
  tracks?: any;
  top: boolean;
  updateFrequency?: any;
  backgroundCoverId: number;
  backgroundCoverUrl?: any;
  titleImage: number;
  titleImageUrl?: any;
  englishTitle?: any;
  opRecommend: boolean;
  recommendInfo?: any;
  subscribedCount: number;
  cloudTrackCount: number;
  userId: number;
  totalDuration: number;
  coverImgId: number;
  privacy: number;
  trackUpdateTime: number;
  trackCount: number;
  updateTime: number;
  commentThreadId: string;
  coverImgUrl: string;
  specialType: number;
  anonimous: boolean;
  createTime: number;
  highQuality: boolean;
  newImported: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  adType: number;
  description?: string;
  tags: string[];
  ordered: boolean;
  status: number;
  name: string;
  id: number;
  coverImgId_str?: string;
  sharedUsers?: any;
  shareStatus?: any;
  copied: boolean;
}

interface Creator {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: string;
  description: string;
  detailDescription: string;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: string;
  authority: number;
  mutual: boolean;
  expertTags?: string[];
  experts?: Expert;
  djStatus: number;
  vipType: number;
  remarkName?: any;
  authenticationTypes: number;
  avatarDetail?: any;
  anchor: boolean;
  avatarImgIdStr: string;
  backgroundImgIdStr: string;
  avatarImgId_str: string;
}

interface Expert {
  "1": string;
}

declare interface MusicUrlResponse {
  data: MuiscItem[];
  code: number;
}

declare interface MuiscItem {
  id: number;
  url: string;
  br: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  type: string;
  gain: number;
  peak: number;
  fee: number;
  uf?: any;
  payed: number;
  flag: number;
  canExtend: boolean;
  freeTrialInfo: FreeTrialInfo;
  level: string;
  encodeType: string;
  channelLayout?: any;
  freeTrialPrivilege: FreeTrialPrivilege;
  freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
  urlSource: number;
  rightSource: number;
  podcastCtrp?: any;
  effectTypes?: any;
  time: number;
}

interface FreeTimeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  type: number;
  remainTime: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType?: any;
  cannotListenReason?: any;
  playReason?: any;
}

interface FreeTrialInfo {
  fragmentType: number;
  start: number;
  end: number;
  algData?: any;
}

declare interface MusicItemRenderData {
  id: number;
  name: string;
  alCoverUrl: string;
  alName: string;
  arName: string;
}

declare interface PlayerDetail {
  isPlaying?: boolean;
  currentTime: number;
  currentTimeFormat: string;
  duration: number;
  durationFormat: string;
  url?: string;
  mode: PlayerModeType;
  volume: number;
}

declare type PlayerModeType = "loop" | "singer" | "random";

declare interface LyricResponse {
  sgc: boolean;
  sfy: boolean;
  qfy: boolean;
  transUser: TransUser;
  lyricUser: TransUser;
  lrc: Lrc;
  klyric: Lrc;
  tlyric?: Lrc;
  code: number;
}

declare interface Lrc {
  version: number;
  lyric: string;
}

interface TransUser {
  id: number;
  status: number;
  demand: number;
  userid: number;
  nickname: string;
  uptime: number;
}

declare interface LyricRenderType {
  currentTime: string;
  lyric: string;
  translation?: string;
  active: boolean;
}

declare interface SearchSuggestResponse {
  result: SearchSuggestResult;
  code: number;
}

declare interface SearchSuggestResult {
  songs?: Song[];
  albums?: Album[];
  order?: SearchSuggestResultOrder[];
  artists?: Artist[];
}

declare type SearchSuggestResultOrder = "songs" | "albums" | "artists";

interface Song {
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
  duration: number;
  copyrightId: number;
  status: number;
  alias: any[];
  rtype: number;
  ftype: number;
  mvid: number;
  fee: number;
  rUrl?: any;
  mark: number;
}

interface Album {
  id: number;
  name: string;
  artist: Artist;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
  mark: number;
}

interface Artist {
  id: number;
  name: string;
  picUrl?: any;
  alias: any[];
  albumSize: number;
  picId: number;
  fansGroup?: any;
  img1v1Url: string;
  img1v1: number;
  trans?: any;
}

declare interface SearchSuggestItem {
  title: SearchSuggestResultOrder;
  options: Song[] | Album[] | Artist[];
}

declare interface SearchKeywordsObj {
  values: string[];
  type?: 1 | 10 | 100;
}

declare interface SeacrhResponse {
  result: SearchResult;
  code: number;
}

declare interface SearchResult {
  hasMore: boolean;
  artistCount?: number;
  hlWords?: string[];
  artists?: SearchArtist[];
  searchQcReminder?: any;
  albums?: SearchAlbum[];
  albumCount?: number;
  songs?: SearchSong[];
  songCount?: number;
}

interface SearchAlbum {
  name: string;
  id: number;
  type: string;
  size: number;
  picId: number;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  picUrl: string;
  publishTime: number;
  description: string;
  tags: string;
  company: string;
  briefDesc: string;
  artist: SearchAlbumArtist;
  songs?: any;
  alias: any[];
  status: number;
  copyrightId: number;
  commentThreadId: string;
  artists: SearchAlbumArtist[];
  paid: boolean;
  onSale: boolean;
  picId_str: string;
  alg: string;
  mark: number;
  containedSong: string;
}

interface SearchAlbumArtist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  topicPerson: number;
  img1v1Id_str?: string;
}

interface SearchArtist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  topicPerson: number;
  picId_str?: string;
  transNames?: string[];
  img1v1Id_str?: string;
  alia: any[];
}

interface Artist {
  id: number;
  name: string;
  picUrl: string;
  alias: any[];
  albumSize: number;
  picId: number;
  fansGroup?: any;
  img1v1Url: string;
  img1v1: number;
  transNames?: string[];
  mvSize: number;
  followed: boolean;
  alg: string;
  trans?: string;
}

interface SearchSong {
  id: number;
  name: string;
  artists: SearchSongArtist[];
  album: SearchSongAlbum;
  duration: number;
  copyrightId: number;
  status: number;
  alias: any[];
  rtype: number;
  ftype: number;
  mvid: number;
  fee: number;
  rUrl?: any;
  mark: number;
}

interface SearchSongAlbum {
  id: number;
  name: string;
  artist: Artist;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
  mark: number;
}

interface SearchSongArtist {
  id: number;
  name: string;
  picUrl?: any;
  alias: any[];
  albumSize: number;
  picId: number;
  fansGroup?: any;
  img1v1Url: string;
  img1v1: number;
  trans?: any;
}

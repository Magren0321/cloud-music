//================== 登录操作 ===========================
export const phoneLogin = '/login/cellphone'; //手机登录

// ================= 歌单操作 ===========================
export const getSonglist = '/user/playlist'; //获取用户歌单
export const createSonglist = '/playlist/create'; //创建歌单
export const getSonglistInfo = '/playlist/detail'; //获取歌单详情
export const deleteSonglist = '/playlist/delete'; //删除歌单详情
export const subscribeSonglist = '/playlist/subscribe'; //收藏/取消收藏歌单

// ================= 歌曲操作 ===========================
export const getSongInfo = '/song/detail'; //获取歌曲详情
export const getSong = '/song/url'; //获取歌曲url
export const songAvailable = '/check/music'; //检查歌曲是否可用

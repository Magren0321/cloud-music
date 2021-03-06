const getters = {
    LOGIN_STATE:(state:object|any)=>state.loginState,
    ACCOUNT_UID:(state:object|any)=>state.accoutUid,
    NAVIGATION_DRAWERS:(state:object|any)=>state.navigationDrawers,
    HOME_TAB:(state:object|any)=>state.homeTab,
    SHOW_PLAYPAGE:(state:object|any)=>state.showPlayPage,
    SONG_ID:(state:object|any)=>state.songId,
    SONG_LIST:(state:object|any)=>state.songList,
    SONG_INDEX:(state:object|any)=>state.songIndex,
    SONGLIST_ID:(state:object|any)=>state.songListId,
    IS_PLAYING:(state:object|any)=>state.isPlaying,
    MODE:(state:object|any)=>state.mode,
    SHOW_LYRIC:(state:object|any)=>state.showLyric,
    SHOW_SONGTAB:(state:object|any)=>state.showSongTab,
    SONG_AVAILABLE:(state:object|any)=>state.songAvailable,
}
  
export default getters
  
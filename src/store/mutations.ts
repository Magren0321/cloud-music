import * as types from './types';

export default{
    [types.LOGIN_STATE](state:object|any,isLogin:boolean){
        state.loginState = isLogin
    },
    [types.ACCOUNT_UID](state:object|any,ACCOUNT_UID:number){
        state.accountUid = ACCOUNT_UID
    },
    [types.NAVIGATION_DRAWERS](state:object|any,showDrawers:boolean){
        state.navigationDrawers = showDrawers
    },
    [types.HOME_TAB](state:object|any,tab:string){
        state.homeTab = tab;
    },
    [types.SHOW_PLAYPAGE](state:object|any,isShow: boolean){
        state.showPlayPage = isShow;
    },
    [types.SONG_ID](state:object|any,songId: number){
        state.songId = songId;
    },
    [types.SONG_LIST](state:object|any,songlist: string){
        state.songList = songlist;
    },
    [types.SONG_INDEX](state:object|any,index: number){
        state.songIndex = index;
    },
    [types.SONGLIST_ID](state:object|any,id: number){
        state.songListId = id;
    },
    [types.IS_PLAYING](state:object|any,isPlaying: boolean){
        state.isPlaying = isPlaying
    },
}
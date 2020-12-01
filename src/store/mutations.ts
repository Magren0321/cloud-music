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
}
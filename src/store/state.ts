export default{
    loginState:false, //是否登录
    accountUid:0, //登录后用于存储用户的uid
    navigationDrawers:false,  //侧边栏的显示
    homeTab:'my',  //首页tab栏选择，my，find，movie
    showPlayPage: false, //播放页显示
    songId: 0, //播放中的歌曲id
    songListId: 0, //播放中的歌单id
    songList:'', //播放中的歌单
    songIndex:0, //播放的歌曲在歌单中的位置
    isPlaying: false, //是否正在播放
    mode: 'order', //三种播放模式，order：顺序，random：随机，loop：循环
}
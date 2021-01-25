import axios from '../utils/request'
import * as config from './config'

export default{
    /**
     * 手机登录
     * @param phone 手机
     * @param password  密码
     */
    phoneLogin(phone:number,password:string): Promise<Object>{
       return axios({
            url:config.phoneLogin+"?phone="+phone+"&password="+password,
            method:'get'
        })
    },
    /**
     * 获取用户歌单
     * @param uid 用户uid
     */
    getSonglist(uid:number|string|any): Promise<Object>{
        return axios({
            url:config.getSonglist+"?uid="+uid,
            method:'get'
        })
    },
    /**
     * 创建歌单
     * @param name 歌单名字
     * @param privacy 是否隐私
     */
    createSonglist(name: string,privacy?: boolean){
        if(privacy){
            return axios({
                url:config.createSonglist+"?name="+name+"&privacy=10",
                method:'get'
            })
        }else{
            return axios({
                url:config.createSonglist+"?name="+name,
                method:'get'
            })
        }
    },
    /**
     * 获取歌单详情
     * @param id 歌单id
     */
    getSonglistInfo(id: string){
        return axios({
            url: config.getSonglistInfo+"?id="+id,
            method: 'get'
        })
    },
    /**
     * 删除创建的歌单
     * @param id 歌单id
     */
    deleteSonglist(id: number){
        return axios({
            url: config.deleteSonglist+'?id='+id,
            method: 'get'
        })
    },
    /**
     * 收藏/取消收藏歌单
     * @param id 歌单id
     * @param t  类型,1:收藏,2:取消收藏
     */
    subscribeSonglist(id: number,t: number){
        return axios({
            url: config.subscribeSonglist+'?t='+t+'&id='+id,
            method: 'get'
        })
    },
    /**
     * 获取歌曲详情
     * @param ids 歌曲id
     */
    getSongInfo(ids: number){
        return axios({
            url: config.getSongInfo+'?ids=' + ids,
            method: 'get'
        })
    },
    /**
     * 获取歌曲url
     * @param id  歌曲id
     */
    getSong(id: number){
        return axios({
            url: config.getSong+'?id='+id,
            method: 'get'
        })
    },
    /**
     * 检查歌曲是否可用
     * @param id 歌曲id
     */
    songAvailable(id: number){
        return axios({
            url: config.songAvailable+'?id='+id,
            method: 'get'
        })
    },
    /**
     * 获取歌曲歌词
     * @param id 歌曲id
     */
    getLyric(id: number){
        return axios({
            url: config.getLyric + '?id=' + id,
            method: 'get'
        })
    },
    /**
     * 获取发现页banner
     */
    getBanner(){
        return axios({
            url: config.getBanner,
            method: 'get'
        })
    },
    /**
     * 获取用户推荐歌单（需要登录）
     */
    getPersonalRecommend(){
        return axios({
            url: config.getPersonalRecommend,
            method: 'get'
        })
    },
    /**
     * 获取推荐歌单
     * @param limit 歌单数量，默认为10
     */
    getRecommend(limit: number){
        return axios({
            url: config.getRecommend + '?limit'+limit,
            method: 'get'
        })
    },
    /**
     * 获取每日推荐歌曲，需要登录
     */
    getRecommendSong(){
        return axios({
            url: config.getRecommendSong,
            method: 'get'
        })
    }
}
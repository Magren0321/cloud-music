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

}
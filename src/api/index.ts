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

}
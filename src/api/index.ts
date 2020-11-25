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

}
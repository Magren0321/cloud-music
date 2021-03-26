//删除或者添加cookie
const setCookie = (name: string, value: string, expires: number)=>{
    if (typeof value != 'undefined') {
        //如果值为null, 删除cookie
        if (value === null) {
            value = '';
            expires = -1;
            return;
        }
        //设置有效期
        let date;
        date = new Date();
        date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
        let setExpires = 'expires=' + date.toUTCString();
        
        //设置cookie
        document.cookie = name+'='+encodeURIComponent(value)+';'+setExpires;
    } 
}

//获取cookie
const getCookie = (name: string) =>{
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
    else
        return null;
}

const cookie = {
    getCookie,
    setCookie
}

export default cookie;
<template>
  <div class="wrap" @click="isLogin">
    <img :src="avatar">
    <div class="account-name" >
        <p id="name" >{{name}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import cookie from '@/utils/cookie';
@Component({
  components: {
    
  },
})
export default class MyHead extends Vue {
  avatar = require('@/assets/account.png');
  name: string|null = "请登录";

  isLogin(): void{
    if(cookie.getCookie('accountUid')!=null){
      console.log("已经登录");
    }else{
      this.toLoginPage();
    }
  }

  toLoginPage(): void{
    this.$router.push({
      path:'/login'
    })
  }

  mounted () {
    //从cookie中读取信息
     if(cookie.getCookie('accountUid')!=null){
       this.name = cookie.getCookie('nickname');
       this.avatar = cookie.getCookie('avatarUrl')
    }
  }
  
}
</script>

<style scoped>
.wrap{
    width: 90%;
    margin-left:5%;
    padding-top: 55px;
    display: flex;
}
.wrap img{
    flex: 1;
    border-radius: 50px;
    background-color: #fff;
    max-width:50px;
    max-height: 50px;
}
.account-name{
    flex: 7;
    margin-left: 15px;
}
.account-name p{
    font-size: 5px;
    margin:0;
}
#name{
    font-size: 18px;
    font-weight: bold;
    overflow:hidden;
}
</style>

<template>
  <div class="wrap" @click="isLogin">
    <img :src="avatar">
    <div class="account-name">
        <p id="name">{{name}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class MyHead extends Vue {
  avatar = require('@/assets/account.png');
  name: string|null = "请登录";

  isLogin(): void{
    if(localStorage.getItem('accountUid')!=null){
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
    //从localStorage中读取账户信息
     if(localStorage.getItem('accountUid')!=null){
       this.name = localStorage.getItem('nickname');
       this.avatar = localStorage.getItem('avatarUrl')
    }
  }
  
}
</script>

<style scoped>
.wrap{
    width: 90%;
    margin-left:5%;
    margin-top: 49.6px;
    display: flex;
}
.wrap img{
    flex: 1;
    border-radius: 50px;
    background-color: #fff;
    max-width:50px;
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

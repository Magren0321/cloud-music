<template>
  <div class="wrap" @click="isLogin">
    <img :src="avatar">
    <div class="account-name">
        <p id="name">{{name}}</p>
        <p>{{level}}</p>
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
  name = "请登录";
  level = " ";

  isLogin(): void{
    if(this.$store.getters.LOGIN_STATE){
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
}
</script>

<style scoped>
.wrap{
    width: 90%;
    margin-left:5%;
    margin-top: 20px;
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
}
</style>

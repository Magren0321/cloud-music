<template>
  <div class="wrap" :style="{height: hrtwrap}">
   <div class="loginform" :style="{height: hrtform}">
     <div class="phoneInput" >
      <v-text-field
      color="red"
      type="number"
      v-model="phone"
      v-bind:loading = "isLogining"
      v-bind:disabled = "isLogining"
      hide-details="auto"
      label="手机号"
      ></v-text-field>
      <v-text-field
      color="red"
      type="password"
      v-model="password"
      v-bind:loading = "isLogining"
      v-bind:disabled = "isLogining"
      value="password"
      hide-details="auto"
      label="密码"
      ></v-text-field>
      <div id="loginbutton">
        <v-btn block color="red" @click="login()" v-bind:disabled = "isLogining">
         Login
        </v-btn>
      </div>
     </div>
   </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api/index'

@Component({
  components: {
    
  },
})
export default class Login extends Vue {
  timer!: number
  // document.documentElement.clientHeight 可见高度
  hrtwrap: string = document.documentElement.clientHeight+'px'
  hrtform: string = 0.5*document.documentElement.clientHeight+'px'
  isLogining = false;
  phone = '';
  password = '';
  
  login(){
    this.isLogining = true;
    const phoneNumber: number = parseInt(this.phone);
    api.phoneLogin(phoneNumber,this.password).then((res: object|any)=>{
      this.timer = setTimeout(()=>{
        this.isLogining = false;
      },1500);
      if(res.data.code!=200){
        window.alert(res.data.message);
      }else{
        // 存取用户信息
        const accountInfo = res.data.profile;
        const userId = res.data.profile.userId
        this.$store.commit('LOGIN_STATE',true);
        this.$store.commit('ACCOUNT_UID',userId);
        console.log(this.$store.state)
      }
      console.log(res);
    })
  }

  beforeDestroy() {
    clearTimeout(this.timer);
  }
  
}
</script>

<style scoped>
.wrap{
  background-color: red;
  display:flex;
  justify-content:center;
  align-items:center;
}
.loginform{
  width: 80%;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  justify-content:center;
  position: relative;
}
.phoneInput{
  width: 90%;
}
.phoneInput div{
  margin-top: 40px;
}
#loginbutton{
  width: 90%;
  position: absolute;
  bottom: 15%;
}
</style>

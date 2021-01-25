<template>
  <div class="home">
    <div class="tab">
      <div class="bulleted">
        <v-icon medium>mdi-format-list-bulleted</v-icon>
      </div>
      <ul class="nav-list">
        <router-link to="/my" @click="changeTab('my')">我的</router-link>
        <router-link to="/find" @click="changeTab('find')">发现</router-link>
        <router-link to="/movie" @click="changeTab('movie')">视频</router-link>
      </ul>
      <div class="magnify">
        <v-icon medium>mdi-magnify</v-icon>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  isMy = true;
  isFind = false;
  isMovie = false;
  tab = 'my';
  //点击后更改样式
  changeTab(res: string): void{
    if(res=='my'){
      this.isMy = true;
      this.isFind = false;
      this.isMovie = false;
    }else if(res=='find'){
      this.isMy = false;
      this.isFind = true;
      this.isMovie = false;
    }else if(res=='movie'){
      this.isMy = false;
      this.isFind = false;
      this.isMovie = true;
    }
    this.tab = res;
  }

}
</script>

<style scoped>
.home{
  background-color:#F1F1F1;
  height: 100%;
}
.content{
  margin-bottom: 90px;
}
.tab{
  display: flex;
  width: 10 0%;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 9;
  background-color:#F1F1F1;
}
.bulleted{
  margin-left: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  flex: 3;
}
.nav-list{
  list-style: none;
  flex: 6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left:0;
}
.router-link-active{
  color:#000 !important;
  font-weight: bold;
}
.nav-list a{
  display: inline;
  line-height: 50px;
  float:left;
  color:#969292;
  text-decoration: none;
}

.magnify{
  margin-right: 10px;
  flex:3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>

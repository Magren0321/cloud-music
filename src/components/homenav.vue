<!--首页的tab栏-->
<template>
  <div class="wrap">
    <div class="bulleted">
      <v-icon medium>mdi-format-list-bulleted</v-icon>
    </div>
     <ul class="nav-list">
      <li @click="changeTab('my')" :class="isMy==true?'clickLi':''">我的</li>
      <li @click="changeTab('find')" :class="isFind==true?'clickLi':''">发现</li>
      <li @click="changeTab('movie')" :class="isMovie==true?'clickLi':''">视频</li>
    </ul>
    <div class="magnify">
      <v-icon medium>mdi-magnify</v-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class Homenav extends Vue {
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
    this.chooseTab();
  }


  chooseTab(){
    this.$store.commit('HOME_TAB',this.tab);
  }
  
}
</script>

<style scoped>
.wrap{
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
.clickLi{
  color:#000 !important;
  font-weight: bold;
}
.nav-list li{
  display: inline;
  line-height: 50px;
  float:left;
  color:#969292;
}

.magnify{
  margin-right: 10px;
  flex:3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
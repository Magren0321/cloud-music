<!--播放页面-->
<template>
  <div class="wrap">
    <div class="tab">
        <v-icon large color="#fff" @click="hidePlayPage()">mdi-arrow-left</v-icon>
        <p>{{title}}</p>
    </div>
    <div class="coverImg">
      <img :src="songImg">
    </div>
    <div class="schedule">
      <p>{{playingTime}}</p>
    
      <p>{{endTime}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component,  Vue } from 'vue-property-decorator';

@Component
export default class PlayPage extends Vue {
    title = '歌单歌单歌单歌单歌单歌单歌单歌单歌单歌单歌单歌单歌单歌单';
    songImg = require("@/assets/like.png");
    playingTime = 'xxx';
    endTime = 'xxx';

    //隐藏播放组件
    hidePlayPage(): void{
      this.$store.commit('SHOW_PLAYPAGE',false);
    }
}
</script>

<style scoped>
.wrap{
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
  height: 100vh;
}
.tab{
  display: flex;
  height: 40px;
  width: 100%;
}
.tab p{
  line-height: 40px;
  margin: 0;
  width: 60%;
  margin-left: 10px;
  font-weight: bold;
  font-size: 17px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.coverImg{
  margin-top: 20px;
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center; 
  align-items: center;  
}
@-webkit-keyframes rotate{
    from{-webkit-transform: rotate(0deg)}
    to{-webkit-transform: rotate(360deg)}
}
@-moz-keyframes rotate{
    from{-moz-transform: rotate(0deg)}
    to{-moz-transform: rotate(359deg)}
}
@-o-keyframes rotate{
    from{-o-transform: rotate(0deg)}
    to{-o-transform: rotate(359deg)}
}
@keyframes rotate{
    from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
}
.coverImg img{
  height: 35vh;
  border: 6vh solid #000000; /*border: 1px solid #000000;*/
  -webkit-border-radius: 50%;
  border-radius: 50%;
  transition-property: all;
  transition-duration: 1s;
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 3s linear infinite;
  -moz-animation: rotate 3s linear infinite;
  -o-animation: rotate 3s linear infinite;
  animation: rotate 3s linear infinite;
}
.schedule{
  display: flex;
}

</style>
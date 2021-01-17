<!--播放页面-->
<template>
  <div class="wrap">

    <audio
      :src="audioUrl"
      ref="songAudio"
      preload="auto"
      autoplay
    ></audio>

    <div class="tab">
        <v-icon large color="#fff" @click="hidePlayPage()">mdi-arrow-left</v-icon>
        <p>{{title}}</p>
    </div>

    <div class="coverImg" >
      <img :src="songImg">
    </div>

    <div class="schedule">
      <p>{{playingTime}}</p>
      <div class="bar">
        <v-slider
        color="red"
        track-color="#CFC8C6"
        v-model = 'barValue'
        hide-details
        max = "50"
        min = "-50"
        ></v-slider>
      </div>
      <p>{{endTime}}</p>
    </div>

    <div class="control">
       <v-btn icon color="#fff">
        <v-icon size="5vh" color="#DFD6D4">mdi-play-circle-outline</v-icon>
       </v-btn>
       <v-btn icon color="#fff">
        <v-icon size="5vh" color="#DFD6D4" >mdi-play-circle-outline</v-icon>
       </v-btn>
       <v-btn icon color="#fff"  @click="changeStatus()">
        <v-icon size="8vh" color="#DFD6D4" v-show="!$store.state.isPlaying">mdi-play-circle-outline</v-icon>
        <v-icon size="8vh" color="#DFD6D4" v-show="$store.state.isPlaying">mdi-pause-circle-outline</v-icon>
       </v-btn>
       <v-btn icon color="#fff">
        <v-icon size="5vh" color="#DFD6D4">mdi-play-circle-outline</v-icon>
       </v-btn>
       <v-btn icon color="#fff">
        <v-icon size="5vh" color="#DFD6D4">mdi-playlist-music-outline</v-icon>
       </v-btn>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component,  Vue, Watch } from 'vue-property-decorator';
import api from '@/api/index';

@Component
export default class PlayPage extends Vue {
    title = '';
    songImg = require("@/assets/like.png");
    playingTime = '00:00';
    endTime = '00:00';
    barValue = -50; //播放进度
    audioUrl = ''; //播放的url
    songList = []; //播放的歌单

    //隐藏播放组件
    hidePlayPage(): void{
      this.$store.commit('SHOW_PLAYPAGE',false);
    }
    //播放可取
    startPlay(id: number): void{
      api.getSong(id).then((res: object|any)=>{
        this.audioUrl = res.data.data[0].url;
        this.$store.commit('IS_PLAYING',true);
      })
    }
    //获取歌曲详细信息
    getSongInfo(id: number): void{
      api.getSongInfo(id).then((res: object|any)=>{
        console.log(res);
        this.songImg = res.data.songs[0].al.picUrl;
        this.title = res.data.songs[0].name
      })
    }
    //暂停/开始播放
    changeStatus(){
      if(this.$store.getters.IS_PLAYING){
        (this.$refs.songAudio as any).pause();
        this.$store.commit('IS_PLAYING',false);
      }else{
        (this.$refs.songAudio as any).play();
        this.$store.commit('IS_PLAYING',true);
      }
    }
    //当选中的歌曲改变时候先检测是否可用
    @Watch('$store.state.songId')
    playSong(): void{
      api.songAvailable(this.$store.state.songId).then((res: object|any)=>{
        if(res.data.success == true){
          this.getSongInfo(this.$store.state.songId); //获取详情
          this.startPlay(this.$store.state.songId); //播放
          this.songList = JSON.parse(this.$store.state.songList) //获取播放歌曲所在的歌单
        }else{
          console.log('歌曲不可用');
        }
      })
    }


}
</script>

<style scoped>
.wrap{
  position: fixed;
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
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
  width: 35vh;
  border: 6vh solid #000000; /*border: 1px solid #000000;*/
  -webkit-border-radius: 50%;
  border-radius: 50%;
  transition-property: all;
  transition-duration: 1s;
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 10s linear infinite;
  -moz-animation: rotate 10s linear infinite;
  -o-animation: rotate 10s linear infinite;
  animation: rotate 10s linear infinite;
}
.schedule{
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: fixed;
  bottom: 14vh;
}
.schedule p{
  width: 15%;
  padding: 0;
  margin: 5px 0 0 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
}
.bar{
  width: 70%;
}
.control{
  position: fixed;
  width: 100%;
  bottom: 3vh;
  display: flex;
  justify-content: space-around;
}
</style>
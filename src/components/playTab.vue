<!--页面底部的播放tab-->
<template>
  <div class="wrap" @click="showPlayPage(true)">
    <div class="coverImg" >
      <img :src="songImg">
    </div>
    <div class="songName">
      <p id="name">{{songName}}</p>
      <p id="author">{{songAuthor}}</p>
    </div>
    <div class="controlBtn">
      <v-btn icon color="#fff" @click.stop="changeStatus()">
        <v-icon size="45px" color="#000000" v-show="!$store.getters.IS_PLAYING">mdi-play-circle-outline</v-icon>
        <v-icon size="45px" color="#000000" v-show="$store.getters.IS_PLAYING">mdi-pause-circle-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import api from '@/api/index'
@Component
export default class PlayTab extends Vue {
  songImg = '';
  songName = '';
  songAuthor = '';

  //监听歌曲播放/切换
  @Watch('$store.getters.SONG_ID')
  getSonginfo(){
    api.getSongInfo(this.$store.getters.SONG_ID).then((res: object|any)=>{
      this.songImg = res.data.songs[0].al.picUrl;
      this.songName = res.data.songs[0].name
      this.songAuthor = res.data.songs[0].ar[0].name
    })
  }
  //暂停/开始播放
  changeStatus(): void{
    if(this.$store.getters.IS_PLAYING){
      this.$store.commit('IS_PLAYING',false);
    }else{
      this.$store.commit('IS_PLAYING',true);
    }
  }
  
  //打开播放页
  showPlayPage(isShow: boolean): void{
    this.$store.commit("SHOW_PLAYPAGE",isShow);
  }
  
}
</script>

<style scoped>
.wrap{
    z-index: 50;
    width: 100%;
    height: 50px;
    position:fixed;
    bottom: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
}
.coverImg img{
  margin: -5px 0 5px 5px;
  height: 50px;
  width: 50px;
  border: 10px solid #000000; /*border: 1px solid #000000;*/
  border-radius: 50%;
}
.songName{
  width: 50%;
  margin-left: -10px;
}
.songName p{
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#name{
  font-size: 17px;
}
#author{
  font-size: 15px;
  color:#7B7776;
}
.controlBtn{
  display: flex;
  align-items: center; 
}
</style>
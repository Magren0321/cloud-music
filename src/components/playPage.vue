<!--播放页面-->
<template>
  <div class="wrap">

    <v-bottom-sheet
      v-model="sheet"
    >
    <div class="songlist">
      <v-subheader>当前播放({{songList.length}}):</v-subheader>
      <v-virtual-scroll
        item-height='50'
        height="999"
        width="100%"
        :items="songList"
      >
      <template v-slot:default="{ item,index }">
        <v-list-item-action> 
              <v-btn class="btnSonglist" x-large @click="otherSongs(item.id,index)">
                  <p>{{index+1}}: {{item.name}}</p>
                  <v-icon color="red" v-show="item.id == $store.getters.SONG_ID">mdi-volume-high</v-icon>
              </v-btn>
        </v-list-item-action>
      </template>
      </v-virtual-scroll>
    </div>
    </v-bottom-sheet>

    <audio
      :src="audioUrl"
      ref="songAudio"
      preload="auto"
      autoplay
      @canplay="getDuration"
      @timeupdate="updateTime"
      @ended="endedSong"
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
        @mousedown="isDraging = true"
        @mouseup="isDraging = false"
        @change="setProcess()"
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
       <v-btn icon color="#fff" @click="changeMode()">
        <v-icon size="4vh" color="#DFD6D4" v-show="$store.getters.MODE == 'random'">mdi-shuffle-variant</v-icon>
        <v-icon size="4vh" color="#DFD6D4" v-show="$store.getters.MODE == 'order'">mdi-swap-horizontal</v-icon>
        <v-icon size="4vh" color="#DFD6D4" v-show="$store.getters.MODE == 'loop'">mdi-repeat-once</v-icon>
       </v-btn>
       <v-btn icon color="#fff" @click="changeSong(-1)">
        <v-icon size="5vh" color="#DFD6D4" >mdi-skip-previous-outline</v-icon>
       </v-btn>
       <v-btn icon color="#fff"  @click="changeStatus()">
        <v-icon size="8vh" color="#DFD6D4" v-show="!$store.state.isPlaying">mdi-play-circle-outline</v-icon>
        <v-icon size="8vh" color="#DFD6D4" v-show="$store.state.isPlaying">mdi-pause-circle-outline</v-icon>
       </v-btn>
       <v-btn icon color="#fff" @click="changeSong(1)">
        <v-icon size="5vh" color="#DFD6D4">mdi-skip-next-outline</v-icon>
       </v-btn>
       <v-btn icon color="#fff" @click="sheet=true">
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
    playingTime = '0:00'; //正在播放的时间
    endTime = '0:00'; //结束时间
    totalDuration = 0; //总时长（时间戳)
    barValue = -50; //进度条
    audioUrl = ''; //播放的url
    songList = []; //播放的歌单
    isDraging = false; //用于判断是否点击下进度条
    sheet = false; //歌单是否打开

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
        this.songImg = res.data.songs[0].al.picUrl;
        this.title = res.data.songs[0].name
      })
    }
    //暂停/开始播放
    changeStatus(): void{
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
          (this.$refs.songAudio as any).pause();
          this.$store.commit('IS_PLAYING',false);
          this.getSongInfo(this.$store.state.songId); //获取详情
          this.startPlay(this.$store.state.songId); //播放
          this.songList = JSON.parse(this.$store.state.songList) //获取播放歌曲所在的歌单
        }else{
          console.log('歌曲不可用');
        }
      })
    }
    //获取播放总时长
    getDuration(): void{
      const timeStamp: number = (this.$refs.songAudio as any).duration; 
      this.totalDuration = timeStamp;
      const m: number = Math.floor((timeStamp / 60) % 60);
      const s: number = Math.floor(timeStamp % 60);
      if(s<10){
        this.endTime = m + ':0' + s;
      }else{
        this.endTime = m + ':' + s;
      }
    }
    //获取audio当前播放时间
    updateTime(e: object|any): void{
      const m: number = Math.floor((e.target.currentTime / 60) % 60);
      const s: number = Math.floor(e.target.currentTime % 60);
      if(s<10){
        this.playingTime = m + ':0' + s;
      }else{
        this.playingTime = m + ':' + s;
      }
      //当鼠标按下的时候不将当前的播放时间赋值给进度条，当鼠标是抬起的时候再赋值，这样即可拖动。
      if(!this.isDraging){ 
        this.barValue = e.target.currentTime/(this.$refs.songAudio as any).duration*100-50;
      }
    }
    //进度条拖动修改播放位置
    setProcess(): void{
      (this.$refs.songAudio as any).currentTime = (this.barValue+50)/100*this.totalDuration;
    }
    //上/下一首  index: -1上一首，1下一首
    changeSong(index: number): void{
      if(this.$store.getters.SONG_INDEX == 1 && index == -1){
        this.$store.commit("SONG_INDEX",this.songList.length);//当当前播放的歌曲是第一首的时候，点击上一首跳转到歌单的最后一首
      }else if(this.$store.getters.SONG_INDEX == this.songList.length && index == 1){
        this.$store.commit("SONG_INDEX",1);//当当前播放的歌曲是最后一首的时候，点击下一首跳转到歌单的第一首
      }else{
        this.$store.commit("SONG_INDEX",this.$store.getters.SONG_INDEX+index);
      }
      this.$store.commit('SONG_ID',(this.songList[this.$store.getters.SONG_INDEX-1] as any).id);
    }
    //从歌单切换歌曲
    otherSongs(id: number,index: number): void{
      this.$store.commit("SONG_ID",id); //歌曲id
      this.$store.commit("SONG_INDEX",index+1);  //歌曲位置
      this.sheet = false;
    }
    //切换模式
    changeMode(): void{
      if(this.$store.getters.MODE == 'order'){
        this.$store.commit("MODE",'random');
      }else if(this.$store.getters.MODE == 'random'){
        this.$store.commit("MODE",'loop')
      }else{
        this.$store.commit('MODE','order')
      }
    }
    //当歌曲结束的时候
    endedSong(): void{
      if(this.$store.getters.MODE == 'order'){
        if(this.$store.getters.SONG_INDEX == this.songList.length){
          this.$store.commit("SONG_INDEX",1);
        }else{
          this.$store.commit("SONG_INDEX",this.$store.getters.SONG_INDEX+1);
        }
      }else if(this.$store.getters.MODE == 'random'){
        let random = Math.floor(Math.random()*this.songList.length+1) //取1到歌单长度的一个随机数，然后Math.floor向下取整
        if(random == this.$store.getters.SONG_INDEX){
          random = Math.floor(Math.random()*this.songList.length+1)
        }
        this.$store.commit("SONG_INDEX",random);
      }
      this.$store.commit('SONG_ID',(this.songList[this.$store.getters.SONG_INDEX-1] as any).id);
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
.songlist{
  background-color: #fff;
  height: 60vh;
  width: 100%;
  border-radius: 15px 15px 0 0;
}
.sheetTitle p{
  margin-top: 20px;
  font-weight: bold;
}
.v-list-item__action{
  width: 100%;
  margin: 0!important;
}
.btnSonglist{
  width: 100%;
  justify-content: left;
  display: inline;
}
.btnSonglist p{
  width: 90%;
  font-size: 15px;
  margin: 0 5px 0 0;
  white-space: nowrap;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
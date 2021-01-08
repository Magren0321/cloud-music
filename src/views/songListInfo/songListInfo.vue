<template>
  <div>
      <div>
        <div class="tab">
          <v-icon large color="#fff" @click="returnPage()">mdi-arrow-left</v-icon>
          <p>{{title}}</p>
        </div>
        <div class="songlist_info">
          <img :src="songImg">
          <div class="songlistText">
            <p id="listName">{{songListName}}</p>
            <p id="creatorName">{{songListCreator}}</p>
          </div>
        </div>
      </div>

      
      <div class="playall" v-bind:class="{playallfixed:isMorethen193}">
        <v-icon large>mdi-play-circle-outline</v-icon>
        <p>播放全部</p>
      </div>

      <div v-bind:class="{songlistfixed:isMorethen193}">
      <div class="songlist" v-for="(item,index) in songlist" :key="item.id">
        <div class="songlistIndex">
          <p>{{index+1}}</p>
        </div>
        <div class="songlistName">
           <p>{{item.name}}</p>
        </div>
        <div class="mod_songlist">
              <v-icon medium>mdi-dots-vertical</v-icon>
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
export default class SongListInfo extends Vue {
  title = "歌单";
  songImg = require('@/assets/like.png');
  songListName = "歌单名称";  //歌单名称
  songListCreator = "创建者"; //歌单创建者
  creatorId = ''; //创建者id
  songlist: any[] = []; //歌单
  scroll = 0; //页面滚动的高度
  isMorethen193 = false; //判断页面是否滚动到了全部播放

  returnPage(): void{
    this.$router.go(-1);
  };
  
  handleScroll(){
    this.scroll = document.documentElement.scrollTop||document.body.scrollTop;
    if(this.scroll>40){
      this.title = this.songListName;
    }else{
      this.title = "歌单"
    }
    if(this.scroll>=190){
      this.isMorethen193 = true;
    }else{
      this.isMorethen193 = false;
    }
  }

  destroyed(){
    window.removeEventListener('scroll',this.handleScroll)
  }

  mounted () {
    //页面刷新无法获取传递过来的参数，同时store也会刷新，暂且先返回首页
    if(this.$route.params.id == undefined){
      this.$router.push('/')
    }else{
    //获取歌单详情
      api.getSonglistInfo(this.$route.params.id).then((res: object|any)=>{
        console.log(res);
        this.songImg = res.data.playlist.coverImgUrl;
        this.songListCreator = res.data.playlist.creator.nickname;
        this.songListName = res.data.playlist.name;
        this.creatorId = res.data.playlist.creator.userId;
        this.songlist = res.data.playlist.tracks;
      });
      window.addEventListener('scroll',this.handleScroll)
    }
  }
}
</script>

<style scoped>
p{
  padding: 0;
  margin: 0;
}
.tab{
  display: flex;
  background-color: #F3350C;
  height: 40px;
  width: 100%;
  z-index: 10;
  position:fixed;
  top: 0;
}
.tab p{
  line-height: 40px;
  margin-left: 10px;
  font-weight: bold;
  font-size: 17px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.songlist_info{
  display: flex;
  align-items: center;     
  background-color:#F3350C;
  min-height: 200px;
  width: 100%;
  margin-top: 30px;
}
.songlist_info img{
  width: 100px;
  height: 100px;
  margin-left: 20px;
}
.songlistText{
  margin-left: 20px;
  margin-right: 20px;
}
#listName{
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
#creatorName{
  color: #fff;
  font-size: 13px;
  margin-top: 10px;
}
.playall{
  z-index: 10;
  display: flex;
  align-items: center;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #CFC8C6;
  padding: 5px;
  width: 100%;
  background-color: #fff;
}
.playallfixed{
  position: fixed;
  top: 40px;
}
.playall p{
  font-size: 17px;
  font-weight: bold;
  margin-left: 5px;
}
.songlist{
  align-items: center;
  height: 50px;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.songlistfixed{
  margin-top: 55px;
}
.songlistIndex{
  width: 40px;
  margin-left: 10px;

}
.songlistIndex p{
  color: #CFC8C6;
}
.songlistName{
  width: 70%;
}
.songlistName p{
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>

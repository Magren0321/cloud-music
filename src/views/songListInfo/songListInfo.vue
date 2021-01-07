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
      <div>
        <v-icon medium>mdi-play-circle-outline</v-icon>
      </div>
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

  returnPage(): void{
    this.$router.go(-1);
  };
  
  mounted () {
    if(this.$route.params.id == undefined){
      this.returnPage();
    }
    //获取歌单详情
    api.getSonglistInfo(this.$route.params.id).then((res: object|any)=>{
      console.log(res);
      this.songImg = res.data.playlist.coverImgUrl;
      this.songListCreator = res.data.playlist.creator.nickname;
      this.songListName = res.data.playlist.name;
      this.creatorId = res.data.playlist.creator.userId;
      this.songlist = res.data.playlist.tracks;
    });
    
       
  }
}
</script>

<style scoped>
.tab{
  display: flex;
  background-color: #F3350C;
  height: 40px;
  width: 100%;
}
.tab p{
  line-height: 40px;
  margin-left: 10px;
  font-weight: bold;
  font-size: 21px;
  color: #fff;
}
.songlist_info{
  display: flex;
  align-items: center;     
  background-color:#F3350C;
  min-height: 200px;
  width: 100%;
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

}
.songlist{
  display: flex;
  align-items: center;
  height: 50px;
  margin-top: 10px;
}
.songlist p{
  margin: 0;
  padding: 0;
}
.songlistIndex{
  width: 40px;
  margin-left: 10px;
}
.songlistIndex p{
  color: #CFC8C6;
}
.songlistName{
  width: 79%;
  
}
.songlistName p{
  font-size: 20px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mod_song{
  width: 20px;
}
</style>

<template>
  <div class="wrap">
      <div class="title">
          <p>推荐歌单</p>
      </div>
      <div class="songList">
        <div v-for="(item,i) in songList" :key='i' class="songItem">
          <img :src='item.picUrl'>
          <p>{{item.name}}</p>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api/index';

@Component
export default class RecommendedPlaylist extends Vue {
  songList: any = [];

  mounted(){
    //获取推荐歌单
    if(this.$store.getters.LOGIN_STATE){
      api.getPersonalRecommend().then((res:object|any)=>{
        for(let i = 0; i<6;i++){
          this.songList.push(res.data.recommend[i]);
        }
      })
    }else{
      api.getRecommend(6).then((res:object|any)=>{
        this.songList = res.data.result;
      })
    }
  }

}
</script>

<style scoped>
.wrap{
  width:95%;
  margin-left: 2.5%;
  background-color: #fff;
  border-radius: 20px;
}
.songList{
  margin-top: 10px;
  display: flex;
  flex-flow: row wrap;
}
.songItem{
  padding: 5px;
  flex: 0 0 33.3%;
}
img{
  width: 100%;
  border-radius: 15px;
}
p{
  padding: 0;
  margin: 0;
}
</style>

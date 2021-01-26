<template>
  <div class="wrap">
      <div class="title">
          <p>推荐歌单</p>
      </div>
      <div class="songList">
        <div v-for="(item,i) in songList" :key='i' class="songItem" @click="clickSonglist(item.id)"> 
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
          if(res.data.recommend[i]!=undefined){
            this.songList.push(res.data.recommend[i]);
          }else{
            break;
          }
        }
      })
    }else{
      api.getRecommend(6).then((res:object|any)=>{
        this.songList = res.data.result;
      })
    }
  }
  //歌单点击
  clickSonglist(id: number): void{
    const songlistId = id.toString();
    this.$router.push({
        name:'songlist',
        params:{
            id:songlistId,
        }
    })
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
p{
  margin: 0;
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
.title p{
  padding: 5px 0 0 8px;
  font-size: 18px;
  font-weight: bold;
}
img{
  width: 100%;
  border-radius: 15px;
}
.songList p{
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp:2; /**文本限制两行 */
  word-break:break-all;  /**单词内的断句 */
  display:-webkit-box; /**webkit-line-clamp设置的必要 */
  -webkit-box-orient:vertical; /**webkit-line-clamp设置的必要 */
}
</style>

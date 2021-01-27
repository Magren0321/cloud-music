<template>
  <div class="wrap">
      <div class="title">
          <p id='title'>排行榜</p>
          <v-btn rounded small outlined id='moreBtn' @click='toRankingPage()'>more</v-btn>
      </div>

      <div class="course-container">
      <div class="swiper-con">
        <div
          v-for="(swp,swip) of swiperList"
          :key="swip"
          class="swip-item"
          @click="toSonglistPage(swp.id)"
        >
        <div class="rankList">
          <div class="coverImg">
            <img :src="swp.coverImgUrl">
          </div>
          <div class="list">
            <div v-for="(item,index) of swp.tracks" :key="index">
              <p>{{index+1}}.{{item.first}} - {{item.second}}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api/index';

@Component
export default class RankingList extends Vue {
  
  swiperList: any = [];

  //获取排行概要
  mounted(){
      api.getTopListDetail().then((res: any)=>{
         for(let i = 0; i<4; i++){
           this.swiperList.push(res.data.list[i]); 
         }
      })
  }

  //跳转到歌单详情页，传递歌单id
    toSonglistPage(id: number): void{
        const songlistId = id.toString();
        this.$router.push({
            name:'songlist',
            params:{
                id:songlistId,
            }
        })
    }
    
    //跳转到排行榜页面
    toRankingPage(): void{
      this.$router.push({
        path:'/ranking'
      })
    }
}
</script>

<style scoped>
.wrap{
  width:95%;
  margin-left: 2.5%;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 10px;
}
p{
  margin: 0;
}
.title{
  display: flex;
}
#title{
  padding: 5px 0 0 8px;
  font-size: 18px;
  font-weight: bold;
}
#moreBtn{
   margin: 5px 8px 0 0;
   margin-left: auto; /**按钮居右 */
}
.swiper-con {
  white-space: nowrap;
  overflow: auto;
  margin-top: 10px;
}
.swiper-con::-webkit-scrollbar {
  display: none;
}
.swip-item {
  display: inline-block;
  margin-bottom: 20px;
  width: 70%;
}
.rankList{
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.38);
  width: 95%;
}
.coverImg{
  height: 5rem;
  width: 5rem;
}
.coverImg img{
  width: 5rem;
  height: 5rem;
}
.list{
  height: 5rem;
  line-height: 1.7rem;
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
}
.list p{
  width: 100%;
  font-size: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

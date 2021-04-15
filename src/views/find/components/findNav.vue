<template>
  <div class="wrap">
    <div v-for="item in category" :key="item.id" class="category" @click="tabClick(item.id)">  
      <v-icon color="red" large>{{item.icon}}</v-icon>
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api/index';

@Component
export default class FindNav extends Vue {
  category = [{
    id:1,
    icon: "mdi-chart-box",
    name: "排行榜"
  },{
    id:2,
    icon:"mdi-calendar-heart",
    name: "每日推荐"
  },{
    id:3,
    icon:"mdi-playlist-music-outline",
    name:"歌单"
  },{
    id:4,
    icon:"mdi-radio",
    name:"私人FM"
  }
  ]
  
  tabClick(id: number): void{
    if(id == 1){
      this.toRankingPage();
    }else if(id == 2){
      api.getRecommendSong().then((res: any)=>{
        this.$store.commit('SHOW_PLAYPAGE',true)
        this.$store.commit('SONG_LIST',JSON.stringify(res.data.data.dailySongs))
        this.$store.commit('SONG_ID',res.data.data.dailySongs[0].id)
        this.$store.commit("SONG_INDEX",1);
      })
    }
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
  margin-top:15px;
  display: flex;
  flex-flow: row wrap;
}
.category{
  padding-top:10px;
  flex: 0 0 25%;
  text-align: center;
}
.category p{
  font-size: 13px;
}
</style>

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

@Component({
  components: {

  },
})
export default class MyNav extends Vue {
  category = [{
    id:1,
    icon: "mdi-download-circle",
    name: "本地音乐"
  },{
    id:2,
    icon:"mdi-star-outline",
    name: "收藏和赞"
  },{
    id:3,
    icon:"mdi-bullseye",
    name:"我的电台"
  },{
    id:4,
    icon:"mdi-account-multiple",
    name:"我的好友"
  },{
    id:5,
    icon:"mdi-play-circle",
    name:"最近播放"
  },{
    id:6,
    icon: "mdi-cloud-download",
    name: "云盘"
  }
  ]

  //method
  tabClick(id: number): void{
    console.log(id)
  }
}
</script>

<style scoped>
.wrap{
  background-color: #fff;
  width:95%;
  border-radius: 20px;
  margin-left: 2.5%;
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

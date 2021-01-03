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
      <div class="songlist">
        
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
  songListName = "歌单名称";
  songListCreator = "创建者";
  songlist: any[] = []; //歌单

  returnPage(): void{
    this.$router.go(-1);
  }
  
  mounted () {
    api.getSonglistInfo(this.$route.params.id).then((res: object|any)=>{
      console.log(res);
    });
  }
}
</script>

<style scoped>
.tab{
  display: flex;
  background-color: #F3350C;
  height: 40px;
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
  height: 200px;
}
.songlist_info img{
  width: 130px;
  height: 130px;
  margin-left: 35px;
}
.songlistText{
  margin-left: 20px;
}
#listName{
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
#creatorName{
  color: #fff;
}
</style>

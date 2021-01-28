<template>
  <div class="wrap">
    <div class="tab">
        <v-icon large color="#000" @click="returnPage()">mdi-arrow-left</v-icon>
        <p>排行榜</p>
    </div>

    <div class="List" style="margin-top:40px">
      <div class="title">
          <p>官方榜</p>
      </div>
      <div class="ListItem">
        <div v-for="(item,i) in officalList" :key='i' class="item" @click="toSonglistPage(item.id)"> 
          <img :src='item.coverImgUrl'>
        </div>
      </div>
    </div>

      <div class="List">
        <div class="title">
          <p>精选榜</p>
        </div>
      <div class="ListItem">
        <div v-for="(item,i) in featuredList" :key='i' class="item" @click="toSonglistPage(item.id)"> 
          <img :src='item.coverImgUrl'>
        </div>
      </div>
    </div>

    <div class="List">
        <div class="title">
          <p>其他</p>
        </div>
      <div class="ListItem">
        <div v-for="(item,i) in other" :key='i' class="item" @click="toSonglistPage(item.id)"> 
          <img :src='item.coverImgUrl'>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api/index';

@Component
export default class Ranking extends Vue {
  officalList = []; //官方榜
  featuredList = []; //精选榜
  other = []; //其他

  //返回上一页
  returnPage(): void{
    this.$router.go(-1);
  }
  mounted(){
    //获取排行榜
    api.getTopListDetail().then((res: any)=>{
      this.officalList = res.data.list.slice(0,4);
      this.featuredList = res.data.list.slice(4,8);
      this.other = res.data.list.slice(9,res.data.list.length);
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
}
</script>

<style scoped>
.wrap{
  background-color:#F1F1F1;
  height: 100%;
  margin-bottom: 40px;
}
p{
  margin: 0;
}
.tab{
  background-color:#F1F1F1;
  display: flex;
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
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.List{
  background-color: #fff;
  width: 95%;
  margin-left: 2.5%;
  margin-top: 10px;
  border-radius: 15px;
}
.ListItem{
  display: flex;
  flex-flow: row wrap;
}
.item{
  padding: 5px;
  flex: 0 0 33%;
  text-align: center;
}
.title p{
  padding: 5px 0 0 8px;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp:2; /**文本限制两行 */
  word-break:break-all;  /**单词内的断句 */
  display:-webkit-box; /**webkit-line-clamp设置的必要 */
  -webkit-box-orient:vertical; /**webkit-line-clamp设置的必要 */
}
img{
  width: 100%;
  border-radius: 15px;
}
</style>

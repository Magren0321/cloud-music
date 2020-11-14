<template>
  <div class="wrap">
    <div class="mylike">
        <img :src="likeImg">
        <div class="like-information">
            <p>我喜欢的音乐</p>
            <p>{{likeIndex}}首</p>
        </div>
    </div>
    <div class="mycreate">
        <div class = "createTitle">
            <p>创建歌单({{songIndex}}个)</p>
            <v-icon id="createAdd">mdi-plus</v-icon>
        </div>
        <div class="songlist">
            <p>暂无歌单</p>
        </div>
    </div>
    <div class="mystar">
         <div class = "createTitle">
            <p>收藏歌单({{songIndex}}个)</p>
        </div>
        <div class="songlist">
            <p>暂无歌单</p>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class MySongList extends Vue {
  likeImg = require('@/assets/like.png');
  likeIndex = 0;
  songIndex = 0;
}
</script>

<style scoped>
.wrap{
    width: 95%;
    margin-left: 2.5%;
}
.mylike{
    background-color: #fff;
    display: flex;
    margin-top: 10px;
    border-radius: 20px;
    align-items:center;
}
.mylike img{
    padding-top:10px;
    padding-bottom:10px;
    margin-left: 20px;
    max-width:55px;
    flex:1;
}
.like-information{
    flex:9;
    margin-left: 10px;
}
.like-information p{
    margin: 0;
}
.mycreate{
    background-color: #fff;
    margin-top: 10px;
    border-radius: 20px;
}
.createTitle{
    display: flex;
    align-items:center;
}
.createTitle p{
    flex: 9;
    margin: 0;
    padding: 10px;
    font-size: 15px;
    color: #BEBEBE;
}
#createAdd{
    flex: 1;
    margin-right: 10px;
}
.songlist{
    text-align:center;
}
.songlist p{
    color:#BEBEBE;
    font-size: 15px;
    line-height: 100px;
    margin: 0;
}
.mystar{
    background-color: #fff;
    margin-top: 10px;
    border-radius: 20px;
    margin-bottom: 30px;
}
</style>

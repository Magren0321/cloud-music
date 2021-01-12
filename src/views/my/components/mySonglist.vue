<template>
<div>
  <v-overlay :value="overlay" class="Voverlay">
    <modify-songlist-dialog v-show="overlay" v-clickoutside="outside" :id='modifySonglistId' :isStar='isStar'></modify-songlist-dialog>
  </v-overlay>
  <div class="wrap">
    <v-dialog
        v-model="dialog">
        <create-dialog></create-dialog>
    </v-dialog>
    <div class="mylike" @click="toSonglistPage(likeSonglist.id,likeSonglist.name)">
        <img :src="likeImg">
        <div class="like-information">
            <p>我喜欢的音乐</p>
            <p>{{likeIndex}}首</p>
        </div>
    </div>
    <div class="mycreate">
        <div class = "createTitle">
            <p>创建歌单({{createIndex}}个)</p>
            <div @click="dialog=true">
                <v-icon id="createAdd">mdi-plus</v-icon>
            </div>
        </div>
        <div class="songlist">
            <p v-show="!ifCreateSonglist" class="noSonglist">暂无歌单</p>
            <div v-for="item in createSonglist" :key="item.id" class="songlist_info" @click="toSonglistPage(item.id,item.name)">
                <img :src="item.coverImgUrl">
                <div class="songlist_info_p">
                    <p>{{item.name}}</p><br>
                    <p style="color:#BEBEBE">{{item.trackCount}}首</p>
                </div>
                <div class="mod_songlist" @click.stop="modifySonglist(false,item.id)"  onClick="event.cancelBubble = true">
                    <v-icon medium>mdi-dots-vertical</v-icon>
                </div>
            </div>
        </div>
    </div>
    <div class="mystar">
         <div class = "createTitle">
            <p>收藏歌单({{starIndex}}个)</p>
        </div>
        <div class="songlist">
            <p v-show="!ifStarSonglist" class="noSonglist">暂无歌单</p>
            <div v-for="item in starSonglist" :key="item.id" class="songlist_info" @click="toSonglistPage(item.id,item.name)">
                <img :src="item.coverImgUrl">
                <div class="songlist_info_p">
                    <p>{{item.name}}</p><br>
                    <p style="color:#BEBEBE">{{item.trackCount}}首</p>
                </div>
                <div class="mod_songlist" @click.stop="modifySonglist(true,item.id)">
                    <v-icon medium>mdi-dots-vertical</v-icon>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import api from '@/api/index'
import createDialog from './createSonglistDialog.vue'
import clickoutside from '@/utils/clickoutside'
import modifySonglistDialog from './modifySonglistDialog.vue'

@Component({
    directives:{
        clickoutside,
    },
    components: {
        modifySonglistDialog,
        createDialog,
    },
})

export default class MySongList extends Vue {
    likeImg = require('@/assets/like.png');
    likeSonglist!: object|any; //我喜欢的音乐
    likeIndex = 0; //喜欢的音乐数量
    createIndex = 0; //创建的歌单数量
    starIndex = 0; //收藏的歌单数量
    ifCreateSonglist = false; //是否有创建的歌单
    ifStarSonglist = false; //是否有收藏的歌单
    createSonglist: any[] = []; //创建的歌单列表
    starSonglist: any[] = []; //收藏的歌单列表
    dialog = false; //创建歌单dialog
    overlay = false; //编辑歌单dialog
    isStar = false;  //编辑的是否是自己创建的歌单
    modifySonglistId = 0; //编辑的歌单id
   
   //当点击的不是歌单编辑的dialog的时候调用
   outside(){
       this.overlay = false;
   }
   //点击歌单编辑
    modifySonglist(isStar: boolean,songlistId: number): void{
        this.overlay = true;
        this.isStar = isStar;
        this.modifySonglistId = songlistId;
    }
    //跳转到歌单详情页，传递歌单id
    toSonglistPage(id: number,name: string): void{
        const songlistId = id.toString();
        this.$router.push({
            name:'songlist',
            params:{
                id:songlistId,
                name:name
            }
        })
    }

    mounted () {
        //获取用户歌单
        const uid = localStorage.getItem('accountUid');
        if(uid!=null){
            api.getSonglist(uid).then((res: object|any)=>{
                console.log(res)
                this.likeSonglist = res.data.playlist[0];
                for(let i = 1;i<res.data.playlist.length;i++){
                    if(res.data.playlist[i].subscribed == false){
                        this.createSonglist.push(res.data.playlist[i]);
                    }else{
                        this.starSonglist.push(res.data.playlist[i]);
                    }
                }
                this.likeIndex = this.likeSonglist.trackCount;
                this.createIndex = this.createSonglist.length;
                this.starIndex = this.starSonglist.length
                if(this.createIndex!=0){
                    this.ifCreateSonglist = true;
                }
                if(this.starIndex!=0){
                    this.ifStarSonglist = true;
                }
            });
        }
    }
    
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
.noSonglist{
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
.songlist_info{
    display: flex;
}
.songlist_info img{
    padding-bottom: 10px;
    margin-left: 20px;
    max-width:60px;
}
.songlist_info_p{
    flex: 9;
    overflow:hidden;
    margin-left: 10px;
}
.songlist_info_p p{
    margin: 0;
    width: 100%;
    text-align: left;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mod_songlist{
    flex: 1;
}
.Voverlay{
    z-index: 99!important;
}
</style>

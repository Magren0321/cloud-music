<template>
  <div class="wrap">
    <v-dialog
      v-model="dialog"
    >
    <v-card>
      <v-card-title class="headline grey lighten-2">
          是否删除歌单
        </v-card-title>
      
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="deleteSonglist()"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-for="item in choose" :key="item.id" class="btdiv">
      <v-btn text width="100%" height="100%" @click="clickTab(item.id)"> 
          <p>{{item.name}}</p>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/api/index';

@Component({
  components: {
    
  },
})
export default class ModifySonglistDialog extends Vue {
  @Prop()
  private isStar!: boolean;
  @Prop()
  private id!: number;

  dialog = false;
  sure = false;

  deleteSonglist(): void{
    this.dialog = false;
    if(this.isStar == false){
        api.deleteSonglist(this.id).then((res)=>{
          console.log('删除歌单');
          this.$router.go(0);
        })
      }else{
        api.subscribeSonglist(this.id,2).then((res)=>{
          console.log('取消歌单收藏');
          this.$router.go(0)
        })
      }
  }

  choose = [
    {
      name:'分享',
      id:1
    },
    {
      name:'编辑歌单信息',
      id:2
    },
    {
      name:'删除',
      id:3
    }
  ]

  clickTab(id: number): void {
    if(id == 1){
      console.log("分享")
    }else if(id == 2){
      console.log('编辑歌单信息')
    }else if(id == 3){
      this.dialog = true;
    }
  }

  
}
</script>

<style scoped>
.wrap{
  background: #fff;
  position: fixed;
  border-radius: 10px 10px 0px 0px;
  left: 0;
  bottom: 0;
}
.btdiv{
  height: 45px;
  width: 100%;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #BEBEBE;
}
.btdiv:first-child{
  margin-top:10px;
}
.btdiv:last-child{
  margin-bottom: 10px;
}

.btdiv p{
  flex: 1;
  text-align: left;
  color: #000;
  font-size: 15px;
  margin: 0;
}

</style>

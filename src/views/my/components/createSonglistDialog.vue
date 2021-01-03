<template>
  <v-card>
    <v-card-title>
        <span>创建歌单</span>
    </v-card-title>
    <div class="titleInput">
        <v-text-field
            label="请输入歌单标题"
            v-model="songTitle"
            required
        ></v-text-field>
    </div>
    <div class="privacyDiv">
      <input type="checkbox"  v-model="isPrivacy" >设置为隐私歌单
    </div>
    <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="createSonglist()"
          >
            Save
          </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api/index';

@Component({
  components: {
    
  },
})
export default class CreateSonglistDialog extends Vue {
  songTitle = '';
  isPrivacy = false;

  createSonglist(){
    api.createSonglist(this.songTitle,this.isPrivacy).then((res: object|any)=>{
      console.log(res);
      this.$router.go(0);
    })
  }
  
}
</script>

<style scoped>
.titleInput{
    margin-left: 5%;
    width: 90%;
}
.privacyDiv{
  margin-left: 5%;
}
</style>

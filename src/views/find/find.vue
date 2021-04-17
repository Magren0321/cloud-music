<template>
  <div class="wrap" v-if="finish">
    <banner :banner = 'banner'></banner>
    <find-nav></find-nav>
    <recommended-playlist :recommendlist = 'recommendlist'></recommended-playlist>
    <ranking-list  :ranklist = "ranklist" ></ranking-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import banner from './components/banner.vue'
import findNav from './components/findNav.vue'
import recommendedPlaylist from './components/recommendedPlaylist.vue';
import rankingList from './components/rankingList.vue';
import api from '@/api/index';
import axios from 'axios';

@Component({
  components: {
    banner,
    findNav,
    recommendedPlaylist,
    rankingList,
  },
})
export default class Find extends Vue {
    banner = [];
    ranklist: any = [];
    recommendlist: any = [];
    finish = false;

    created(){
      let getRecommend;
      if(this.$store.getters.LOGIN_STATE){
          getRecommend =  api.getPersonalRecommend();
      }else{
          getRecommend = api.getRecommend(6);
      }

      axios.all([api.getBanner(),api.getTopListDetail(),getRecommend]).then(axios.spread((res1,res2,res3)=>{
          this.banner = res1.data.banners;
          for(let i = 0; i<4; i++){
           this.ranklist.push(res2.data.list[i]); 
          }
          if(this.$store.getters.LOGIN_STATE){
            for(let i = 0; i<6;i++){
              if(res3.data.recommend[i]!=undefined){
              this.recommendlist.push(res3.data.recommend[i]);
            }else{
              break;
            }
           }
          }else{
            this.recommendlist = res3.data.result;
          }
          this.finish = true;
      }))
    }
}
</script>


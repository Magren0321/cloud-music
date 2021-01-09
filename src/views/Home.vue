<template>
  <div class="home">
    <home-nav></home-nav>
     <div :is="currentView" class="content"></div>
     <play-tab></play-tab>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import  HomeNav  from '@/components/homenav.vue'
import my from './my/my.vue'
import find from './find/find.vue'
import movie from './movie/movie.vue'
import playTab from '@/components/playTab.vue'

@Component({
  components: {
    HomeNav,
    my,
    find,
    movie,
    playTab,
  },
})
export default class Home extends Vue {
  currentView = 'my'
  
  //监听vuex中的homeTab并进行组件切换
  @Watch('$store.state.homeTab')
  changeTab(){
    this.currentView =  this.$store.getters.HOME_TAB;
  }
}
</script>

<style scoped>
.home{
  background-color:#F1F1F1;
  height: 100%;
}
.content{
  margin-bottom: 25px;
}
</style>

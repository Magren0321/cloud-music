<template>
  <div class="home">
    <home-nav @choose-tab="changeCom"></home-nav>
     <div :is="currentView"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  HomeNav  from '@/components/homenav.vue'
import my from './my/my.vue'
import find from './find/find.vue'
import movie from './movie/movie.vue'

@Component({
  components: {
    HomeNav,
    my,
    find,
    movie,
  },
})
export default class Home extends Vue {
  currentView = 'my'

  private changeCom(val: string) {
      // val: 子组件传过来的值
     this.currentView = val;

     console.log(val);
  }
}
</script>

<style scoped>
.home{
  background-color:#F1F1F1;
  height: 100%;
}
</style>

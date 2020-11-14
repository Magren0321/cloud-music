<template>
  <div class="home">
    <home-nav></home-nav>
     <my></my>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  HomeNav  from '@/components/homenav.vue'
import my from './my/my.vue'

@Component({
  components: {
    HomeNav,
    my
  },
})
export default class Home extends Vue {
  
}
</script>

<style scoped>
.home{
  background-color:#F1F1F1;
  height: 100%;
}
</style>

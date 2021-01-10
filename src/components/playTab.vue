<!--页面底部的播放tab-->
<template>
  <div class="wrap" @click="showPlayPage(true)">
    
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class PlayTab extends Vue {
  

  showPlayPage(isShow: boolean): void{
    console.log("xx")
    this.$store.commit("SHOW_PLAYPAGE",isShow);
  }
  
}
</script>

<style scoped>
.wrap{
    z-index: 50;
    width: 100%;
    height: 50px;
    position:fixed;
    bottom: 0;
    background-color: red;
}
</style>
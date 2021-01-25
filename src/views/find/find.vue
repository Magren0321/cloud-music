<template>
  <div class="wrap">
    <banner></banner>
    <find-nav></find-nav>
    <recommended-playlist></recommended-playlist>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import banner from './components/banner.vue'
import findNav from './components/findNav.vue'
import recommendedPlaylist from './components/recommendedPlaylist.vue';
@Component({
  components: {
    banner,
    findNav,
    recommendedPlaylist,
  },
})
export default class Find extends Vue {
  
}
</script>

<style scoped>
.wrap{
}
</style>

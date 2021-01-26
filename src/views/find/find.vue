<template>
  <div class="wrap">
    <banner></banner>
    <find-nav></find-nav>
    <recommended-playlist></recommended-playlist>
    <ranking-list></ranking-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import banner from './components/banner.vue'
import findNav from './components/findNav.vue'
import recommendedPlaylist from './components/recommendedPlaylist.vue';
import rankingList from './components/rankingList.vue';

@Component({
  components: {
    banner,
    findNav,
    recommendedPlaylist,
    rankingList,
  },
})
export default class Find extends Vue {
  
}
</script>

<style scoped>

</style>

<template>
  <v-app>
    <v-main>
      <router-view v-show="!this.$store.state.showPlayPage">
      </router-view>
      <play-page v-show="this.$store.state.showPlayPage"></play-page>
      <play-tab v-show="$store.getters.SONG_ID!=0&&this.$store.getters.SHOW_PLAYPAGE==false"></play-tab>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import playPage from '@/components/playPage.vue'
import playTab from '@/components/playTab.vue'
export default Vue.extend({
  components: {
    playPage,
    playTab,
  },

  data: () => ({
    
  }),
  methods:{
    
  },
});
</script>
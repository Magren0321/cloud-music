<template>
  <v-app>
    <v-main>
      <router-view v-show="!this.$store.getters.SHOW_PLAYPAGE">
      </router-view>
      <play-page v-show="this.$store.getters.SHOW_PLAYPAGE"></play-page>
      <play-tab v-show="$store.getters.SHOW_SONGTAB&&!this.$store.getters.SHOW_PLAYPAGE"></play-tab>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import playPage from '@/views/playPage/playPage.vue'
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
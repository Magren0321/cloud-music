<template>
  <v-app>
    <v-main>
      <router-view v-show="!this.$store.state.showPlayPage">
      </router-view>
      <play-page v-show="this.$store.state.showPlayPage"></play-page>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import playPage from '@/components/playPage.vue'
export default Vue.extend({
  components: {
    playPage
  },

  data: () => ({
    //
  }),
});
</script>
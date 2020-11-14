<template>
  <v-app>
    <v-main>
      <Home></Home>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from '@/views/Home.vue'
export default Vue.extend({
  components: {
    Home
  },

  data: () => ({
    //
  }),
});
</script>

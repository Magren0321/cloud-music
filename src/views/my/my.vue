<template>
  <div>
    <my-head></my-head>
    <my-nav></my-nav>
    <my-songlist></my-songlist>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import myNav from './components/myNav.vue';
import myHead from './components/myHead.vue'
import mySonglist from './components/mySonglist.vue'

@Component({
  components: {
    myNav,
    myHead,
    mySonglist,
  },
})
export default class My extends Vue {
  
}
</script>

<style scoped>

</style>

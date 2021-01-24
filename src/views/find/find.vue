<template>
  <div class="wrap">
    <banner></banner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import banner from './components/banner.vue'
@Component({
  components: {
    banner
  },
})
export default class Find extends Vue {
  
}
</script>

<style scoped>

</style>

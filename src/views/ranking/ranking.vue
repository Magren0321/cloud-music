<template>
  <div>
    xxx
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api/index';

@Component({
  components: {
    
  },
})
export default class Ranking extends Vue {
  mounted(){
    api.getTopListDetail().then((res: any)=>{
      console.log(res)
    })
  }
}
</script>

<style scoped>
</style>

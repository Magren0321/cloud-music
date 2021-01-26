<template>
  <div class="wrap">
      <div class="title">
          <p>排行榜</p>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api/index';

@Component
export default class RankingList extends Vue {
  
  mounted(){
      api.getTopListDetail().then((res: any)=>{
          console.log(res)
      })
  }
}
</script>

<style scoped>
.wrap{
  width:95%;
  margin-left: 2.5%;
  background-color: #fff;
  border-radius: 20px;
  margin-top: 10px;
}
p{
  margin: 0;
}
.title p{
  padding: 5px 0 0 8px;
  font-size: 18px;
  font-weight: bold;
}
</style>

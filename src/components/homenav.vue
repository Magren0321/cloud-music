<template>
  <div class="wrap">
    <div class="bulleted">
      <v-icon medium>mdi-format-list-bulleted</v-icon>
    </div>
     <ul class="nav-list">
      <li>我的</li>
      <li>发现</li>
      <li>视频</li>
    </ul>
    <div class="magnify">
      <v-icon medium>mdi-magnify</v-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Homenav extends Vue {
  
}
</script>

<style scoped>
.wrap{
  display: flex;
  width: 10 0%;
}
.bulleted{
  margin-left: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  flex: 3;
}
.nav-list{
  list-style: none;
  flex: 6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left:0;
}
.nav-list li{
  display: inline;
  line-height: 50px;
  float:left;
  color:#969292;
}
.magnify{
  margin-right: 10px;
  flex:3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
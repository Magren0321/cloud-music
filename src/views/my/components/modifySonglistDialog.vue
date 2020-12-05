<template>
  <div class="wrap">
    <div v-for="item in choose" :key="item.id" class="btdiv">
        <div class="bt">
          <p>{{item.name}}</p>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api/index';

@Component({
  components: {
    
  },
})
export default class ModifySonglistDialog extends Vue {
  choose = [
    {
      name:'分享',
      id:1
    },
    {
      name:'编辑歌单信息',
      id:2
    },
    {
      name:'删除',
      id:3
    }
  ]
  
}
</script>

<style scoped>
.wrap{
  background: #fff;
  position: fixed;
  border-radius: 10px 10px 0px 0px;
  left: 0;
  bottom: 0;
}
.btdiv:first-child{
  margin-top:10px;
}
.btdiv:last-child{
  margin-bottom: 10px;
}
.bt{
  margin-left: 10px;
  height: 45px;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #BEBEBE;
}
.bt p{
  color: #000;
  line-height: 45px;
}

</style>

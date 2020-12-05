<template>
  <div>
      <div>
        <div class="tab">
          <v-icon large @click="returnPage()">mdi-arrow-left</v-icon>
          <p>{{title}}</p>
        </div>
      </div>
      <div>
        
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class SongListInfo extends Vue {
  title = "歌单"

  returnPage(){
    this.$router.go(-1);
  }
  
  mounted () {
    console.log(this.$route.params.id)
  }
}
</script>

<style scoped>
.tab{
  display: flex;
  height: 40px;
}
.tab p{
  line-height: 40px;
  margin-left: 10px;
  font-weight: bold;
  font-size: 21px;
}
</style>

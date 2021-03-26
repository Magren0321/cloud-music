<template>
  <div class="wrap">
    <v-carousel
    hide-delimiters
    show-arrows-on-hover
    :show-arrows="false"
    height="100%"
  >
    <v-carousel-item
      v-for="(item, i) in banner"
      :key="i"
    >
        <div class="bannerImg" @click="clickBanner(i)">
            <img :src="item.pic">
        </div>
    </v-carousel-item>
  </v-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api/index';

@Component
export default class Banner extends Vue {
    banner = [];
    isActive = false;
    //获取banner数据
    mounted(){
      api.getBanner().then((res:any)=>{
        this.banner = res.data.banners; 
      })
    }
    //点击banner触发事件
    clickBanner(index: number): void{
        if((this.banner[index] as any).url!= null){
            const url: string = (this.banner[index] as any).url;
            window.location.href = url;
        }else if((this.banner[index] as any).song!= null){
            this.$store.commit("SONG_ID",(this.banner[index] as any).song.id);
        }else{
            console.log('这是个mv')
        }
    }
}
</script>

<style scoped>
.wrap{
    padding-top: 55px;
}
.bannerImg{
    display: flex;
    justify-content: center; 
    align-items: center;
}
.bannerImg img{
    width: 95%;
    border-radius: 15px;
}
</style>

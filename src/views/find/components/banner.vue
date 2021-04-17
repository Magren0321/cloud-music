<template>
  <div class="wrap" :style={height:divHeight}>
    <v-carousel
    hide-delimiters
    show-arrows-on-hover
    cycle
    :show-arrows="false"
    height="100%"
  >
    <v-carousel-item
      v-for="(item, i) in banner"
      :key="i"
    >
        <div class="bannerImg" @click="clickBanner(i)" > 
            <img :src="item.pic" ref="bimg">
        </div>
    </v-carousel-item>
  </v-carousel>
  </div>
</template>

<script lang="ts">
import { Component,  Prop,  Vue } from 'vue-property-decorator';

@Component
export default class Banner extends Vue {
    
    @Prop()
    banner: any;

    divHeight = ''

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

    created(){
       setTimeout(() => {
          this.$nextTick(() => {
            this.divHeight = (this.$refs.bimg as HTMLElement[])[0].offsetHeight+'px';
          })
      },100)
    }
}
</script>

<style scoped>
.wrap{
  margin-top: 50px;
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


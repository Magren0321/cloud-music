<template>
    <div class="lyric"  @click="$store.commit('SHOW_LYRIC',false)">
    <div class="noLyric" v-if="noLyric">
        <p>暂无歌词</p>
    </div>
    <ul :style="{marginTop: marginTop}" v-else>
      <li
        v-for="(item, index) in lyricArray"
        :key="index"
        :class="{active: index === nowLyricIndex}"
      >{{item}}</li>
    </ul>
    </div>
</template>

<script lang="ts">
import {  Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component
export default class Lyric extends Vue {
    @Prop()
    lyric!: string;

    noLyric = true;
    marginTop = '0rem';
    nowLyricIndex = 0;
    lyricArray: any = [];

    //监听父组件传来的歌词
    @Watch('lyric',{deep: true,immediate: true})
    getLyric(){
      if(this.lyric == ''){
        this.noLyric = true;
      }else{
        this.noLyric = false;
        this.transformArray(this.lyric);
      }
    }
    //将歌词字符串转换成时间、歌词对象
    transformArray(lyric: string){
      const LyricParts = lyric.split('\n');
      for (let index = 0; index < LyricParts.length; index++) {
        const part = LyricParts[index];
        this.lyricArray.push(this.changeToObject(part))
      }
    }
    //转换成对象
    changeToObject (str: string) {
      const words = str.split(']')[1];
      // 正则返回时间信息
      const reg = /\w{0,}:\w{0,}.\w{0,}/g;
      let timeArray: any = reg.exec(str);
      if (!timeArray) {
        return;
      }
      timeArray = timeArray[0].split(':');
      const minute = parseInt(timeArray[0]); // 分钟数
      const second = parseFloat(timeArray[1]); // 秒数
      const time = minute * 60 + second;
      return {
        time,
        words
      }
    }

}
</script>

<style scoped>
.lyric{
    height: 100%;
    width: 100vh;
}
.noLyric{
  display: flex;
  justify-content: center; 
  align-items: center;
  height: 100%;
  color: #A3A1A1;
}
</style>

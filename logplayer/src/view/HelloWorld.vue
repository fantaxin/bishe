<!--
 * @Author: fantasy 820438873@qq.com
 * @Date: 2023-04-22 14:03:51
 * @LastEditors: fantasy 820438873@qq.com
 * @LastEditTime: 2023-04-23 22:43:28
 * @FilePath: \logplayer\src\view\HelloWorld.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="aaa">
    <div class="top">
      <!-- 此处做一个渐变暗的效果 -->
    </div>
    <div class="mid">
      <div class="">
        <!-- 当前的比赛时间，比赛状态，比分等 -->
      </div>
      <div class="">
      </div>
    </div>
    <div div class="bottom">
      <!-- 此处做一个渐变暗的效果 -->
      <div class="ctrl-top">
        <el-slider v-model="value" :min="min" :max="max" :marks="marks" :format-tooltip="timeFormat" />
      </div>
      <div class="ctrl-bottom">
        <div class="player-state">
          <!-- 小的播放状态图标 -->
          <div v-if="isPlaying" class="btn-control btn-pause" @click="pause">
            <!-- <i class="iconfont icon-kaishi"></i> -->
            <i>pause</i>
          </div>
          <div v-else class="btn-control btn-play" @click="play">
            <i>play</i>
          </div>
        </div>
        <div>
          <!-- 当前时间/总时长 -->
          <span class="time-current">{{ timeFormat(value) }}</span>
          <span class="time-split"> / </span>
          <span class="time-duration">{{ timeFormat(max) }}</span>
        </div>
        <!-- 跳转（下一个进球点） -->
        <div @click="nextGoal">
          <i>next</i>
        </div>
        <!-- 倍速 -->
        <!-- 全屏 -->
      </div>
    </div>
  </div>
  <el-icon :size="20" @click="click1" id="icon">
    <Edit />
  </el-icon>
</template>

<script>
import { h } from 'vue'
export default {
  name: 'HelloWorld',

  data() {
    return {
      isPlaying: true,
      value: 0,
      min: 0,
      max: 3600,
      marks: {
        1200: {},
        2037: {
          style: {
            color: '#006AFF',
          },
          //label: this.createLabel(2037)
          //label: h('i', { class: 'iconfont icon-yundongzuqiu', id: "label", onClick: () => { this.value = 2037 } })
        },
      }
    }
  },
  mounted() {
    this.createLabel();
    //this.click1();
  },

  methods: {
    click1() {
      console.log("123123")
      Object.keys(this.marks).forEach(key => {
        Object.assign(this.marks[key], { label: h('i', { class: 'iconfont icon-yundongzuqiu', onClick: this.click(1500) }) });
        //this.marks[key] = {style: { color: '#006AFF'}, label: h('i', { class: 'iconfont icon-yundongong', onClick: this.click(value) })};
      })
    },
    createLabel() {
      Object.keys(this.marks).forEach(key => {
        Object.assign(this.marks[key], { label: h('i', { class: 'iconfont icon-yundongzuqiu', onClick: () => { this.value = Number.parseInt(key) } }) });
      })
    },
    click(value) {
      this.value = value;
    },
    timeFormat(val) {
      let h = Math.floor(val / 3600);
      let m = Math.floor((val % 3600) / 60);
      let s = Math.floor(val % 60);

      return this.numberFormat(h) + ':' + this.numberFormat(m) + ':' + this.numberFormat(s);
    },
    numberFormat(val) {
      if (val < 10) {
        return '0' + val;
      } else {
        return val;
      }
    },
    pause() {
      this.isPlaying = false;
    },
    play() {
      this.isPlaying = true;
    },
    nextGoal() {
      // TODO: 循环，到达最后一个时刻后回到第一个时刻 
      let nextTime = this.max;
      let firstTime = this.max;
      Object.keys(this.marks).forEach(key => {
        let time = Number.parseInt(key);
        if (this.value < time) {
          nextTime = nextTime > time ? time : nextTime;
        }
        firstTime = firstTime > time ? time : firstTime;
      })
      if (nextTime === this.max) {
        this.value = firstTime;
      } else {
        this.value = nextTime;
      }
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

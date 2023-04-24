<template>
  <div class="ctrl">
    <div class="ctrl-top">
      <!-- 此处做一个渐变暗的效果 -->
    </div>
    <div class="ctrl-mid">
      <div class="">
        <!-- 当前的比赛时间，比赛状态，比分等 -->
      </div>
      <!-- loading... -->
      <div class="">
      </div>
    </div>
    <div class="ctrl-bottom">
      <!-- 此处做一个渐变暗的效果 -->
      <div class="ctrl-bar">

        <div class="bar-left">
          <div class="player-state">
            <!-- 小的播放状态图标 -->
            <div v-if="isPlaying" class="btn-pause" @click="pause">
              <!-- <i class="iconfont icon-kaishi"></i> -->
              <i>pa</i>
            </div>
            <div v-else class="btn-play" @click="play">
              <i>pl</i>
            </div>
          </div>
          <!-- 跳转（下一个进球点） -->
          <div class="pre-goal" @click="getGoalTime(false)">
            <i>p</i>
          </div>
          <div class="next-goal" @click="getGoalTime(true)">
            <i>n</i>
          </div>
          <div class="left player-time">
            <!-- 当前时间 -->
            <span class="time-current">{{ timeFormat(value) }}</span>
          </div>
        </div>

        <div class="bar-mid">
          <el-slider v-model="value" :min="min" :max="max" :marks="marks" :format-tooltip="timeFormat" size="small" style="color: #222222" @input="sliderInput" @change="sliderChange"/>
        </div>

        <div class="bar-right">
          <!-- 倍速 -->
          <div class="player-speed">
            <i>bs</i>
          </div>
          <!-- 全屏 -->
          <div class="player-full">
            <i>qp</i>
          </div>
          <div class="right player-time">
            <!-- 总时长 -->
            <span class="time-duration">{{ timeFormat(max) }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
<!--  <el-icon :size="20" @click="click1" id="icon">-->
<!--    <Edit />-->
<!--  </el-icon>-->
</template>

<script>
import { h } from 'vue'

let sliderBtn;

export default {
  name: 'HelloWorld',

  data() {
    return {
      isPlaying: true,
      value: 0,
      min: 0,
      max: 3599,
      marks: {
        1200: {},
        2037: {
          style: {
            color: '#006AFF',
          },
        },
      }
    }
  },
  mounted() {
    this.createSliderLabel();
    this.changeSliderBtnStyle();
    //this.click1();
  },

  methods: {
    playerStateChange(){

    },
    playerTimeChange(){

    },
    playerSpeedChange(){

    },
    playerFull(){

    },
    pause() {
      this.isPlaying = false;
    },
    play() {
      this.isPlaying = true;
    },
    sliderInput() {
      sliderBtn.style.opacity = 1;
    },
    sliderChange(){
      sliderBtn.style.opacity = 0;
    },
    createSliderLabel() {
      Object.keys(this.marks).forEach(key => {
        Object.assign(this.marks[key], { label: h('i', { class: 'iconfont icon-yundongzuqiu', onClick: () => { this.value = Number.parseInt(key) } }) });
      })
    },
    changeSliderBtnStyle() {
      sliderBtn = document.getElementsByClassName("el-slider__button")[0];
      sliderBtn.style.opacity = 0;
      sliderBtn.style.width = "10px";
      sliderBtn.style.height = "10px";
      sliderBtn.style.borderColor = "#9b4e4e"
    },
    getGoalTime(isNext) {
      let firstGoal = this.max;
      let lastGoal = this.min;
      let preGoal = this.min;
      let nextGoal = this.max;
      Object.keys(this.marks).forEach(key => {
        let time = Number.parseInt(key);
        if (this.value < time) {
          nextGoal = nextGoal < time ? nextGoal : time;
        }else if(this.value > time){
          preGoal = preGoal > time ? preGoal : time;
        }
        firstGoal = firstGoal < time ? firstGoal : time;
        lastGoal = lastGoal > time ? lastGoal : time;
      })
      nextGoal = nextGoal === this.max ? firstGoal : nextGoal;
      preGoal = preGoal === this.min ? lastGoal : preGoal;
      if (isNext) {
        this.value = nextGoal;
      } else {
        this.value = preGoal;
      }
    },
    timeFormat(val) {
      let h = Math.floor(val / 3600);
      let m = Math.floor((val % 3600) / 60);
      let s = Math.floor(val % 60);
      let res = "";
      if(h>=1){
        res += this.numberFormat(h) + ':';
      }
      return res + this.numberFormat(m) + ':' + this.numberFormat(s);
    },
    numberFormat(val) {
      if (val < 10) {
        return '0' + val;
      } else {
        return val;
      }
    },
  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ctrl {
  width: 90vw;
  height: 90vh;
  display:inline-block;
  border-style: solid;
}

.ctrl-bottom {
  position: absolute;
  width: inherit;
  bottom: 0;
}
.ctrl-bar {
  width: 100%;
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  grid-gap: 5px;
  position: relative;
}
.bar-left {
  display: grid;
  grid-template-columns: 40% 30% 30%;
  grid-template-rows: 60% 40%;
  grid-gap: 1px;
  position: relative;
}
.player-state {
  grid-row: 1 / 2;
  grid-column: 1;
}
.pre-goal{
  grid-row: 1;
  grid-column: 2;
}
.next-goal {
  grid-row: 1;
  grid-column: 3;
}
.left.player-time {
  grid-row: 2;
  grid-column: 2 / 3;
}

.bar-right {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 60% 40%;
  grid-gap: 1px;
  position: relative;
}
.player-speed {
  grid-row: 1;
  grid-column: 1;
}
.player-full {
  grid-row: 1;
  grid-column: 2;
}
.right.player-time {
  grid-row: 2;
  grid-column: 1 / 2;
}


.player-time {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
/deep/ .el-slider__bar{
  background-color: #ff4bba;
}


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

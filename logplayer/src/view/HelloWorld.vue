<!--
 * @Author: fantasy 820438873@qq.com
 * @Date: 2023-04-22 14:03:51
 * @LastEditors: fantasy 820438873@qq.com
 * @LastEditTime: 2023-04-23 00:44:15
 * @FilePath: \logplayer\src\view\HelloWorld.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="aaa">
    <div class="top">
      <!-- 此处做一个渐变暗的效果 -->
    </div>
    <div class="playstate">

    </div>
    <div div class="bottom">
      <!-- 此处做一个渐变暗的效果 -->
      <div class="ctrol">
        <div class="ctrol-top">
          <el-slider v-model="value" :min="min" :max="max" :marks="marks" :format-tooltip="formatTooltip" />
        </div>
        <div class="ctrol-bottom">
          <!-- 小的播放状态图标 -->
          <!-- 当前时间/总时长 -->
          <!-- 跳转（下一个进球点） -->
          <!-- 倍速 -->
          <!-- 全屏 -->
        </div>
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
  },

  methods: {
    click1() {
      console.log("123123")
      //Object.assign(this.marks["1200"], { label: h('i', { class: 'iconfont icon-yundongzuqiu' }) })
      //this.marks["1200"].label = h('i', { class: 'iconfont icon-yundongzuqiu' })
      //document.getElementById("label") = document.getElementById("icon").cloneNode(true);
      Object.keys(this.marks).forEach(key => {
        //console.log(this.marks[key]);
        Object.assign(this.marks[key], { label: h('i', { class: 'iconfont icon-yundongzuqiu' }) });
        //this.marks[key] = {style: { color: '#006AFF'}, label: h('i', { class: 'iconfont icon-yundongong', onClick: this.click(value) })};
      })
    },
    createLabel() {
      Object.keys(this.marks).forEach(key => {
        console.log(key);
        Object.assign(this.marks[key], { label: h('i', { class: 'iconfont icon-yundongongzuqiu' }) });
        //this.marks[key] = {style: { color: '#006AFF'}, label: h('i', { class: 'iconfont icon-yundongong', onClick: this.click(value) })};
      })
      //return h('i', { class: 'iconfont icon-yundongong', onClick:this.click(value)});
    },
    click(value) {
      this.value = value;
    },
    formatTooltip(val) {
      let h = Math.floor(val / 3600);
      let m = Math.floor((val % 3600) / 60);
      let s = Math.floor(val % 60);
      return h + ':' + m + ':' + s;
    },
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

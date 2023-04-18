<template>
  <div class="hello">
    <el-slider v-model="value" :min="min" :max="max" :marks="marks" />
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
      msg: '1111',
      value: 0,
      min: 0,
      max: 101,
      marks: {
        12: '111',
        37: {
          style: {
            color: '#FF0000',
          },
          //label: h('i', { class: 'el-icon-football', onClick: () => { this.value = 37 } })
          label: h('i', { class: 'el-icon-football', id: "label", onClick: () => { this.value = 37 } }, "111")
        },
      }
    }
  },

  methods: {
    click1() {
      console.log("123123")
      this.marks["12"] = "1212"
      document.getElementById("label") = document.getElementById("icon").cloneNode(true);
    }
  }
};

function click2(e) {
  console.log("123123")
}
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

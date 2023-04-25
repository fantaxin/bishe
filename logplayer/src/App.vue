<template>
  <HelloWorld />
  <Test />
</template>

<script>
import ThreeTest from './view/ThreeTest.vue'
import PlayerP from './view/PlayerP.vue'
import HelloWorld from './view/HelloWorld.vue'
import Test from './view/Test.vue'

export default {
  name: 'App',
  components: {
    //Dashboard
    HelloWorld,
    Test
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <PlayerP/>
  <ThreeTest/>
</template>

<script>
import PlayerP from './view/PlayerP.vue'
import ThreeTest from './view/ThreeTest.vue'

export default {
  name: 'App',
  components: {
    PlayerP,
    ThreeTest
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

<template>
  <Dashboard :controls="true" :muted="true" />
</template>

<script>
import ThreeTest from './view/ThreeTest.vue'
import PlayerP from './view/PlayerP.vue'
import Dashboard from './player/dashboard/dashboard.vue'

export default {
  name: 'App',
  components: {
    Dashboard
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

<template>
  <PlayerCtrl />
  <PlayerMedia />
</template>

<script>
import PlayerMedia from './view/PlayerMedia.vue'
import PlayerP from './view/PlayerP.vue'
import PlayerCtrl from './view/PlayerCtrl.vue'
import Test from './view/Test.vue'

export default {
  name: 'App',
  components: {
    //Dashboard
    PlayerCtrl,
    PlayerMedia
    //Test
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

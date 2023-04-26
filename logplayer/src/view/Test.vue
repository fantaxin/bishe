<template>
  <div>{{isPlaying}}</div>
</template>

<script>
export default {
  name: "Test",
  data(){
    return{
      isPlaying: this.$store.state.isPlaying,
    }
  },
  methods:{
    plyingStateChanged(newData, oldData){
      if(newData!==oldData){
        this.isPlaying = newData;
      }
    }
  },
  computed:{
    ddd(){
      return this.$store.state.isPlaying;
    }
  },
  watch:{
    ddd (newData, oldData){
      console.log(newData)
      console.log(oldData)
      this.plyingStateChanged(newData, oldData);
    }
  }
}
</script>

<style scoped>

</style>

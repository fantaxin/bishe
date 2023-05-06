<template>
  <div>
    <input type="file" ref="clearFile" @change="getFile($event)" accept=".replay">
  </div>
</template>

<script>

import request from "@/js/util/Request";
import axios from "axios";

export default {
  name: "Test",
  data(){
    return{

    }
  },
  methods: {
    getFile(event){
      let files = event.target.files;
      this.submitAddFile(files[0]);
    },
    submitAddFile(file){
      let formData = new FormData();
      formData.append('filename',"testfile.replay");
      formData.append('file',file);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': this.token
        }
      };
      axios.get("http://localhost:8080/log-player/DownloadFile/RoboCup/2014/Round3/GroupH/201407231259-tokA1_6-vs-Enigma_0.replay",{responseType: 'blob'}).then(
          (res)=>{
            let blob = new Blob([res.data]);
            blob.text().then(json=>{
              console.log(1);
            })
          }
      )
      // axios.post("http://localhost:8080/log-player/playFile",formData,config).then(
      //     (res)=>{
      //       const url = window.URL.createObjectURL(new Blob([res.data]))
      //       const link = document.createElement('a')
      //       link.style.display = 'none'
      //       link.href = url
      //       link.setAttribute('download', 'testfile.json.gz') // 指定下载后的文件名，防跳转
      //       document.body.appendChild(link)
      //       link.click()
      //     }
      // )
    }
  }

}
</script>

<style scoped>

</style>

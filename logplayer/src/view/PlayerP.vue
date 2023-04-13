<template>
  <el-upload class="avatar-uploader" ref="upload" action :on-change="handleChange" :file-list="fileList"
    :auto-upload="false" show-file-list="false">
    <el-button type="primary">Click to upload</el-button>
  </el-upload>
  <p v-text="123"></p>
</template>
<script>
export default {
  name: "PlayerP",
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    handleChange(file, fileList) {
      console.log(file, fileList);
    },
  }
}
</script>

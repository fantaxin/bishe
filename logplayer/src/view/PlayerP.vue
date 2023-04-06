<template>
  <div>
    <el-upload action="" class="upload-demo" ref="upload" :on-change="handleChange" :auto-upload="false" :limit="1">
      点击上传
    </el-upload>
  </div>
</template>
<script>
function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
  console.log(fileList[0].name);
}
</script>

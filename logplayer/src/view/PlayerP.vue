<template>
  <div>
    <input type="file" id="fileInput" accept=".replay" onchange="" />
  </div>
</template>
<script>
const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
}
</script>

<template>
  <div class="logout">
    <h2 style="color:pink">Cerrando sesion...</h2>
    <v-progress-linear style="width:400px" color="pink darken-1" :indeterminate="true"></v-progress-linear>
  </div>
</template>

<script>
export default {
  created() {
    localStorage.clear();
    window.location = "/";
  }
};
</script>


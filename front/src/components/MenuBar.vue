<template>
  <v-toolbar color="pink darken-1" dark>
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <span>
        CRUD MEVN
        <v-icon>person</v-icon>USERS
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logoutGO" v-if="isLogged()" outline color="white" dark>Cerrar sesión</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    isLogged() {
      return localStorage.getItem("loginStatus");
    },
    logoutGO() {
      window.location = "/logout";
    }
  }
};
</script>


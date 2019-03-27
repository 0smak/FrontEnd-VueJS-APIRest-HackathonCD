<template>
  <v-app>
    <v-content>
      <menuBar/>

      <signIn/>
      <userList/>
    </v-content>
  </v-app>
</template>

<script>
import menuBar from "./components/MenuBar";
import signIn from "./components/signIn";
import userList from "./components/userList";
export default {
  name: "App",
  components: {
    menuBar: menuBar,
    userList: userList,
    signIn: signIn
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>

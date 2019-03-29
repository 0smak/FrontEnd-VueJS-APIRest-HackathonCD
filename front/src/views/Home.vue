<template>
  <v-app>
    <v-content>
      <menuBar/>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <signIn/>
            <userList v-if="estaLogeado"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import menuBar from "@/components/MenuBar.vue";
import signIn from "@/components/signIn.vue";
import userList from "@/components/userList.vue";
import { estaLogeado } from "@/controllers/login-bool";

export default {
  name: "home",
  components: {
    menuBar,
    signIn,
    userList
  },
  return(){
    estaLogeado
  }
};
</script>

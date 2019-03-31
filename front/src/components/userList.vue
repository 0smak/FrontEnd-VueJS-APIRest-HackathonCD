<template>

  <v-list two-line>
    <template v-for="(user, index) in users">
      <v-list-tile :key="index" avatar>
        <v-list-tile-avatar>
          <v-img :src="getImg(user.profilePic)"></v-img>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{user.nombre}} {{user.apellidos}} <span class="pink--text darken-1--text atusername">@{{user.username}}</span></v-list-tile-title>
          <v-list-tile-sub-title >Registrado <timeago :datetime="user.signUpDate" locale="es-ES"></timeago></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import axios from "axios";
import apiConfig from "@/controllers/api-config"
export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    async getUsers() {
      await axios
        .get(`${apiConfig.url}users`)
        .then(response => {
          this.users = response.data.users;
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log("error: " + e);
        });
    },
    getImg(pic){
      return require('../assets/'+pic)
    }
  },
  created() {
    this.getUsers();
  }
};
</script>

<style>
  span.atusername{
    font-size: 14px;
  }
</style>


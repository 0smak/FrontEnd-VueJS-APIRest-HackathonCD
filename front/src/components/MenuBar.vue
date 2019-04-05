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

      <template v-if="isLogged()">
        <div class="text-xs-center">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <template v-slot:activator="{ on }">
              <v-list-tile-avatar v-on="on">
                <v-img :src="getImg(usuario.profilePic)"></v-img>
              </v-list-tile-avatar>
            </template>

            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <v-img :src="getImg(usuario.profilePic)"></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{usuario.nombre}} {{usuario.apellidos}}</v-list-tile-title>
                    <v-list-tile-sub-title class="pink--text text--darken-1">@{{usuario.username}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                </v-list-tile>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                
                <updateUsers/>                

                <v-list-tile @click="logoutGO()" @mouseover="mOver2=true" @mouseout="mOver2=false" :class="{'pink--text': mOver2}">
                  <v-list-tile-action>
                    <v-icon size="30px" :class="{'pink--text': mOver2}">power_settings_new</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>Cerrar sesión</v-list-tile-title>
                </v-list-tile>
                
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </template>


  </v-toolbar>
</template>

<script>
import axios from "axios";
import apiConfig from "@/controllers/api-config";
import updateUsers from "@/components/updateUsers.vue";

export default {
  data(){
    return {
      menu: false,
      message: false,
      hints: true,
      usuario: [],
      username: "",
      nombre: "",
      apellidos: "",
      id: "",
      mOver: false,
      mOver2:false
    }
  },
  components: {
    updateUsers
  },
  methods: {
    isLogged() {
      return localStorage.getItem("loginStatus");
    },
    logoutGO() {
      window.location = "/logout";
    },
    usernameLogged(){
      return localStorage.getItem("username")
    },
    async getUserLogged(){
      var uname = this.usernameLogged()
      await axios
        .get(`${apiConfig.url}user/u/${uname}`)
        .then(res => {
          this.usuario = res.data.user;
          // eslint-disable-next-line no-console
          console.log("uname: " + this.usuario.username);
          this.username = this.usuario.username;
          this.nombre = this.usuario.nombre;
          this.apellidos = this.usuario.apellidos;
          this.id = this.usuario._id;
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log("error: " + e);
        });
    },
    getImg(pic) {
      return require("../assets/" + pic);
    }
  },
  created(){
    this.getUserLogged();
  }
};
</script>


<template>
  <v-list two-line>
    <template v-for="(user, index) in users">
      <v-container grid-list-md :key="index">
        <v-layout row wrap>
          <v-flex md10 xs12>
            <v-list-tile :key="index" avatar>
              <v-list-tile-avatar>
                <v-img :src="getImg(user.profilePic)"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>
                  {{user.nombre}} {{user.apellidos}}
                  <span
                    class="pink--text darken-1--text atusername"
                  >@{{user.username}}</span>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  Registrado
                  <timeago :datetime="user.signUpDate" locale="es-ES"></timeago>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-flex>
          <v-flex md2 xs12 style="display:inline;" text-xs-center>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-btn v-on="on" color="pink darken-1" outline>
                  <v-icon>delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar usuario</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </v-list>
</template>

<script>
import axios from "axios";
import apiConfig from "@/controllers/api-config";
export default {
  data() {
    return {
      users: [],
      dialog: false,
      valid: true,
      usuarioEdit: [],
      username: "",
      usernameRules: [v => !!v || "Introduce tu nombre de usuario"],
      nombreRules: [v => !!v || "Introduce tu nombre"],
      apellidosRules: [v => !!v || "Introduce tu apellido"],
      show1: false,
      password: "",
      nombre: "",
      id:"",
      apellidos: "",
      rules: {
        required: value => !!value || "Contraseña incorrecta.",
        min: v => v.length >= 3 || "La contraseña debe ser mayor a 3 carácteres"
      }
    };
  },
  methods: {
    async getUser(id) {
      // eslint-disable-next-line no-console
      console.log("id: " + id);
      await axios
        .get(`${apiConfig.url}user/${id}`)
        .then(res => {
          this.usuarioEdit = res.data.user;
          // eslint-disable-next-line no-console
          console.log("uname: " + this.usuarioEdit.username);
          this.username = this.usuarioEdit.username;
          this.nombre = this.usuarioEdit.nombre;
          this.apellidos = this.usuarioEdit.apellidos;
          this.id = this.usuarioEdit._id;
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log("error: " + e);
        });
    },
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
    getImg(pic) {
      return require("../assets/" + pic);
    }
  },
  created() {
    this.getUsers();
  }
};
</script>

<style>
span.atusername {
  font-size: 14px;
}
</style>


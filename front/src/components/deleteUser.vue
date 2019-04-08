<template>
  <v-dialog v-model="dialog" max-width="450">
    <template v-slot:activator="{ on }">
      <v-list-tile
        v-on="on"
        @mouseover="mOver=true"
        @mouseout="mOver=false"
        :class="{'pink--text': mOver}"
      >
        <v-list-tile-action>
          <v-icon size="30px" :class="{'pink--text': mOver}">delete</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Eliminar usuario</v-list-tile-title>
      </v-list-tile>
    </template>
    <v-card>
      <v-card-title class="headline">¿Deseas eliminar a {{username}} de la lista de usuarios?</v-card-title>
      <v-card-text>El borrado será lógico, se mantendra en la base de datos pero no podras iniciar sesión ni ver el usuario en la lista.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-2" flat @click="dialog = false">Cancelar</v-btn>
        <v-btn color="pink darken-1" flat @click="this.deleteUser">Eliminar usuario</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import apiConfig from "@/controllers/api-config";

export default {
  data() {
    return {
      dialog: false,
      mOver: false,
      username: "",
      id: ""
    };
  },
  components: {},
  methods: {
    async getUser() {
      var uname = this.usernameLogged();
      await axios
        .get(`${apiConfig.url}user/u/${uname}`)
        .then(res => {
          this.usuario = res.data.user;
          this.username = this.usuario.username
          this.id = this.usuario._id
          this.isDeleted = this.usuario.isDeleted
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log("error: " + e);
        });
    },
    usernameLogged() {
      return localStorage.getItem("username");
    },
    async deleteUser() {
        var id = this.id;
        await axios
        .put(`${apiConfig.url}user/${id}`, {
          isDeleted: true
        })
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res);
          this.dialog = false;
          window.location = "/logout";
        })
        .catch(e => {
          //eslint-disable-next-line no-console
          console.log("Error: " + e);
        });
    }
  },
  created() {
    this.getUser();
  }
};
</script>

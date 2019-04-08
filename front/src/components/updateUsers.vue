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
          <v-icon size="30px" :class="{'pink--text': mOver}">edit</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Editar usuario</v-list-tile-title>
      </v-list-tile>
    </template>
    <v-card>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-title
          dark
          class="headline pink darken-1"
          style="color:white"
          primary-title
        >Editar usuario: {{username}}</v-card-title>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  value="this.user.username"
                  v-model="username"
                  :rules="usernameRules"
                  label="Nombre de usuario"
                  color="pink darken-1"
                  v-on:keyup.enter="validate"
                  required
                ></v-text-field>

                <v-text-field
                  value="this.user.nombre"
                  v-model="nombre"
                  label="Nombre"
                  :rules="nombreRules"
                  color="pink darken-1"
                  v-on:keyup.enter="validate"
                  required
                ></v-text-field>

                <v-text-field
                  value="this.user.apellidos"
                  v-model="apellidos"
                  label="Apellidos"
                  color="pink darken-1"
                  :rules="apellidosRules"
                  v-on:keyup.enter="validate"
                  required
                ></v-text-field>
                
                          <v-text-field
                            v-model="password"
                            :append-icon="show1 ? 'visibility' : 'visibility_off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="passwd"
                            counter
                            v-on:keyup.enter="validate"
                            color="pink darken-1"
                            label="Contraseña"
                            @click:append="show1 = !show1"
                          ></v-text-field>
                
              </v-card-text>
            </v-flex>
            <v-flex xs12></v-flex>
          </v-layout>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" color="pink darken-1" flat @click="validate">Actualizar usuario</v-btn>
        </v-card-actions>
      </v-form>
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
      valid: true,
      mOver: false,
      usuarioEdit: [],
      username: "",
      usernameRules: [v => !!v || "Introduce tu nombre de usuario"],
      nombreRules: [v => !!v || "Introduce tu nombre"],
      apellidosRules: [v => !!v || "Introduce tu apellido"],
      show1: false,
      password: "",
      nombre: "",
      id: "",
      apellidos: "",
      selectedFile: null,
      rules: {
        required: value => !!value || "Contraseña incorrecta.",
        min: v => v.length >= 3 || "La contraseña debe ser mayor a 3 carácteres"
      }
    };
  },
  components: {},
  methods: {
    async getUser() {
      var uname = this.usernameLogged();
      await axios
        .get(`${apiConfig.url}user/u/${uname}`)
        .then(res => {
          this.usuarioEdit = res.data.user;
          // eslint-disable-next-line no-console
          console.log("uname: " + this.usuarioEdit.username);
          this.username = this.usuarioEdit.username;
          this.nombre = this.usuarioEdit.nombre;
          this.apellidos = this.usuarioEdit.apellidos;
          this.id = this.usuarioEdit._id;
          this.password = this.usuarioEdit.password
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log("error: " + e);
        });
    },
    getImg(pic) {
      return require("../assets/" + pic);
    },
    usernameLogged() {
      return localStorage.getItem("username");
    },
    async updateUser(id) {
      if (this.password == "" || this.password == null){
        this.password == this.usuarioEdit.password
      } 
      await axios
        .put(`${apiConfig.url}user/${id}`, {
          username: this.username,
          apellidos: this.apellidos,
          nombre: this.nombre,
          password: this.password
        })
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res);
          this.dialog = false;
          localStorage.removeItem("username");
          localStorage.setItem("username", this.username);
          window.location = "/";
        })
        .catch(e => {
          //eslint-disable-next-line no-console
          console.log("Error: " + e);
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.updateUser(this.id);
      }
    }
  },
  created() {
    this.getUser();
  }
};
</script>

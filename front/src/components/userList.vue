<template>
  <v-list two-line>
    <template v-for="(user, index) in users">
      <v-container grid-list-md :key="index">
        <v-layout row wrap>
          <v-flex md7 xs12>
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
          <v-flex md5 xs12 style="display:inline;" text-xs-center>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <template>
                  <v-dialog v-model="dialog" width="400">
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" @click="getUser(user._id)" color="pink darken-1" outline>
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card-title
                          dark
                          class="headline pink darken-1"
                          style="color:white"
                          primary-title
                        >Editar usuario: {{username}}</v-card-title>

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
                          <!--
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
                          -->
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            :disabled="!valid"
                            color="pink darken-1"
                            flat
                            @click="validate"
                          >Actualizar usuario</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </template>
              </template>
              <span>Editar usuario</span>
            </v-tooltip>
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
    },
    async updateUser(id) {
      await axios
        .put(`${apiConfig.url}user/${id}`, {
          username: this.username,
          apellidos: this.apellidos,
          nombre: this.nombre
        })
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res);
          this.dialog = false;
        })
        .catch(e => {
          //eslint-disable-next-line no-console
          console.log("Error: " + e);
        });
    },
    validate() {
      if (false!=true) {
        this.snackbar = true;
        this.updateUser(this.id);
      }
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


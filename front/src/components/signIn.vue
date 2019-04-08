<template>
  <div id="app">
    <div class="text-xs-center">
      <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ on }">
          <v-alert
            color="pink darken-1"
            outline
            :value="true"
            type="warning"
          >Inicia sesión para ver la lista de usuarios.</v-alert>
          <v-icon color="pink darken-1" size="256px">sentiment_very_dissatisfied</v-icon>
          <br>
          <v-btn outline color="pink darken-1" dark v-on="on">Iniciar sesión</v-btn>
        </template>

        <v-card>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title
              dark
              class="headline pink darken-1"
              style="color:white"
              primary-title
            >Iniciar sesión</v-card-title>

            <v-card-text>
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Nombre de usuario"
                color="pink darken-1"
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

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" color="pink darken-1" flat @click="validate">Iniciar sesión</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import apiConfig from "@/controllers/api-config";

export default {
  data: () => ({
    dialog: false,
    valid: true,
    username: "",
    usernameRules: [v => !!v || "Introduce tu nombre de usuario"],
    show1: false,
    password: "",
    rules: {
      required: value => !!value || "Contraseña incorrecta.",
      min: v => v.length >= 3 || "La contraseña debe ser mayor a 3 carácteres"
    },
    users: []
  }),

  methods: {
    async login() {
      axios
        .post(`${apiConfig.url}login`, {
          username: this.username,
          password: this.password
        })
        .then(response => {
          if (response.data.valid) {
            localStorage.setItem("loginStatus", true);
            localStorage.setItem("username", this.username);
            this.dialog = false;
            window.location = "/";
          }else if(!response.data.valid){
            localStorage.setItem("loginStatus", false);
            localStorage.removeItem("username");
            this.snackbar = false;
            this.password = "";
          }
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log("error: " + e);
        });

    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.login();
      }
    },
    reset() {
      this.$refs.form.reset();
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
    }
  },
  created() {
    this.getUsers();
  }
};
</script>
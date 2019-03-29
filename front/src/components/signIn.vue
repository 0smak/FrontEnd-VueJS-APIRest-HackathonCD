<template>
  <div id="app">
    <v-app id="inspire">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="username" :rules="usernameRules" label="Nombre de usuario" required></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="passwd"
          counter
          label="Contraseña"
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn @click="reset">Limpiar</v-btn>
        <v-btn :disabled="!valid" color="primary" @click="validate">Validate</v-btn>
      </v-form>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import apiConfig from "@/controllers/api-config";
import { estaLogeado } from "@/controllers/login-bool";

export default {
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [v => !!v || "Introduce tu nombre de usuario"],
    show1: false,
    password: "",
    rules: {
      required: value => !!value || "Necesitas introducir una contraseña.",
      min: v => v.length >= 3 || "La contraseña debe ser mayor a 3 carácteres"
    },
    users: []
  }),

  methods: {
    login() {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].username == this.username) {
          if (this.users[i].password == this.password) {
            estaLogeado = !estaLogeado;
          }
        }
      }
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
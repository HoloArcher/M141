<template>
  <v-app>
    <!-- <v-card square style="height: 100vh; position: absolute" fluid color="secondary"></v-card> -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-icon>person</v-icon>
        <span v-if="user" style="margin-right: 20px">
          <strong>Logged in as {{ user.username }}</strong>
        </span>
      </div>

      <v-btn color="white" v-if="user" text @click="logout" outlined>
        <strong>Logout</strong>
      </v-btn>
    </v-app-bar>

    <v-content fluid style="margin-bottom: 75Dpx">
      <v-sheet height="100vh" :dark="darktheme">
        <router-view
          v-bind:darktheme="darktheme"
          v-on:set_config="set_config"
          v-on:set_login_variables="set_login_variables"
        ></router-view>
      </v-sheet>
    </v-content>

    <v-footer color="primary" fluid>
      <span class="white--text">&copy; 2019</span>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <span class="white--text">Created by Josiah Schiess @ TFBERN</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "./api";
export default {
  data: () => ({
    user: "",
    darktheme: false
  }),
  computed: {},
  mounted() {
    this.set_login_variables();
  },
  methods: {
    async set_config(config) {
      this.darktheme = !this.darktheme;
      await axios().put("/api/config", {
        darktheme: this.darktheme
      });
    },
    logout() {
      localStorage.clear();
      this.set_login_variables();
      this.$router.push("/");
    },
    set_login_variables() {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.darktheme =(this.user) ?  this.user.config.darktheme: null
    }
  }
};
</script>

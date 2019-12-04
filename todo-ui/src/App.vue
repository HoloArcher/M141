<template>
  <v-app>
    <v-app-bar v-if="user" tile  color="primary" dark>
      <span style="margin-right: 20px">
        <v-menu transition="slide-x-transition"  offset-y :close-on-click="true" :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon large>person</v-icon>
            </v-btn>
          </template>
          <v-card :dark="darktheme">
            <v-list>
              <v-list-item>
                <v-switch
                  label="Toggle dark theme"
                  right
                  v-model="darktheme"
                  @change="set_config()"
                ></v-switch>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        <strong>Logged in as {{ user.username }}</strong>
      </span>
      <v-spacer></v-spacer>
      <v-btn color="white" text @click="logout" outlined>
        <strong>Logout</strong>
        <v-icon>mdi-account-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- <v-divider style="margin-bottom:50px"></v-divider> -->
      <v-sheet tile min-height="100vh" fluid :dark="darktheme">
        <router-view v-bind:darktheme="darktheme" v-on:set_login_variables="set_login_variables"></router-view>
      </v-sheet>

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
    darktheme: null
  }),
  computed: {},
  mounted() {
    this.set_login_variables();
  },
  methods: {
    async set_config() {
      console.log(this.darktheme);

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
      // console.log(this.user.config.darktheme);

      this.darktheme = this.user ? this.user.config.darktheme : null;
    }
  }
};
</script>

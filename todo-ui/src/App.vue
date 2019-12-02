<template>
  <v-app>
    <v-card square style="height: 100vh; position: absolute" fluid color="secondary"></v-card>
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
      <!-- <v-text-field v-model="oof"></v-text-field> -->
    </v-app-bar>

    <v-content fluid id="kek">
      <router-view v-on:set_user="set_user"></router-view>
    </v-content>
    <v-footer color="primary" fluid>
      <span class="white--text">&copy; 2019</span>

      <v-spacer></v-spacer>
      <!-- <span class="white--text">&copy; 2019</span> -->
      <v-spacer></v-spacer>
      <span class="white--text">Created by Josiah Schiess @ TFBERN</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    user: ""
  }),
  computed: {},
  mounted() {
    this.set_user();
  },
  methods: {
    logout() {
      localStorage.clear();
      this.set_user();
      this.$router.push("/");
    },
    set_user() {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }
};
</script>

<style type="text/css">
html,
#kek {
  overflow-y: hidden;
}
</style>
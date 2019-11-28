<template>
  <v-app>
    <v-card  square style="height: 100vh; position: absolute" fluid  color="secondary" >
    </v-card>
    <v-app-bar  app color="primary" dark>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>

      <span style="padding-right: 10px" v-if="user">logged in as {{ user.username }}</span>

      <v-btn color="white" text @click="logout">
        <strong>Logout</strong>
      </v-btn>
      <v-text-field v-model="oof"></v-text-field>
    </v-app-bar>

    <v-content fluid id="kek">
      <router-view v-on:changekek="console.log('ok bookmer')" :oof="oof"></router-view>
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
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    user: "",
    oof: ''
  }),
  computed: {},
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    logout() {
      localStorage.clear(),location.reload();
    }
  },
  created() {}
};
</script>

<style type="text/css">
html, #kek {
  overflow-y: hidden;
}
</style>
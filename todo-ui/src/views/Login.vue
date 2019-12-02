<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      rel="stylesheet"
    />
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
     

              <v-spacer />
            </v-toolbar>
              <v-form @submit="login" lazy-validation v-model="valid" ref="form">
            <v-card-text>
                <v-text-field
                  label="Username"
                  name="todo_username"
                  prepend-icon="person"
                  v-model="username"
                  type="text"
                  :rules="rules"
                />
                <v-text-field
                  id="password"
                  label="Password"
                  v-model="password"
                  name="todo_username"
                  prepend-icon="lock"
                  type="password"
                  :rules="rules"
                />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn  @click="login" color="primary">Login</v-btn>
            </v-card-actions>
              </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "@/api";
import router from "../router";
export default {
  data() {
    return {
      valid: false,
      username: "",
      password: ""
    };
  },
  computed: {
    rules() {
      const rules = [];
      const rule = v => (v ? true : "field required");
      rules.push(rule);
      return rules;
    }
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        var data = {
          username: this.username,
          password: this.password
        };
        var response = await axios().post("/login", data);
        console.log(response);
        

        // const [Bearer, token] = response.data.split(' ');
        var token = response.data.token.split(" ")[1];
        var user = response.data.user;
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem("token", token);
        this.$emit('changekek')
        this.$router.push('/todos')

      }
    }
  }
};
</script>

<style lang="css">
html{
  overflow-y: hidden;
}
</style>
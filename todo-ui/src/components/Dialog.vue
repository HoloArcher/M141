<template>
  <v-dialog persistent max-width="600px">
    <v-card>
      <v-card-title dark color="red lighten-3">{{ title }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field v-model="obj.owner" label="Benutzer"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field icon v-model="obj.newTodo" label="Todo" xs1></v-text-field>
          </v-col>
          <v-col>
            <v-select
              persistent
              :items="select_pri_items"
              v-model="obj.select_pri"
              label="Priorität"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-dialog max-width="300px">
              <template v-slot:activator="{ on }">
                <v-btn dark color="blue lighten-2" large v-on="on">Date</v-btn>
              </template>
              <v-date-picker
                small
                dark
                color="green lighten-1"
                reactive
                v-model="obj.pick_end_date"
              ></v-date-picker>
            </v-dialog>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-select :items="select_status_items" v-model="obj.select_status" label="Status"></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" dark color="red lighten-2">Cancel</v-btn>
        <v-btn @click="addTodo(); dialog = false;" dark color="green lighten-2">Save</v-btn>
      </v-card-actions>
    </v-card>
    <template v-slot:activator="{ on }">
      <v-btn fab right bottom absolute prepend-icon="add" color="green lighten-2" dark v-on="on">
        <v-icon>add</v-icon>
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: ["kek"],
  data() {
    return {
      
    };
  },
  computed: {
    dialog() {
      return obj.dialog;
    },
    title() {
      return "new Entry";
    }
  },

  methods: {
    
  }
};
</script>

<style>
</style>
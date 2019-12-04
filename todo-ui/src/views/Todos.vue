<template>
  <v-container grid-list-xs flat>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      rel="stylesheet"
    />
    <v-layout wrap column>
      <v-alert fixed bottom dismissible v-model="alert.on" type="error">{{ alert.status }}</v-alert>
      <v-card :dark="darktheme" text tile>
        <!-- <v-app-bar color="primary" :dark="!darktheme">
          <v-toolbar-title>
            <h3>Todos</h3>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" :dark="darktheme" icon @click="$emit('set_config')">
                <v-icon>mdi-invert-colors</v-icon>
              </v-btn>
            </template>
            <span>toggle Dark Theme</span>
          </v-tooltip>
        </v-app-bar>-->

        <v-card-text>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="todos"
            hide-default
            :expanded.sync="expanded"
            item-key="id"
            show-expand
          >
            <template v-slot:top>
              <v-row>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-col md="8" lg="6" sm="12">
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    solo
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <v-dialog
                    transition="slide-y-transition"
                    v-model="dialog"
                    persistent
                    max-width="600px"
                  >
                    <v-card :dark="darktheme" class="mx-auto">
                      <v-app-bar color="primary" dark>
                        <v-card-title v-if="editing" dark color="red lighten-3">Edit entry</v-card-title>
                        <v-card-title v-else dark color="red lighten-3">New entry</v-card-title>
                      </v-app-bar>
                      <v-form lazy-validation v-model="valid" ref="form">
                        <v-card-text>
                          <v-row justify="center">
                            <v-col>
                              <v-text-field
                                :rules="rules"
                                icon
                                v-model="dialog_obj.text"
                                label="Todo"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-select
                                :rules="rules"
                                persistent
                                :items="priority_array"
                                v-model="dialog_obj.priority"
                                item-text="priority"
                                item-value='id'
                                
                                label="Priorität"
                              ></v-select>
                            </v-col>
                          </v-row>

                          <v-row justify="space-around">
                            <v-col md="6">
                              <v-row>
                                <v-menu v-model="menu2">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-on="on"
                                      label="Startdatum "
                                      placeholder="DD.MM.YYYY"
                                      color="blue lighten-2"
                                      v-bind:value="dialog_obj.start_date | format_date"
                                      filter
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    no-title
                                    @input="menu2 = !menu2"
                                    :rules="rules"
                                    scrollable
                                    label="Startdatum"
                                    color="blue lighten-2"
                                    v-model="dialog_obj.start_date"
                                  ></v-date-picker>
                                </v-menu>
                              </v-row>
                              <v-row>
                                <v-menu v-model="menu1">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-on="on"
                                      label="Fälligkeitsdatum"
                                      placeholder="DD.MM.YYYY"
                                      color="blue lighten-2"
                                      v-bind:value="dialog_obj.end_date | format_date"
                                    ></v-text-field>
                                  </template>

                                  <v-date-picker
                                    no-title
                                    scrollable
                                    @input="menu1 = !menu1"
                                    :rules="rules"
                                    actions
                                    label="Fälligkeitsdatum"
                                    color="blue lighten-2"
                                    v-model="dialog_obj.end_date"
                                  ></v-date-picker>
                                </v-menu>
                              </v-row>
                            </v-col>

                            <v-col md="5">
                              <v-select
                                icon
                                :items="status_array"
                                v-model="dialog_obj.status"
                                label="Status"
                                item-value='id'
                                item-text='status'
                                :rules="rules"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="dialog = false; reset_dialog_data();" color="error">
                            <v-icon left>cancel</v-icon>Cancel
                          </v-btn>
                          <v-btn
                            v-if="editing"
                            v-bind:disabled="!valid"
                            @click="dialog = false; alterTodo(); "
                            color="success"
                          >
                            save todo
                            <v-icon right>mdi-checkbox-marked-circle-outline</v-icon>
                          </v-btn>
                          <v-btn
                            v-else
                            v-bind:disabled="!valid"
                            @click="dialog = false; addTodo(); valid = true; "
                            color="success"
                          >
                            Confirm
                            <v-icon right>mdi-checkbox-marked-circle-outline</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>

                    <template v-slot:activator="{ on }">
                      <v-btn
                        large
                        rounded
                        color="success"
                        dark
                        v-on="on"
                        @click="editing = false; valid = false;"
                      >
                        <span>New Todo</span>
                        <v-icon right dark>add</v-icon>
                      </v-btn>
                    </template>
                  </v-dialog>
                </v-col>
              </v-row>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-row justify="center">
                  <v-col md="5" >
                    <v-list dense>
                      <v-list-item v-for="(obj, index) in item" :key="index">
                        <v-list-item-content>{{index}}</v-list-item-content>
                        <v-list-item-content>{{obj}}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </td>
              <!-- <td :colspan="headers.length">
                <v-col>
                  <v-row
                    v-for="(index, column) of item"
                    :key="column"
                    style="border: solid 0.2px black"
                  >
                    <v-col md="3">{{ column }}</v-col>
                    <v-col md="3">{{ index }}</v-col>
                  </v-row>
                </v-col>
              </td>-->
            </template>
            <!-- <template v-slot:item.start_date="{ item }">{{ item.start_date | format_date }}</template>
            <template v-slot:item.end_date="{ item  }">{{ item.end_date | format_date }}</template>-->
            <template v-slot:item.action="{ item }">
              <v-icon
                small
                class="mr-2"
                @click=" editing= true; dialog_obj = item; dialog = true;"
              >edit</v-icon>
              <v-icon small @click="deleteTodo(todos.indexOf(item))">delete</v-icon>
            </template>
            <template v-slot:item.priority="{ item }">
              <v-chip :color="priority_color(item.priority)">{{ item.priority }}</v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "@/api";

export default {
  name: "app",
  props: ["darktheme"],
  data() {
    return {
      search: "",
      alert: {
        on: false,
        status: "",
        type: ""
      },
      expanded: [],
      valid: true,
      kek: false,
      editing: false,
      status_array: [],
      priority_array: [],
      dialog_obj: {
        end_date: "",
        id: "",
        owner: "",
        surname: "",
        givenname: "",
        priority: "",
        start_date: "",
        status: "",
        text: ""
      },
      title: "new entry",
      editTodo: "",
      altertodo: {},
      todos: [],
      headers: [
        { text: "ID", value: "id" },
        // { text: "", value: "owner" },
        { text: "Todo", value: "text" },
        { text: "Priority", value: "priority" },
        { text: "Status", value: "status" },
        // {
        //   text: "Start Date",
        //   value: "start_date",
        //   prependIcon: "calendar_today"
        // },
        // { text: "End Date", value: "end_date" },
        { text: "Actions", value: "action", sortable: false },
        { text: "", value: "data-table-expand" }
      ],
      dialog: false,
      menu1: false,
      menu2: false
    };
  },
  filters: {
    format_date(el) {
      if (el) {
        let [year, month, day] = el.split("-");
        day = day.length === 1 ? "0" + day : day;
        month = month.length === 1 ? "0" + month : month;

        return `${day}.${month}.${year}`;
      } else {
        return el;
      }
    }
  },
  async mounted() {
    // this.newoof = this.oof

    try {
      let res1 = await axios().get("/api/todo/priorities");
      // res1 = res1.data.map(el => {
      //   return el.priority;
      console.log(res1.data);

      // });
      this.priority_array = res1.data;
    } catch (e) {
      this.alert.on = true;
      this.alert.type = "error";
      this.alert.status = e;
    }
    try {
      let res = await axios().get("/api/todo/statuses");
      console.log(res.data);
      
      // res = res.data.map(el => {
      //   return el.status;
      // });
      this.status_array = res.data;
    } catch (e) {
      this.alert.on = true;
      this.alert.type = "error";
      this.alert.status = e;
    }

    try {
      let res = await axios().get("/api/todo");
      this.todos = res.data;
    } catch (e) {
      this.alert.on = true;
      this.alert.type = "error";
      this.alert.status = e;
    }
  },
  computed: {
    rules() {
      const rules = [];
      // const rule = v =>
      //   (v || "").length === 0 || `field required`;

      const rule = v => (v ? true : "field required");
      // let end = v.length === 0 ? `field required` : true;

      rules.push(rule);
      return rules;
    },
    name_rule() {
      let rules = [];
      let rule = v => (v.match(".{2,} .{2,}") || "" ? true : "formating wrong");
      rules.push(rule);
      return rules;
    },
    /**
     * wenn dark_theme aktiv ist, wird die farbe primary entsprechen
     */
    app_bar_color_format() {
      var end = !this.kek ? "primary white--text " : "primary ";
      return end;
    },
    background_color() {
      var end = this.kek ? "#404040" : "";

      return end;
    }
  },
  methods: {
    priority_color(el) {
      var theme = this.darktheme ? " darken-1" : " ";
      switch (el) {
        case "niedrig":
          return "primary" + theme;
          break;
        case "normal":
          return "info" + theme;
          break;
        case "hoch":
          return "error" + theme;
          break;
        default:
          return "primary" + theme;
          break;
      }
    },
    /**
     * stellt das object dialog_obj
     */

    async reset_dialog_data() {
      this.$refs.form.resetValidation();
      this.dialog_obj = {};
      var response = await axios().get("/api/todo");
      this.todos = response.data;
    },

    async addTodo() {
      // console.trace(owner);
      let data = {
        text: this.dialog_obj.text,
        start_date: this.dialog_obj.start_date,
        end_date: this.dialog_obj.end_date,
        status_id:this.dialog_obj.status,
        priority_id: this.dialog_obj.priority,
        owner: this.dialog_obj.owner
      };
      await axios().post("/api/todo", data);
      var result = await this.reset_dialog_data();
    },

    async alterTodo() {
      let [lastname, firstname] = this.dialog_obj.owner.split(" ");

      let data = {
        text: this.dialog_obj.text,
        start_date: this.dialog_obj.start_date,
        end_date: this.dialog_obj.end_date,
        status_id: this.dialog_obj.status,
        priority_id: this.dialog_obj.priority,
        owner: `${lastname} ${firstname}`
      };
      // console.log(data);
      try {
        await axios().put(`/api/todo/${this.dialog_obj.id}`, data);
        await this.reset_dialog_data();
      } catch (e) {
        this.alert.on = true;
        this.alert.type = "error";
        this.alert.status = e;
      }
      this.dialog = false;
    },
    async deleteTodo(index) {
      let todo_id = this.todos[index].id;
      this.todos.splice(index, 1);
      await axios().delete(`/api/todo/${todo_id}`);
    }
  }
};
</script>

<style>
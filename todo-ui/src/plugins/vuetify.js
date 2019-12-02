import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);



export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0082b4",
        secondary: "#e91e63",
        accent: "#009688",
        error: "#f44336",
        warning: "#ff9800",
        info: "#ffeb3b",
        success: "#4caf50",
      }
    },
  },
});



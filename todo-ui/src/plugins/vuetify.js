import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);



export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0082b4",
        secondary: "#8bc34a",
        accent: "#9c27b0",
        error: "#f44336",
        warning: "#ff9800",
        info: "#ffc107",
        success: "#4caf50"
      },
    }
  },
});



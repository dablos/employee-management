// main.js
import { createApp } from "vue";
import App from "./App.vue";

import axios from "axios";
import "./mockService";
import store from "./store";

import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import quasarUserOptions from "./quasar-user-options";

const app = createApp(App);

app.use(Quasar, quasarUserOptions);
app.use(store);

app.config.globalProperties.$axios = axios;

app.mount("#app");

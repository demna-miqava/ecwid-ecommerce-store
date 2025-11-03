import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";

import "primeicons/primeicons.css";
import "./main.css";

const pinia = createPinia();

createApp(App).use(router).use(VueQueryPlugin).use(pinia).mount("#app");

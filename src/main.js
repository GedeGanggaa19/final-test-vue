import './assets/main.css' // Pindah ke bawah import bootstrap kalo ga mau nampil desain nya, balikin kalo nambah error
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from './routes';
import { store } from './store';

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      return { top: 0 };
    },
  });

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router);
app.use(store);
app.mount("#app")

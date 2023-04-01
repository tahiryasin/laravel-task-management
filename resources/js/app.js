import('./bootstrap');
import { createApp } from 'vue';

import App from './components/App.vue';
import { createWebHistory, createRouter } from 'vue-router'
import VueAxios from 'vue-axios';
import axios from 'axios';
import {routes} from './components/routes';

const router = new createRouter({
    history: createWebHistory(),
    routes: routes
});
const app = createApp(App);
    app.use(router)
    .use(VueAxios, axios)
    .mount('#app')

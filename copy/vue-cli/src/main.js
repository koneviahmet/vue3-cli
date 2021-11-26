import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './assets/index.css'
import store from "./store";
import can from './directives/can'

const app = createApp(App);
app.directive('can', can)
app.use(router);
app.use(store);
app.mount('#app')

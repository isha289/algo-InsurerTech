import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App).use(store).use(router)

// global properties
app.config.globalProperties.$url = 'http://65.0.45.238:5000'

// mount the final app
app.mount('#app')
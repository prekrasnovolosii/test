import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: 'fe51c7a5-94b1-4fd2-8e1c-b4592886a4ac',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}

createApp(App).use(store).use(router).use(YmapPlugin, settings).mount('#app')

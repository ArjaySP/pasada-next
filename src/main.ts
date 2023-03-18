import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Providers from './Providers.vue'
import router from '@/utils/router'

import './assets/main.css'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const pinia = createPinia()
const app = createApp(Providers)
app.use(pinia)
app.use(router)
app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Providers from './Providers.vue'
import router from '@/utils/router'

import './assets/main.css'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`

const pinia = createPinia()
const app = createApp(Providers)
app.use(pinia)
app.use(router)
app.mount('#app')

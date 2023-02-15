import { createApp } from 'vue'
import Providers from './Providers.vue'
import router from '@/utils/router'

import './assets/main.css'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(Providers)
app.use(router)
app.mount('#app')

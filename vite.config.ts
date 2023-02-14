import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        IconsResolver({
          prefix: false,
          alias: {
            i: 'ion',
          },
        }),
        NaiveUiResolver(),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/head',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
          'axios': [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
      vueTemplate: true,
    }),
    Icons({}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

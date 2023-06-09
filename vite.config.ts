import * as fs from 'fs'
import { resolve } from 'path'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import * as dotenv from 'dotenv'

export default defineConfig(({ mode }: UserConfig): UserConfig => {
  const GVA_ENV = dotenv.parse(fs.readFileSync(`.env.${mode}`))
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: Number(GVA_ENV.VITE_BASE_CLI_PORT),
      open: true,
      https: false,
      proxy: {
        // Haut api
        '/edu': {
          target: 'https://api.jinkex.com',
          timeout: 8000,
          changeOrigin: true,
          rewrite: pathStr => pathStr.replace('/edu', '/edu'),
        },
        // Haut exam api
        '/exam': {
          target: 'https://api.jinkex.com',
          timeout: 8000,
          changeOrigin: true,
          rewrite: pathStr => pathStr.replace('/exam', '/exam'),
        },
        // Mock
        '/m1': {
          target:
            'https://www.fastmock.site/mock/9d7d214a196f7a703ff54d6a07235871/m1',
          timeout: 8000,
          changeOrigin: true,
          rewrite: pathStr => pathStr.replace('/m1', ''),
        },
        // Express
        '/ex': {
          target: 'http://localhost:3002',
          timeout: 5000,
          changeOrigin: true,
          rewrite: pathStr => pathStr.replace('/ex', ''),
        },
      },
    },
    build: {
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
      target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
      chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
      assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去除console
          drop_debugger: true, // 生产环境去除debugger
        },
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
          {
            axios: [
              ['default', 'axios'], // import { default as axios } from 'axios',
            ],
            dayjs: [['default', 'dayjs']],
          },
        ],
        dts: true,
        // eslint报错解决
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './auto-imports.json', // `./.eslintrc-auto-import.json`
          globalsPropValue: true,
        },
        resolvers: [],
      }),
    ],
  }
})

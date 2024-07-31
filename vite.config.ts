/*
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-07-25 14:32:26
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-07-31 11:18:27
 * @FilePath: \ccc\vite.config.ts
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  base:'/ccc',
  plugins: [
    vue(),
     AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    })
  ],
  build:{
    outDir: 'docs',
    rollupOptions: {
      // 关闭除屑优化，防止删除重要代码，导致打包后功能出现异常
      treeshake: false,
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        // manualChunks配置 (依赖包从大到小排列)
        manualChunks: {
          // vue vue-router合并打包
          'vue-vendor': ['vue', 'vue-router'],
          // 'antd-vue-vendor': ['ant-design-vue','@ant-design/icons-vue','@ant-design/colors'],
          // 'vxe-table-vendor': ['vxe-table','vxe-table-plugin-antd','xe-utils'],
          // 'emoji-mart-vue-fast': ['emoji-mart-vue-fast'],
          // 'china-area-data-vendor': ['china-area-data']
        },
      },
    },
    // 关闭brotliSize显示可以稍微减少打包时间
    reportCompressedSize: false,
    // 提高超大静态资源警告大小
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /#\//,
        replacement: pathResolve('types') + '/',
      },
    ]
  }
  
})


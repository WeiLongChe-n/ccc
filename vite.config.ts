/*
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-07-25 14:32:26
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-07-25 17:57:49
 * @FilePath: \home-qiankun\vite.config.ts
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  base:'/ccc',
  plugins: [vue()],
})
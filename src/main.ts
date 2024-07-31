/*
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-07-30 17:15:10
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-07-31 16:17:43
 * @FilePath: \ccc\src\main.ts
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
import router from "@/router"
import ArcoVue from '@arco-design/web-vue'; // https://arco.design/vue/docs/start
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import pinia from "@/pinia"
const app = createApp(App)

app.use(ArcoVue)
app.use(pinia)
app.use(router)
app.mount('#app')

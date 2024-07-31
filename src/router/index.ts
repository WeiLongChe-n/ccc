/*
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-07-30 17:45:08
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-07-31 15:00:06
 * @FilePath: \ccc\src\router\index.ts
 * @Description: 
 */

import { createMemoryHistory, createRouter ,RouteRecordRaw} from 'vue-router'
const LAYOUT = () => import('@/layout/index.vue');
const routes:Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  { path: '/home', 
    component: LAYOUT,
    meta: {
      title: '首页',
      hideBreadcrumb: true,
      hideMenu: true,
    },
    children:[
      {
        path: '/home',
        name: '首页',
        component: () => import('@/view/Home/index.vue'),
        meta: {
          title: '首页',
          hideBreadcrumb: true,
        },
      }
    ]
  },
  { path: '/about', 
    component: LAYOUT,
    meta: {
      title: 'about',
      hideBreadcrumb: true,
      hideMenu: true,
    },
    children:[
      {
        path: '/about',
        name: 'about',
        component: () => import('@/view/About/index.vue'),
        meta: {
          title: 'about',
          hideBreadcrumb: true,
        },
      }
    ]
  },
  { path: '/404', component: ()=>import('@/view/404/index.vue') },
  { path: '/:path(.*)*',redirect: '/404' },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router
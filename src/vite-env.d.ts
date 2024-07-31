/*
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-07-30 17:15:10
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-07-31 11:09:29
 * @FilePath: \ccc\src\vite-env.d.ts
 * @Description: 
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
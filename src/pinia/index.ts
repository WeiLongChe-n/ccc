/*
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-07-31 08:39:57
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-07-31 08:41:00
 * @FilePath: \ccc\src\pinia\index.ts
 * @Description: 
 */
import { createPinia, PiniaPluginContext} from "pinia"
import { toRaw } from "vue";
/**
 * pinia数据持久化封装***********************************
 */
const setStorage = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
}
const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {};
}



const _pininaKey = 'piniaKey'

const pinia = createPinia();

type Options = {
  key?: string
}
const piniaPlugin = (options: Options) => {
  return (context: PiniaPluginContext) => {
    const { store } = context;
    const data = getStorage(`${options?.key ?? _pininaKey}_${store.$id}`);
    // state的变化时触发
    store.$subscribe(() => {
      console.log(store, 'state变化了');
      // toRaw 将proxy代理对象转化为原始对象
      setStorage(`${options?.key ?? _pininaKey}_${store.$id}`, toRaw(store.$state))
    })

    return {
      ...data,
    }
  }
}

pinia.use(piniaPlugin({
  key: 'pinia'
}));

export default pinia;

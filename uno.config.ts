/*
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-08-05 17:33:27
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-08-05 17:48:20
 * @FilePath: \ccc\uno.config.ts
 * @Description: 
 */
import { defineConfig, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  rules: [
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })]
  ],
  presets: [
    presetRemToPx(),
    presetUno()
  ],
}) 
<!--
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-07-30 17:47:17
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-07-31 08:36:14
 * @FilePath: \ccc\src\view\About\index.vue
 * @Description: 
-->
<template>
<div>
  about1111111111
  <p @click="goHome">goHome</p>
</div>
</template>
<script setup>
import {ref,reactive} from 'vue';
import {useRouter} from "vue-router"
const router = useRouter();
const goHome = () => {
  router.push({
    path:"/home"

});
}
</script>
<style lang='less' scoped>

</style>
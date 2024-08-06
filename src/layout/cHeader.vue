<!--
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-07-31 14:17:43
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-08-06 08:37:57
 * @FilePath: \ccc\src\layout\cHeader.vue
 * @Description: 
-->
<template>
  <a-layout-header class="layout-headerbox">
    <div class="flex flex-auto">
      <img src="@/assets/logo.png" alt="log">
      <div>xxxx管理平台</div>
    </div>
      <!-- <a-dropdown>
        <a-avatar class="layout-header-avatar" src="https://joeschmoe.io/api/v1/random" />
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a-icon type="user" />
              <span>个人中心</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown> -->
      <a-space size="large">
        <a-avatar :style="{ backgroundColor: 'var(--ThemeColor)'}">CWL</a-avatar>
        <a-avatar>C</a-avatar>
      </a-space>
  </a-layout-header>
</template>
<style lang='scss' scoped>
.layout-headerbox{
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background-color: var(--ThemeColor);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
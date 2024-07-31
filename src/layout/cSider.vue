<!--
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-07-31 14:14:46
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-07-31 15:53:36
 * @FilePath: \ccc\src\layout\cSider.vue
 * @Description: 
-->
<template>
  <a-layout-sider collapsible breakpoint="xl" class="layout-siderbox" :hide-trigger="false">
    <template #trigger="{ collapsed }">
      <IconCaretRight v-if="collapsed"></IconCaretRight>
      <IconCaretLeft v-else></IconCaretLeft>
    </template>
    <a-menu :default-open-keys="['1']" :default-selected-keys="['0_3']" :style="{ width: '100%' }"
      @menu-item-click="onClickMenuItem">
      <a-menu-item key="0_1" disabled>
        <IconHome></IconHome>
        Menu 1
      </a-menu-item>
      <a-menu-item key="0_2">
        <IconCalendar></IconCalendar>
        Menu 2
      </a-menu-item>
      <a-menu-item key="0_3">
        <IconCalendar></IconCalendar>
        Menu 3
      </a-menu-item>
      <a-sub-menu key="1">
        <template #title>
          <IconCalendar></IconCalendar> Navigation 1
        </template>
        <a-menu-item key="1_1">Menu 1</a-menu-item>
        <a-menu-item key="1_2">Menu 2</a-menu-item>
        <a-sub-menu key="2" title="Navigation 2">
          <a-menu-item key="2_1">Menu 1</a-menu-item>
          <a-menu-item key="2_2">Menu 2</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="3" title="Navigation 3">
          <a-menu-item key="3_1">Menu 1</a-menu-item>
          <a-menu-item key="3_2">Menu 2</a-menu-item>
          <a-menu-item key="3_3">Menu 3</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="4">
        <template #title>
          <IconCalendar></IconCalendar> Navigation 4
        </template>
        <a-menu-item key="4_1">Menu 1</a-menu-item>
        <a-menu-item key="4_2">Menu 2</a-menu-item>
        <a-menu-item key="4_3">Menu 3</a-menu-item>
      </a-sub-menu>
    </a-menu>
    
  </a-layout-sider>
</template>
<script setup >
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';
import { Message} from '@arco-design/web-vue';
function onClickMenuItem(key) {
  Message.info({ content: `You select ${key}`, showIcon: true });
}
</script>
<style lang="scss">
.layout-siderbox,
.arco-menu-light,
.arco-menu-item,
.arco-menu-disabled{
  background-color: #ff0;
}
.arco-menu-light .arco-menu-item.arco-menu-selected {
  background-color: aqua;
}
.arco-menu-light .arco-menu-item, .arco-menu-light .arco-menu-group-title, .arco-menu-light .arco-menu-pop-header, .arco-menu-light .arco-menu-inline-header,
.arco-menu-light .arco-menu-item.arco-menu-disabled, .arco-menu-light .arco-menu-group-title.arco-menu-disabled, .arco-menu-light .arco-menu-pop-header.arco-menu-disabled, .arco-menu-light .arco-menu-inline-header.arco-menu-disable,
.arco-menu-light .arco-menu-item {
  background-color: #0f0;
  &:hover{
    background-color: aqua;
  }
}
.arco-layout-sider-trigger-light{
  position: absolute;
  top: 0;
}
.arco-layout-sider-children{
  margin-top: 48px;
}
</style>
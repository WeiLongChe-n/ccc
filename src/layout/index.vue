<template>
  <div class="layout-demo">
    <a-layout class="layout-containerbox">
      <cHeader></cHeader>
      <a-layout>
        <cSider></cSider>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
    </a-layout>
  </div>
</template>
<script setup>
import {ref,reactive} from 'vue';
import cSider from './cSider.vue';
import cHeader from './cHeader.vue';
</script>
<style scoped>
.layout-containerbox{
  height: 100vh;
  overflow: hidden;
}
</style>
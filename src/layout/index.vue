<template>
  <v-layout style="display: flex; min-height: 100vh">
    <!-- 顶部的 navbar -->
    <navbar />
    <!-- 内容区 -->
    <div class="main-content">
      <router-view />
    </div>
    <!-- 底部的 footer -->
    <!-- <my-footer /> -->
  </v-layout>
</template>

<script setup lang="ts">
import navbar from '@/layout/navbar/index.vue'
// import myFooter from '@/layout/footer/index.vue'
</script>

<style scoped>
.main-content {
  /**  box-shadow:
    0 15px 35px rgba(114, 114, 137, 0.1),
    0 5px 15px rgb(179, 179, 179) !important;
  border: 1px solid #ddd;
  border-radius: 4px;**/
  background-color: #fafafa;
  z-index: 900;
  padding: 100px 30px 60px;
  display: flex;
  flex: 1;
  box-sizing: border-box;
  height: auto;
}
</style>

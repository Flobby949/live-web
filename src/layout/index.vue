<template>
  <v-layout>
    <!-- 顶部的 navbar -->
    <navbar />
    <!-- 内容区 -->
    <v-main class="main-content">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <!-- 底部的 footer -->
    <my-footer />
  </v-layout>
</template>

<script setup>
import navbar from '@/layout/navbar/index.vue'
import myFooter from '@/layout/footer/index.vue'
</script>

<style scoped>
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.main-content {
  box-shadow:
    0 15px 35px rgba(114, 114, 137, 0.1),
    0 5px 15px rgb(179, 179, 179) !important;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 900;
  margin: 80px 20px;
  height: 86vh;
}
</style>

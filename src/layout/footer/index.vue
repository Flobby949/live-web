<template>
  <v-footer class="footer-bg">
    <v-row justify="center" no-gutters>
      <v-col class="text-center" cols="12"> {{ new Date().getFullYear() }} — <strong>Flobby</strong> </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer-bg {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  height: 20px;
  background-color: #e8cb26;
  text-align: center;
  color: #fff;
}
</style>

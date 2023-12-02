<script setup lang="ts">
import { testSuccess } from '@/api/test.ts'

testSuccess().then((res) => {
  console.log(res)
})
</script>

<template>
  <div>
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
  </div>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

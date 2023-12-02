<script setup lang="ts">
import { testSuccess } from '@/api/test.ts'

testSuccess().then((res) => {
  console.log(res)
})
</script>

<template>
  <router-view />
</template>

<style>
a.router-link-active,
a.router-link-exact-active,
a:link {
  text-decoration: none;
  color: inherit; /* 或者你想要的任何颜色 */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  line-height: 1.6;
}

ul {
  list-style: none;
}
</style>

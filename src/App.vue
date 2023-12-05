<script setup lang="ts">
// 测试接口
// import { testSuccess } from '@/api/test'
// import { ResponseData } from '@/utils/request'
// import { useToast } from 'vue-toastification'
// const toast = useToast()
// const test = () => {
//   testSuccess().then((res: ResponseData<string>) => {
//     console.log(res)
//     if (res.success) {
//       toast.success(res.message, {
//         timeout: 2000
//       })
//     } else {
//       toast.error(res.message, {
//         timeout: 2000
//       })
//     }
//   })
// }
// test()
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

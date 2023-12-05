<template>
  <div>about</div>
</template>

<script setup lang="ts">
// 测试接口
import { testSuccess } from '@/api/test'
import { ResponseData } from '@/utils/request'
import { useToast } from 'vue-toastification'
const toast = useToast()
const test = () => {
  testSuccess().then((res: ResponseData<string>) => {
    if (res.success) {
      toast.success(res.message, {
        timeout: 2000
      })
    } else {
      toast.error(res.message, {
        timeout: 2000
      })
    }
  })
}
test()
</script>

<style scoped></style>

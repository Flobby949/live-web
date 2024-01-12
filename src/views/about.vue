<template>
  <div>about</div>
  <div class="red-packet-container"><red-packet-efficacy></red-packet-efficacy></div>
</template>

<script setup lang="ts">
import redPacketEfficacy from '@/components/redPacketEfficacy.vue'
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

<style scoped>
.red-packet-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>

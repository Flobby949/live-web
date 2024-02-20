<template>
  <div>about</div>
  <div class="red-packet-container"><red-packet-efficacy></red-packet-efficacy></div>
</template>

<script setup lang="ts">
import redPacketEfficacy from '@/components/redPacketEfficacy.vue'
// 测试接口
import { testSuccess } from '@/api/test'
import { useToast } from 'vue-toastification'
import { onMounted } from 'vue'
const toast = useToast()
const test = async () => {
  const res = await testSuccess()
  if (res.success) {
    toast.success(res.message, {
      timeout: 2000
    })
  } else {
    toast.error(res.message, {
      timeout: 2000
    })
  }
}

onMounted(() => {
  test()
})
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

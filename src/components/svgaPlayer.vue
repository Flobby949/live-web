<template>
  <div ref="svgaContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 引入 SVGA 播放库（如果有适用的）
import SVGA from 'svga.lite'

const svgaContainer = ref()

onMounted(() => {
  // 创建 SVGA 播放器实例
  // 这里需要根据你使用的 SVGA 播放库来调整代码
  const player = new SVGA.Player(svgaContainer.value)
  const parser = new SVGA.Parser()

  // 加载 SVGA 动画文件
})
</script>

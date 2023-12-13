<template>
  <div class="container" ref="scrollContainer">
    <div class="content">
      <v-col cols="12" md="3" class="card" v-for="room in liveRoomList" :key="room.id">
        <live-room-card :room="room" @click="goToLivingRoom(room.id!)"></live-room-card>
      </v-col>
    </div>
    <!-- 加载动画 -->
    <div class="loading-bar">
      <v-progress-circular indeterminate color="primary" v-if="isLoading"></v-progress-circular>
      <div v-if="!hasNextPage && !isLoading" class="loaded-tip">已经到底了</div>
    </div>
  </div>
  <!-- 回到顶部的按钮 -->
  <v-btn
    class="back-to-top"
    elevation="4"
    @click="scrollToTop"
    v-show="showButton"
    color="indigo"
    icon="mdi-arrow-up"
  ></v-btn>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import liveRoomCard from '@/components/liveRoomCard.vue'
import { livingListByPage, liveListPageDTO, LivingRoomInfoVO } from '@/api/living'
import router from '@/router'
const queryParams = ref<liveListPageDTO>({
  page: 1,
  pageSize: 12,
  type: 0
})
const hasNextPage = ref(false)
const liveRoomList = ref<Array<LivingRoomInfoVO>>([])
const scrollContainer = ref()
const isLoading = ref(false)

// 查询直播间列表
const queryPage = async () => {
  isLoading.value = true
  const res = await livingListByPage(queryParams.value)
  if (res.success) {
    console.log('获取直播间列表成功')
    liveRoomList.value.push(...res.data.list)
    hasNextPage.value = res.data.hasNext
    queryParams.value.page += 1
  } else {
    console.log('获取直播间列表失败')
  }
  isLoading.value = false
}

// 跳转到直播间
const goToLivingRoom = (id: number) => {
  console.log('跳转到直播间', id)
  router.push(`/liveRoom?roomId=${id}`)
}

// 滚动监听
onMounted(() => {
  queryPage()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
const isAtBottom = ref(false)
const handleScroll = () => {
  const scrollTop = window.scrollY
  showButton.value = scrollTop > 200
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  isAtBottom.value = scrollTop + windowHeight >= documentHeight - 10
  if (isAtBottom.value && hasNextPage.value && !isLoading.value) {
    queryPage()
  }
}

// 回到顶部
const showButton = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 40px;
}

.loading-bar {
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loaded-tip {
  color: #999;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  /* 其他样式，如大小、颜色等 */
}
</style>

<template>
  <div class="live-card">
    <img :src="room.covertImg" class="living_room_cover" />
    <div class="living_room_tab">
      <img src="@/assets/img/head.jpeg" alt="" class="living_room_head" />
      <div class="info_bar">
        <span class="living_room_name">{{ room.roomName }}</span>
        <div class="count_bar">
          <div class="online_count">
            <v-icon icon="mdi-eye" size="small" style="margin-right: 5px"></v-icon>{{ room.watchNum }}
          </div>
          <div class="good_count">
            <v-icon icon="mdi-thumb-up" size="small" style="margin-right: 5px"></v-icon>{{ room.goodNum }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { LivingRoomInfoVO } from '@/api/living'
defineProps({
  room: {
    type: Object as () => LivingRoomInfoVO,
    default: () => ({
      roomName: '直播间名称',
      covertImg: 'https://i2.100024.xyz/2023/12/04/po4rph.webp',
      watchNum: 0,
      goodNum: 0
    })
  }
})
</script>

<style scoped>
.live-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.live-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.living_room_cover {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 250px;
  height: 200px;
}

.living_room_tab {
  display: flex;
  flex: 1;
  align-items: center;
  color: #666;
  width: 250px;
  height: 50px;
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 13px;
  border-left: solid 1px #d1d1d1;
  border-right: solid 1px #d1d1d1;
  border-bottom: solid 1px #d1d1d1;
}

.living_room_head {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.info_bar {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.living_room_name {
  padding-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 120px;
}

.count_bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.online_count {
  text-align: center;
  color: #7baaca;
}

.good_count {
  text-align: center;
  color: orange;
}
</style>

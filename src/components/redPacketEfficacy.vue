<template>
  <div id="wrapper" @mousedown="handleMousedown" ref="wrapper">
    <img
      v-for="(img, index) in images"
      :key="index"
      src="@/assets/img/petal.jpg"
      :style="img.style"
      :data-money="img.money"
    />
  </div>

  <v-overlay
    v-model="modalVisible"
    scroll-strategy="none"
    location-strategy="connected"
    class="align-center justify-center"
  >
    <div id="hb">
      <div id="text">{{ modalText }}</div>
      <button id="btn" @click="modalVisible = false">{{ buttonText }}</button>
    </div>
  </v-overlay>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRedPacket } from '@/hooks/useRedPacket'
import { onMounted } from 'vue'
import { livingStore } from '@/store'
import { storeToRefs } from 'pinia'

const { showRedPacket } = storeToRefs(livingStore())
const { totalMoney, getRedPacketData } = useRedPacket()

interface Image {
  style: Record<string, string>
  money: number
}

const images = ref<Image[]>([])

const wrapper = ref()

let totalCount = 0
function createDom(num: number) {
  totalCount = num
  for (let i = 0; i < num; i++) {
    const left = Math.ceil(Math.random() * (window.innerWidth - 150)) + 'px'
    const delay = Math.ceil(Math.random() * 80) / 10
    images.value.push({
      style: {
        width: '120px',
        left,
        animationDelay: `${delay}s`
      },
      money: Math.ceil(Math.random() * 10)
    })
  }
}

const modalVisible = ref(false)
const modalText = ref('')
const buttonText = ref('继续抢红包')
const handleMousedown = async (event: MouseEvent) => {
  const target = event.target as HTMLImageElement
  const money = target.dataset.money
  if (money) {
    const price = await getRedPacketData()
    console.log(price)
    if (price === 0) return
    modalText.value = `恭喜抢到红包${price}旗鱼币`
    modalVisible.value = true
    totalMoney.value += Number(price)
  }
}

let currentCount = 0
function redPacketEnd() {
  currentCount++
  if (currentCount === totalCount) {
    console.log('红包抢完了,总金额', totalMoney.value)
    modalVisible.value = true
    modalText.value = `红包抢完了,\n恭喜抢到红包${totalMoney.value}旗鱼币`
    buttonText.value = '确定'
    showRedPacket.value = false
  }
}

onMounted(() => {
  wrapper.value.addEventListener('webkitAnimationEnd', redPacketEnd)
})

// 暴露子组件方法
defineExpose({
  createDom
})
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

body {
  /* background-color: white; */
  overflow: hidden;
}

/*
    animation  各参数意思
    关键帧动画名称
    动画执行时间
    动画延迟时间
    动画执行次数
    动画的执行速度函数
    动画执行方向  alternate  间隔的顺序 ( 0 到 100 到 0 到 100 )
                 reverse    反向运动   (100 到 0 )
                 reverse-alternate   反向间隔运动
    动画执行模式  forwards(动画停止在最后一个关键帧的位置)
                 backwards (动画第一个关键帧立即执行)
                 both(两者都 即立即作用第一个关键帧也停止在最后一个关键帧)
*/
#wrapper img {
  position: absolute;
  transform: translateY(-100%);
  /*下落动画*/
  animation: dropDowm 3s forwards;
  /*旋转动画*/
}

@keyframes dropDowm {
  0% {
    top: 0px;
    transform: translateY(-100%) rotate(0deg);
  }

  100% {
    top: 110%;
    transform: translateY(0%) rotate(360deg);
  }
}

#modol {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
}

#modol::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

#hb {
  width: 350px;
  height: 450px;
  border-radius: 20px;
  background-color: #e7223e;
  color: #fad755;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 30px;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

#btn {
  background-color: #fad755;
  color: #e7223e;
  font-size: 18px;
  margin-top: 10px;
  padding: 10px;
  border: none;
  outline: none;
  cursor: pointer;
}

#text {
  text-align: center;
  line-height: 1.5;
}
</style>

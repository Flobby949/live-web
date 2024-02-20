<template>
  <v-container class="container">
    <v-row no-gutters>
      <v-col cols="12" md="9">
        <div class="full-container">
          <div class="liveroom_top">
            <div style="position: relative; top: -20px">
              <div class="anchor_name">
                <div style="display: inline-block">{{ livingRoomInfo?.anchorName }}</div>
                <img src="@/assets/img/living.jpg" class="anchor_label" alt="" />
              </div>
              <img :src="livingRoomInfo?.anchorImg" class="anchor_img" alt="" />
            </div>
            <v-btn
              style="background-color: #966bff; color: #fff"
              @click="showCloseDialog"
              v-if="user.userId === livingRoomInfo?.anchorId"
              >关闭直播</v-btn
            >
            <v-btn
              style="background-color: #966bff; color: #fff"
              @click="prepare(livingRoomInfo?.roomId)"
              v-if="user.userId === livingRoomInfo?.anchorId"
              >初始化红包雨</v-btn
            >
            <v-btn
              style="background-color: #966bff; color: #fff"
              @click="startSendRedPacket"
              v-if="user.userId === livingRoomInfo?.anchorId && redPacketInit"
              >派发红包雨</v-btn
            >
          </div>
          <video width="100%" style="background-color: rgb(18, 9, 37); flex: 1">
            <!-- <source src="test.mp4"> -->
          </video>
          <canvas class="svga-wrap" ref="canvas"></canvas>
          <div class="gift_content">
            <div class="gift_content_title">礼物面板</div>
            <div class="bank_tab" @click="showBankInfoTab()">
              <span> 钱包余额: </span>
              <span style="color: white">{{ currentBalance }}</span>
            </div>
            <div class="gift-bar">
              <template v-for="item in giftList" :key="item.giftId">
                <gift-card-item @click="sendGift(item)" :gift="item" />
              </template>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="full-container">
          <div class="talk-content-box" id="talk-content-box">
            <div style="margin-left: 20px; margin-top: 20px" v-for="(chatItem, index) in chatList" :key="index">
              <div v-show="chatItem.msgType == 5">
                <div class="gift_msg">
                  {{ chatItem.msg }}
                </div>
              </div>
              <div v-show="chatItem.msgType == 1">
                <div class="user-name">{{ chatItem.msg.senderName }}</div>
                <img :src="chatItem.msg.senderAvatar" class="chat-avatar" />
              </div>
              <div class="chat-content" v-show="chatItem.msgType == 1">
                {{ chatItem.msg.content }}
              </div>
            </div>
          </div>
          <div class="comment-bar">
            <v-form ref="form" @submit.prevent>
              <v-text-field
                v-model="form.review"
                @keyup.enter="sendReview"
                placeholder="发送直播评论"
                density="compact"
                variant="solo"
                append-inner-icon="mdi-send"
              >
                <template v-slot:append>
                  <v-btn type="primary" @click="sendReview">发送</v-btn>
                </template>
              </v-text-field>
            </v-form>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="closeDialogVisible" max-width="500px" persistent>
    <v-card>
      <v-toolbar dark prominent>
        <v-toolbar-title>关闭直播</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="closeDialogVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text> 是否确认关闭直播间？ </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDialogVisible = false">取消</v-btn>
        <v-btn color="primary" text @click="closeLivingNow">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <recharge-card
    v-model="rechargeCardVisible"
    :current-balance="currentBalance"
    :pay-products="payProducts"
    :resetBalance="refreshBalance"
  />

  <div class="red-packet-container" v-show="showRedPacket"><red-packet-efficacy ref="efficacy" /></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { closeLiving, livingInfo, LivingRoomInitVO } from '@/api/living'
import { getImConfig, ImConfigVO } from '@/api/im'
import { useToast } from 'vue-toastification'
import router from '@/router'
import { userStore, livingStore } from '@/store'
import { storeToRefs } from 'pinia'
import { utf8ByteToUnicodeStr } from '@/utils/common'
import giftCardItem from '@/components/giftCardItem.vue'
import SVGA from 'svga.lite'
import { GiftConfigVO, GiftSendDTO, listGift, send } from '@/api/gift'
import { PayProductItemVO, payProductList } from '@/api/bank'
import rechargeCard from '@/components/rechargeCard.vue'
import { useRedPacket } from '@/hooks/useRedPacket'
import redPacketEfficacy from '@/components/redPacketEfficacy.vue'
import { watch } from 'vue'
const toast = useToast()
const userInfo = userStore()
const roomId = ref(-1)
const { user } = storeToRefs(userInfo)
const { redPacketConfigCode } = storeToRefs(livingStore())
// 从路由获取直播间id
const route = router.currentRoute.value
const { query } = route

const livingRoomInfo = ref<LivingRoomInitVO>()

const { redPacketInit, prepare, start, showRedPacket, efficacy, redPacketShow } = useRedPacket()

onMounted(() => {
  queryGiftList()
  roomId.value = Number(query.roomId)
  if (roomId.value === -1 || roomId.value === undefined || roomId.value === null) {
    console.log('获取直播间id失败')
    return
  }
  livingInfo(roomId.value, user.value.userId ? false : true).then((res) => {
    if (res.success) {
      console.log('获取直播间信息成功')
      livingRoomInfo.value = res.data
      redPacketConfigCode.value = livingRoomInfo.value.redPacketConfigCode
      connectImServer()
    } else {
      console.log('获取直播间信息失败')
      toast.error(res.message)
      router.push('/home')
    }
  })
  initSvga()
  getPayProducts()
})

// 使用watch监听showRedPacket值变化
watch(showRedPacket, (newVal) => {
  if (newVal) {
    console.log('showRedPacket', newVal)
  }
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})

const closeDialogVisible = ref(false)
const showCloseDialog = () => {
  closeDialogVisible.value = true
}
// 关闭直播间
const closeLivingNow = () => {
  closeLiving(roomId.value).then((res) => {
    if (res.success) {
      toast.success('关闭直播间成功')
      setTimeout(() => {
        router.push('/')
      }, 1000)
      closeDialogVisible.value = false
    } else {
      console.log('关闭直播间失败')
      toast.error(res.message)
      closeDialogVisible.value = false
    }
  })
}

// 连接IM服务
const imConfig = ref<ImConfigVO>()
const webSocket = ref<WebSocket>()
const connectImServer = async () => {
  let connectResult
  if (user.value.userId) {
    connectResult = await getImConfig()
  } else {
    connectResult = await getImConfig(true)
  }
  if (!connectResult.success) {
    console.log('获取IM配置失败')
    toast.error(connectResult.message)
    return
  }
  imConfig.value = connectResult.data
  const wsUrl = `ws://${imConfig.value.wsImServerAddress}?token=${imConfig.value.token}&userId=${
    user.value.userId ? user.value.userId : 0
  }&roomId=${roomId.value}`
  console.log(`WebSocket连接地址: ${wsUrl}`)
  webSocket.value = new WebSocket(wsUrl)
  webSocket.value.onopen = webSocketOnOpen
  webSocket.value.onclose = webSocketOnClose
  webSocket.value.onerror = webSocketOnError
  webSocket.value.onmessage = webSocketOnMessage
}

const webSocketOnOpen = () => {
  console.log('WebSocket连接成功')
}
const webSocketOnClose = () => {
  console.log('WebSocket连接关闭')
}
const webSocketOnError = (e: Event) => {
  console.log(e)
  console.log('WebSocket连接错误')
}
const webSocketOnMessage = (event: MessageEvent) => {
  console.log('WebSocket接收到消息')
  const wsData = JSON.parse(event.data)
  console.log(wsData)
  if (wsData.code === 1001) {
    startHeartBeat()
  } else if (wsData.code === 1003) {
    const respData = JSON.parse(utf8ByteToUnicodeStr(wsData.body))
    const respMsg = JSON.parse(respData.data)
    console.log(respData)
    if (respData.bizCode === 5555) {
      // 处理聊天消息
      console.log('收到聊天消息')
      const sendMsg = { content: respMsg.content, senderName: respMsg.senderName, senderAvatar: respMsg.senderAvatar }
      const msgWrapper = { msgType: 1, msg: sendMsg }
      console.log(sendMsg)
      chatList.value.push(msgWrapper)
    } else if (respData.bizCode === 5556) {
      //送礼成功
      console.log('收到送礼消息')
      playGiftSvga(respMsg.url)
    } else if (respData.bizCode === 5557) {
      console.log('送礼失败')
      toast.error(respMsg.msg)
    } else if (respData.bizCode === 5560) {
      console.log('开始红包雨')
      toast.success('开始红包雨')
      redPacketShow(respData.data)
    }
    sendAckCode(respData)
  }
}

const sendAckCode = (respData: any) => {
  //发送ack确认消息
  const jsonStr = { userId: livingRoomInfo.value?.userId, appId: 10001, msgId: respData.msgId }
  const bodyStr = JSON.stringify(jsonStr)
  const ackMsgStr = { magic: 19231, code: 1005, len: bodyStr.length, body: bodyStr }
  webSocketSend(JSON.stringify(ackMsgStr))
}

const webSocketSend = (msg: string) => {
  if (webSocket.value !== undefined) {
    webSocket.value.send(msg)
  }
}

const timer = ref()
const startHeartBeat = () => {
  console.log('首次登陆成功, 开始心跳')
  const jsonStr = JSON.stringify({ userId: user.value.userId, appId: 10001 })
  const heartBeatJsonStr = {
    magic: 19231,
    code: 1004,
    len: jsonStr.length,
    body: jsonStr
  }
  timer.value = setInterval(() => {
    webSocketSend(JSON.stringify(heartBeatJsonStr))
  }, 30000)
}

const chatList = ref([])
const form = ref({ review: '' })
// 发送弹幕
const sendReview = () => {
  if (user.value.userId === undefined || user.value.userId === null) {
    toast.error('请先登录')
    return
  }
  if (form.value.review === undefined || form.value.review === '' || form.value.review.length === 0) {
    // toast.error('评论内容不能为空')
    return
  }
  const sendMsg = {
    content: form.value.review,
    senderName: livingRoomInfo.value?.nickName,
    senderAvatar: livingRoomInfo.value?.avatar
  }
  const msgWrapper = { msgType: 1, msg: sendMsg }
  chatList.value.push(msgWrapper)

  //发送评论消息给到im服务器
  const msgBody = {
    roomId: roomId.value,
    type: 1,
    content: form.value.review,
    senderName: livingRoomInfo.value?.nickName,
    senderAvatar: livingRoomInfo.value?.avatar
  }
  console.log(livingRoomInfo.value)
  const jsonStr = { userId: livingRoomInfo.value?.userId, appId: 10001, bizCode: 5555, data: JSON.stringify(msgBody) }
  const bodyStr = JSON.stringify(jsonStr)
  const reviewMsg = { magic: 19231, code: 1003, len: bodyStr.length, body: bodyStr }
  console.log(reviewMsg)
  webSocketSend(JSON.stringify(reviewMsg))
  form.value.review = ''
}

// 礼物相关
const giftList = ref<GiftConfigVO[]>()
const queryGiftList = () => {
  listGift().then((res) => {
    if (res.success) {
      giftList.value = res.data
    }
  })
}

const canvas = ref()
const player = ref()
const parser = ref()
const downloader = ref()
const initSvga = () => {
  console.log(typeof canvas.value)
  player.value = new SVGA.Player(canvas.value)
  player.value.loop = 1
  downloader.value = new SVGA.Downloader()
  parser.value = new SVGA.Parser()
}
const playGiftSvga = async (url: string) => {
  player.value.clear()
  const svga = await downloader.value.get(url)
  const videoItem = await parser.value.do(svga)
  await player.value.mount(videoItem)
  player.value.start()
  player.value.$on('end', () => {
    player.value.clear()
    console.log('播放完毕')
  })
}
const sendGift = async (gift: GiftConfigVO) => {
  const params = {
    roomId: roomId.value,
    giftId: gift.giftId,
    senderUserId: user.value.userId,
    receiverId: livingRoomInfo.value?.anchorId,
    type: 0
  } as GiftSendDTO

  const result = await send(params)
  if (!result.success) {
    toast.error(result.message)
  }
  refreshBalance()
}

// 充值相关
const rechargeCardVisible = ref(false)
const currentBalance = ref(0)
const payProducts = ref<PayProductItemVO[]>()
const showBankInfoTab = () => {
  rechargeCardVisible.value = true
}
const getPayProducts = async () => {
  let res
  if (user.value.userId) {
    res = await payProductList(0)
  } else {
    res = await payProductList(0, true)
  }
  if (!res.success) {
    toast.error(res.message)
    return
  }
  currentBalance.value = res.data.currentBalance || 0
  payProducts.value = res.data.productList
}
// 刷新余额
const refreshBalance = () => {
  getPayProducts()
}

// 红包雨
const startSendRedPacket = async () => {
  start(livingRoomInfo.value!.anchorId, user.value.userId, livingRoomInfo.value!.redPacketConfigCode)
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
}
.full-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.talk-content-box {
  display: flex;
  flex-direction: column;
  height: 94%;
  background-color: white;
  overflow-y: scroll;
  border: solid 1px rgba(225, 225, 225, 0.37);
  border-radius: 3px;
}

.chat-content {
  margin-top: -30px;
  margin-left: 45px;
  /*position: relative;*/
  /*top: -34px;*/
  /*left: 50px;*/
  /*color: #0d0006;*/
  /*color: white;*/
  color: #666;
  padding: 4px 10px;
  width: fit-content;
  background-color: rgba(255, 230, 9, 0.65);
  border-radius: 5%;
  word-wrap: break-word;
  font-size: 13px;
  margin-right: 30px;
  margin-bottom: 10px;
}

.chat-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: solid 0px;
}
.user-name {
  margin-left: 35px;
  margin-bottom: -15px;
  font-size: 13px;
  padding: 1px 10px;
  /*width: fit-content;*/
  color: #8694ff;
  /*border-radius: 5%;*/
  /*border: 1px solid;*/
  /*background-color: #f19a0a;*/
}

.gift_msg {
  text-align: center;
  font-size: 9px;
  color: rgba(134, 134, 134, 0.74);
  margin-bottom: 8px;
}

.gift_content {
  margin-top: -10px;
  background-color: rgb(27, 14, 56);
  height: 200px;
}

.bank_tab {
  color: #ffbc2e;
  text-align: right;
  margin-right: 30px;
  position: relative;
  top: -23px;
  font-size: 14px;
  padding: 2px;
}

.gift_content_title {
  color: #ffa735;
  font-size: 16px;
  margin-left: 10px;
  padding-top: 10px;
  text-align: center;
}

.liveroom_top {
  display: flex;
  height: 100px;
  background-color: rgb(27, 14, 56);
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.anchor_img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 33px;
  margin-left: 25px;
  border: 2px solid #ff8f19;
}

.anchor_name {
  color: #ffad2c;
  margin-left: 25px;
  font-size: 13px;
  position: relative;
  top: 30px;
}

.anchor_label {
  display: inline-block;
  width: 23px;
  height: 23px;
  position: relative;
  top: 65px;
  left: -15px;
}

.comment-bar {
  height: 50px;
  box-sizing: border-box;
  padding: 5px;
}

.svga-wrap {
  position: absolute;
  z-index: 10;
  left: 50%;
  transform: translateX(-65%);
  top: 30%;
  height: 30%;
  width: 40%;
}

.gift-bar {
  z-index: 15;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}

.red-packet-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>

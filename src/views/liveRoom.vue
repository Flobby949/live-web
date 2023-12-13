<template>
  <v-container class="container">
    <v-row no-gutters>
      <v-col cols="12" md="9">
        <div class="full-container">
          <div class="liveroom_top">
            <div style="position: relative; top: -20px">
              <div class="anchor_name">
                <div style="display: inline-block">主播名称</div>
                <img src="@/assets/img/living.jpg" class="anchor_label" alt="" />
              </div>
              <img src="@/assets/img/anchor.jpeg" class="anchor_img" alt="" />
            </div>
            <v-btn style="background-color: #966bff; color: #fff" @click="showCloseDialog">关闭直播</v-btn>
          </div>
          <video width="100%" style="background-color: rgb(18, 9, 37); flex: 1">
            <!-- <source src="test.mp4"> -->
          </video>
          <div class="gift_content">
            <div class="gift_content_title">礼物面板</div>
            <div class="bank_tab">
              <span @click="showBankInfoTab()"> 钱包余额: </span>
              <span style="color: white">{{ accountInfo.currentBalance }}</span>
            </div>
            <div class="gift_item" v-for="(item, index) in giftList" :key="index">
              <img
                @click="sendGift(item.svgaUrl, item.giftId, item.giftName)"
                :src="item.coverImgUrl"
                class="gift_img"
                alt=""
              />
              <div class="gift_item_name">{{ item.giftName }}</div>
              <div class="gift_item_price">{{ item.price }}旗鱼币</div>
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
                <img :src="chatItem.msg.senderImg" class="chat-avatar" />
              </div>
              <div class="chat-content" v-show="chatItem.msgType == 1">
                {{ chatItem.msg.content }}
              </div>
            </div>
          </div>
          <div class="comment-bar">
            <v-form @submit.prevent ref="form">
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { closeLiving, livingInfo } from '@/api/living'
import { useToast } from 'vue-toastification'
import router from '@/router'
const toast = useToast()

const roomId = ref(-1)

// 从路由获取直播间id
const route = router.currentRoute.value
const { query } = route

onMounted(() => {
  console.log(route)
  roomId.value = Number(query.roomId)
  if (roomId.value === -1) {
    console.log('获取直播间id失败')
    return
  }
  livingInfo(roomId.value).then((res) => {
    if (res.success) {
      console.log('获取直播间信息成功')
      console.log(res.data)
    } else {
      console.log('获取直播间信息失败')
      toast.error(res.message)
      router.push('/home')
    }
  })
})

const closeDialogVisible = ref(false)
const showCloseDialog = () => {
  closeDialogVisible.value = true
}

const closeLivingNow = () => {
  closeLiving(roomId.value).then((res) => {
    if (res.success) {
      toast.success('关闭直播间成功')
      router.push('/home')
    } else {
      console.log('关闭直播间失败')
      toast.error(res.message)
    }
  })
}

const accountInfo = ref({ currentBalance: 0 })
const giftList = ref([
  { svgaUrl: 'url1', giftId: 1, giftName: '礼物1', coverImgUrl: 'cover1.jpg', price: 100 },
  { svgaUrl: 'url2', giftId: 2, giftName: '礼物2', coverImgUrl: 'cover2.jpg', price: 200 }
  // ...更多礼物
])
const showBankInfo = ref(false)
const payProducts = ref([
  { id: 1, name: '产品1', coinNum: 1000 },
  { id: 2, name: '产品2', coinNum: 2000 }
  // ...更多产品
])
const qrCode = ref('')
const showGiftRank = ref(false)
const rankList = ref([
  { index: 1, avatar: 'avatar1.jpg', nickname: '用户1', score: 500 },
  { index: 2, avatar: 'avatar2.jpg', nickname: '用户2', score: 400 }
  // ...更多排名
])
const chatList = ref([
  { msgType: 1, msg: { senderName: '用户A', senderImg: '@/assets/img/anchor.jpg', content: '你好啊' } },
  { msgType: 5, msg: '这是一个礼物消息' }
  // ...更多聊天消息
])
const form = ref({ review: '' })

// 方法定义
const showBankInfoTab = () => {
  console.log('显示银行信息标签页')
}

const hiddenBankInfoTabNow = () => {
  console.log('立即隐藏银行信息标签页')
}

const sendGift = (svgaUrl: string, giftId: number, giftName: string) => {
  console.log(`发送礼物: ${svgaUrl}, ${giftId}, ${giftName}`)
}

const chooseCoin = (id: number) => {
  console.log(`选择硬币: ${id}`)
}

const hiddenGiftRankNow = () => {
  console.log('隐藏礼物排行榜')
}

const sendReview = () => {
  if (form.value.review === undefined || form.value.review === '' || form.value.review.length === 0) {
    return
  }
  console.log('发送评论')
  form.value.review = ''
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
  flex: 1;
  background-color: white;
  overflow-y: scroll;
  border: solid 1px rgba(225, 225, 225, 0.37);
  border-radius: 3px;
  /*background-color: #272727*/
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

.gift_img {
  width: 80px;
  height: 80px;
  margin-left: 3px;
  border: 2px solid rgba(255, 255, 255, 0);
}

.gift_item {
  display: inline-block;
}

.gift_item_name {
  text-align: center;
  color: white;
  font-size: 15px;
}

.gift_item_price {
  text-align: center;
  color: #ffa84c;
  font-size: 12px;
}

.gift_img:hover {
  border: 2px solid #ffa925;
  border-radius: 5px;
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
</style>

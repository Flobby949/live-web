<template>
  <div class="nav-bar" ref="navbar">
    <v-row justify="space-between" align="center">
      <v-col cols="12" md="3">
        <router-link to="/" class="logo">
          <img src="@/assets/img/livingroom.jpg" class="top-logo" alt="" />
          <h1>旗鱼直播</h1>
        </router-link>
      </v-col>
      <v-col md="7">
        <v-btn
          v-for="(link, index) in navRouter"
          :key="index"
          color="white"
          variant="text"
          :prepend-icon="link.icon"
          rounded="lg"
        >
          <router-link :to="link.path">
            <span class="top-title"> {{ link.title }} </span>
          </router-link>
        </v-btn>
        <span>
          <input type="search" class="top-search-input" placeholder="输入你想查找的东西" />
        </span>
      </v-col>
      <v-col md="1">
        <v-btn v-if="user.isVip" color="white" elevation="0" @click="showLiveDialog"> 开播 </v-btn>
      </v-col>
      <v-col cols="12" md="1">
        <v-menu right top>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              <template v-slot:prepend>
                <v-avatar v-if="isLogin" size="x-small">
                  <v-img :src="user.avatar" alt="John"></v-img>
                </v-avatar>
              </template>
              {{ isLogin ? user.nickName : '去登录' }}
            </v-btn>
          </template>

          <v-list color="accent">
            <v-list-item v-if="isLogin" link>
              <v-list-item-title>个人中心</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title @click="doItem">{{ isLogin ? '退出登录' : '去登陆' }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <!-- 验证码登录对话框 -->
    <loginForm v-model:modelValue="loginDialogVisible" />
    <!-- 开播对话框 -->
    <liveDialog v-model:modelValue="liveDialogVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import loginForm from '../components/loginForm.vue'
import liveDialog from '../components/startLivingDialog.vue'
import { userStore } from '@/store'
import { storeToRefs } from 'pinia'
import { userLogout } from '@/api/user'
import { useToast } from 'vue-toastification'
import router from '@/router'
const toast = useToast()
const store = userStore()
// 导航栏路由
const navRouter = [
  {
    title: '直播间',
    path: '/',
    icon: 'mdi-home'
  },
  {
    title: '主播PK',
    path: '/home?type=1',
    icon: 'mdi-account'
  }
  // {
  //   title: '周边',
  //   path: '/',
  //   icon: 'mdi-account'
  // },
  // {
  //   title: '体育',
  //   path: '/',
  //   icon: 'mdi-account'
  // },
  // {
  //   title: '游戏',
  //   path: '/',
  //   icon: 'mdi-account'
  // }
]
const { isLogin, user } = storeToRefs(store)
// 登录 / 退出登录事件判断
// const isLogin = ref(false)
const loginDialogVisible = ref(false)
const doItem = () => {
  // 如果已经登录，点击退出登录
  if (isLogin.value) {
    // 退出操作
    userLogout()
      .then((res) => {
        if (res.success) {
          toast.success('退出成功', {
            timeout: 2000
          })
          router.push('/')
          store.logout()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    loginDialogVisible.value = true
  }
}

// 开播
const liveDialogVisible = ref(false)
const showLiveDialog = () => {
  liveDialogVisible.value = true
}
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 10;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 10px 20px;
  background-color: #ffd700;
}

.logo {
  display: flex;
  align-items: center;
}

.top-logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.top-title {
  color: #666;
  font-size: 18px;
}

.top-search-input {
  height: 40px;
  width: 200px;
  background-color: rgba(215, 215, 215, 0.642);
  padding: 5px 20px;
  margin-left: 80px;
  border-radius: 10px;
  position: relative;
  border: 0px;
  outline: none;
}
</style>

<template>
  <div class="nav-bar" ref="navbar">
    <v-row justify="space-between" align="center">
      <v-col cols="12" md="3">
        <router-link to="/" class="logo">
          <img src="@/assets/img/livingroom.jpg" class="top-logo" alt="" />
          <h1>旗鱼直播</h1>
        </router-link>
      </v-col>
      <v-col cols="12" md="8">
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
      <v-col cols="12" md="1">
        <v-menu right top>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list color="accent">
            <v-list-item link>
              <v-list-item-title>系统设置</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title @click="doItem">{{ isLogin ? '退出登录' : '去登陆' }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <!-- 验证码登录对话框 -->
    <v-dialog v-model="loginDialogVisible" max-width="500px" persistent>
      <v-card>
        <v-card-title class="headline font-weight-bold">登录</v-card-title>
        <v-card-text>
          <v-form ref="formRef">
            <v-text-field
              label="手机号"
              class="mb-4"
              v-model="loginForm.phone"
              :rules="rules.phone"
              outlined
              placeholder="请输入手机号"
              :style="{ 'font-size': '14px', color: '#666', 'border-color': '#ccc' }"
            />
            <v-row no-gutters>
              <v-col cols="8">
                <v-text-field
                  label="验证码"
                  v-model="loginForm.code"
                  :rules="rules.code"
                  outlined
                  placeholder="请输入验证码"
                  :style="{ 'font-size': '14px', color: '#666', 'border-color': '#ccc' }"
                />
              </v-col>
              <v-col cols="4" class="pl-2">
                <!-- 获取验证码 -->
                <v-btn
                  height="55"
                  min-width="140"
                  variant="tonal"
                  color="white"
                  @click="sendCode"
                  style="background-color: #75a99c"
                  :disabled="btnDisabled"
                >
                  {{ loginBtnInfo }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="loginDialogVisible = false">取消</v-btn>
          <v-btn color="primary" text @click="submit">登录</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 导航栏路由
const navRouter = [
  {
    title: '直播间',
    path: '/',
    icon: 'mdi-home'
  },
  {
    title: '主播PK',
    path: '/about',
    icon: 'mdi-account'
  },
  {
    title: '周边',
    path: '/',
    icon: 'mdi-account'
  },
  {
    title: '体育',
    path: '/',
    icon: 'mdi-account'
  },
  {
    title: '游戏',
    path: '/',
    icon: 'mdi-account'
  }
]

// 登录 / 退出登录事件判断
const isLogin = ref(false)
const loginDialogVisible = ref(false)
const doItem = () => {
  console.log(isLogin.value)
  // 如果已经登录，点击退出登录
  if (isLogin.value) {
    // 退出操作
  } else {
    loginDialogVisible.value = true
  }
}

/// 登录业务
// 发送验证码
const loginBtnInfo = ref<string>('获取验证码')
const lastTime = ref<number>(60)
const interval = ref(0)
const btnDisabled = ref(false)
const sendCode = () => {
  btnDisabled.value = true
  // 发送验证码
  loginBtnInfo.value = '发送中(' + lastTime.value + ')'
  // 倒计时
  interval.value = setInterval(() => {
    lastTime.value--
    loginBtnInfo.value = `${lastTime.value}秒后重新获取`
    if (lastTime.value <= 0) {
      clearInterval(interval.value)
      loginBtnInfo.value = '获取验证码'
      lastTime.value = 60
      btnDisabled.value = false
    }
  }, 1000)
}

// 表单校验
const loginForm = ref({
  phone: '',
  code: ''
})

const rules = {
  phone: [(v) => !!v || '手机号是必填项', (v) => /^1[3-9]\d{9}$/.test(v) || '请输入有效的手机号'],
  code: [(v) => !!v || '验证码是必填项', (v) => v.length === 6 || '验证码长度必须是6位']
}

const formRef = ref()
const submit = () => {
  const valid = formRef.value.validate()
  if (!valid) {
    return
  }
  // 提交表单
  console.log(loginForm)
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
  width: 400px;
  background-color: rgba(215, 215, 215, 0.642);
  padding: 5px 20px;
  margin-left: 80px;
  border-radius: 10px;
  position: relative;
  border: 0px;
  outline: none;
}
.v-dialog .v-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-dialog .headline {
  color: #007bff; /* 更鲜艳的蓝色 */
}

.v-dialog .v-text-field .v-label {
  color: #4a4a4a; /* 深灰色，增加对比 */
}

.v-dialog .v-btn {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-dialog .v-btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
}
</style>

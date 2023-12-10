<template>
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
        <v-btn color="primary" text @click="submit" :loading="loginLoading">登录</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { UserLoginDto, userLogin, UserLoginResult } from '@/api/user'
import { getHomePageUserInfo } from '@/api/home'
import { sendVerifyCode } from '@/api/system'
import { useToast } from 'vue-toastification'
import { ResponseData } from '@/utils/request'
import { userStore } from '@/store'
const toast = useToast()
const store = userStore()
const props = defineProps({
  modelValue: Boolean
})

const emits = defineEmits(['update:modelValue'])

const loginDialogVisible = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    loginDialogVisible.value = newVal
  }
)

watch(loginDialogVisible, (newVal) => {
  emits('update:modelValue', newVal)
})

/// 登录业务
// 发送验证码
const loginBtnInfo = ref<string>('获取验证码')
const lastTime = ref<number>(60)
const interval = ref(0)
const btnDisabled = ref(false)
const sendCode = () => {
  if (loginForm.value.phone === '') {
    toast.error('手机号不能为空', {
      timeout: 2000
    })
    return
  }
  btnDisabled.value = true
  // 发送验证码
  loginBtnInfo.value = '发送中(' + lastTime.value + ')'
  sendVerifyCode(loginForm.value.phone).then((res: ResponseData<UserLoginResult>) => {
    if (res.success) {
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
    } else {
      // 发生失败提示
      loginBtnInfo.value = '获取验证码'
      btnDisabled.value = false
      toast.error(res.message, {
        timeout: 2000
      })
    }
  })
}

// 表单校验
const loginForm = ref<UserLoginDto>({
  phone: '18962521753',
  code: ''
})

const rules = {
  phone: [(v) => !!v || '手机号是必填项', (v) => /^1[3-9]\d{9}$/.test(v) || '请输入有效的手机号'],
  code: [(v) => !!v || '验证码是必填项', (v) => v.length === 4 || '验证码长度必须是4位']
}

const formRef = ref()
const loginLoading = ref(false)
const submit = async () => {
  const valid = await formRef.value.validate()
  if (!valid.valid) {
    console.log('表单校验失败')
    return
  }
  loginLoading.value = true
  // 提交表单
  const loginRes = await userLogin(loginForm.value)
  if (!loginRes.success) {
    // 登录失败
    toast.error(loginRes.message, {
      timeout: 2000
    })
    loginLoading.value = false
    return
  }
  // 保存token
  store.setToken(loginRes.data.token)
  // 获取信息
  const userInfoRes = await getHomePageUserInfo()
  if (userInfoRes.success) {
    store.saveUserInfo(userInfoRes.data)
    toast.success('登录成功', {
      timeout: 2000
    })
    lastTime.value = -1
    loginDialogVisible.value = false
    loginForm.value.code = ''
  } else {
    // 移除token
    store.removeToken()
    toast.error(userInfoRes.message, {
      timeout: 2000
    })
  }
  loginLoading.value = false
}
</script>

<style scoped>
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

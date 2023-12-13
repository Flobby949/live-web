<template>
  <v-dialog v-model="liveDialogVisible" max-width="500px" persistent>
    <v-card>
      <v-toolbar dark prominent>
        <v-toolbar-title>选择直播间类型</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="liveDialogVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn height="72" min-width="164" @click="goLive(0)"> 普通直播间 </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn height="72" min-width="164" @click="goLive(1)"> PK 直播间 </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { startLiving } from '@/api/living'
import { useToast } from 'vue-toastification'
import router from '@/router'
const toast = useToast()
const props = defineProps({
  modelValue: Boolean
})

const emits = defineEmits(['update:modelValue'])

const liveDialogVisible = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    liveDialogVisible.value = newVal
  }
)

watch(liveDialogVisible, (newVal) => {
  emits('update:modelValue', newVal)
})

// 开播
const goLive = async (type: number) => {
  const res = await startLiving(type)
  if (res.success) {
    toast.success('开播成功', {
      timeout: 2000
    })
    liveDialogVisible.value = false
    router.push('/liveRoom?roomId=' + res.data)
  } else {
    toast.error(res.message, {
      timeout: 2000
    })
  }
}
</script>

<style scoped></style>

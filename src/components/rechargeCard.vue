<template>
  <v-dialog v-model="rechargeCardVisible" persistent max-width="500px">
    <v-card>
      <v-toolbar dark>
        <v-spacer></v-spacer>
        <v-btn icon @click="rechargeCardVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <div class="recharge_tab">
        <div style="height: 60px">
          <span
            ><img
              src="@/assets/img/livingroom.jpg"
              alt=""
              style="width: 40px; height: 40px; position: relative; top: 15px; left: 10%"
            />
            <span style="position: relative; left: 12%; top: 5px">在线充值</span>
            <span style="position: relative; left: 50%; top: 5px"
              >当前余额：<span style="color: #f37d08"
                ><b>{{ currentBalance }}</b></span
              ></span
            >
          </span>
        </div>
        <div style="text-align: center">
          <span v-for="item in payProducts" :key="item.id">
            <button class="recharge_btn" @click="payProduct(item.id)" :id="item.id">
              {{ item.name }}<br />
              <span class="coin_um">{{ item.coinNum }}旗鱼币</span>
            </button>
          </span>
        </div>
        <div style="height: 50px" v-show="qrCode == ''"></div>
        <div style="height: 250px" v-show="qrCode != ''">
          <div style="text-align: center">
            <img src="@/assets/img/qr-code.png" style="height: 180px; width: 180px" alt="" />
            <div style="font-size: 13px; color: #a4a4a4">
              请使用
              <img
                style="display: inline-block; width: 13px; height: 13px; position: relative; top: 1px"
                src="@/assets/img/zfb.jpg"
              />
              支付宝/
              <img
                style="display: inline-block; width: 13px; height: 13px; position: relative; top: 1px"
                src="@/assets/img/wx.jpg"
              />
              微信 扫码支付
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { PayProductItemVO, pay } from '@/api/bank'
import { useToast } from 'vue-toastification'
const toast = useToast()
const qrCode = ref('111')
const props = defineProps({
  payProducts: {
    type: Array as PropType<PayProductItemVO[]>,
    required: false
  },
  currentBalance: {
    type: Number as PropType<number>,
    required: true,
    default: 0
  },
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  }
})

const payProduct = async (productId: number) => {
  const params = {
    productId: productId,
    payChannel: 1,
    paySource: 1
  }
  const res = await pay(params)
  if (res.success) {
    toast.success('充值成功，请稍后查看余额')
  } else {
    toast.error(res.message)
  }
  rechargeCardVisible.value = false
}

const rechargeCardVisible = ref(props.modelValue)
watch(
  () => props.modelValue,
  (newVal) => {
    rechargeCardVisible.value = newVal
  }
)
const emits = defineEmits(['update:modelValue'])
watch(rechargeCardVisible, (newVal) => {
  emits('update:modelValue', newVal)
})
</script>

<style scoped>
.recharge_btn {
  font-size: 14px;
  color: #666;
  background-color: #f3f3f3;
  padding: 20px;
  border: 0px;
  margin: 20px;
  width: 20%;
}

.recharge_btn:hover {
  background-color: orange;
  color: white;
  transition: all 0.3s;
}

.coin_um {
  font-size: 12px;
}
</style>

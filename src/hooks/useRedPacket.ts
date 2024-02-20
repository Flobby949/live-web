import { prepareRedPacket, StartRedPacketDTO, startRedPacket, getRedPacket } from '@/api/living'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { livingStore } from '@/store'
import { storeToRefs } from 'pinia'

export const useRedPacket = () => {
  const toast = useToast()
  const redPacketInit = ref(false)
  const prepare = async (roomId: number) => {
    const res = await prepareRedPacket(roomId)
    if (res.success) {
      toast.success('红包数据初始化完成')
      redPacketInit.value = true
    } else {
      toast.error(res.message)
      redPacketInit.value = false
    }
  }

  const start = async (anchorId: number, userId: number, code: string) => {
    const dto: StartRedPacketDTO = {
      anchorId,
      userId,
      redPacketConfigCode: code
    }
    const res = await startRedPacket(dto)
    if (res.success) {
      toast.success('红包雨已开始')
    } else {
      toast.error(res.message)
    }
  }

  const redPacketFlag = ref(false)
  const { showRedPacket, redPacketConfigCode } = storeToRefs(livingStore())
  const efficacy = ref()
  const redPacketShow = (respData: string) => {
    if (redPacketFlag.value) {
      return
    }
    redPacketFlag.value = true
    const respMsg = JSON.parse(respData)
    const config = JSON.parse(respMsg.redPacketConfig)
    showRedPacket.value = true
    efficacy.value.createDom(config.totalCount)
  }

  const totalMoney = ref(0)

  const getRedPacketData = async (): Promise<number> => {
    const res = await getRedPacket(redPacketConfigCode.value)
    if (res.success) {
      console.log(res.data)
      return res.data.price
    } else {
      toast.error(res.message)
      return 0
    }
  }

  return {
    redPacketInit,
    prepare,
    start,
    showRedPacket,
    efficacy,
    redPacketShow,
    totalMoney,
    getRedPacketData
  }
}

import { defineStore } from 'pinia'

export const livingStore = defineStore('livingStore', {
  state: () => ({
    roomId: -1
  }),
  actions: {
    setRoomId(val: number) {
      this.roomId = val
    },
    closeLiving() {
      this.roomId = -1
    }
  }
})

<template>
  <div class="gift_item">
    <img :src="gift.coverImgUrl" class="gift_img" alt="" />
    <div class="gift_item_name">{{ gift.giftName }}</div>
    <div class="gift_item_price">{{ gift.price }}旗鱼币</div>
  </div>
</template>

<script setup lang="ts">
import { GiftConfigVO } from '@/api/gift'

defineProps({
  gift: {
    type: Object as () => GiftConfigVO,
    required: true
  }
})
</script>

<style scoped>
.gift_img {
  width: 80px;
  height: 80px;
  margin-left: 3px;
  border: 2px solid rgba(255, 255, 255, 0);
}

.gift_item {
  padding: 5px;
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
</style>

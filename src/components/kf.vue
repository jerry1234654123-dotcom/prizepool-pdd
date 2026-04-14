<template>
  <div class="kf">

    <div class="kfIcon" v-if="kf.telegram" @click="openKf('tg')">
      <img src="@/assets/images/tg.png" alt="">
    </div>
    <div class="kfIcon" v-if="kf.ws" @click="openKf('ws')">
      <img src="@/assets/images/ws.png" alt="">
    </div>
    <div class="kfIcon" v-if="kf.customer" @click="openKf('kf')">

      <DImg :src="homeType === '0' ? '@/assets/images/kf.png' : '@/assets/images/kf1.png'"/>
    </div>
    <div class="kfIcon" v-if="kf.pop" @click="openKf('pop')">
      <img src="@/assets/images/pop.jpg" alt="">
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {getDict} from "@/utils/api.js";
import { useConfig } from "@/config";
import DImg from "@/components/img.vue";

const { homeType, platformId } = useConfig()
const kf = ref('')
const handleGetKf = async () => {
  const rsp = await getDict({platform_id: platformId, k: 'help_me'})
  if (rsp.code === 0) {
    const t = JSON.parse(rsp.data.v)
    kf.value = t
  }
}
const openKf = (type) => {

  let url = ''
  switch (type) {
    case 'tg':
      url = kf.value.telegram;
      break;
    case 'kf':
      url = kf.value.customer;
      break;
    case 'ws':
      url = kf.value.ws;
      break;
    case 'pop':
      url = kf.value.pop;
      break;
  }
  window.open(url)
}
onMounted(() => {
  handleGetKf()
})
</script>

<style scoped lang="scss">
.kf {
  position: fixed;

  right: 10px;
  top: 55%;
  z-index: 3;


  img {
    width: 44px;
    //height: 44px;
    //border-radius: 100%;
  }
}
</style>
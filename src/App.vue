<template>

  <div>
    <Suspense>
      <router-view/>
    </Suspense>
    <Kf></Kf>
    <GuidePopup></GuidePopup>
    <Overlay :show="loading">
      <div class="wrapper">
        <Loading type="spinner" color="#1989fa" vertical>{{ $t('processing') }}</Loading>
      </div>
    </Overlay>
  </div>
</template>


<script setup>
import Kf from '/src/components/kf.vue'
import GuidePopup from '/src/components/guidePopup.vue'
import { Overlay, Loading } from 'vant';
import { loading } from '@/App'
</script>


<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

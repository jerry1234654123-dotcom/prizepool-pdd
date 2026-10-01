<template>
  <!-- 引导弹窗：仅 platformId 2100 / 1084 展示，不可关闭 -->
  <Overlay :show="show" :z-index="9999" :lock-scroll="true">
    <div class="guide-wrapper">
      <div class="guide-card" @click.stop>
        <img class="guide-banner" :src="bannerImg" alt="Peti Harta" />
        <div class="guide-title">🎉 Angpao Segera Bergabung dengan Peti Harta!</div>
        <ul class="guide-list">
          <li v-for="(item, i) in items" :key="i">
            <span class="emoji">{{ item.icon }}</span>
            <span class="text">{{ i + 1 }}. {{ item.text }}</span>
          </li>
        </ul>
        <div class="guide-btn" @click="handleGo">Kunjungi Sekarang</div>
      </div>
    </div>
  </Overlay>
</template>

<script setup>
import { Overlay } from 'vant'
import { useConfig } from '@/config'
import bannerImg from '@/assets/images/guide_petiharta.webp'

const TARGET_URL = 'https://petiharta15.com'
// 需要展示引导弹窗的平台
const GUIDE_PLATFORMS = [2100, 1084]

const { platformId } = useConfig()
const show = GUIDE_PLATFORMS.includes(Number(platformId))

const items = [
  { icon: '💰', text: 'Bonus Deposit & Taruhan!' },
  { icon: '💣', text: 'Mainkan Peti Ranjau!' },
  { icon: '🔑', text: 'Kumpulkan Kunci & Buka Petinya!' },
  { icon: '🎲', text: 'Mainkan Dadu & Raih Hadiah!' },
  { icon: '🎡', text: 'Putar Roda & Klaim Kejutan!' },
  { icon: '📅', text: 'Absen Harian & Dapatkan Bonus!' },
  { icon: '💎', text: 'Jadi Agen & Raih Komisi Tim!' },
]

const handleGo = () => {
  window.location.href = TARGET_URL
}
</script>

<style scoped lang="scss">
.guide-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}

.guide-card {
  width: 100%;
  max-width: 343px;
  background: linear-gradient(180deg, #0f5a2b 0%, #0a3d1d 100%);
  border: 2px solid #e8c25a;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  color: #fff;
}

.guide-banner {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.guide-title {
  padding: 12px 10px 6px;
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
  color: #ffd86b;
  text-align: center;
  white-space: nowrap;
}

.guide-list {
  margin: 0;
  padding: 0 16px;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    padding: 4px 0;
    font-size: 13px;
    line-height: 18px;
  }

  .emoji {
    width: 22px;
    flex-shrink: 0;
    font-size: 14px;
  }

  .text {
    flex: 1;
  }
}

.guide-btn {
  margin: 12px 16px 16px;
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  background: linear-gradient(180deg, #ffe08a 0%, #f0b232 50%, #d8921a 100%);
  color: #5a2d00;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4px 12px rgba(240, 178, 50, 0.45);
  cursor: pointer;

  &:active {
    transform: scale(0.97);
  }
}

</style>

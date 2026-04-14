<template>
  <Overlay :show="props.show" @click="handleClose">
    <canvas id="giftCanvas"/>
    <div class="wrapper">
      <div class="content" @click.stop>
        <div class="header">
          <!-- {{ $t("prizeRsp") }} {{ $t("myRecordDetails.issue") }} {{ props.giftData.issue }} -->
          {{ props.giftData.status === 5 ? $t('congratulations') : $t('unfortunately') }}
        </div>
        <div class="body">
          <img class="giftImg" :src="props.giftData.status ===5?props.giftData.prize_icon:missGift" alt="">
          <div class="giftName">{{ props.giftData.status === 5 ? props.giftData.prizeName: $t('fighting') }}</div>
        </div>
        <div class="jumpDetail" @click="jumpDetail">{{ $t("myRecordDetails.showDetails") }}</div>
      </div>
    </div>
  </Overlay>
</template>
<script setup>
import {Overlay} from 'vant'
import {
  ConfettiEjector,
  CanvasRender,
} from 'confetti-ts-canvas';
import {onMounted, ref} from "vue";
import router from "@/router/index.js";
import missGift from '@/assets/images/err.png'
const jumpDetail = () => {
  router.push({
    path: '/record_issue',
    query: {issue: props.giftData.issue}
  })
}

const props = defineProps({
  show: Boolean,
  giftData: Object
})
const emit = defineEmits(['close'])
const handleClose = (type) => {
  emit("close", type)
}

const canvasRender = ref(null);
const canvas = ref(null)
const setCanvas = () => {
  canvasRender.value = new CanvasRender()
  canvas.value = document.getElementById('giftCanvas')
  const ctx = canvas.value.getContext('2d')


  canvasRender.value.init(
      //必填 CanvasContext
      ctx,
      //可选填入
      {
        width: canvas.value.width,
        height: canvas.value.height,
      },
      //以下参数全部可选填入
      {
        onFinished() {

        },
        displayFps: false,
        grivaty: 1,
      }
  );
  open()
}

onMounted(() => {
  setCanvas()

})


const open = () => {
  const pao = new ConfettiEjector(canvasRender.value, {
    limitAngle: [225, 315],//喷发角度区间[-∞,+∞]
    count: 200,//喷发纸片数量
  });
  const boom = pao.create({
    x: Math.random() * 15,
    y: Math.random() * 15,//喷发位置
    clampforce: [20, 60],//喷发力度
    radius: 10,//纸片大小
  });
  pao.fire(boom);

}


</script>

<style scoped lang="scss">
#giftCanvas {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 1;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  z-index: 2;

  .content {
    width: 327px;
    background: url("../img/ruleBg.png") no-repeat;
    background-size: 100% 100%;
    padding-bottom: 30px;

    .header {
      text-transform: uppercase;
      margin-top: 80px;
      font-weight: 900;
      background: linear-gradient(180deg, #FFFFFF 15.24%, #FEE140 32.07%, #FEBC40 53.36%, #FEBB40 63.66%, #CB8A0B 71.56%, #DED427 80.49%, #B5AD1F 86.67%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      -webkit-text-stroke: .5px #0E2C1C; /* 白色描边 */
      text-stroke: .5px #0E2C1C;
      text-align: center;
      font-size: 24px;
      line-height: 24px;
    }

    .body {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .giftImg {
        width: auto;
        height: 125px;
      }
      .giftName {
        font-size: 26px;
        line-height: 26px;
        font-weight: 900;
        text-align: center;
        color: #FFFFFF;
      }
    }

    .jumpDetail {
      font-size: 16px;
      color: #F79009;
      text-align: center;
      margin-top: 12px;
      text-decoration-line: underline;
    }
  }
}

</style>
<template>
  <Overlay :show="props.show" @click="handleClose">
    <canvas id="giftCanvas"/>
    <div class="wrapper">
      <div class="content" @click.stop>
        <div class="header">
          {{ $t("prizeRsp") }} {{ $t("myRecordDetails.issue") }} {{ props.giftData.issue }}
        </div>
        <div class="body">
          <div class="left">
            <div class="text">{{ props.giftData.status === 5 ? $t('congratulations') : $t('unfortunately') }}</div>
            <div class="gift1" v-if="props.giftData.status === 5">
              <div>{{ $t('zj.text1') }}</div>
              <div class="gift">{{ props.giftData.prizeName }}</div>
            </div>
            <div class="text1" v-else>{{ $t('fighting') }}</div>
          </div>
          <div class="right">
            <img :src="props.giftData.status ===5?props.giftData.prize_icon:missGift" alt="">
          </div>
        </div>
        <div class="zj" v-if="props.giftData.status === 5">{{ $t('zj.text2') }}</div>
        <div class="btns">
          <div class="left" @click="share">{{ $t("myRecordDetails.showDetails") }}</div>
          <div class="right" @click="handleClose">{{ $t('continue') }}</div>
        </div>
      </div>
    </div>
  </Overlay>
</template>
<script setup>

import {Overlay, Field, CellGroup} from 'vant'
import {
  ConfettiEjector,
  CanvasRender,
  CustomShape
} from 'confetti-ts-canvas';
import {onMounted, onUpdated, ref} from "vue";
import {handleShare} from "@/utils/index.js";
import router from "@/router/index.js";
import missGift from '@/assets/images/err.png'
const share = () => {
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
    width: 345px;
    height: 388px;
    background: url("@/assets/images/oepnBg.png") no-repeat;
    background-size: 100% 100%;

    .header {
      padding-top: 80px;
      padding-left: 37px;
      font-size: 14px;
      color: #222445;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .body {
      display: flex;
      flex-direction: row;
      align-items: start;
      justify-content: space-between;
      padding: 0 37px;
      margin-bottom: 20px;

      .left {
        flex: 1;
        margin-right: 20px;

        .text {
          font-size: 28px;
          font-style: italic;
          color: #222445;
          margin-bottom: 3px;
        }

        .text1 {
          font-size: 14px;

          color: #222445;

        }

        .gift {
          padding: 9px 12px;
          border-radius: 24px;
          background: linear-gradient(#FCFEED, #EBFFA1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #041B2B;
          font-size: 13px;
        }
      }

      .right {
        max-width: 110px;
        max-height: 110px;
        flex: 1;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .zj {
      text-align: center;
      margin-bottom: 5px;
    }

    .btns {
      padding: 0 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        width: 116px;
        height: 57px;
        background: url("@/assets/images/signLeftBtn.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 14px;
        font-weight: 600;
      }

      .right {
        width: 174px;
        height: 57px;
        background: url("@/assets/images/signRightBtn.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 14px;
        font-weight: 600;

      }
    }
  }
}

</style>
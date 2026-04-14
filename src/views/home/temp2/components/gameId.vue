<template>
  <Overlay :show="props.show" @click="handleClose">
    <div class="wrapper">
      <div class="content" @click.stop>
        <div>
          <div class="tit">     {{$t('gameId.tit')}}</div>
          <div class="des">
            <div>
              {{$t('gameId.des')}}

            </div>
            <div>
              <Field style="border-radius: 6px;" v-model="prompt1" autofocus :placeholder="$t('input.gameId')"
              ></Field>
            </div>
            <div class="btn" @click="handleBtn">
              <div class="inner">{{$t('gameId.btn')}}</div>
            </div>
          </div>
        </div>
        <img src="@/assets/images/close.png" alt="" class="close-btn" @click="handleClose">
      </div>
    </div>
  </Overlay>
</template>
<script setup>

import {Overlay, Field, CellGroup, showToast} from 'vant'
import {ref} from "vue";
import {setGameId} from "@/utils/api.js";
const prompt1 = ref('')
const props = defineProps({
  show: Boolean
})
const handleBtn = async () => {
  const rsp = await setGameId({gameId: prompt1.value})
  if (rsp.code === 0) {
    showToast('Penyiapan berhasil~!')
    handleClose(1)
  } else {
    showToast(rsp.msg)
  }
}

const emit = defineEmits(['close'])
const handleClose = (type) => {
  emit("close", type)
}



</script>

<style scoped lang="scss">

:deep(.van-cell) {
  padding: 8px 0px;
}

:deep(.van-field__control::placeholder) {
  font-size: 14px;
  color: #041B2B;
}

:deep(.van-field) {
  border-bottom: 1px solid #E8E8E8;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .content {
    position: relative;
    width: 328px;
    //height: 362px;
    background: url("../img/ruleBg.png") no-repeat;
    background-size: 100% 100%;
    .close-btn {
      position: absolute;
      bottom: -38px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
    }
    > div {
      padding: 96px 22px 28px;
    }

    .tit {
      font-size: 20px;
      font-weight: 600;
      color: #fdce3f;
      text-align: center;
    }
    .des {
      margin-top: 8px;
      color: #fff;
    }
    p {
      font-size: 12px;
      color: #041b2b;
      margin-top: 10px;
    }


  }
}

.btn {
  margin: 20px auto 0;
  width: 245px;
  height: 55px;
  color: #005C1C;
  border-radius: 33px;
  background-image: url("../img/b2.png");
  background-size: 100% 100%;
}
.inner {
  text-align: center;
  font-size: 24px;
  line-height: 55px;
  font-weight: 700;
  background: linear-gradient(180deg, #FCE761 37.5%, #FF8800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
</style>
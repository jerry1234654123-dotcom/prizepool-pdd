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
              {{$t('gameId.btn')}}
            </div>
          </div>
        </div>
        <!-- <img src="@/assets/images/close.png" alt="" class="close-btn" @click="handleClose"> -->
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
    width: 96vw;
    //height: 362px;
    background: url("@/assets/images/rule3Bg.png") no-repeat;
    background-size: 100% 100%;
    .close-btn {
      position: absolute;
      bottom: -38px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
    }
    > div {
      padding: 96px 50px 30px;
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
  margin-top: 20px;
  width: 270px;
  height: 44px;
  color: white;
  border-radius: 33px;
  background: #266EFE;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
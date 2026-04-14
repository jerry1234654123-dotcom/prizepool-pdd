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
              <Field v-model="prompt1" autofocus :placeholder="$t('input.gameId')"
              ></Field>
            </div>
            <div class="btn" @click="handleBtn">
              {{$t('gameId.btn')}}
            </div>
            <!--            <p> -->
            <!--            </p>-->
            <!--            <p>-->
            <!--              {{ $t('rule.p2') }}-->
            <!--            </p>-->
          </div>
        </div>

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
    width: 345px;
    //height: 362px;
    background: url("@/assets/images/loginBg.png") no-repeat;
    background-size: 100% 100%;

    > div {
      padding: 50px 40px;
    }

    .tit {
      font-size: 20px;
      font-weight: 600;
      color: #041B2B;
      /* 使用 text-shadow 实现描边效果，兼容性更好 */
      text-shadow: 
        -1px -1px 0 #ffffff,
        1px -1px 0 #ffffff,
        -1px 1px 0 #ffffff,
        1px 1px 0 #ffffff;
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
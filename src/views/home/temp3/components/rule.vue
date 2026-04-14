<template>
  <Overlay :show="props.show" @click="handleClose">
    <div class="wrapper">
      <div class="content" @click.stop>
        <div>
          <div class="tit">{{ ruleType === 1? $t('rule.tit'):$t('depositTit') }}</div>
          <div class="des"  >
             <div v-html="props.rule"></div>
          </div>
        </div>
        <!-- <img src="@/assets/images/close.png" alt="" class="close-btn" @click="handleClose"> -->
      </div>

    </div>
  </Overlay>
</template>
<script setup>

import {Overlay, Field, CellGroup} from 'vant'

const props = defineProps({
  show: Boolean,
  rule: String,
  ruleType:Number
})

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
      //margin-top: 30px;
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
      color: #fff;
      margin-top: 10px;
    }


  }
}

</style>
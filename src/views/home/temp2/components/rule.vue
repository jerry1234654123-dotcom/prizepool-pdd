<template>
  <Overlay :show="props.show" @click="handleClose">
    <div class="wrapper">
      <div class="content" @click.stop>
        <div>
          <div class="tit">{{ ruleType === 1? $t('rule.tit'):$t('depositTit') }}</div>
          <div class="des"  >
             <div v-html="props.rule"></div>
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
    width: 324px;
    //height: 362px;
    background: url("../img/ruleBg.png") no-repeat;
    background-size: 100% 100%;

    > div {
      padding: 100px 22px 35px;
    }

    .tit {
      font-size: 24px;
      font-weight: 600;
      background: linear-gradient(180deg, #FFFFFF 15.24%, #FEE140 32.07%, #FEBC40 53.36%, #FEBB40 63.66%, #CB8A0B 71.56%, #DED427 80.49%, #B5AD1F 86.67%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      -webkit-text-stroke: .5px #0E2C1C; /* 白色描边 */
      text-stroke: .5px #0E2C1C;
      text-align: center;

    }

    .des {
      color: white;
      font-size: 12px;
    }


  }
}

</style>
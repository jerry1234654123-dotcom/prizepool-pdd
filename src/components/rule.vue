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
    }

    p {
      font-size: 12px;
      color: #041b2b;
      margin-top: 10px;
    }


  }
}

</style>
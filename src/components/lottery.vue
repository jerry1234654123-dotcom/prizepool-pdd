<template>
  <Overlay :show="props.show"  >
    <div class="wrapper">
      <div class="content" >
        <div class="tit">
          <div class="left"><img src="@/assets/images/star.png" alt=""></div>
          <div class="right"><img src="@/assets/images/star.png" alt=""></div>
          <div>{{ $t("lottery.tit") }}</div>
        </div>
        <div class="prizeList">
          <div class="left">
            <div>{{ $t('lottery.prizeTit') }}</div>
          </div>
          <div class="right">
            <swiper :modules="modules"  class="swiper" :space-between="10" :slides-per-view="5"  :autoplay="{delay:1000,disableOnInteraction:false}">
              <swiper-slide class="slide" v-for="(item,index) in list" :key="index">
                <img :src="item.icon" alt="">
              </swiper-slide>

            </swiper>
          </div>
        </div>
        <div class="prizeListTit">{{ $t('lottery.prizeListTit') }} </div>
        <div class="prizeData">
          <div class="item" v-for="index of 9 " :key="index"  @click="handleClose">
                 <div class="btn">{{$t("lottery.prizeBtn")}}</div>
          </div>
        </div>


      </div>
    </div>
  </Overlay>
</template>
<script setup>
import SwiperClass, {Pagination,Autoplay} from 'swiper'
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import {Overlay, Field, CellGroup} from 'vant'
import {ref} from "vue";


const props = defineProps({
  show: Boolean,
  list: Object
})

const modules = ref([Pagination,Autoplay])

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
    width: 344px;
    height: 481px;
    background: url("@/assets/images/cjBg.png") no-repeat;
    background-size: 100% 100%;

    .tit {
      width: 265px;
      height: 20px;
      border-radius: 21px;
      background: #29B5FE;
      margin: 5px auto;
      font-size: 13px;
      font-weight: 400;
      display: flex;
      align-items: center;
      color: white;
      justify-content: center;
      position: relative;

      img {
        width: 11px;
        height: 11px;
      }

      .left {
        position: absolute;
        left: 10px;
      }

      .right {
        position: absolute;
        right: 10px;
      }
    }

    .prizeList {
      width: 294px;
      height: 58px;
      border-radius: 17px;
      margin: 12px auto 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 10px;

      .left {
        width: 17px;
        height: 48px;
        background: linear-gradient(#FD32AA, #F88F93);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        border-radius: 7px;
        font-size: 6px;
        color: white;

        > div {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }

      }
      .right{
        position: relative;
        width: 250px;
        margin-left: 10px;
        .slide{
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            max-width: 40px;
            max-height: 37px;
          }
        }
      }

    }
    .prizeListTit{
      font-size: 13px;
      color: white;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 21px;
      margin-bottom: 11px;
    }
    .prizeData{
      width: 318px;
      height: 321px;
      display: flex;
      justify-content: space-between;
      padding: 10px 15px ;
      flex-wrap: wrap;
      align-items: center;
      margin: auto;
      .item{
        width: 86px;
        height: 86px;
        background: url("@/assets/images/gk.png");
        background-size: 100% 100%;
        .btn{
          width: 48px;
          height: 18px;
          border-radius: 9px;
          background: white;
          color: #2877FE;
          font-size: 8px;
          display: flex;
          justify-content: center;
          align-items: center;

          margin: 60px auto 0px;
        }
      }
    }
  }
}



</style>
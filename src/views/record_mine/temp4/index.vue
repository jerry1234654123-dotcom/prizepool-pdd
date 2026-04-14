<template>

  <main>
    <div class="content">
      <header>
        <div class="back" @click="goBack">
          <img src="@/assets/images/back2.png" alt="">
        </div>
        <div class="tit">{{ $t('myRecord') }}</div>
      </header>
      <div class="body">
        <div class="tit">
          <div>{{ $t('myRecordDetails.issue') }}</div>
          <div>{{ $t('myRecordDetails.prizeName') }}</div>
          <div>{{ $t('myRecordDetails.status') }}</div>
          <div>{{ $t('myRecordDetails.opa') }}</div>

        </div>
        <div class="list">
          <div class="item" v-for="(item,index) in list" @click="routerPush('/record_issue',item.issue)" :key="index">
            <div>{{ item.issue }}</div>
            <div>{{ item.prizeName || '-' }}</div>
            <div>
              <div :class="getStatusClass(item.status)">{{ getStatusDiv(item.status) }}</div>
            </div>
            <div>{{ $t('myRecordDetails.showDetails') }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import {useRouter} from "vue-router";
import { useMyRecord, useStatus } from "../myRecord.data";

const router = useRouter()
const { list, routerPush } = useMyRecord()
const { getStatusDiv, getStatusClass } = useStatus()
const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
main {
  width: 100vw;
  height: 100vh;
  background-color: #002B22;

  .content {
    background-image: url(./img/bg.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    min-height: 100vh;
    header {
      width: 354px;
      height:60px;
      margin: auto;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .back {
        width: 40px;
        height: 40px;
        position: absolute;
        left: 0;
        top: 11px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .tit {
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
    }

    .body {
      width: 354px;
      min-height: 258px;
      margin: auto;

      .list {
        .item:nth-child(2n + 1) {
          background: rgba(0,0,0,0.2);
        }
        .item:nth-child(2n) {
          background: rgba(255,255,255,0.2);
        }

        .item {
          height: 42px;
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 10px;
          font-weight: 600;
          color: white;
          flex-direction: row;


          > div {
            width: 25%;
            text-align: center;
            display: flex;
            justify-content: center;

            .status1, .status3 {
              padding: 0 4px;
              height: 21px;
              background: #FFF9E6;
              border-radius: 22px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 108;
              color: #F1AB3D;
            }

            .status4 {
              padding: 0 4px;
              height: 21px;
              background: #FFE6E6;
              border-radius: 22px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 8px;
              color: #EB3E2F;
            }

            .status2, .status5 {
              padding: 0 4px;
              height: 21px;
              background: #E6FFF1;
              border-radius: 22px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 8px;
              color: #009B19;
            }
          }


        }
      }

      .tit {
        height: 42px;
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #76200D;
        flex-direction: row;
        background: linear-gradient(180deg, #FCDA61 37.5%, #EE8A54 100%);
        border-radius: 10px 10px 0 0;
        div {
          width: 25%;
          text-align: center;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
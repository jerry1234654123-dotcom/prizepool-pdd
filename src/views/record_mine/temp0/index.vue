<template>

  <main>
    <div class="content">
      <header>
        <div class="back" @click="goBack">
          <img src="@/assets/images/back1.png" alt="">
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
  background: url('@/assets/images/recordBg.png');
  background-size: 100% 100%;

  .content {
    header {
      width: 345px;
      padding: 16px 0px;
      margin: auto;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .back {
        width: 8px;
        height: 14px;
        position: absolute;
        left: 0;
        top: 18px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .tit {
        font-size: 15px;
        font-weight: 600;

      }
    }

    .body {
      width: 100%;
      min-height: 258px;
      border-radius: 10px;
      border: 1px solid white;
      background: #D6EEFF;
      margin: auto;

      .list {
        > div:nth-child(2n-1) {
          background: white;
        }

        .item {
          height: 42px;
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 10px;
          font-weight: 600;
          color: #041B2B;
          flex-direction: row;


          > div {
            width: 25%;
            text-align: center;
            display: flex;
            justify-content: center;

            .status1, .status3 {
              width: 48px;
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
              width: 48px;
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
              width: 48px;
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
        font-weight: 600;
        color: #000000;
        flex-direction: row;

        div {
          width: 25%;
          text-align: center;
        }


      }
    }
  }
}
</style>
<template>

  <main>
    <div class="content">
      <header>
        <div class="back" @click="goBack">
          <img src="@/assets/images/back1.png" alt="">
        </div>
        <div class="tit">{{$t('logs')}}</div>
      </header>
      <div class="body">
        <div class="tit">
          <div>id</div>
          <div>{{$t('logsDetails.activityName')}}</div>
          <div>{{$t('logsDetails.des')}}</div>
          <div>{{$t('logsDetails.times')}}</div>


        </div>
        <div class="list">
          <div class="item" v-for="(item,index) in list" :key="index">
            <div>{{ item.id }}</div>
            <div>{{ item.activityName }}</div>
            <div>{{ item.note }}</div>

            <div :class="item.point>0?'success':'err'">{{ item.point }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import {useRouter} from "vue-router";
import useRecord from "../record.data";
const router = useRouter()
const { list } = useRecord()
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
          font-size: 12px;
          font-weight: 600;
          color: #041B2B;
          flex-direction: row;


          div {
            width: 25%;
            text-align: center;
          }

          .success {
            color: #009B19;
          }

          .err {
            color: #ED5346;
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
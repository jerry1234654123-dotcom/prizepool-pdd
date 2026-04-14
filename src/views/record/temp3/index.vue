<template>

  <main>
    <div class="content">
      <header>
        <div class="back" @click="goBack">
          <img src="@/assets/images/back2.png" alt="">
        </div>
        <!-- <div class="tit">{{$t('logs')}}</div> -->
        <div class="tit"><img src="./img/title.png" alt=""></div>
      </header>
      <div class="body">
        <div class="tit">
          <div>ID</div>
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
  width: 96vw;
  height: 100vh;
  margin: 0 auto;
  background: url('./img/bg.png');
  background-size: 100% 100%;

  .content {
    header {
      width: 96vw;
      padding: 16px 0px;
      margin: auto;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .back {
        width: 30px;
        position: absolute;
        left: 0;
        top: 10px;

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
      width: 96vw;
      min-height: 258px;
      border-radius: 10px;
      background: #D6EEFF;
      margin: auto;

      .list {
        max-height: 80vh;
        overflow-y: auto;
        > div:nth-child(2n-1) {
          background: #edf6fd;
        }

        .item {
          height: 42px;
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          color: #00418A;
          background: rgba(0, 65, 138, 0.1);
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
        color: #fff;
        flex-direction: row;
        background:linear-gradient(180deg, #47ADFF 37.5%, #0572C9 100%);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        div {
          width: 25%;
          text-align: center;
        }


      }
    }
  }
}
</style>
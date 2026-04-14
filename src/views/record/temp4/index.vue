<template>

  <main>
    <div class="content">
      <header>
        <div class="back" @click="goBack">
          <img src="@/assets/images/back2.png" alt="">
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
  background-color: #002B22;
  .content {
    background-image: url(./img/bg.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    min-height: 100vh;
    header {
      height:60px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0,0,0,.2); 
      
      .back {
        width: 40px;
        height: 40px;
        position: absolute;
        left: 10px;
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
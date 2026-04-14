<template>

  <main>
    <div class="content">
      <header>
        <div class="back" @click="goBack">
          <img src="@/assets/images/back2.png" alt="">
        </div>
        <div class="tit">{{$t('myRecordDetails.issue')}}</div>
      </header>
      <div class="sub_title">{{route.query.issue}}</div>
      <div class="body">
        <div class="tit">
          <div>{{ $t('title.name') }}</div>
          <div>{{ $t('title.status') }}</div>
          <div>{{ $t('title.prizeName') }}</div>

        </div>
        <div class="list">
          <div class="item" v-for="(item,index) in periodInformation.users" :key="index">
            <div class="prizeUserDetails">
              <div class="avatar">
                <img :src="item.icon" alt="">
              </div>
              <div class="name">{{ item.account }}</div>
            </div>
            <div :class="item.status === '4' ? 'status2':item.status === '3' ? 'status1' : item.status === '5' ?'status3':'' " class="status">
              {{ item.status === '4' ?  $t("status.status4") : item.status === '3' ?  $t("status.status3")  : item.status === '5' ? $t("status.status5") :'' }}
            </div>
            <div class="prizeName">
              {{ item.prize_name || '-' }}
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import {useRoute, useRouter} from "vue-router";
import useRecordIssue from "../recordIssue.data"
const { periodInformation } = useRecordIssue()
const route = useRoute()
const router = useRouter()
const goBack = () => {
  router.back()          
}

</script>

<style lang="scss" scoped>
main {
  width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(180deg, #59211E 0%, #402726 100%);

  .content {
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
    .sub_title {
      margin-top: -12px;
      margin-bottom: 12px;
      text-align: center;
      font-size: 12px;
      line-height: 12px;
      background: linear-gradient(180deg, #FCE761 37.5%, #FF8800 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
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
          &>div:nth-child(1) {
            width: 40%;
          }
          &>div:nth-child(2) {
            width: 20%;
          }
          &>div:nth-child(3) {
            width: 40%;
          }
          .status {
            font-size: 10px;
            width: 48px;
            height: 21px;
            border-radius: 22px;
          }

          .status1 {
            color: #F1AB3D;
            background: #FFF9E6;
          }

          .status2 {
            color: #EB3E2F;
            background: #FFE6E6;
          }

          .status3 {
            color: #009B19;
            background: #E6FFF1;
          }


          > div {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .prizeUserDetails {
            display: flex;
            flex-direction: row;


            .avatar {
              width: 24px;
              height: 24px;
              border-radius: 100%;
              overflow: hidden;
              margin-right: 4px;

              img {
                width: 100%;
                height: 100%
              }
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
          width: 33.33333%;
          text-align: center;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
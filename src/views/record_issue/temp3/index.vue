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
  margin: 0 auto;
  background: url('./img/bg.png');
  background-size: 100% 100%;

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
        background: linear-gradient(180deg, #FAFCF3 15.24%, #FAFEFD 47.18%, #BCFDFD 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        -webkit-text-stroke: .2px #004960;
        text-stroke: .2px #004960;

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
      background: linear-gradient(180deg, #FAFCF3 15.24%, #FAFEFD 47.18%, #BCFDFD 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .body {
      width: 354px;
      min-height: 258px;
      margin: auto;
      border-radius: 10px;
      background: #D6EEFF;
      .list {
        .item:nth-child(2n + 1) {
          background: #edf6fd;
        }
        // .item:nth-child(2n) {
        //   background: rgba(255,255,255,0.2);
        // }
        
        .item {
          height: 42px;
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 10px;
          font-weight: 600;
          color: #00418A;
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
        color: #fff;
        flex-direction: row;
        background:linear-gradient(180deg, #47ADFF 37.5%, #0572C9 100%);
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
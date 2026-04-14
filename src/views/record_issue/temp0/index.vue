<template>

  <main>
    <div class="content">
      <header>
        <div class="back" @click="goBack">
          <img src="@/assets/images/back1.png" alt="">
        </div>
        <div class="tit">{{$t('myRecordDetails.issue')}}{{route.query.issue}}</div>
      </header>
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
      width: 345px;
      min-height: 258px;
      border-radius: 10px;
      border: 1px solid white;
      background: #D6EEFF;
      margin: auto;

      .list {
        .item:nth-child(2n) {
          background: #D9F4FF;
        }

        .item:nth-child(2n+1) {
          background: #C8E8FF;
        }

        .item {
          display: flex;
          flex-direction: row;
          height: 33px;
          font-size: 12px;
          align-items: center;

          :nth-child(2n+1) {
            width: 40%
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

          :nth-child(2) {
            width: 20%
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
        font-weight: 600;
        color: #000000;
        flex-direction: row;

        div {
          width: 33%;
          text-align: center;
        }


      }
    }
  }
}
</style>
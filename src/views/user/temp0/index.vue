<template>
  <main>
    <div class="mask"></div>
    <!--    <header>-->
    <!--      <div class="back" @click="goBack">-->
    <!--        <img src="@/assets/images/back1.png" alt="">-->
    <!--      </div>-->
    <!--      <div class="tit">用户中心</div>-->
    <!--    </header>-->
    <div class="content">
      <div class="userInfo">
        <div class="left">
          <div class="avatar">
            <img :src="userStore.userIcon" alt="">
          </div>
          <div class="userDetails">
            <div class="name">{{ userStore.userInfo.account }}</div>
            <div class="sign">{{ $t('signTimes') }}{{ userStore.userInfo.finish_of_sign_in }}</div>
          </div>
        </div>
        <div class="right">
          <img src="@/assets/images/signHead.png" alt="">
        </div>
      </div>
      <div class="signBody">
        <div class="header">
          <DImg class="daySign" src="@/assets/images/daySign.png" alt=""/>
        </div>
        <div class="signContent">
          <div class="header">
            <div class="left" @click="handleChangeMonth(0)">
              <img src="@/assets/images/left.png" alt="">
            </div>
            <div class="text">{{ getLangMonth(signMonthDetails.month) }}</div>
            <div class="right" @click="handleChangeMonth(1)">
              <img src="@/assets/images/right.png" alt="">
            </div>
          </div>
          <div class="body">
            <div class="item" v-for="(item,index) in signMonthDetails.list" :key="index">
              <div class="days" :class="item.status ===1?'status1':''">{{ item.day }}</div>
              <div class="status">

                <div class="can"
                     v-if="item.day === today.day && signMonthDetails.month === today.month && userStore.userInfo.sign_in_today === 0">
                  {{ $t('canSign') }}
                </div>
                <div class="notYet" v-else-if="item.status === 0">{{ $t("noSign") }}</div>
                <div class="yes" v-else>
                  <img src="@/assets/images/d.png" alt="">
                </div>
              </div>
            </div>
            <div class="signBtn" @click="goSign">{{ $t('check') }}</div>
          </div>
        </div>
        <div class="btns">
          <div class="left" @click="share">
            <div>{{ $t('share') }}</div>
          </div>
          <div class="right" @click="push('/')">
            <!--            <div class="start">{{ $t('join') }}</div>-->
            <div class="times">{{ $t('signText') }}{{
                userStore.userInfo.point_of_prize_pool
              }}/{{ userStore.userInfo.finish_of_sign_in }}
            </div>
          </div>
        </div>
      </div>

    </div>
<!--    <div class="record">-->
<!--      <div class="header">-->
<!--        <div class="img">-->
<!--          <img src="@/assets/images/rectangle.png" alt="">-->
<!--        </div>-->
<!--        <div>{{ $t('openRecord') }}</div>-->
<!--      </div>-->
<!--      <div class="navigation" @click="push('record')">-->
<!--        <div class="text">{{ $t('logs') }}</div>-->
<!--        <div class="icon">-->
<!--          <img src="@/assets/images/nv.png" alt="">-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="navigation" @click="push('myRecord')">-->
<!--        <div class="text">{{ $t('myRecord') }}</div>-->
<!--        <div class="icon">-->
<!--          <img src="@/assets/images/nv.png" alt="">-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="loginOut" @click="handleLoginOut">{{ $t('loginOut') }}</div>
  </main>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/userInfo.js";
import {onMounted, reactive, ref} from "vue";
import VueSocialSharing from 'vue-social-sharing'
import {handleShare, mGetDate, storage} from "@/utils/index.js";
import { useConfig } from "@/config";
import {getPointLogs, handleSign} from "@/utils/api.js";
import {showToast} from "vant";
import DImg from '@/components/img.vue'
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const { platformId, sign } = useConfig()
const userStore = useUserStore()

const router = useRouter()

const today = {
  month: new Date().getMonth() + 1,
  day: new Date().getDate()
}


const getLangMonth = (i) => {
  return t(`month[${i - 1}]`)
}


const signMonthDetails = reactive({
  month: new Date().getMonth() + 1,
  days: mGetDate(new Date().getMonth() + 1),
  list: []
})

const share = () => {
  const local = location.origin
  console.log(location)
  handleShare(`${local}?user_code=${userStore.userInfo.user_code}`)
}

const handleChangeMonth = (type) => {
  if (type === 0) {
    if (signMonthDetails.month > 1) {
      signMonthDetails.month = signMonthDetails.month - 1
      signMonthDetails.days = mGetDate(signMonthDetails.month)
      handleGetPointLogs()
    }
  } else {
    if (signMonthDetails.month < 12 && signMonthDetails.month !== new Date().getMonth() + 1) {
      signMonthDetails.month = signMonthDetails.month + 1
      signMonthDetails.days = mGetDate(signMonthDetails.month)
      handleGetPointLogs()

    }
  }
}

const handleLoginOut = () => {
  storage.clean()
  router.replace('/')
}

const goBack = () => {
  router.back()
}
const push = (path) => {
  router.push(path)
}
const handleGetPointLogs = async () => {
  const month = signMonthDetails.month < 10 ? '0' + signMonthDetails.month.toString() : signMonthDetails.month;
  const days = signMonthDetails.days < 10 ? '0' + signMonthDetails.days.toString() : signMonthDetails.days;
  const year = new Date().getFullYear()
  const startTime = `${year}-${month}-01 00:00:00`
  const endTime = `${year}-${month}-${days} 00:00:00`
  const data = {
    page: 0,
    size: 31,
    platform_id: platformId,
    activity_id: sign,
    begin: startTime,
    end: endTime
  }
  const rsp = await getPointLogs(data)
  if (rsp.code === 0) {
    const list = rsp.data.list
    signMonthDetails.list = []
    for (let i = 1; i <= signMonthDetails.days; i++) {
      signMonthDetails.list.push({
        day: i,
        status: 0
      })
      list.some((item) => {
        const date = new Date(item.createdAt).getDate()
        if (date === i && item.activityId === sign) {
          signMonthDetails.list[i - 1].status = 1
          return true
        }
      })

    }
  }

}

const signFlag = ref(false)
const goSign = async () => {
  if (signFlag.value === true) {
    return
  }
  if (userStore.userInfo.sign_in_today === 1) {
    showToast(t('prompt.alreadySign'));
    return
  }
  signFlag.value = true
  const rsp = await handleSign()
  signFlag.value = false
  if (rsp.code === 0) {
    showToast(t('prompt.signSuccess'));
    await userStore.handleGetUserInfo()
    await handleGetPointLogs()
  } else {
    showToast(rsp.msg)
  }
}
onMounted(() => {

  handleGetPointLogs()
})


</script>
<style scoped lang="scss">
main {
  width: 100vw;
  height: 100%;
  padding-bottom: 20px;
  background: #DFF1FF;
  position: relative;

  > .mask {
    width: 100%;
    height: 333px;
    position: absolute;
    background: url("@/assets/images/mask.png");
    background-size: 100% 100%;
    left: 0;
    top: 0;
    z-index: 1
  }

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

  .content {
    width: 345px;
    padding-top: 16px;
    margin: auto;

    .userInfo {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 2;

      .left {
        display: flex;
        flex-direction: row;
        align-items: center;

        .avatar {
          width: 59px;
          height: 59px;
          border-radius: 100%;
          overflow: hidden;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .userDetails {
          .name {
            font-size: 14px;
            font-weight: 600;
            color: #041B2B;
          }

          .signTimes {
            font-size: 12px;
            font-weight: 400;
            color: #333333;
          }
        }
      }

      .right {
        width: 157px;
        height: 125px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .signBody {
      height: 562px;
      background: linear-gradient(#A1DAFF, #7BABFE, #98C5EE);
      border-radius: 20px;
      position: relative;
      top: -13px;
      z-index: 1;

      > .header {
        height: 70px;
        background: url("@/assets/images/newSignBg.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: 16px;

        .daySign {
          margin-top: 12px;
          margin-left: 16px;
          width: 245px;
          height: 55px;
        }
      }

      .signContent {
        width: 315px;
        height: 397px;
        margin: auto;
        border-radius: 10px;
        border: 1px solid #FFFFFF;
        background: #4D62F8;
        overflow: hidden;

        .header {
          height: 44px;
          background: linear-gradient(#A3CAFF, #6CAAFF);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: white;
          font-size: 15px;

          img {
            width: 8px;
            height: 14px;
          }

          .left {
            margin-left: 12px;
          }

          .right {
            margin-right: 12px;
          }
        }

        .body {
          display: flex;
          flex-wrap: wrap;
          padding: 14px;


          .item {
            margin-bottom: 10px;
            margin-right: 19px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;

            .days {
              width: 22px;
              height: 22px;
              border-radius: 100%;
              background: url('@/assets/images/nSign.png') no-repeat;
              display: flex;
              align-items: center;
              justify-content: center;
              background-size: 100% 100%;
              color: white;
              font-size: 10px;
              margin-bottom: 5px;
            }

            .status1 {
              background: url('@/assets/images/aSign.png') no-repeat;
              background-size: 100% 100%;
            }

            .status {
              color: white;
              font-size: 8px;

              .notYet {

                width: 24px;
                height: 14px;
                display: flex;
                justify-content: center;
                border-radius: 12px;
                background: #839FFF;
              }

              .yes {
                width: 14px;
                height: 14px;
                background: #01C10A;
                border-radius: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                  width: 6px;
                  height: 4px;
                }
              }

              .can {
                font-size: 8px;
                width: 24px;
                height: 14px;
                display: flex;
                justify-content: center;
                border-radius: 12px;
                background: #AB74FF;
                color: white;
              }
            }
          }

          :nth-child(7n) {
            margin-right: 0;
          }

          .signBtn {
            width: 290px;
            height: 44px;
            margin: 21px auto 0;
            background: url('@/assets/images/signBtn.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            padding-top: 10px;
            font-size: 14px;
            font-weight: 600;
            color: white;
          }
        }

      }

      .btns {
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .left {
          width: 112px;
          height: 55px;
          background: url("@/assets/images/signLeftBtn.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: 600;


        }

        .right {
          width: 168px;
          height: 55px;
          background: url("@/assets/images/signRightBtn.png");
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          justify-content: center;

          .start {
            font-size: 10px;
            font-weight: 600;
            margin-top: 10px;
          }

          .times {
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
    }
  }

  .record {
    width: 345px;
    height: 141px;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    margin: 6px auto 0;

    .header {
      padding-top: 15px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: baseline;
      justify-content: left;
      color: #041B2B;

      .img {
        width: 5px;
        height: 15px;
        margin-right: 9px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }


    .navigation {
      margin-top: 24px;
      font-size: 13px;
      font-weight: 400;
      display: flex;
      justify-content: space-between;

      .text {
        margin-left: 14px;
      }

      .icon {
        width: 7px;
        height: 12px;
        margin-right: 14px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .loginOut {
    width: 345px;
    height: 44px;
    margin: 21px auto 0;
    background: #b4b4b4;
    border-radius: 30px;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: white;
  }

}
</style>
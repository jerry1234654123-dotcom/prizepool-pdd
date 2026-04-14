<template>
  <main>
    <div class="mask"></div>
    <div class="content">
      <header>
        <div class="back" @click="goBack">
          <img src="@/assets/images/back2.png" alt="">
        </div>
        <div class="tit"><img src="./img/title.png" alt=""></div>
      </header>
      <div class="text-issue"><img src="./img/text.png" alt=""></div>
      <div class="signBody">

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
          <van-skeleton :row="7" :loading="signMonthDetails.list.length === 0">
            <template #template>
              <div class="body">
                <van-skeleton-avatar v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]" :ley="i" class="item" />
              </div>
            </template>
            <div class="body">
            <div class="item" v-for="(item,index) in signMonthDetails.list" :key="index">
              <div class="days" :class="item.status ===1?'status1':'status0'">{{ item.day }}</div>
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
          </div>
          </van-skeleton>
          
        </div>
        <div class="signBtn" @click="goSign">
          <img src="./img/check.png" alt="">
        </div>
        <div class="btns">
          <div class="left" @click="share">
            <div>{{ $t('share') }}</div>
          </div>
          <div class="right" @click="push('/')">
            <div class="times">{{ $t('signText1') }}<br/>{{ $t('signText1') }}{{
                userStore.userInfo.point_of_prize_pool
              }}/{{ userStore.userInfo.finish_of_sign_in }}
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- <div class="loginOut" @click="handleLoginOut">{{ $t('loginOut') }}</div> -->
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
  height: 100vh;
  padding-bottom: 20px; 
  background: #DFF1FF;
  background: url("./img/bg.png");
  background-size: 100% 100%;
  position: relative;
  .text-issue {
    text-align: center;
    padding-top: 8px;
  }
  header {
      width: 96vw;
      margin: auto;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .back {
        width: 30px;
        position: absolute;
        left: 0;
        top: -4px;

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
    padding-top: 28px;
    margin: auto;

    .signBody {
      
      position: relative;
      top: 30px;
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
        //height: 397px;
        margin: auto;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.3); 
        overflow: hidden;

        .header {
          height: 44px;
          background: linear-gradient(180deg, #47ADFF 37.5%, #0572C9 100%);
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
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          padding: 14px;
          gap: 10px;


          .item {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;

            .days {
              width: 26px;
              height: 26px;
              border-radius: 100%;
              background: url('./img/nSign.png') no-repeat;
              display: flex;
              align-items: center;
              justify-content: center;
              background-size: 100% 100%;
              color: #fff;
              font-size: 14px;
              line-height: 14px;
              margin-bottom: 5px;
              font-weight: 700;
            }
            .status0 > span {
              color: #FFFFFF;
              text-shadow: 
              -1px -1px 0 #8F8F8F,
              1px -1px 0 #8F8F8F,
              -1px 1px 0 #8F8F8F,
              1px 1px 0 #8F8F8F;
            }
            .status1 {
              color:  #B03722;
              background: url('./img/aSign.png') no-repeat;
              background-size: 100% 100%;
            }

            .status {
              color: white;
              font-size: 8px;
              line-height: 14px;
              .notYet {
                width: 30px;
                height: 14px;
                display: flex;
                justify-content: center;
                border-radius: 12px;
                background: #0D94FF;
;
              }

              .yes {
                display: block;
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
                width: 32px;
                height: 14px;
                display: flex;
                justify-content: center;
                border-radius: 12px;
                background: #FFC000;
                color: white;
              }
            }
          }

          :nth-child(7n) {
            margin-right: 0;
          }
        }

      }
      .signBtn {
        margin: 26px auto 0;
        text-align: center;
      
      }
      .btns {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin-top: 15px;
        padding: 0 24px;
        .left {
          width: 136px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: 600;
          background: linear-gradient(196.82deg, #DD90FC 6.23%, #8F68FE 74.23%);
          box-shadow: 0.72px 0.72px 1.43px 0px #00000040;
          box-shadow: -0.72px -1.43px 1.43px 0px #FFFFFF40 inset;
          border-radius: 24px;

        }

        .right {
          width: 136px;
          height: 38px;
          line-height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: 600;
          background: linear-gradient(196.82deg, #FEB24F 6.23%, #FD6A22 74.23%);
          box-shadow: 0.72px 0.72px 1.43px 0px #00000040;
          box-shadow: -0.72px -1.43px 1.43px 0px #FFFFFF40 inset;
          border-radius: 24px;

          .start {
            font-size: 10px;
            font-weight: 600;
            margin-top: 10px;
          }

          .times {
            font-size: 12px;
            font-weight: 400;
            text-align: center;

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
    margin: 50px auto 0;
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
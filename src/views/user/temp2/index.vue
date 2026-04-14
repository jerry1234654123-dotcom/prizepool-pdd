<template>
  <main>
    <header class="header">
      <div class="back click" @click="goBack">
        <img src="@/assets/images/back2.png" alt="">
      </div>
      <div class="tit">Daily Check-in</div>
    </header>
    <div class="content">
      <div class="sub_title">Get a lucky draw chance every time you sign in</div>
      <div class="signBody">
        <div class="signContent">
          <div class="header">
            <div class="left" @click="handleChangeMonth(0)">
              <van-icon name="arrow-left" size="6vw" color="#76200D" />
            </div>
            <div class="text">{{ getLangMonth(signMonthDetails.month) }}</div>
            <div class="right" @click="handleChangeMonth(1)">
              <van-icon name="arrow" size="6vw" color="#76200D" />
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
                <div class="days" :class="item.status ===1?'status1':'status0'">
                  <span>{{ item.day }}</span>
                </div>
                <div class="status">

                  <div
                    v-if="item.day === today.day && signMonthDetails.month === today.month && userStore.userInfo.sign_in_today === 0"
                    class="can"
                    >
                    {{ $t('canSign') }}
                  </div>
                  <div class="notYet" v-else-if="item.status === 0">{{ $t("noSign") }}</div>
                  <img v-else class="yes" src="./img/d.png" alt="">
                </div>
              </div>
            </div>
          </van-skeleton>
          
        </div>
        <div class="signBtn click" :class="loading?'loading':''" @click="goSign">
          <div class="inner">{{ $t('check') }}</div>
        </div>
        <div class="btns">
          <div class="left click" @click="share">
            <div>{{ $t('share') }}</div>
          </div>
          <div class="right click" @click="push('/')">
            {{ $t('signText') }}{{
              userStore.userInfo.point_of_prize_pool
            }}/{{ userStore.userInfo.finish_of_sign_in }}
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/userInfo.js";
import {onMounted, reactive, ref} from "vue";
import { mGetDate } from "@/utils/index.js";
import { useConfig } from "@/config";
import {getPointLogs, handleSign} from "@/utils/api.js";
import {showToast} from "vant";
import {useI18n} from "vue-i18n";
import { useShare } from "../user.data.js";
const {t} = useI18n()
const { platformId, sign } = useConfig()
const userStore = useUserStore()
const { share } = useShare()
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

const loading = ref(false)
const goSign = async () => {
  if (loading.value === true) {
    return
  }
  if (userStore.userInfo.sign_in_today === 1) {
    showToast(t('prompt.alreadySign'));
    return
  }
  loading.value = true
  const rsp = await handleSign()
  loading.value = false
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
  min-height: 100vh;
  padding-bottom: 20px;
  background-image: linear-gradient(180deg, #59211E 0%, #402726 100%);
  position: relative;

  .header {
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
    margin: auto;
    .sub_title {
      text-align: center;
      font-size: 12px;
      line-height: 12px;
      background: linear-gradient(180deg, #FCE761 37.5%, #FF8800 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    .signBody {
      margin-top: 12px;
      height: 562px;
      border-radius: 20px;

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
        // height: 397px;
        margin: auto;
        border-radius: 10px;
        background: rgba(30, 30, 30, 0.3);
        overflow: hidden;

        .header {
          width: 100%;
          height: 42px;
          background: linear-gradient(180deg, #FCDA61 37.5%, #EE8A54 100%);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: #76200D;
          font-size: 14px;
          padding: 0 12px;
        }
        .text {
          font-weight: 600;
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
              color: white;
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
              background: url('./img/aSign.png') no-repeat;
              background-size: 100% 100%;
            }
            .status1 > span {
              color: #FDE277;
              
              text-shadow: 
              -1px -1px 0 #B03722,
              1px -1px 0 #B03722,
              -1px 1px 0 #B03722,
              1px 1px 0 #B03722;
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
                background: #885640;
                color: #C3AA9F;
              }

              .yes {
                display: block;
                width: 14px;
                height: 14px;
              }

              .can {
                font-size: 8px;
                width: 30px;
                height: 14px;
                display: flex;
                justify-content: center;
                border-radius: 12px;
                background: #FFC000;
                color: #FFFFFF;
              }
            }
          }
        }
      }

      .signBtn {
        width: 245px;
        height: 55px;
        margin: 21px auto 0;
        background: url('./img/signInBg.png') no-repeat;
        background-size: 100% 100%;
        .inner {
          text-align: center;
          font-size: 24px;
          line-height: 55px;
          font-weight: 700;
          background: linear-gradient(180deg, #FCE761 37.5%, #FF8800 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }

      .btns {
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        
        color: white;
        font-size: 12px;
        line-height: 14px;
        font-weight: 600;

        .left {
          width: 120px;
          height: 34px;
          background: linear-gradient(196.82deg, #DD90FC 6.23%, #8F68FE 74.23%);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .right {
          width: 120px;
          height: 34px;
          background: linear-gradient(196.82deg, #FEB24F 6.23%, #FD6A22 74.23%);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
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
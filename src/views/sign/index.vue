<template>
  <div class="content">
    <header>
      <div class="back" @click="goBack">
        <img src="@/assets/images/back.png" alt="">
      </div>
      <div class="tit">签到</div>
    </header>
    <main>
      <div class="signTit">
        <img src="@/assets/images/signTit.png" alt="">
      </div>
      <div class="signCenter">
        <div class="signTimes">
          已累计签到 <span> 7 </span> 天，可抽奖 <span> 7 </span> 次
        </div>
        <div class="signContent">
          <div class="signDays">
            <div class="signDay" v-for="(item,index) in signDays" :key="index">
              <div class="days"><span>{{ item.day }}</span>天</div>
              <div class="signImg">
                <img v-if="item.status === 1" src="@/assets/images/qd1.png" alt="">
                <img v-else src="@/assets/images/qd2.png" alt="">
              </div>
              <div class="status">
                <div class="statusSuccess" v-if="item.status === 1">
                  <img src="@/assets/images/d.png" alt="">
                </div>
                <div class="statusError" v-else>
                  未签
                </div>
              </div>
            </div>


          </div>
          <div class="signBtn">
            签到
          </div>
        </div>
      </div>
      <div class="signBottom">
        <div class="signBottomHead">
          <div class="text">签到奖励</div>
          <div class="img">
            <img src="@/assets/images/frame.png" alt="">
          </div>
        </div>
        <div class="lottery">
          <div class="left">
            <div class="img">
              <img src="@/assets/images/cj.png" alt="">
            </div>
            <div class="text">
              <div class="text1">签到获得1次抽奖</div>
              <div class="text2">每日签到送一次抽奖机会</div>
            </div>
          </div>
          <div class="right">去抽奖</div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const goBack = () => {
  router.back()
}

const signDays = ref([
  {
    day: 1,
    status: 1,
  },
  {
    day: 2,
    status: 0,
  },
  {
    day: 3,
    status: 0,
  },
  {
    day: 4,
    status: 0,
  },
  {
    day: 5,
    status: 0,
  },
  {
    day: 6,
    status: 0,
  },
  {
    day: 7,
    status: 0,
  },
])
</script>

<style lang="scss" scoped>

.content {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/images/siginBg.png") no-repeat;
  background-size: 100% 100%;

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
      color: white;
    }
  }

  main {
    margin: 25px auto auto;
    width: 345px;
    padding-bottom: 20px;

    .signTit {
      width: 331px;
      height: 125px;
      margin: auto;
      position: relative;
      z-index: 2;

      img {
        width: 100%;
      }
    }

    .signCenter {
      .signTimes {
        position: relative;
        z-index: 1;
        top: -12px;
        width: 100%;
        height: 59px;
        background: url("@/assets/images/signHeadBg.png");
        background-size: 100% 100%;
        font-size: 14px;
        font-weight: 600;
        color: white;
        display: flex;
        align-items: center;
        padding-left: 15px;
      }

      .signContent {
        width: 100%;
        height: 200px;
        background: url("@/assets/images/signCenter.png");
        background-size: 100% 100%;
        position: relative;
        z-index: 3;
        top: -24px;

        .signDays {
          padding: 16px 21px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0px;

          .signDay {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .statusSuccess {
              width: 14px;
              height: 14px;
              background: #266efe;
              border-radius: 100%;
              display: flex;
              justify-content: center;
              align-items: center;

              img {
                width: 6px;
                height: 4px;
              }
            }

            .statusError {
              width: 24px;
              height: 14px;
              border-radius: 12px;
              background: #DCDCDC;
              font-size: 8px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #494949;
            }

            .signImg {
              width: 21px;
              height: 39px;
              margin: 16px 0px;

              img {
                width: 100%;
                height: 100%;
              }
            }
          }


          .days {
            font-size: 10px;
            font-weight: 600;
            display: flex;

            align-items: baseline;

            span {
              font-size: 14px;
              font-weight: 600;
              margin-right: 3px;
            }
          }
        }

        .signBtn {
          width: 317px;
          height: 44px;
          margin: auto;
          background: #266EFE;
          border-radius: 33px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          color: white;
          font-weight: 600;

        }
      }
    }

    .signBottom {
      width: 345px;
      height: 311px;
      margin: auto;
      border-radius: 10px;
      background: url('@/assets/images/signCenter.png') no-repeat;
      background-size: 100% 100%;

      .signBottomHead {
        width: 317px;
        padding-top: 14px;
        margin: auto;
        position: relative;

        .text {
          font-size: 14px;
          font-weight: 600;
          color: black;
        }

        .img {
          width: 84px;
          height: 68px;
          position: absolute;
          right: 0;
          top: -10px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .lottery {
        width: 317px;
        height: 60px;
        margin: 14px auto 0;
        padding: 0 13px;
        border-radius: 10px;
        background: #F4F7FF;
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .left {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .img {
            width: 30px;
            height: 32px;
            margin-right: 10px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .text {
            .text1 {
              font-size: 12px;
              font-weight: 400;
              color: #041B2B;
            }

            .text2 {
              font-size: 10px;
              color: #7B8895;
            }
          }
        }

        .right {
          width: 48px;
          height: 24px;
          background: #266efe;
          color: white;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 19px;

        }
      }

    }
  }
}

</style>
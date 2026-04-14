<template>
  <main class="content">
    <div class="mask"></div>
    <div class="user">
      <div class="avatar">
        <img src="@/assets/images/avatar1.png" alt="">
      </div>
      <div class="name">
        顶顶顶顶
      </div>
    </div>
    <div class="sign">
      <div class="header">
        <div class="img">
          <img src="@/assets/images/daySign.png" alt="">
        </div>
        <div class="signBtn" @click="push('sign')">
          去签到
        </div>
      </div>
      <div class="center">
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
      </div>
      <div class="btns">
        <div class="left">邀请好友</div>
        <div class="right">
          <div class="start">立即抽奖</div>
          <div class="times">可抽奖次数/获奖次数：1/0</div>
        </div>
      </div>
    </div>
    <div class="record">
      <div class="header">
        <div class="img">
          <img src="@/assets/images/rectangle.png" alt="">
        </div>
        <div>开奖记录</div>
      </div>
      <div class="navigation" @click="push('record')">
        <div class="text">每期开奖记录</div>
        <div class="icon">
          <img src="@/assets/images/nv.png" alt="">
        </div>
      </div>
      <div class="navigation" @click="push('myRecord')">
        <div class="text">查询我的开奖记录</div>
        <div class="icon">
          <img src="@/assets/images/nv.png" alt="">
        </div>
      </div>
    </div>

  </main>
</template>


<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const push = (path) => {
  router.push(path)
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
<style scoped lang="scss">
.content {
  width: 100vw;
  height: 100vh;
  background: #DFF1FF;
  position: relative;

  .mask {
    width: 100%;
    height: 333px;
    position: absolute;
    background: url("@/assets/images/mask.png");
    background-size: 100% 100%;
    left: 0;
    top: 0;
    z-index: 1
  }

  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 29px;
    margin-bottom: 50px;

    .avatar {
      width: 78px;
      height: 78px;
      border-radius: 100%;
      overflow: hidden;
      margin-bottom: 13px;

      img {
        width: 100%;
        height: 100%;

      }
    }

    .name {
      font-size: 14px;
      font-weight: 600;
      color: #333333;
    }
  }

  .sign {
    width: 345px;
    height: 295px;
    border-radius: 20px;
    background: url("@/assets/images/userSignBg.png") no-repeat;
    background-size: 100% 100%;
    margin: auto;
    position: relative;
    z-index: 2;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 17px 14px 15px;

      .img {
        width: 192px;
        height: 56px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .signBtn {
        width: 56px;
        height: 32px;
        border-radius: 22px;
        border: 1px solid #A1C4FF;
        background: white;
        color: #2D78FF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 400;
      }
    }

    .center {
      width: 315px;
      height: 124px;
      margin: auto;
      background: url("@/assets/images/signBg.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 10px;
      overflow: hidden;

      .signDays {
        padding: 10px 21px;
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
            border: 1px solid white;

            img {
              width: 6px;
              height: 4px;
            }
          }

          .statusError {
            width: 24px;
            height: 14px;
            border-radius: 12px;
            background: white;
            font-size: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #548DFF;
          }

          .signImg {
            width: 21px;
            height: 39px;
            margin: 10px 0px;

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
          color: #A8AEFB;

          span {
            font-size: 14px;
            font-weight: 600;
            margin-right: 3px;
            color: white;
          }
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
        font-size: 14px;
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
        justify-content: center;
        color: white;

        .start {
          font-size: 14px;
          font-weight: 600;
        }

        .times {
          font-size: 10px;
          font-weight: 400;
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
    margin: 16px auto 0;

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
}
</style>
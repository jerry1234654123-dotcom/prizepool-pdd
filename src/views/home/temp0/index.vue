<template>
  <header>
    <div class="mask" @click="openUrl(gamesData.web_url)">
      <div class="left">
        <div class="icon">
          <img v-if="gamesData.icon" :src="gamesData.icon" alt="" />
        </div>
        <div class="text">
          <div class="tit">{{ gamesData.name }}</div>
          <div class="des" v-if="!desStatus">{{ gamesData.desc }}</div>
        </div>
      </div>
      <div class="right1">
        <div class="right">{{ $t("game_btn") }}</div>

        <div class="des" v-if="desStatus">{{ gamesData.desc }}</div>
      </div>
    </div>
    <div class="homeHead">
      <DImg src="@/assets/images/homeHead.png" />
    </div>
    <div class="white"></div>
    <div class="dayPrize">
      {{ $t("dailyDraw")
      }}<span class="prize_times">{{ periodInformation.issue }}</span>
    </div>
    <div class="white1">
      <div class="white">
        <div class="bg bg1"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        <div class="bg bg4"></div>
      </div>
    </div>
    <div class="userDetails">
      <div class="avatarDetails">
        <div class="left">
          <div class="avatar">
            <img
              v-if="!token"
              src="@/assets/images/avatar1.png"
              alt=""
            />
            <img
              v-else
              :src="userStore.userIcon"
              alt=""
            />
          </div>
          <div class="details">
            <div class="name">{{ userStore.userInfo.account }}</div>
            <div class="times">
              {{
                token
                  ? $t("alreadySign", {
                      time: userStore.userInfo.finish_of_sign_in,
                    })
                  : $t("firstLogin")
              }}
            </div>
          </div>
        </div>

        <div class="right">
          <div class="rightBtn" @click="handleShowRule(1)">
            {{ $t("rule1") }}
          </div>
          <div class="rightBtn" @click="goSign">
            {{ $t("check") }}
          </div>
        </div>
      </div>
      <div class="users">
        <div
          class="avatars"
          v-if="periodInformation.users && periodInformation.users.length > 0"
        >
          <div
            class="avatarsF"
            v-for="(item, index) in periodInformation.users"
            :key="index"
          >
            <div class="avatar" v-if="index < 4">
              <img :src="item.icon" alt="" />
            </div>
          </div>
        </div>
        <div
          class="usersText"
          :class="
            periodInformation.users && periodInformation.users.length < 1
              ? 'usersTextLeft'
              : ''
          "
        >
          {{ $t("hNeedUser")
          }}<span class="yellow">{{
            periodInformation.player_num - periodInformation.num_current_player
          }}</span
          >{{ $t("needUserText") }}
          <span>
            {{ $t("needUser", { count: periodInformation.player_num }) }}
          </span>
        </div>
      </div>
      <div class="progress">
        <Progress
          pivot-color="#1A8AFF"
          :percentage="
            !isNaN(
              periodInformation.num_current_player /
                periodInformation.player_num
            )
              ? (periodInformation.num_current_player /
                  periodInformation.player_num) *
                100
              : 0
          "
          :track-color="'#123796'"
          :pivot-text="`${periodInformation.num_current_player}/${periodInformation.player_num}`"
          :stroke-width="10"
          :color="'#1B92FF'"
        />
      </div>
    </div>
    <div class="btns">
      <div class="btn1" @click="share">
        <div class="share">{{ $t("share") }}</div>
      </div>
      <div class="btn2" @click="handleStartPlay">
        <div v-if="!token" class="play">{{ $t("join") }}</div>
        <div v-else class="playTimes">
          {{ $t("signText") }}:
          <span>{{ userStore.userInfo.point_of_prize_pool }}</span
          >/<span>{{ userStore.userInfo.finish_of_sign_in }}</span>
        </div>
      </div>
      <div class="btn3" v-if="token" @click="push('/record')">
        {{ $t("logs") }}
      </div>
      <div class="btn4" v-if="token" @click="push('/myRecord')">
        {{ $t("myRecord") }}
      </div>
    </div>
  </header>
  <main>
    <div class="kf">
      <div @click="handleShowRule(2)" v-if="depositStatus === '1'">
        <img src="@/assets/images/deposit.png" alt="" />
      </div>
    </div>

    <div class="prize">
      <div class="header" :class="locale">
        <div class="prize_review">{{ $t("review") }}</div>
        <div class="prize_times">
          {{ $t("period", { issue: periodInformation.issue }) }}
        </div>
      </div>
      <div class="main">
        <div
          class="prizeDetails"
          v-for="(item, index) in prizeGoods"
          :key="index"
        >
          <img :src="item.icon" alt="" />
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>

    <div class="prize prizeList prizeListOld">
      <div class="header" :class="locale">
        <div class="prize_review">{{ $t("signJoinList") }}</div>
        <div class="prize_times">
          {{ $t("period", { issue: periodInformation.issue }) }}
        </div>
      </div>
      <div class="list">
        <ul class="title">
          <li>{{ $t("title.name") }}</li>
          <li>{{ $t("title.status") }}</li>
          <li>{{ $t("title.prizeName") }}</li>
        </ul>
        <Vue3SeamlessScroll
          :limitScrollNum="3"
          :list="periodInformation.users"
          class="prizeCenter prizeCenterOld"
        >
          <div
            class="item"
            v-for="(item, index) in periodInformation.users"
            :key="index"
          >
            <div class="prizeUserDetails">
              <div class="avatar">
                <img :src="item.icon" alt="" />
              </div>

              <div class="name">{{ item.account }}</div>
            </div>
            <div
              :class="
                item.status === '4'
                  ? 'status2'
                  : item.status === '3'
                  ? 'status1'
                  : 'status2'
              "
              class="status"
            >
              {{
                item.status === "4"
                  ? $t("status.status4")
                  : item.status === "3"
                  ? $t("status.status3")
                  : "-"
              }}
            </div>
            <div class="prizeName">
              {{ item.prize_name || "-" }}
            </div>
          </div>
        </Vue3SeamlessScroll>
      </div>
    </div>
    <div class="prize prizeList prizeNew">
      <div class="header" :class="locale">
        <div class="prize_review">{{ $t("zjmd") }}</div>
        <!--        <div class="prize_times"> </div>-->
      </div>
      <div class="list">
        <ul class="title">
          <li>{{ $t("title.name") }}</li>
          <li></li>
          <li>{{ $t("title.prizeName") }}</li>
        </ul>
        <Vue3SeamlessScroll
          :limitScrollNum="7"
          :list="fList"
          class="prizeCenter"
        >
          <div class="item" v-for="(item, index) in fList" :key="index">
            <div class="prizeUserDetails">
              <div class="avatar">
                <img :src="item.icon" alt="" />
              </div>
              <div class="name">{{ item.account }}</div>
            </div>
            <div></div>

            <div class="prizeName">
              {{ item.prizeName || "-" }}
            </div>
          </div>
        </Vue3SeamlessScroll>
      </div>
    </div>
    <Login :show="showLogin" @close="showLogin = false" />
    <Rule
      :show="showRule"
      :ruleType="ruleType"
      @close="showRule = false"
      :rule="rule"
    />
    <Game :show="showGameId" @close="closeGameId" />
    <Gift
      v-if="showGift"
      @close="showGift = false"
      :show="showGift"
      :gift-data="giftDetails"
    />
    <div class="loginOut" v-if="token" @click="handleLogout">
      {{ $t("loginOut") }}
    </div>
  </main>
</template>

<script setup>
import Login from "@/components/login/temp0/index.vue";
import DImg from "@/components/img.vue";
import Gift from "@/components/gift.vue";
import Rule from "@/components/rule.vue";
import Game from "@/components/gameId.vue";
import { Progress } from "vant";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userInfo.js";
import { useI18n } from "vue-i18n";
import { token } from '@/store/userInfo'
import { useHome, useFunc, showLogin, useRule, handleLogout, usePrizeNew, useAd } from '../index'
import { onMounted , onUnmounted } from 'vue'
import { useConfig } from "@/config";

const { locale } = useI18n();

const userStore = useUserStore();

const router = useRouter();
useAd()
const { gamesData, desStatus, handleStartPlay, closeGameId, periodInformation, showGameId, showGift, giftDetails, defaultReq } = await useHome()
const { share, goSign } = useFunc()
const { rule, showRule, ruleType, handleShowRule, depositStatus } = useRule()
const { prizeGoods, fList } = usePrizeNew()

const push = (path) => {
  router.push(path);
};
const openUrl = (url) => {
  window.open(url);
};

let reqInterval = null;
onMounted(() => {
  const { activity_delay } = useConfig()
  defaultReq().then(() => {
    reqInterval = setInterval(defaultReq, (activity_delay || 10) * 1000)
  });
});
onUnmounted(() => {
  clearInterval(reqInterval);
  reqInterval = null;
});
</script>

<style scoped lang="scss">
@keyframes bounce-down {
  25%,
  75% {
    transform: translateY(-10px);
  }
  50%,
  100% {
    transform: translateY(0);
  }
}

@keyframes scaleAnimation {
  // 动画设置
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.08);
  }

  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.08);
  }
}

header {
  width: 100%;
  min-height: 540px;
  padding-bottom: 30px;
  background-image: url("@/assets/images/bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  position: relative;

  .mask {
    width: 100%;
    padding: 0 15px;
    height: 57px;
    background: url("@/assets/images/mask_game.png") no-repeat;
    background-size: 100% 100%;
    position: fixed;
    top: 0;
    display: flex;
    z-index: 3;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .icon {
        width: 43px;
        height: 43px;
        margin-right: 5px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        color: white;

        .tit {
          font-size: 16px;
          font-weight: 600;
        }

        .des {
          font-size: 11px;
          color: #a5a5a5;
          position: relative;
          top: -5px;
        }
      }
    }

    .right1 {
      display: flex;
      align-items: center;
      flex-direction: column;
      
      .des {
        font-size: 11px;
        color: #a5a5a5;
        position: relative;
        //top: -5px
      }
    }

    .right {
      width: 91px;
      height: 28px;
      animation-name: scaleAnimation; // 动画名
      animation-duration: 2s; // 动画时长
      animation-iteration-count: infinite; // 永久动画
      transition-timing-function: ease-in-out; // 动画过渡
      background: url("@/assets/images/game_btn.png");
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #5c0100;
      font-size: 8px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .homeHead {
    position: absolute;
    width: 100%;
    margin: auto;
    top: 13%;
    display: flex;
    justify-content: center;
    z-index: 2;

    img {
      width: 80%;
    }
  }

  .btns {
    width: 345px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto 0;
    color: white;
    font-size: 12px;
    font-weight: 600;
    flex-wrap: wrap;

    .btn1 {
      width: 161px;
      height: 46px;
      background: url("@/assets/images/b1.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }

    .btn3 {
      width: 161px;
      height: 46px;
      background: url("@/assets/images/b3.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn4 {
      width: 161px;
      height: 46px;
      background: url("@/assets/images/b4.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn2 {
      width: 161px;
      height: 46px;
      background: url("@/assets/images/b2.png") no-repeat;
      background-size: 100% 100%;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;

      .playTimes {
        font-size: 12px;
      }
    }
  }

  .white1 {
    position: absolute;
    width: 100%;
    top: 32%;
    z-index: 0;

    .white {
      width: 100%;
      height: 120px;
      position: relative;

      .bg {
        position: absolute;
        animation: bounce-down 1.6s linear infinite;
      }

      .bg1 {
        width: 72px;
        height: 72px;
        background: url("@/assets/images/1.png") no-repeat;
        background-size: 100% 100%;
        left: 0;
        top: -100px;
      }

      .bg3 {
        width: 99px;
        height: 91px;
        background: url("@/assets/images/3.png") no-repeat;
        background-size: 100% 100%;
        left: 47px;
        top: 0;
      }

      .bg2 {
        width: 57px;
        height: 60px;
        background: url("@/assets/images/2.png") no-repeat;
        background-size: 100% 100%;
        right: 100px;
        top: -50px;
      }

      .bg4 {
        width: 136px;
        height: 145px;
        background: url("@/assets/images/4.png") no-repeat;
        background-size: 100% 100%;
        right: 0;
        top: 0px;
      }
    }
  }

  .white {
    width: 100%;
    height: 120px;
    position: relative;
  }

  .dayPrize {
    padding: 0 20px;
    position: relative;
    z-index: 2;
    height: 30px;
    margin: 60px auto 0;
    border-radius: 34px;
    border: 1px solid white;
    background: linear-gradient(#1464ff, #1d9fff, #05b8ff);
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;

    .prize_times {
      color: #ffdc60;
      font-weight: bold;
      margin: 0 5px;
    }
  }
}

main {
  position: relative;
  top: -40px;

  .kf {
    position: fixed;

    right: 10px;
    top: 49%;
    z-index: 3;

    img {
      width: 44px;
      //height: 44px;
      //border-radius: 100%;
    }
  }

  .prize {
    width: 345px;
    height: 436px;
    border-radius: 20px;
    background: #d9f4ff;
    margin: 20px auto 0px;

    .header {
      width: 100%;
      height: 70px;
      background: url("@/assets/images/jp.png") no-repeat;
      background-size: 100% 100%;
      color: white;

      .prize_review {
        font-size: 21px;
        font-weight: 600;
        font-style: italic;
        margin-left: 80px;
        padding-top: 10px;
      }

      .prize_times {
        font-size: 12px;
        font-weight: 400;
        margin-left: 80px;
        position: relative;
        top: -5px;
      }
    }

    .id {
      background: url("@/assets/images/id/jp.png") no-repeat;
      background-size: 100% 100%;
    }

    .main {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      flex-wrap: wrap;

      .prizeDetails {
        width: 87px;
        height: 103px;
        margin-bottom: 20px;
        background: linear-gradient(#9cd6ff, #55c3f4, #21baff, #50c8ff);
        box-shadow: 0 -4 2 0 #6deeff;
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 10px;

        img {
          max-width: 85px;
          max-height: 57px;
        }

        div {
          width: 50px;
          text-align: center;
        }
      }
    }
  }

  .prizeList {
    height: 350px;
    overflow: hidden;

    .header {
      width: 100%;
      height: 70px;
      background: url("@/assets/images/md.png") no-repeat;
      background-size: 100% 100%;
      color: white;
    }

    .id {
      background: url("@/assets/images/id/md.png") no-repeat;
      background-size: 100% 100%;
    }

    .list {
      .title {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        height: 33px;
        background: #a1d8ff;

        :nth-child(2n + 1) {
          width: 40%;
        }

        :nth-child(2) {
          width: 20%;
        }

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          font-weight: 600;
        }
      }

      .prizeCenter {
        height: 231px;
        overflow: hidden;
        color: #999;
        .item:nth-child(2n) {
          background: #d9f4ff;
        }

        .item:nth-child(2n + 1) {
          background: #c8e8ff;
        }

        .item {
          display: flex;
          flex-direction: row;
          height: 33px;
          font-size: 12px;
          align-items: center;

          :nth-child(2n + 1) {
            width: 40%;
          }

          .status {
            font-size: 10px;
            width: 48px;
            height: 21px;
            border-radius: 22px;
          }

          .status1 {
            color: #f1ab3d;
            background: #fff9e6;
          }

          .status2 {
            color: #eb3e2f;
            background: #ffe6e6;
          }

          .status3 {
            color: #009b19;
            background: #e6fff1;
          }

          :nth-child(2) {
            width: 20%;
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
                height: 100%;
              }
            }
          }
        }
      }

      .prizeCenterOld {
        height: 99px;
      }
    }
  }



  .prizeListOld {
    height: 220px;
  }
}

.userDetails {
  width: 345px;
  height: 190px;
  margin: 10px auto;
  background: url("@/assets/images/userBg.png");
  background-size: 100% 100%;
  position: relative;
  z-index: 2;

  .avatarDetails {
    display: flex;
    justify-content: space-between;
    width: 320px;
    margin: auto;
    padding-top: 40px;
    align-items: center;

    .left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .avatar {
        width: 50px;
        height: 50px;
        background: white;
        border-radius: 100%;
        margin-right: 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        font-size: 14px;
        font-weight: 600;
        color: white;
      }

      .times {
        font-size: 12px;
        font-weight: 400;
        color: #d2ebff;
      }
    }

    .right {
      display: flex;

      .rightBtn {
        width: 54px;
        height: 30px;
        background: white;
        border-radius: 22px;
        border: 1px solid #9adfff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: 600;
        color: #18a6ff;
        margin-right: 10px;
      }
    }
  }

  .progress {
    width: 320px;
    margin: 18px auto auto;
  }

  .users {
    width: 320px;
    margin: 0 auto auto;
    display: flex;
    flex-direction: row;
    align-items: center;

    .avatars {
      display: flex;
      flex-direction: row;

      .avatar {
        width: 22px;
        height: 22px;
        border-radius: 100%;
        overflow: hidden;
        border: 1px solid white;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .usersText {
      font-size: 12px;
      color: white;
      //position: relative;
      //left: -15px;
      margin-left: 10px;
      font-weight: 600;
    }

    .usersTextLeft {
      left: 0;
    }
  }
}

.record {
  width: 345px;
  height: 141px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  margin: 20px auto 0;

  .header {
    padding-top: 15px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: baseline;
    justify-content: left;
    color: #041b2b;

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
  background: white;
  border-radius: 30px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: black;
}
</style>

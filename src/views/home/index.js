import { useGameData } from '@/store/gameData'
import { useConfig } from "@/config"
import { token } from '@/store/userInfo'
import {
  generatePhoneNumber,
  handleShare,
  randomRange,
  storage,
  getAvatar,
} from "@/utils";
import {
  getDict,
  getNews,
  getPrizeGoods,
  getWinOrders,
  joinPrizePool,
  getMyIssueLogs,
} from "@/utils/api.js";
import { useRouter } from 'vue-router';
import { initializeAdjust } from "@/utils/adjust";
import { ref } from 'vue'
import { useUserStore } from "@/store/userInfo.js";
import { showToast } from 'vant'
import { useI18n } from "vue-i18n";
import { loading } from '@/App'
import { useLocalStorage } from '@vueuse/core';

const { game_desc_right, show_game_id, platformId, login_type, activity_id } = useConfig()
export const showLogin = ref(false);
const prizeGoods = ref([]);
export function useFunc() {
  const userStore = useUserStore();
  const router = useRouter()
  const share = () => {
    if (!token.value) {
      showLogin.value = true
    } else {
      const local = location.origin;
      handleShare(`${local}?user_code=${userStore.userInfo.user_code}`);
    }
  };
  
  const goSign = () => {
    if (!token.value) {
      showLogin.value = true;
    } else {
      router.push("/user");
    }
  };
  return { share, goSign }
}
export function useAd() {
  const urlParams = new URLSearchParams(window.location.search.replace('#/', ''));
  // 设置
  const toQueryString = (params, isfbclid) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (isfbclid) {
        searchParams.append(key, value);
      } else {
        if (key !== "fbclid") {
          searchParams.append(key, value);
        }
      }
    }
    return searchParams.toString();
  };
  async function trackAdEvent() {
    const gamesData = await useGameData()
    const type = urlParams.get("type");
    const fbclid = urlParams.get("fbclid");
    const ttclid = urlParams.get("ttclid")
    if ('__callback_param__' !== ttclid && (fbclid || ttclid) && type == 2) {
      if (!gamesData.value.tracker_token) {
        // return alert("adjust tranker token empty");
      }
      const queryParams = {};
      for (const [key, value] of urlParams) {
        queryParams[key] = value;
      }
      const queryString = toQueryString(queryParams, true);
      const queryString2 = toQueryString(queryParams, false);
  
      let page_apk = `https://${window.location.hostname}?${queryString2}`;
      page_apk = encodeURIComponent(page_apk)
      let url = `https://app.adjust.com/${gamesData.value.tracker_token}?${queryString}&redirect=${page_apk}`;
      // 跳转
      const a = document.createElement("a");
      a.href = url;
      document.body.appendChild(a);
      setTimeout(function () {
        a.click();
      }, 100);
  
      a.remove();
      return;
    }
  };
  trackAdEvent()
  // adjust初始化
  if (urlParams.get("adjust_referrer") && urlParams.get("type") == 2) {
    initializeAdjust({
      tracker_token: gamesData.value.tracker_token,
      appToken: gamesData.value.ad_app_token,
    })
  }
}
export async function useHome() {
  const { t } = useI18n()
  const periodInformation = ref({
    created_at: undefined,
    id: undefined,
    issue: undefined,
    num_current_player: 0,
    num_of_winners: undefined,
    platform_id: undefined,
    player_num: 0,
    status: undefined,
    users: undefined,
  });
  const joinedIssueId = useLocalStorage('joinedIssueId', '')
  const gamesData = await useGameData()
  const userStore = useUserStore();
  document.title = gamesData.value.name;
  const link = document.querySelector("link[rel*='icon']")
  link.href = gamesData.value.icon;

  
  const desStatus = game_desc_right || false;
  
  const showGameId = ref(false);
  const handleStartPlay = () => {
    if (!token.value) {
      showLogin.value = true;
      return
    }
    // 如果没有有效期号，提示用户稍后再试
    if (!periodInformation.value.issue) {
      showToast(t('noIssueAlart'))
      return
    }
    if (show_game_id) {
      if (
        userStore.userInfo.game_id === ""
      ) {
        showGameId.value = true;
        return;
      }
    }
    handleJoinPrize();
  };
  const closeGameId = (type) => {
    showGameId.value = false;
    if (type === 1) {
      userStore.handleGetUserInfo();
    }
  };

  const showGift = ref(false);
  const giftDetails = ref();
  // 获取当前玩家在当前活动获得的礼品信息
  const handleGetIssueInfo = async () => {
    const rsp = await getMyIssueLogs({ platform_id: platformId, page: 1, size:1 });
    if (rsp.code === 0) {
      const data = rsp.data;
      if (data.list && data.list.length) {
        const prize_info = data.list[0]
        const prize_icon = prizeGoods.value.find((item) => item.id === prize_info.prizeId)?.icon
        giftDetails.value = { ...prize_info, prize_icon };
        showGift.value = true;
        joinedIssueId.value = ''
      }
    } else {
      throw new Error()
    }
  };
  // 获取当前活动的信息，包括获奖人数
  const handleGetNews = async () => {
    const rsp = await getNews({ PlatformId: platformId });
    if (rsp.code === 0) {
      if (rsp.data?.issue && token.value && joinedIssueId.value && (joinedIssueId.value !== rsp.data.issue)) {
        handleGetIssueInfo(rsp.data.issue);
      }
      if (rsp.data?.users.length) {
        rsp.data.users = rsp.data?.users.map((k) => {
          if (k.icon.includes('//api')) {
            k.icon = getAvatar()
          }
          return k
        })
      }
      periodInformation.value = rsp.data;
    }
  };
  const defaultReq = async () => {
    await handleGetNews();
  };
  const handleJoinPrize = async () => {
    if (loading.value === true) {
      return;
    }
    loading.value = true;
    try {
      const issue = periodInformation.value.issue
      const rsp = await joinPrizePool({
        platform_id: platformId,
        issue: periodInformation.value.issue,
      });
      loading.value = false;
      if (rsp.code === 0) {
        showToast("success!");
        joinedIssueId.value = issue
        await userStore.handleGetUserInfo();
        await defaultReq(issue);
      } else {
        showToast(rsp.msg);
      }
    } catch(err) {
      loading.value = false;
    }
  };
  
  return {
    gamesData,
    desStatus,
    loading,
    handleStartPlay,
    closeGameId,
    periodInformation,
    showGameId,
    showGift,
    giftDetails,
    defaultReq
  }
}

export function useRule() {
  const rule = ref("");
  const showRule = ref(false);
  const getGameRule = async () => {
    const rsp = await getDict({ platform_id: platformId, k: "game_rule" });
    if (rsp.code === 0) {
      rule.value = rsp.data.v;
    }
  };
  const getDepositDetails = async () => {
    const rsp = await getDict({
      platform_id: platformId,
      k: "deposit_detials",
    });
    if (rsp.code === 0) {
      rule.value = rsp.data.v;
    }
  };

  const ruleType = ref(1);
  const handleShowRule = async (type) => {
    ruleType.value = type;
    if (type === 1) {
      await getGameRule();
    } else {
      await getDepositDetails();
    }

    showRule.value = true;
  };
  const depositStatus = ref("0");

  const handleGetDepositStatus = async () => {
    const rsp = await getDict({
      platform_id: platformId,
      k: "deposit_status",
    });
    if (rsp.code === 0) {
      depositStatus.value = rsp.data.v;
    }
  };
  // handleGetDepositStatus()

  return {
    rule,
    showRule,
    ruleType,
    handleShowRule,
    depositStatus
  }
}
export function usePrizeNew() {
  
  const { locale } = useI18n();
  
  const avatars = [
    "https://www.gravatar.com/avatar/%25d?d=wavatar&f=y",
    "https://www.gravatar.com/avatar/%25d?d=identicon&f=y",
    "https://www.gravatar.com/avatar/%25d?d=monsterid&f=y",
    "https://www.gravatar.com/avatar/%25d?d=retro&f=y",
    "https://www.gravatar.com/avatar/%25d?d=robohash&f=y",
  ];

  const avatar2 = [
    "https://api.multiavatar.com/1.png",
    "https://api.multiavatar.com/2.png",
    "https://api.multiavatar.com/3.png",
    "https://api.multiavatar.com/4.png",
    "https://api.multiavatar.com/5.png",
  ];
  const fList = ref(undefined);
  const buildList = () => {
    try {
      const list = [];
      const goodsList = prizeGoods.value;
      for (let i = 0; i < 30; i++) {
        let account = randomRange(4, 10).replace(/^(.).*(.)$/, "$1******$2");
        if (login_type === "1") {
          let data = generatePhoneNumber();
          account = data.substring(0, 3) + "****" + data.substr(data.length - 4);
        }
        list.push({
          icon:
            locale.value === "zh"
              ? avatar2[Math.floor(Math.random() * avatars.length)]
              : avatars[Math.floor(Math.random() * avatars.length)],
          account: account,
          prizeName: goodsList[Math.floor(Math.random() * goodsList.length)].name,
        });
      }
      
      fList.value = list.concat(winOrders.value).sort(() => Math.random() - 0.5).map((o) => {
        o.icon = getAvatar()
        return o
      });
    } catch (e) {
      console.error(e)
    }
  };
  const handleGetPrizeGoods = async () => {
    const rsp = await getPrizeGoods({
      PlatformId: platformId,
      activity_id,
    });
    if (rsp.code === 0) {
      prizeGoods.value = rsp.data.list;
      if (!fList.value) {
        buildList();
      }
    }
  };
  
  const winOrders = ref(undefined);

  const handelGetWin = async () => {
    const rsp = await getWinOrders({ platform_id: platformId });
    if (rsp.code === 0) {
      winOrders.value = rsp.data.list;
    }
  };
  handelGetWin().then(handleGetPrizeGoods)

  return {
    prizeGoods,
    fList
  }
}
export const handleLogout = () => {
  storage.clean();
  try {
    const FB = window.FB
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        FB.logout(function() {
          location.reload();
        })
      } else {
        location.reload();
      }
    });
  } catch(err) {
    console.log('无需退出fb')
    location.reload();
  }
};
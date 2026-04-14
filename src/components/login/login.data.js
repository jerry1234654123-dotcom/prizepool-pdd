import { computed, ref, watch } from "vue";
import { useConfig } from "@/config";
import { useGameData } from '@/store/gameData'
import { trackRegistrationEvent } from "@/utils/adjust";
import { token } from '@/store/userInfo'
import { loginFb, getDict } from "@/utils/api.js";
import { showToast } from "vant";
import { useFinger, finger } from '@/store/client'


export function useMaintain() {
  const maintain = computed(() => {
    const time = '2025-7-10 00:00:00' // 维护时间
    const host = [ // 维护域名
      // 'pdd111.com',
      // '4892lotspdd.com',
      // 'bigpdd.co',
      // 'jtbluepdd.com',
      // 'clpdd.com',
      // 'luxurypdd.com',
      // 'vtpdd.com',
      // 'pdd52.com',
      // 'ix669.com',
      // 'rjpdd.com',
    ]
    const n = +new Date(time) - +new Date()
    const show = host.includes(window.location.host) && n > 0
    return { show, time }
  })

  return maintain
}

export function useThirdPartyDict(props) {
  const { platformId } = useConfig()
  const otherLoginDict = ref(undefined);
  const getOtherLogin = async () => {
    if(otherLoginDict.value) return
    const rsp = await getDict({
      k: "other_login",
      platform_id: platformId,
    });
    if (rsp.code === 0) {
      otherLoginDict.value = rsp.data.v ? JSON.parse(rsp.data.v) : undefined;
      console.log(otherLoginDict.value.facebook);
    }
  };
  watch(
    () => props.show,
    (status) => {
      if (status) {
        getOtherLogin();
      }
    }
  );
  return {
    otherLoginDict,
  }
}

export function useLogin() {
  useFinger()
  const { platformId } = useConfig()
  const urlParams = new URLSearchParams(window.location.search.replace('#/', ''));

  //为true则使用新模版
  const newTemplate = () => {
    let newT = [
      1106,
      1084,
      2004,
      2011,
      2100,
      2101,
      2102,
      2103,
      2013,
      2014,
      2004,
      2010,
      1089,
      1095
    ];
    return newT.indexOf(platformId) !== -1 ? true : false;
  };

  const getFbclid = function (fbclid) {
    // 获取URL查询字符串中的参数

    // 获取fbclid的值
    fbclid = urlParams.get(fbclid);
    return fbclid;
  };
  function removeEmptyKeys(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 检查值是否为 null、undefined 或空字符串
        if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
          delete obj[key]; // 删除没有值的键
        }
      }
    }
  }
  const loading = ref(false);
  function checkAndLogout(res) {
    const FB = window.FB
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        FB.logout()
      }
    });
  }
  function fbTryLogin(res) {
    console.log(res, res?.status === "connected")
    if(res?.status === "connected") {
        facebookSuccess()
    }
  }
  function facebookSuccess(res) {
    console.log('facebooksuccess', res)
    const FB = window.FB
    FB.api('/me?fields=id,name', (res) => {
      const { id, name } = res
      console.log('Successful login for: ' , res);
      const profile = {
        id,
        name,
        // pictureUrl: 'http://graph.facebook.com/'+id+'/picture?type=large'
      }
      thirdPartyLogin(profile)
    })
  }
  const thirdPartyLogin = async (data) => {
    console.log('成功回调')
  
    const search = location.search;
    let tofb = urlParams.get('tofb')
    tofb = tofb === null ? 1 : parseInt(tofb)
    let newTparam = {
      to_fb: tofb,
      user_agent: navigator.userAgent,
      event_source_url: window.location.hostname,
      fbclid: getFbclid("fbclid"),
    };
    let req = {
      name: data.name,
      id: data.id,
      icon: data.icon,
      platform_id: platformId,
      fingerprint: finger.value
    };
    if (newTemplate()) {
      req = { ...req, ...newTparam };
    }
  
    removeEmptyKeys(req);
    if (search.indexOf("user_code") !== -1) {
      req["user_code"] = search.split("=")[1];
    }
  
    try {
      const rsp = await loginFb(req);
      if (rsp.code !== 0) {
        showToast(rsp.msg);
      } else {
        token.value = rsp.data.token
        if(urlParams.get("type") == 2 &&rsp.data.first) {
          const gamesData = await useGameData()
          trackRegistrationEvent(gamesData.value.ad_event_complete_registration)
        }
        handleClose();
      }
      loading.value = false;
    } catch (err) {
      showToast(err);
      loading.value = false;
    }
  };
  return {
    checkAndLogout,
    fbTryLogin,
  }
}
// export function useLoginType(props) {
//   const { login_type } = useConfig()
//   // 1 手机 0 用户名
//   const loginType = ref(login_type);
//   const getLoginType = async () => {
//     const rsp = await getDict({
//       k: "login_type",
//       platform_id: platformId,
//     });
//     if (rsp.code === 0) {
//       loginType.value = rsp.data.v || loginType.value;
//     }
//   };
//   watch(
//     () => props.show,
//     (status) => {
//       if (status) {
//         getLoginType();
//       }
//     }
//   );
//   return {
//     loginType,
//   }
// }
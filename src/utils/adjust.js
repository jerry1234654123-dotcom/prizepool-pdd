

import Adjust from "@adjustcom/adjust-web-sdk";


export function initializeAdjust(
 { appToken,
    environment = "production",
    logLevel = "verbose",
    tracker_token}
) {
  console.log('Adjust初始化')
  Adjust.initSdk({
    appToken,
    environment,
    logLevel,
    tracker_token
  });
}
// 注册埋点
export function trackRegistrationEvent(tokenE) {
  console.log('进入Adjust.trackEven')
  Adjust.trackEvent({
    eventToken: tokenE
  })
}

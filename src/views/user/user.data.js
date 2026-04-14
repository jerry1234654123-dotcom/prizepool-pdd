import {useUserStore} from "@/store/userInfo.js";
import {handleShare, mGetDate } from "@/utils/index.js";

export function useShare() {
  const userStore = useUserStore();
  const share = () => {
    const local = location.origin
    console.log(location)
    handleShare(`${local}?user_code=${userStore.userInfo.user_code}`)
  }
  return {
    share
  }
}
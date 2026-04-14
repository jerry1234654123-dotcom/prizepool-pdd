import {defineStore} from "pinia";
import {watch, ref} from "vue";
import {getUserInfo} from "@/utils/api.js";
import { useLocalStorage } from "@vueuse/core";
import  { getAvatar } from "@/utils"
export const token = useLocalStorage('token', '')
export const useUserStore = defineStore('user', () => {
    const userIcon = useLocalStorage('user-icon',getAvatar())
    const userInfo = ref({
        id: undefined,
        account: '',
        icon: "",
        game_id: "",
        sign_in_today: undefined, ///今日是否签到
        finish_of_sign_in: undefined, ///完成的签到次数
        point_of_prize_pool: undefined, /// 可用的抽奖次数,
        user_code: undefined/// 用户邀请码
    })
    const handleGetUserInfo = async () => {
        const rsp = await getUserInfo()
        if (rsp.code === 0) {
            userInfo.value = rsp.data
        }
    }
    watch(token, (val) => {
        val && handleGetUserInfo()
    }, { immediate: true})
    return {
        userIcon,
        userInfo,
        handleGetUserInfo
    }
})
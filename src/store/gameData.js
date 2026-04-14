import { getGameData } from '@/utils/api'
import { ref } from 'vue'
import { useConfig } from "@/config";

const { platformId } = useConfig()
const gamesData = ref({
  icon: "",
  name: "",
  web_url: "",
  desc: "",
  tracker_token: "",
  ad_app_token: '',
  ad_event_complete_registration: ''
});
let gamesDataLoading = false
const cbs = []
export function useGameData() {
  return new Promise(function(resolve, reject) {
    if(gamesData.value.web_url !== '') return resolve(gamesData)
    cbs.push({resolve, reject})
    if(gamesDataLoading === false) {
      getGameData({
        platform_id: platformId,
        site: window.location.hostname,
      }).then(function(res) {
        if (res.code !== 0) {
          cbs.forEach(({reject}) => {
            reject()
          })
          return
        } 
        gamesData.value = res.data
        cbs.forEach(({resolve}) => {
          resolve(gamesData)
        })
        return
      }).catch(function(err) {
        cbs.forEach(({reject}) => {
          reject()
        })
      })
    }
  })
}
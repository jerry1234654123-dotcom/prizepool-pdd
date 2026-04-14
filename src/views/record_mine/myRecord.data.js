import {getMyIssueLogs} from "@/utils/api.js";
import { useConfig } from "@/config";
import { onMounted, ref} from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

export function useMyRecord() {
  const list = ref([])
  const { platformId } = useConfig()
  const router = useRouter()
  const routerPush = (path, query) => {
    router.push({
      path,
      query: {issue: query}
    })
  }
  const handleGetIssueLogs = async () => {
    const rsp = await getMyIssueLogs({platform_id: platformId})
    if (rsp.code === 0) {
      list.value = rsp.data.list
    }
  }
  
  onMounted(() => {
    handleGetIssueLogs()
  })

  return {
    list,
    routerPush,
  }
}

export function useStatus() {  
const {t} = useI18n()
  const getStatusDiv = (status) => {
    switch (status) {
      case 1:
        return t('status.status1')
      case 2:
        return t('status.status2')
      case 3:
        return t('status.status3')
      case 4:
        return t('status.status4')
      case 5:
      return t('status.status5')
    }
  }
  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return 'status1'
      case 2:
        return 'status2'
      case 3:
        return 'status3'
      case 4:
        return 'status4'
      case 5:
        return 'status5'
    }
  }
  return {
    getStatusDiv,
    getStatusClass,
  }
}
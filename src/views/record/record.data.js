
import { useConfig } from "@/config";
import {onMounted, ref} from "vue";
import {getPointLogs} from "@/utils/api.js";

export default function useRecord() {
  const { platformId, activity_id } = useConfig()
  const list = ref([])
  const handleGetPointLogs = async () => {
    const data = {
      platform_id: platformId,
      activity_id,
    }
    const rsp = await getPointLogs(data)
    if (rsp.code === 0) {
      list.value = rsp.data.list
    }
  }

  onMounted(() => {
    handleGetPointLogs()
  })

  return {
    list,
  }
}

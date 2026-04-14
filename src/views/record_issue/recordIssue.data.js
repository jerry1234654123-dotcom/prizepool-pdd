import { useConfig } from "@/config";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import { getIssueInfo } from "@/utils/api.js";

export default function useRecordIssue() {
    const { platformId } = useConfig()
    const route = useRoute();
    const issue= route.query.issue
    const periodInformation = ref([])

    const handleGetIssueInfo = async (issue) => {
        const rsp = await getIssueInfo({platform_id: platformId, issue})
        if (rsp.code === 0) {
            const data = rsp.data
            periodInformation.value = data

        }

    }
    onMounted(() => {
        handleGetIssueInfo(issue)
    })

    return {
        periodInformation
    }
}

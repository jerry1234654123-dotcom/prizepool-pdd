import Home0 from '@/views/home/temp0/index.vue'
import Home1 from '@/views/home/temp1/index.vue'
import Home2 from '@/views/home/temp2/index.vue'
import Home4 from '@/views/home/temp4/index.vue'
import Home3 from '@/views/home/temp3/index.vue'
import Sign from '@/views/sign/index.vue'

import User0 from '@/views/user/temp0/index.vue'
import User1 from '@/views/user/temp1/index.vue'
import User2 from '@/views/user/temp2/index.vue'
import User3 from '@/views/user/temp3/index.vue'
import User4 from '@/views/user/temp4/index.vue'

import Record0 from '@/views/record/temp0/index.vue'
import Record1 from '@/views/record/temp1/index.vue'
import Record2 from '@/views/record/temp2/index.vue'
import Record3 from '@/views/record/temp3/index.vue'
import Record4 from '@/views/record/temp4/index.vue'

import MyRecord0 from '@/views/record_mine/temp0/index.vue'
import MyRecord2 from '@/views/record_mine/temp2/index.vue'
import MyRecord3 from '@/views/record_mine/temp3/index.vue'
import MyRecord4 from '@/views/record_mine/temp4/index.vue'

import RecordIssue0 from '@/views/record_issue/temp0/index.vue'
import RecordIssue2 from '@/views/record_issue/temp2/index.vue'
import RecordIssue3 from '@/views/record_issue/temp3/index.vue'
import RecordIssue4 from '@/views/record_issue/temp4/index.vue'
import { useConfig } from '@/config'

const config = useConfig()
const Homes = {
    '0': Home0,
    '1': Home1,
    '2': Home2,
    '3': Home3,
    '4': Home4
}
const MyRecords = {
    '0': MyRecord0,
    '1': MyRecord0,
    '2': MyRecord2,
    '3': MyRecord3,
    '4': MyRecord4
}
const Records = {
    '0': Record0,
    '1': Record1,
    '2': Record2,
    '3': Record3,
    '4': Record4
}
const Users = {
    '0': User0,
    '1': User1,
    '2': User2,
    '3': User3,
    '4': User4
}
const record_issues = {
    '0': RecordIssue0,
    '1': RecordIssue0,
    '2': RecordIssue2,
    '3': RecordIssue3,
    '4': RecordIssue4
}
export const routes = [
    {
        path: '/',
        component: Homes[config.homeType]
    },
    {
        path: '/sign',
        component: Sign
    },
    {
        path: '/user',
        component: Users[config.homeType]
    },
    {
        path: '/record',
        component: Records[config.homeType]
    },
    {
        path: '/myRecord',
        component: MyRecords[config.homeType]
    },
    {
        path: '/record_issue',
        component: record_issues[config.homeType]
    },

];

export default routes;